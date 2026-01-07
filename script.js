document.addEventListener("DOMContentLoaded", () => {
  // Efeito de scroll no header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(26, 24, 23, 0.95)";
      header.style.padding = "15px 0";
      header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
    } else {
      header.style.background =
        "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)";
      header.style.padding = "30px 0";
      header.style.boxShadow = "none";
    }
  });

  // Animação de entrada ao scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar animação aos cards e itens de estatística
  const animatedElements = document.querySelectorAll(
    ".solution-card, .stat-item, .stats-image"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    observer.observe(el);
  });

  // Efeito de parallax suave no hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector(".hero-bg img");
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Clique no botão de explorar
  const exploreBtn = document.querySelector(".floating-explore");
  exploreBtn.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });

  // Interação da Newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      const button = newsletterForm.querySelector("button");

      if (input.value) {
        button.innerHTML = "✓";
        button.style.background = "#4CAF50";
        input.value = "Obrigado!";
        input.disabled = true;

        setTimeout(() => {
          button.innerHTML =
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
          button.style.background = "var(--accent)";
          input.value = "";
          input.disabled = false;
        }, 3000);
      }
    });
  }

  // Animação suave para links do footer
  const footerLinks = document.querySelectorAll(
    ".footer-links a, .footer-legal a"
  );
  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.letterSpacing = "1px";
    });
    link.addEventListener("mouseleave", () => {
      link.style.letterSpacing = "0";
    });
  });
});
