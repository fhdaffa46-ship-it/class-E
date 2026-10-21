const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu after choosing a section
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
      menuToggle.textContent = "☰";
    });
  });
}

// Light and dark theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");

    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Aktifkan tema gelap" : "Aktifkan tema terang"
    );
  });
}

// Automatic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Reveal elements as they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Automatic photo slider - change every 3 seconds
const photos = [
  "/images/daffa.jpeg",
  "/images/fotbar.jpeg",
  "/images/foto3.jpeg",
  "/images/foto4.jpeg"
];

const memorySlider = document.getElementById("memorySlider");

if (memorySlider && photos.length > 1) {
  let currentPhoto = 0;

  // Preload photos to make transitions smoother
  photos.forEach((photo) => {
    const img = new Image();
    img.src = photo;
  });

  setInterval(() => {
    currentPhoto = (currentPhoto + 1) % photos.length;

    memorySlider.style.opacity = "0";

    setTimeout(() => {
      memorySlider.src = photos[currentPhoto];
      memorySlider.style.opacity = "1";
    }, 300);
  }, 3000);
}

