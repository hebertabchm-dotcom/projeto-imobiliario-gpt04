document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navBackdrop = document.querySelector(".nav-backdrop");
  const body = document.body;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const setHeaderState = () => {
    if (!header) {
      return;
    }
    header.classList.toggle("header-scrolled", window.scrollY > 20);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const setNavOpen = (open) => {
    if (!header) {
      return;
    }
    header.classList.toggle("nav-open", open);
    body.classList.toggle("nav-open", open);
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(open));
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = header && header.classList.contains("nav-open");
      setNavOpen(!isOpen);
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => setNavOpen(false));
  }

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavOpen(false);
    }
  });

  const revealTargets = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  } else if (revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  const heroImage = document.querySelector(".hero-bg img");
  if (heroImage && !prefersReducedMotion) {
    let ticking = false;

    const updateParallax = () => {
      const offset = window.pageYOffset * 0.25;
      heroImage.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
  }

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = newsletterForm.querySelector("input");
      const button = newsletterForm.querySelector("button");

      if (!input || !button) {
        return;
      }

      const value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }

      const defaultIcon = button.innerHTML;
      button.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>';
      button.style.background = "#3f7d45";
      button.setAttribute("aria-label", "Enviado");

      input.value = "Obrigado!";
      input.disabled = true;

      window.setTimeout(() => {
        button.innerHTML = defaultIcon;
        button.style.removeProperty("background");
        button.setAttribute("aria-label", "Enviar");
        input.value = "";
        input.disabled = false;
      }, 2500);
    });
  }
});
