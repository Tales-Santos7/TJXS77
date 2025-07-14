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
    document.getElementById("titulo").textContent = produto.titulo || "Sem título";
    document.getElementById("descricao").textContent = produto.descricao || "";

    if (produto.infoTecnica) {
      document.getElementById("info-tecnica").innerHTML = Object.entries(produto.infoTecnica)
        .map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor}</li>`)
        .join("");
    }

    if (produto.funcionalidades && produto.funcionalidades.length > 0) {
      document.getElementById("funcionalidades").innerHTML =
        produto.funcionalidades.map((item) => `<li>✅ ${item}</li>`).join("");
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
