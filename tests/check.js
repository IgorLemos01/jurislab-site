// Verificação da landing page JurisLab. Uso: node tests/check.js [arquivo.html]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FILE = path.resolve(__dirname, '..', process.argv[2] || 'index.html');
const URL = 'file://' + FILE;
const WA_URL = 'https://wa.me/5579991227741?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20entrar%20na%20lista%20de%20espera%20da%20JurisLab.';
const IDS = ['topo', 'dor', 'solucao', 'um-dia', 'equipe', 'diferenciais', 'volume',
  'como-funciona', 'fundador', 'para-quem', 'faq', 'cta-final'];
const SHOTS = path.join(__dirname, 'shots');

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  if (!fs.existsSync(FILE)) { console.error('FAIL: arquivo inexistente ' + FILE); process.exit(1); }
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();

  for (const width of [360, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const tag = `[${width}px]`;

    if (width === 390) {
      check((await page.title()).includes('JurisLab'), 'título sem "JurisLab"');
      const hrefs = await page.$$eval('a[href*="wa.me"]', as => as.map(a => [a.getAttribute('href'), a.target, a.rel]));
      check(hrefs.length >= 3, `poucos links WhatsApp: ${hrefs.length}`);
      hrefs.forEach(([h, t, r], i) => {
        check(h === WA_URL, `link WhatsApp #${i} errado: ${h}`);
        check(t === '_blank' && r.includes('noopener'), `link WhatsApp #${i} sem target/rel`);
      });
      for (const id of IDS) check(await page.$('#' + id), `seção #${id} ausente`);
      check((await page.$$('details')).length === 7, `FAQ deveria ter 7 itens, tem ${(await page.$$('details')).length}`);
      const foot = await page.textContent('footer').catch(() => '');
      check(/não é afiliada à Anthropic/.test(foot || ''), 'rodapé sem aviso Anthropic');
      // menu mobile
      const toggle = await page.$('.nav-toggle');
      check(toggle && await toggle.isVisible(), 'botão de menu mobile ausente/invisível');
      if (toggle && await toggle.isVisible()) {
        await toggle.click();
        check(await toggle.getAttribute('aria-expanded') === 'true', 'menu não abriu');
        await page.click('#site-nav a[href="#equipe"]');
        await page.waitForTimeout(200);
        check(await toggle.getAttribute('aria-expanded') === 'false', 'menu não fechou após clique');
        // Escape devolve o foco ao botão
        await toggle.click();
        await page.focus('#site-nav a[href="#faq"]');
        await page.keyboard.press('Escape');
        check(await page.evaluate(() => document.activeElement.classList.contains('nav-toggle')), 'Escape não devolveu foco ao botão do menu');
      }
      // Contraste (WCAG AA)
      const contrast = await page.evaluate(() => {
        const lum = c => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
        const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
        const bgOf = el => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c; el = el.parentElement; } return 'rgb(255,255,255)'; };
        const out = [];
        document.querySelectorAll('.section--light .eyebrow, .section--paper .eyebrow, .tl-card .tag, .mock-foot').forEach(el => {
          const r = ratio(getComputedStyle(el).color, bgOf(el)); if (r < 4.5) out.push(`${el.className} ${r.toFixed(2)}`);
        });
        const wa = document.querySelector('.wa-float');
        const rw = ratio(getComputedStyle(wa).color, getComputedStyle(wa).backgroundColor); if (rw < 3) out.push(`wa-float ${rw.toFixed(2)}`);
        const op = getComputedStyle(document.querySelector('.mock-foot')).opacity; if (op !== '1') out.push('mock-foot com opacidade');
        return out;
      });
      check(contrast.length === 0, 'contraste insuficiente: ' + [...new Set(contrast)].join(', '));
      // Texto: o advogado continua no comando; número do fundador atribuído
      const body = await page.textContent('body');
      check(!/Você só revisa/.test(body), 'texto "Você só revisa" reduz o papel do advogado');
      check(/petições do fundador/.test(body), '"+200 petições" sem atribuição ao fundador');
      check(!/escalar/i.test(body) && !/dia ruim/.test(body), 'jargão de startup/substituição de equipe');
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(overflow <= 0, `${tag} rolagem horizontal de ${overflow}px`);
    check(errors.length === 0, `${tag} erros de console: ${errors.join(' | ')}`);

    if (width !== 360) {
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible')));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOTS, `page-${width}.png`), fullPage: true });
    }
    await page.close();
  }

  // Sem JavaScript, o conteúdo continua visível
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(URL);
  const h1 = await p.$('#topo h1');
  check(h1 && await h1.isVisible(), 'sem JS: h1 invisível');
  const hidden = await p.$$eval('.reveal', els => els.filter(e => getComputedStyle(e).opacity === '0').length);
  check(hidden === 0, `sem JS: ${hidden} elementos .reveal invisíveis`);
  const navLink = await p.$('#site-nav a[href="#faq"]');
  check(navLink && await navLink.isVisible(), 'sem JS: menu inacessível no celular');
  await ctx.close();
  await browser.close();

  if (failures.length) { console.log('FAIL\n- ' + failures.join('\n- ')); process.exit(1); }
  console.log('PASS: todas as verificações');
})();
