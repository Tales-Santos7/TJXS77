// =========================== MENU MOBILE ============================
document.getElementById("toggleAjuda").addEventListener("click", (e) => {
  e.stopPropagation();
  const box = document.getElementById("ajudaBox");
  box.classList.toggle("hidden");
});

document.getElementById("popupAjudaBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("popupAjudaBox").classList.toggle("hidden");
});

// Fecha ao clicar fora
document.addEventListener("click", (e) => {
  const ajudaBox = document.getElementById("ajudaBox");
  const toggleBtn = document.getElementById("toggleAjuda");
  if (!ajudaBox.contains(e.target) && !toggleBtn.contains(e.target)) {
    ajudaBox.classList.add("hidden");
  }

  const popupBox = document.getElementById("popupAjudaBox");
  const popupBtn = document.getElementById("popupAjudaBtn");
  if (!popupBox.contains(e.target) && !popupBtn.contains(e.target)) {
    popupBox.classList.add("hidden");
  }
});

// =========================== FUNCÕES PARA ABRIR O POPUP ============================
function openPopup(
  title,
  imgSrc,
  description,
  demoLink,
  iconsHTML,
  price,
  nome,
  email,
  telefone,
  taxId,
  paymentLink,
  productId,
  arquivo,
  amount,
  panelLink,
  detalheLink
) {
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupImage").src = imgSrc;
  document.getElementById("popupDescription").textContent = description;

  // // Corrigido os IDs aqui:
  // document.getElementById("popupDemoLink").href = demoLink || "#";
  // document.getElementById("popupPanelLink").href = panelLink || "#";
  document.getElementById(
    "popupdetalheLink"
  ).href = `detalhes.html?id=${productId}&from=popup`;

  document.getElementById("popupIcons").innerHTML = iconsHTML;
  document.getElementById(
    "price"
  ).innerHTML = `<span class="text-yellow-400 font-bold text-lg ml-auto">R$ ${(
    amount / 100
  )
    .toFixed(2)
    .replace(".", ",")}</span>`;

  document.getElementById("customerNome").value = nome || "";
  document.getElementById("customerEmail").value = email || "";
  document.getElementById("customerTelefone").value = telefone || "";
  document.getElementById("customerTaxId").value = taxId || "";

  window.selectedProductId = productId;
  window.selectedProductName = title;
  window.selectedProductFile = arquivo;
  window.selectedProductAmount = amount;

  document.getElementById("popup").classList.add("active");
}

function createInvoice() {
  const nome = document.getElementById("customerNome").value;
  const email = document.getElementById("customerEmail").value;
  const telefone = document.getElementById("customerTelefone").value;
  const taxId = document.getElementById("customerTaxId").value;

  if (!email || !telefone || !taxId || !nome) {
    alert("Por favor, preencha todos os dados.");
    return;
  }

  fetch("https://tales-santos-backend-chb9.onrender.com/criar-fatura", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productName: window.selectedProductName,
      amount: parseInt(window.selectedProductAmount),
      nome,
      email,
      telefone,
      taxId,
      arquivo: window.selectedProductFile,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta da API:", data);
      if (!data.url) {
        alert("Erro: o link de pagamento não foi retornado corretamente.");
        return;
      }
      window.location.href = data.url;
    })
    .catch((error) => {
      if (error.response) {
        console.error("Erro ao criar fatura (response):", error.response.data);
      } else if (error.request) {
        console.error("Erro ao criar fatura (request):", error.request);
      } else {
        console.error("Erro ao criar fatura (outro):", error.message);
      }
      alert(
        "Erro ao processar o pagamento. Verifica o console para mais detalhes."
      );
    });
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");

  const url = new URL(window.location);
  url.searchParams.delete("popupId");
  window.history.replaceState({}, document.title, url);
}

AOS.init();

// =========================== CATEGORIAS E FILTRO ============================
const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".template-card");

function filtrarCards(filter) {
  cards.forEach((card) => {
    if (filter === "todos") {
      card.style.display = "flex";
    } else {
      card.style.display = card.classList.contains(filter) ? "flex" : "none";
    }
  });
}

// Evento de clique nas categorias
categories.forEach((category) => {
  category.addEventListener("click", () => {
    const filter = category.dataset.filter;
    filtrarCards(filter);

    // Remove active e aplica active
    categories.forEach((c) => c.classList.remove("active"));
    category.classList.add("active");

    // Salva no localStorage
    localStorage.setItem("categoriaSelecionada", filter);
  });
});

// No carregamento da página, lê a categoria salva e aplica o filtro + active
const categoriaSalva = localStorage.getItem("categoriaSelecionada") || "todos";
categories.forEach((category) => {
  category.classList.remove("active");
  if (category.dataset.filter === categoriaSalva) {
    category.classList.add("active");
  }
});

// Aplica filtro baseado na categoria salva
filtrarCards(categoriaSalva);

// =========================== ANIMAÇÃO DE ENTRADA ============================
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".outros-elementos").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      x: -100, // Vem da esquerda
      y: 20, // Sobe um pouco ao aparecer
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
});
