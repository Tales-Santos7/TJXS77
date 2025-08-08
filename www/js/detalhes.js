const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  document.querySelector(".botao-voltar").href = `loja.html?popupId=${id}`;
}

fetch("./www/js/produtos.json")
  .then((res) => res.json())
  .then((produtos) => {
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
      document.querySelector(".detalhes-produto").style.display = "none";
      document.getElementById("erro").style.display = "block";
      return;
    }

    // Preenche os dados do produto
    document.getElementById("titulo").textContent =
      produto.titulo || "Sem título";
    document.getElementById("descricao").textContent = produto.descricao || "";
    document.getElementById("LinkDemo").href = produto.LinkDemo || "#";
    document.getElementById("DemoPainel").href = produto.DemoPainel || "#";

    if (!produto.LinkDemo)
      document.getElementById("LinkDemo").style.display = "none";
    if (!produto.DemoPainel)
      document.getElementById("DemoPainel").style.display = "none";

    if (produto.faq?.length > 0) {
      document.getElementById("faq").innerHTML = produto.faq
        .map(
          (q) => `
        <div class="faq-item">
          <button class="faq-question">
            ${q.pergunta}
            <span class="arrow">&#9662;</span>
          </button>
          <div class="faq-answer">
            <p>${q.resposta}</p>
          </div>
        </div>`
        )
        .join("");

      document.querySelectorAll(".faq-question").forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.classList.toggle("active");
          const answer = btn.nextElementSibling;
          answer.style.maxHeight = answer.style.maxHeight
            ? null
            : answer.scrollHeight + "px";
        });
      });
    }

    if (produto.screenshots) {
      document.getElementById("screenshots").innerHTML = produto.screenshots
        .map((src) => `<img src="${src}" alt="screenshot" class="screenshot">`)
        .join("");
    }

    if (produto.screenshots?.length > 0) {
      document.getElementById("screenshots").innerHTML = produto.screenshots
        .map((src) => `<img src="${src}" alt="screenshot" class="screenshot">`)
        .join("");
    }

    if (produto.infoTecnica) {
      document.getElementById("info-tecnica").innerHTML = Object.entries(
        produto.infoTecnica
      )
        .map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor}</li>`)
        .join("");
    }

    if (produto.funcionalidades && produto.funcionalidades.length > 0) {
      document.getElementById("funcionalidades").innerHTML =
        produto.funcionalidades.map((item) => `<li>${item}</li>`).join("");
    }

    if (produto.tecnologias && produto.tecnologias.length > 0) {
      document.getElementById("tecnologias").innerHTML = produto.tecnologias
        .map(
          (tec) =>
            `<img src="${tec.icone}" title="${tec.nome}" alt="${tec.nome}" loading="lazy">`
        )
        .join("");
    }

    if (produto.video) {
      document.getElementById("video").innerHTML = `
        <video controls autoplay muted loop>
          <source src="${produto.video}" type="video/mp4">
          Seu navegador não suporta vídeos HTML5.
        </video>
      `;
    }

    if (produto.notaAutor) {
      document.getElementById("nota-autor").textContent = produto.notaAutor;
    }
  })
  .catch((erro) => {
    console.error("Erro ao carregar dados do produto:", erro);
    document.querySelector(".detalhes-produto").style.display = "none";
    const erroDiv = document.getElementById("erro");
    erroDiv.innerHTML = `
      <h2>Erro ao carregar informações 😢</h2>
      <p>Verifique sua conexão ou tente novamente mais tarde.</p>
      <a href="javascript:history.back()" class="botao-voltar">← Voltar</a>
    `;
    erroDiv.style.display = "block";
  });
