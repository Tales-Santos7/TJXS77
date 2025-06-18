document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const hamburger = menuToggle.querySelector("input");

  // Evento para abrir/fechar o menu
  menuToggle.addEventListener("click", function () {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      hamburger.checked = false; // Desmarca o checkbox
    } else {
      menu.classList.add("open");
      hamburger.checked = true; // Marca o checkbox
    }
  });

  // Evento para fechar o menu ao clicar em um link
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      hamburger.checked = false; // Desmarca o checkbox
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("toggle");
  const dropdownContent = document.querySelector(".dropdown-content");

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation(); // Impede que o evento de clique fora feche imediatamente
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


//Menu mobile
document.querySelector(".dropbtn").addEventListener("click", function (event) {
  event.preventDefault(); // Evita comportamento padrão do link
  const dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.classList.toggle("active"); // Adiciona ou remove a classe 'active'
});

// Fecha o menu ao clicar fora
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (!dropdown.contains(event.target)) {
    dropdownContent.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("toggle");
  const dropdownContent = document.querySelector(".dropdown-content");

  menuToggle.addEventListener("click", function (event) {
      event.preventDefault(); // Impede o comportamento padrão do link
      event.stopPropagation(); // Evita o fechamento imediato ao clicar no botão

      dropdownContent.classList.toggle("active");
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", function (event) {
      if (!menuToggle.contains(event.target) && !dropdownContent.contains(event.target)) {
          dropdownContent.classList.remove("active");
      }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   gsap.fromTo("body", { x: "-100%" }, { x: "0%", duration: 1 });

//   document.querySelectorAll("a").forEach(link => {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
//       const destino = this.href;

//       gsap.to("body", { x: "100%", duration: 1, onComplete: () => {
//         window.location.href = destino;
//       }});
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".outros-elementos").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      x: -100, // Vem da esquerda
      y: 20,   // Sobe um pouco ao aparecer
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%", 
        toggleActions: "play none none none",
      }
    });
  });
});

const tituloTexto = "Desenvolvedor Web";
let index = 0;
let apagando = false;

function escreverTitulo() {
    document.getElementById("texto").innerHTML = tituloTexto.substring(0, index);

    if (!apagando) {
        if (index < tituloTexto.length) {
            index++;
            setTimeout(escreverTitulo, 150);
        } else {
            setTimeout(() => { apagando = true; apagarTitulo(); }, 2000);
        }
    }
}

function apagarTitulo() {
    document.getElementById("texto").innerHTML = tituloTexto.substring(0, index);

    if (apagando) {
        if (index > 0) {
            index--;
            setTimeout(apagarTitulo, 130);
        } else {
            apagando = false;
            setTimeout(escreverTitulo, 1000);
        }
    }
}

escreverTitulo();

// SEÇÃO DE PERGUNTAS FREQUENTES
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');

    if (item.classList.contains('open')) {
      // FECHAR com animação suave
      answer.style.maxHeight = answer.scrollHeight + "px"; // Primeiro definimos altura atual
      setTimeout(() => {
        answer.style.maxHeight = "0px"; // Depois de 10ms começamos a fechar
      });
      
      // Só removemos a classe 'open' DEPOIS da animação terminar
      setTimeout(() => {
        item.classList.remove('open');
      }); // mesmo tempo do transition no CSS
    } else {
      // ABRIR com animação suave
      item.classList.add('open'); // Primeiro já marcamos como aberto
      answer.style.maxHeight = answer.scrollHeight + "px"; // E definimos a altura necessária
    }
  });
});
