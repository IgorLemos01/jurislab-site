# JurisLab — Landing Page — Documento de Design

Data: 2026-11-09
Responsável: Yuri Nascimento Costa

## 1. Objetivo

Gerar contatos qualificados de advogados interessados na JurisLab, levando-os ao WhatsApp para entrar na **lista de espera** das implantações. Não há preço publicado: cada escritório recebe proposta personalizada após diagnóstico.

**Sucesso =** o visitante entende em menos de 10 segundos o que a JurisLab faz, confia em quem está por trás e clica no WhatsApp.

## 2. O produto (o que a página vende)

A JurisLab une Direito e IA para facilitar o trabalho do advogado. É um **serviço**, não um software próprio — roda no Claude, que o advogado assina. Três pilares:

1. **Implantação** — monta a estrutura do escritório no Claude, adaptada às áreas de atuação, ao estilo de escrita e aos sistemas do cliente.
2. **Treinamento** — ensina o advogado e a equipe a usar.
3. **Atualização contínua** — atualizações periódicas (jurisprudência, teses, melhorias nos agentes).

### Agentes entregues (pacote completo, personalizado por escritório)

| Agente | O que faz |
|---|---|
| Gestão | Lê intimações no e-mail e no Advise, analisa processos no PJe/eProc (método FIRAC), separa prazos, monta a fila do dia e distribui aos especialistas |
| Previdenciário | BPC/LOAS, incapacidade, aposentadorias, pensão, segurado especial; iniciais, recursos no JEF, TRF, TNU, STJ, CRPS |
| Cível | Consumidor (bancos, concessionárias, aéreas), família, sucessões, inventário, execução |
| Penal | Habeas corpus, prisão, resposta à acusação, memoriais, recursos, júri, execução penal |
| Trabalhista | Pré-atendimento: verbas rescisórias, vínculo, cálculo estimado, repasse do caso |
| Cálculos previdenciários | Atrasados, valor da causa, RMI, limite do JEF, RPV/precatório, destaque de honorários |
| Preparo de audiência | Roteiro de perguntas, orientação ao cliente e testemunhas, checklist do dia |
| Revisor independente | Revisa toda minuta: fatos e números, jurisprudência e lei, requisitos, processual, erros recorrentes, advogado do diabo |
| Estilo de petições | Escreve no padrão do advogado, aprendido a partir das peças dele |
| Jurisprudência | Boletim semanal, atualização mensal por área, consolidação trimestral de teses |
| Financeiro | Honorários, projeção de caixa, régua de cobrança, conciliação de extrato |
| Marketing | Pílulas, roteiros, carrosséis, calendário de posts, conforme regras da OAB |
| Painel do escritório | Casos ativos, prazos, minutas aguardando revisão |

## 3. Público

- **Principal:** advogado solo e escritório pequeno (1 a 5 advogados). Dor: faz tudo sozinho — prazos, peças, cobrança, Instagram.
- **Reforço:** advocacia de volume (previdenciário, consumidor). Dor: muito caso, margem baixa. Promessa: mais casos com o mesmo time.

## 4. Conversão

- Todos os CTAs abrem `https://wa.me/5579991227741?text=...` com a mensagem:
  "Olá! Vim pelo site e quero entrar na lista de espera da JurisLab."
- Mensagem de escassez: "Vagas de implantação limitadas por mês" (verdadeira: cada implantação é feita sob medida).
- Botão flutuante do WhatsApp sempre visível.

## 5. Prova e credibilidade

- Fundador: **Yuri Nascimento Costa, advogado, OAB/SE** (número a completar).
- Caso real: estrutura nasceu e roda no **Menezes Lima Nascimento Advogados**.
- Número autorizado: estilo treinado com **mais de 200 petições**.
- **Sem depoimentos** (não existem ainda) — nenhum depoimento ou número inventado. A seção "Um dia com a JurisLab" faz o papel de demonstração.

## 6. Estrutura da página (ordem)

1. Topo fixo — logo, menu âncora, botão "Entrar na lista de espera"
2. Hero — "Seu escritório inteiro trabalhando por você." + subtítulo + CTA WhatsApp + "Ver como funciona" + selo de vagas limitadas + mock da tela do Claude trabalhando
3. A dor — "Você não estudou Direito para passar o dia caçando intimação, formatando petição e cobrando cliente."
4. A solução — o que é a JurisLab, 3 pilares
5. Um dia com a JurisLab — linha do tempo (7h intimações lidas → 8h fila do dia → 10h minuta redigida e revisada → … → 18h painel)
6. Sua nova equipe — cards dos agentes
7. Diferenciais — seu estilo (200+ petições), revisor independente, jurisprudência sempre atual, você no controle (nada protocolado sem você), marketing dentro das regras da OAB
8. Advocacia de volume — "Atenda mais casos com o mesmo time."
9. Como funciona — Diagnóstico → Implantação sob medida → Treinamento → Atualizações periódicas
10. Quem criou — Yuri e o escritório: "Não nasceu num laboratório de tecnologia. Nasceu dentro de um escritório real."
11. Para quem é / para quem não é
12. FAQ — programar? preço? substitui o advogado? sigilo dos dados? preciso assinar o Claude? PJe/eProc? quais áreas?
13. CTA final — "Enquanto você lê esta página, há uma intimação esperando por você. Deixe a JurisLab cuidar disso."
14. Rodapé — contato, aviso: "Claude é marca da Anthropic. A JurisLab não é afiliada à Anthropic."

## 7. Tom de voz

- De advogado para advogado; vocabulário do dia a dia jurídico.
- Promete tempo e organização, **nunca resultado de processo**. Nunca diz que a IA substitui o advogado — "você continua no comando".
- Frases curtas, urgência real, sem jargão de startup.
- Sigilo: falar com honestidade (dados ficam na conta do próprio advogado; orientação sobre boas práticas e LGPD), sem prometer certificações inexistentes.

## 8. Identidade visual

| Token | Cor |
|---|---|
| Azul-marinho (fundo escuro) | `#0B1B33` |
| Dourado (destaques) | `#C9A45C` |
| Verde-água (tecnologia) | `#2EC4B6` |
| Marfim (seções claras) | `#F7F5F0` |
| Verde WhatsApp (botões) | `#25D366` |

- Títulos: Playfair Display. Texto: Inter (Google Fonts).
- Seções alternando escuro e claro; ícones de linha finos (SVG inline); animações leves ao rolar (respeitando `prefers-reduced-motion`).
- Mobile first; sem rolagem horizontal; botões com área de toque ≥ 44px.

## 9. Técnica

- Página única: `index.html` + `styles.css` + `script.js`, sem framework e sem build.
- Hospedável em qualquer servidor estático (Hostinger, Netlify, Vercel, GitHub Pages).
- SEO básico: title, meta description, Open Graph, JSON-LD (Organization/ProfessionalService), HTML semântico.
- Acessibilidade: contraste AA, foco visível, textos alternativos, FAQ com `<details>`.
- Prévia privada publicada como Artifact para revisão do Yuri.

## 10. Verificação

- Screenshot em largura de celular (390px) e desktop (1440px) com Playwright.
- Conferir que todos os links do WhatsApp apontam para o número e mensagem corretos.
- Conferir ausência de rolagem horizontal e erros no console.

## 11. Fora do escopo

Preços, formulário/CRM, depoimentos, blog, múltiplas páginas, domínio e hospedagem final.
