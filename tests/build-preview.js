// Gera dist/index.html: página única com CSS e JS embutidos, sem doctype/html/head/body
// (o publicador de Artifacts adiciona o esqueleto). Uso: node tests/build-preview.js
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charset="utf-8">\s*/, '')
  .replace(/<meta name="viewport"[^>]*>\s*/, '')
  .replace('<link rel="stylesheet" href="styles.css">', () => `<style>\n${css}\n</style>`);
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1]
  .replace('<script src="script.js"></script>', () => `<script>\n${js}\n</script>`);

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'index.html'), head.trim() + '\n' + body.trim() + '\n');
console.log('dist/index.html gerado');
