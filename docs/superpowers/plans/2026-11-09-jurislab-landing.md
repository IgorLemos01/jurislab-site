# JurisLab Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing page única, persuasiva, que leva advogados ao WhatsApp para entrar na lista de espera da JurisLab.

**Architecture:** HTML estático (`index.html`) + `styles.css` + `script.js`, sem build. Um script Node com Playwright (`tests/check.js`) valida estrutura, links, layout mobile e console. Prévia publicada como Artifact (CSS/JS inline numa cópia `dist/index.html` gerada por `tests/build-preview.js`).

**Tech Stack:** HTML5, CSS (custom properties), JS vanilla, Google Fonts (Playfair Display, Inter), Playwright (pré-instalado).

**Spec:** `docs/superpowers/specs/2026-11-09-jurislab-landing-design.md`

## Global Constraints

- Idioma: português do Brasil. `<html lang="pt-BR">`.
- WhatsApp: todo CTA = `https://wa.me/5579991227741?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20entrar%20na%20lista%20de%20espera%20da%20JurisLab.` com `target="_blank" rel="noopener"`.
- Cores: `--navy #0B1B33`, `--gold #C9A45C`, `--teal #2EC4B6`, `--ivory #F7F5F0`, `--wa #25D366`.
- Fontes: Playfair Display (títulos), Inter (texto).
- Nunca prometer resultado de processo; nunca dizer que a IA substitui o advogado.
- Nenhum depoimento, número ou certificação inventada. Único número: "mais de 200 petições".
- Fundador: "Yuri Nascimento Costa", "OAB/SE"; escritório "Menezes Lima Nascimento Advogados".
- Rodapé: "Claude é marca da Anthropic. A JurisLab não é afiliada à Anthropic."
- Sem rolagem horizontal em 360px; alvos de toque ≥ 44px; `prefers-reduced-motion` desliga animações.

## Review Focus

- Tela de 360px (Android pequeno): nada vaza lateralmente, títulos quebram bem → check em 360 e 390.
- JavaScript desligado ou falhando: conteúdo continua visível (animação de entrada não pode deixar `opacity:0` sem JS) → check com `javaScriptEnabled:false`.
- Link do WhatsApp com mensagem mal codificada → check compara `href` exato em todos os CTAs.
- Menu mobile: abrir, clicar num item, menu fecha e rola até a seção → check de clique.
- FAQ acessível por teclado → usa `<details>/<summary>` nativo; check conta 7 itens.

## File Structure

- `index.html` — todo o conteúdo e marcação semântica, seções com ids: `topo, dor, solucao, um-dia, equipe, diferenciais, volume, como-funciona, fundador, para-quem, faq, cta-final`.
- `styles.css` — tokens, layout, componentes, responsivo.
- `script.js` — menu mobile, reveal on scroll (classe `js` no `<html>` habilita animação), ano no rodapé.
- `tests/check.js` — verificação Playwright; sai com código 1 se falhar.
- `tests/build-preview.js` — gera `dist/index.html` com CSS/JS inline para a prévia.

---

### Task 1: Base, harness de verificação, topo e hero

**Files:** Create `index.html`, `styles.css`, `script.js`, `tests/check.js`

**Interfaces:**
- Produces: `node tests/check.js` (abre `file://.../index.html` em 360, 390 e 1440px). Constante `WA_URL` no check. Classes CSS reutilizáveis: `.container`, `.section`, `.section--dark`, `.section--light`, `.btn`, `.btn--wa`, `.btn--ghost`, `.eyebrow`, `.reveal`.

- [ ] **Step 1: Escrever `tests/check.js`** com asserções: título contém "JurisLab"; todos `a[href*="wa.me"]` têm `href === WA_URL` e há ≥ 3; `scrollWidth <= innerWidth` em 360/390/1440; zero erros de console; cada id da File Structure existe; `details` count === 7; texto do rodapé contém "não é afiliada à Anthropic"; com JS desligado, `#topo h1` é visível; em 390px, clicar `.nav-toggle` abre o menu e clicar num link fecha (`aria-expanded="false"`). Salva screenshots em `tests/shots/`.
- [ ] **Step 2: Rodar** `node tests/check.js` → FAIL (index.html inexistente).
- [ ] **Step 3: Implementar** header fixo (logo, nav âncora, `.nav-toggle`, CTA), hero (h1 "Seu escritório inteiro trabalhando por você.", subtítulo do spec, CTA WhatsApp, "Ver como funciona" → `#um-dia`, selo "Vagas de implantação limitadas por mês", mock de tela do Claude com 3 linhas de status), tokens CSS, `script.js`.
- [ ] **Step 4: Rodar** check → falhas restantes apenas de seções ainda não criadas.
- [ ] **Step 5: Commit** `feat: base, topo e hero`.

### Task 2: Seções de conteúdo (dor → como funciona)

**Files:** Modify `index.html`, `styles.css`

**Interfaces:** Consumes classes da Task 1.

- [ ] **Step 1: Implementar** `#dor` (lista de 5 dores do advogado solo), `#solucao` (3 pilares), `#um-dia` (linha do tempo 7h, 8h, 10h, 11h, 14h, 16h, 18h), `#equipe` (13 cards da tabela de agentes do spec), `#diferenciais` (5 itens do spec, incluindo "mais de 200 petições" e "nada é protocolado sem você"), `#volume`, `#como-funciona` (4 passos).
- [ ] **Step 2: Rodar** check → só faltam ids de fundador em diante, FAQ e rodapé.
- [ ] **Step 3: Commit** `feat: seções de conteúdo`.

### Task 3: Fundador, público, FAQ, CTA final, rodapé, SEO

**Files:** Modify `index.html`, `styles.css`, `script.js`

- [ ] **Step 1: Implementar** `#fundador`, `#para-quem` (duas colunas), `#faq` com 7 `<details>` (programar, preço, substitui advogado, sigilo/LGPD, assinar Claude, PJe/eProc, áreas), `#cta-final` com a frase do spec, rodapé com aviso Anthropic e ano, botão flutuante `.wa-float` (aria-label). `<head>`: meta description, Open Graph, JSON-LD `ProfessionalService`.
- [ ] **Step 2: Rodar** `node tests/check.js` → PASS completo.
- [ ] **Step 3: Commit** `feat: fundador, FAQ, CTA final e SEO`.

### Task 4: Revisão visual e prévia

**Files:** Create `tests/build-preview.js`, `dist/index.html`

- [ ] **Step 1: Ver screenshots** de `tests/shots/` (390 e 1440) e corrigir problemas visuais; rodar check → PASS.
- [ ] **Step 2: Gerar prévia** `node tests/build-preview.js` → `dist/index.html` com CSS/JS inline.
- [ ] **Step 3: Publicar** prévia privada via Artifact e enviar link.
- [ ] **Step 4: Commit** `chore: prévia e ajustes visuais`.
