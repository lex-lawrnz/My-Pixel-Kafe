/* ================= REVEAL ON SCROLL ================= */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerPoint = window.innerHeight - 100;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerPoint) {
      element.classList.add("active");
    }
  });
}


/* ================= HOVER PLAY VIDEOS ================= */
function setupHoverVideo(videoSelector, hoverSelector) {
  const videos = document.querySelectorAll(videoSelector);

  videos.forEach((video) => {
    const hoverArea = video.closest(hoverSelector);

    if (!hoverArea) return;

    hoverArea.addEventListener("mouseenter", () => {
      video.play();
    });

    hoverArea.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}


/* ================= LOADING SCREEN ================= */
function hideLoader() {
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "0.5s ease";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1000);
}


/* ================= ACTIVE NAV LINK ================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}


/* ================= EVENT LISTENERS ================= */
window.addEventListener("load", () => {
  revealOnScroll();
  hideLoader();

  setupHoverVideo(".about-character video", ".about-character");
  setupHoverVideo(".step-video video", ".step");

  updateActiveNavLink();
});

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveNavLink();
});

/* ================= BURGER MENU ================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  });
}