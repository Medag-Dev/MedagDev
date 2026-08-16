/* =========================================================
   MEDAGDEV — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ================= ELEMENTS ================= */

  const body = document.body;

  const menuBtn = document.getElementById("menuBtn");

  const navMenu = document.getElementById("navMenu");

  const themeBtn = document.getElementById("themeBtn");

  const backTop = document.getElementById("backTop");

  const contactForm = document.getElementById("contactForm");

  const navLinks = document.querySelectorAll(".nav-link");

  const sections = document.querySelectorAll("main section");

  /* =========================================================
     DARK MODE
     ========================================================= */

  function updateThemeIcon() {
    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    if (!icon) return;

    const isDark = body.classList.contains("dark");

    if (isDark) {
      icon.className = "fa-solid fa-sun";

      themeBtn.setAttribute("aria-label", "Activer le mode clair");

      themeBtn.setAttribute("title", "Mode clair");
    } else {
      icon.className = "fa-solid fa-moon";

      themeBtn.setAttribute("aria-label", "Activer le mode sombre");

      themeBtn.setAttribute("title", "Mode sombre");
    }
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }

    updateThemeIcon();
  }

  loadTheme();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark");

      localStorage.setItem("theme", isDark ? "dark" : "light");

      updateThemeIcon();
    });
  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  function closeMenu() {
    if (!navMenu) return;

    navMenu.classList.remove("open");

    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = "fa-solid fa-bars";
      }
    }
  }

  function toggleMenu() {
    if (!navMenu || !menuBtn) return;

    const isOpen = navMenu.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));

    const icon = menuBtn.querySelector("i");

    if (icon) {
      icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  }

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      toggleMenu();
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =========================================================
     BACK TO TOP
     ========================================================= */

  function updateBackTop() {
    if (!backTop) return;

    if (window.scrollY > 500) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  }

  if (backTop) {
    window.addEventListener("scroll", updateBackTop, { passive: true });

    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    updateBackTop();
  }

  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 200;

    let currentId = "";

    sections.forEach((section) => {
      const top = section.offsetTop;

      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  if (sections.length) {
    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  /* =========================================================
     SMOOTH ANCHORS
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const animatedElements = document.querySelectorAll(`
      .about-card,
      .skill-feature,
      .skill-category,
      .service-card,
      .project-card,
      .contact-container
    `);

  animatedElements.forEach((element) => {
    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition = "opacity .7s ease, transform .7s ease";
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.style.opacity = "1";

      element.style.transform = "translateY(0)";
    });
  }

  /* =========================================================
     CONTACT FORM
     ========================================================= */

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");

      const emailInput = document.getElementById("email");

      const subjectInput = document.getElementById("subject");

      const messageInput = document.getElementById("message");

      if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        alert("Une erreur est survenue avec le formulaire.");

        return;
      }

      const name = nameInput.value.trim();

      const email = emailInput.value.trim();

      const subject = subjectInput.value.trim();

      const message = messageInput.value.trim();

      /* Vérification des champs */

      if (!name || !email || !subject || !message) {
        alert("Veuillez remplir tous les champs.");

        return;
      }

      /* Vérification de l'e-mail */

      if (!emailInput.checkValidity()) {
        alert("Veuillez entrer une adresse e-mail valide.");

        emailInput.focus();

        return;
      }

      /* =====================================================
           PREPARATION DE L'EMAIL
           ===================================================== */

      const emailBody =
        `Nom : ${name}\n` + `Email : ${email}\n\n` + `Message :\n${message}`;

      /* =====================================================
           OUVERTURE DE LA BOITE MAIL
           ===================================================== */

      const mailto =
        `mailto:medagdev@outlook.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(emailBody)}`;

      window.location.href = mailto;
    });
  }

  /* =========================================================
     RESIZE
     ========================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMenu();
    }
  });

  /* =========================================================
     REDUCED MOTION
     ========================================================= */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    document.documentElement.style.scrollBehavior = "auto";
  }
});
