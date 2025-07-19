window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const popupId = params.get("popupId");

  if (popupId) {
    const produto = {
      "pagina-links": {
        title: "Página de links",
        imgSrc: "./www/img/img_projetos/linktree.mp4",
        description:
          "Template moderno e funcional para criadores de conteúdo...",
        demo: "https://demo-pagina-de-links.vercel.app/",
        iconsHTML:
          '<img title="JavaScript" src="https://skillicons.dev/icons?i=javascript" class="icons">' +
          '<img title="NodeJS" src="https://skillicons.dev/icons?i=nodejs" class="icons">' +
          '<img title="MongoDB" src="https://skillicons.dev/icons?i=mongo" class="icons">' +
          '<img title="CSS" src="https://skillicons.dev/icons?i=css" class="icons">' +
          '<img title="HTML" src="https://skillicons.dev/icons?i=html" class="icons">',
        painel: "https://demo-painel-pagina-de-links.vercel.app/",
        detalhe: `detalhes.html?id=pagina-links&from=popup`,
        arquivo: "/downloads/pagina-links.zip",
        preco: 25000,
      },
      "portfolio-digital": {
        title: "Portfólio Digital",
        imgSrc: "./www/img/img_projetos/portfolio-digital.mp4",
        description:
          "Template para influenciadoras digitais com painel de controle...",
        demo: "https://demo-portfolio-digital.vercel.app/",
        iconsHTML:
          '<img title="JavaScript" src="https://skillicons.dev/icons?i=javascript" class="icons">' +
          '<img title="NodeJS" src="https://skillicons.dev/icons?i=nodejs" class="icons">' +
          '<img title="MongoDB" src="https://skillicons.dev/icons?i=mongo" class="icons">' +
          '<img title="CSS" src="https://skillicons.dev/icons?i=css" class="icons">' +
          '<img title="HTML" src="https://skillicons.dev/icons?i=html" class="icons">',
        painel: "https://demo-painel-portfolio-digital.vercel.app/",
        detalhe: `detalhes.html?id=portfolio-digital&from=popup`,
        arquivo: "/downloads/portfolio-digital.zip",
        preco: 40000,
      },
      
      // outros produtos aqui...
    };

    const p = produto[popupId];
    if (p) {
      openPopup(
        p.title,
        p.imgSrc,
        p.description,
        p.demo,
        p.iconsHTML,
        "",
        "",
        "",
        "",
        "",
        "",
        popupId,
        p.arquivo,
        p.preco,
        p.painel,
        p.detalhe
      );
    }
  }
});