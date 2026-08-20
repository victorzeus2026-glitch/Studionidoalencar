# Estúdio Rosenildo Alencar — Landing Page

Landing page institucional premium, focada em conversão via WhatsApp.
HTML + CSS + JS puros, separados por pasta. Sem dependências, sem build, sem npm.

## Estrutura do projeto

```
estudio-rosenildo-alencar/
├── index.html        ← a landing page final (esta vai pro ar)
├── editor.html       ← mesma página com editor visual embutido
├── css/
│   ├── style.css     ← todo o estilo do site (design system, seções, animações, responsivo)
│   └── editor.css    ← estilo da camada de edição (só usado pelo editor.html)
├── js/
│   ├── config.js     ← ⚙ CONFIGURAÇÃO: WhatsApp, Instagram, mensagem padrão — edite AQUI
│   ├── main.js       ← interações da página (menu, animações, contadores, FAQ, WhatsApp)
│   └── editor.js     ← lógica do editor visual (só usado pelo editor.html)
└── img/              ← coloque aqui as fotos reais do profissional/estúdio
```

## Como rodar no VS Code

1. **File → Open Folder** e selecione a pasta `estudio-rosenildo-alencar`.
2. Jeito recomendado: instale a extensão **Live Server** (Ritwick Dey), clique com o
   botão direito em `index.html` → **Open with Live Server**. A página abre no navegador
   e recarrega sozinha a cada arquivo salvo.
3. Também funciona sem servidor: dê dois cliques no `index.html` direto no explorador
   de arquivos do sistema.

## ⚠ Configurar antes de publicar (obrigatório)

Abra `js/config.js`:

```js
var WHATSAPP_NUMBER = "5500000000000"; // ← 55 + DDD + número, só dígitos
var INSTAGRAM_URL   = "";              // ← ex.: "https://instagram.com/perfil"
```

Enquanto o número não for configurado, os botões mostram um aviso em vez de abrir
um WhatsApp errado — de propósito.

## Placeholders a substituir (busque por `[` no index.html)

- **Foto do hero** e **foto da seção Sobre** — cada bloco `photo-placeholder` tem um
  comentário `<!-- [PLACEHOLDER] ... -->` com a tag `<img>` pronta; salve as fotos em
  `img/` e aponte o `src`.
- **3 depoimentos reais** — seção "Quem cuida, recomenda".
- **Endereço completo** — na última resposta do FAQ e no footer.
- **og:image** — comentário no `<head>` para a imagem de compartilhamento em redes sociais.

Dica: o caminho mais rápido é abrir o `editor.html`, editar textos e fotos clicando
direto na página e usar **"Exportar página"** — o arquivo baixado é um HTML limpo e
autocontido, pronto pra substituir o conteúdo publicado.

## Mapa do código

- `css/style.css` começa com os **design tokens** (`:root`) — cores, tipografia, raios;
  mude ali para retematizar o site inteiro. Depois vem, na ordem da página: header,
  hero, stats, especialidades, benefícios, sobre, processo, depoimentos, CTA, FAQ,
  footer, e no final os breakpoints (1080/940/560) e `prefers-reduced-motion`.
- `js/main.js` está comentado por bloco: menu mobile, reveal on scroll, contadores,
  accordion do FAQ, marquee de depoimentos, parallax, botões magnéticos e cursor.
- Todos os botões de conversão usam `data-wa` + `data-wa-msg` e passam pela função
  central `openWhatsApp(mensagem)` definida em `js/config.js`.

## Publicação

Qualquer hospedagem estática serve — suba a pasta inteira mantendo a estrutura
(`index.html`, `css/`, `js/`, `img/`). Se for HostGator, envie via cPanel ou FTP.
