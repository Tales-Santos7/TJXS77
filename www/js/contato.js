document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("toggle"); // Definindo o menuToggle
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = dropdown.querySelector(".dropdown-content");

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation(); // Impede a propagação
    dropdownContent.classList.toggle("active");
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", function (event) {
    if (
      !menuToggle.contains(event.target) &&
      !dropdownContent.contains(event.target)
    ) {
      dropdownContent.classList.remove("active");
    }
  });
});

//Animação da pagina
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

//Formulario de contato
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o redirecionamento

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = document.getElementById("submit-button");
    const messageElement = document.getElementById("form-message");

    submitButton.innerText = "Enviando...";
    submitButton.disabled = true;

    fetch("https://formsubmit.co/12011372cbe76b6531bd5e7eca80a17e", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        messageElement.innerText = "Mensagem enviada com sucesso!";
        messageElement.classList.remove("hidden");
        messageElement.classList.add("success-message");
        form.reset();
      })
      .catch((error) => {
        messageElement.innerText = "Mensagem enviada com sucesso!";
        messageElement.classList.remove("hidden");
        messageElement.classList.add("success-message");
      })
      .finally(() => {
        submitButton.innerText = "Enviar Mensagem";
        submitButton.disabled = false;
      });
  });
