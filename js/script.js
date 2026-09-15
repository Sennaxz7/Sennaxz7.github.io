const projectsData = {
  unibus: {
    title: "UNIBUS — Mobilidade Acadêmica",
    category: "Mobilidade Acadêmica / Node.js & PostgreSQL",
    desc: "Sistema voltado à mobilidade acadêmica, desenvolvido como projeto para auxiliar estudantes no acompanhamento e organização das rotas de transporte universitário. A API fornece endpoints para registro de veículos, horários programados, paradas principais e notificações de alteração de itinerário.",
    stack: [
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST Architecture",
    ],
    extra:
      "Destaque: Otimização de consultas para cálculo de aproximação de horários e padronização JSON REST para consumo mobile.",
    repo: "https://github.com/Sennaxz7",
  },
  chamados: {
    title: "Sistema de Controle de Chamados",
    category: "API REST Empresarial / Java 17 & Spring Boot 3",
    desc: "API REST corporativa completa desenvolvida para gerenciamento de chamados de suporte técnico. Implementa autenticação e autorização por tokens JWT, controle de acesso baseado em roles (Admin/Técnico/Cliente), CRUD completo com paginação, validações robustas com Jakarta Validation, arquitetura de camadas com DTOs e mapeamento relacional avançado com JPA/Hibernate conectado ao banco de dados PostgreSQL.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Spring Data JPA",
      "PostgreSQL",
      "JWT",
      "Spring Security",
      "Maven",
    ],
    extra:
      "Destaque: Tratamento global de exceções via @ControllerAdvice com retorno de payloads padronizados RFC 7807 e testes de persistência com rollback.",
    repo: "https://github.com/Sennaxz7/projeto-final-unidade-controle-chamados",
  },
  tcc: {
    title: "Sistema Web de Acompanhamento de Entregas",
    category: "Projeto de Conclusão de Curso (TCC) / 2026",
    desc: "Projeto de TCC voltado ao desenvolvimento de um sistema web para acompanhamento e gerenciamento de entregas voltado especificamente para pequenas empresas e e-commerces regionais. Focado em visibilidade operacional, despacho ágil e automação de alertas para clientes finais.",
    stack: [
      "Planejamento Backend",
      "Modelagem ER",
      "PostgreSQL",
      "APIs REST",
      "Metodologias Ágeis",
      "Scrum",
    ],
    extra:
      "Fase Atual: Estruturação dos diagramas de entidade-relacionamento (DER), definição dos contratos Swagger/OpenAPI e backlog de sprints.",
    repo: "https://github.com/Sennaxz7",
  },
};

// 1. Filtragem de Projetos
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active", "bg-primary-container", "text-white");
      btn.classList.add("text-on-surface-variant");
    });
    button.classList.add("active", "bg-primary-container", "text-white");
    button.classList.remove("text-on-surface-variant");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// 2. Modal Interativo com DOM Real
const modal = document.getElementById("project-modal");
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDesc = document.getElementById("modal-desc");
const modalTechList = document.getElementById("modal-tech-list");
const modalExtraInfo = document.getElementById("modal-extra-info");
const modalRepoLink = document.getElementById("modal-repo-link");

const openModal = (projectId) => {
  const data = projectsData[projectId];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalCategory.textContent = data.category;
  modalDesc.textContent = data.desc;
  modalExtraInfo.textContent = data.extra;
  modalRepoLink.setAttribute("href", data.repo);

  modalTechList.innerHTML = "";
  data.stack.forEach((tech) => {
    const tag = document.createElement("span");
    tag.className =
      "px-2.5 py-1 rounded bg-surface-container-lowest text-primary font-code-mono text-[12px] font-semibold";
    tag.textContent = tech;
    modalTechList.appendChild(tag);
  });

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
};

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const proj = btn.getAttribute("data-project");
    openModal(proj);
  });
});

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// 3. Botão Copiar E-mail
const copyBtn = document.getElementById("copy-email-btn");
const copyText = document.getElementById("copy-text");
const emailToCopy = "mateussantos192007@gmail.com";

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(emailToCopy)
      .then(() => {
        copyText.textContent = "E-mail copiado!";
        copyBtn.classList.add("bg-emerald-600");
        setTimeout(() => {
          copyText.textContent = "Copiar E-mail";
          copyBtn.classList.remove("bg-emerald-600");
        }, 2000);
      })
      .catch(() => {
        copyText.textContent = "Erro ao copiar";
      });
  });
}

// 4. Validação de Formulário com Vanilla JS
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("form-name");
const emailInput = document.getElementById("form-email");
const messageInput = document.getElementById("form-message");
const successBanner = document.getElementById("form-success-banner");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validação Nome
    if (!nameInput.value.trim()) {
      document.getElementById("name-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("name-error").classList.add("hidden");
    }

    // Validação E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById("email-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("email-error").classList.add("hidden");
    }

    // Validação Mensagem
    if (!messageInput.value.trim()) {
      document.getElementById("message-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("message-error").classList.add("hidden");
    }

    if (isValid) {
      successBanner.classList.remove("hidden");
      contactForm.reset();
      setTimeout(() => {
        successBanner.classList.add("hidden");
      }, 5000);
    }
  });
}
