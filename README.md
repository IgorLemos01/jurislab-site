# JurisLab: landing page

Página de apresentação da JurisLab: estrutura de agentes de IA no Claude para escritórios de advocacia (implantação, treinamento e atualização contínua). Todos os botões levam ao WhatsApp.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Conteúdo e estrutura da página |
| `styles.css` | Visual (cores, fontes, layout, celular) |
| `script.js` | Menu do celular e animações leves |
| `tests/check.js` | Verificação automática (links do WhatsApp, celular, contraste, menu) |
| `docs/` | Documento de design e plano de implementação |

## Publicar

Site estático, sem build. Basta servir `index.html`, `styles.css` e `script.js`.
No GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.

## Testar

```bash
node tests/check.js
```
