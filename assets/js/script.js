const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.querySelectorAll("span").forEach((line, index) => {
      if (isOpen) {
        if (index === 0) line.style.transform = "translateY(6px) rotate(45deg)";
        if (index === 1) line.style.opacity = "0";
        if (index === 2) line.style.transform = "translateY(-6px) rotate(-45deg)";
      } else {
        line.style.transform = "";
        line.style.opacity = "1";
      }
    });
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelectorAll("span").forEach((line) => {
        line.style.transform = "";
        line.style.opacity = "1";
      });
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target || 0);
      const duration = 1200;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        counter.textContent = `${value}+`;
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((item) => counterObserver.observe(item));

const statInlineCounters = document.querySelectorAll(".stat-inline");
const inlineCounterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target || 0);
      const duration = 1200;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        counter.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
      inlineCounterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

statInlineCounters.forEach((item) => inlineCounterObserver.observe(item));

const leadForm = document.querySelector(".lead-form");
const contactForm = document.querySelector(".contact-form");

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = leadForm.querySelector("button");
    const previousText = button.textContent;
    button.textContent = "Subscribed";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = previousText;
      button.disabled = false;
      leadForm.reset();
    }, 1800);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    const previousText = button.textContent;
    button.textContent = "Sent";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = previousText;
      button.disabled = false;
      contactForm.reset();
    }, 1800);
  });
}

const navLinks = document.querySelectorAll(".main-nav a");
const sections = [...document.querySelectorAll("main section[id], section[id]")];

const activateNavLink = () => {
  const scrollY = window.scrollY + 130;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
};

window.addEventListener("scroll", activateNavLink);
activateNavLink();

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) faq.removeAttribute("open");
    });
  });
});

const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}