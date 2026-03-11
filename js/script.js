// script.js — Version nettoyée, robuste et corrigée — Mars 2026

// Variables globales
let currentPage = "index.html";
let currentLanguage = "french";

// Âge dynamique
const currentYear = new Date().getFullYear();
const pfAge = currentYear - 1987;

// ────────────────────────────────────────────────
// Utilitaires de base
// ────────────────────────────────────────────────

function highlightLanguage(langId) {
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.classList.toggle('selected', btn.id === langId);
  });
}

function setLanguage(lang) {
  currentLanguage = lang;
  highlightLanguage(lang);
  loadPage(currentPage); // recharge avec nouvelle langue
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isMobile() {
  return window.innerWidth <= 768;
}

function updateAgeDisplay() {
  const el = document.getElementById("pf-age");
  if (el) el.textContent = pfAge;
}

// ────────────────────────────────────────────────
// Chargement dynamique des pages (cœur du système)
// ────────────────────────────────────────────────

function loadPage(page) {
  currentPage = page;

  const $main = $('#contenu-principal');
  if (!$main.length) {
    console.error("Élément #contenu-principal introuvable");
    return;
  }

  $main.html('<p style="text-align:center; padding:3rem;">Chargement...</p>');

  $main.load(`${page} #contenu-principal > *`, function(response, status, xhr) {
    if (status === "error") {
      console.error(`Erreur chargement ${page} : ${xhr.status} ${xhr.statusText}`);
      $main.html('<p style="color:red; text-align:center; padding:3rem;">Erreur de chargement de la page</p>');
      return;
    }

    // Après chargement réussi :
    applyLanguageAndInit();
  });
}

// Applique langue + initialise tous les composants possibles
function applyLanguageAndInit() {
  changelanguemenu();
  changelangueinfo();
  updateAgeDisplay();

  // Page-specific
  if (currentPage.includes("index"))        changelangueindex();
  if (currentPage.includes("galerie"))      initGalerieWithLang();
  if (currentPage.includes("peinturecommission")) changelanguepeinturecommission();
  if (currentPage.includes("simulateur_devis")) {
    if (typeof changelanguesimulateur === 'function') changelanguesimulateur();
    if (typeof initializeFormCalculations === 'function') initializeFormCalculations();
  }
  if (currentPage.includes("formation")) {
    if (typeof initializeFormationForm === 'function') initializeFormationForm();
  }

  // Commun à toutes les pages
  initializeCardToggle();
  initializeCarousel();
  initScrollBehaviors();
}

// ────────────────────────────────────────────────
// Langues — menus
// ────────────────────────────────────────────────

function changelanguemenu() {
  const menu = document.getElementById("menu-contenu");
  if (!menu) return;

  let html = '';

  if (currentLanguage === "english") {
    html = `<ul class="menu">
      <li><a href="formation.html" onclick="loadPage('formation.html');return false;">Training 📚</a></li>
      <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Gallery 🖼️</a></li>
    </ul>`;
  } else if (currentLanguage === "spanish") {
    html = `<ul class="menu">
      <li><a href="formation.html" onclick="loadPage('formation.html');return false;">Formación 📚</a></li>
      <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Galería 🖼️</a></li>
    </ul>`;
  } else {
    html = `<ul class="menu">
      <li><a href="formation.html" onclick="loadPage('formation.html');return false;">Formation 📚</a></li>
      <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Galerie 🖼️</a></li>
    </ul>`;
  }

  menu.innerHTML = html;
}

// ────────────────────────────────────────────────
// Langues — page d'accueil
// ────────────────────────────────────────────────

function changelangueindex() {
  const main = document.getElementById("contenu-principal");
  if (!main) return;

  let html = '';

  if (currentLanguage === "english") {
    html = `
      <p>I'll be back very soon with new painted adventures!</p>
      <p>Reopening of availability and orders</p>
      <p class="highlight">→ early October 2026 ←</p>
      <p class="highlight">→ contact me for your future projects ←</p>
      <div class="center">
        <div class="maintenance-box">
          <h2>🎨 Transform your miniatures into true works of art</h2>
          <p>High-end painting for enthusiasts, collectors and demanding players.</p>
          <p>Your miniatures deserve better than a simple brush stroke!</p>
          <p>At <strong>Studio PF</strong>, each project becomes a unique collectible piece.</p>
        </div>
      </div>
    `;
  } else if (currentLanguage === "spanish") {
    html = `
      <p>¡Volveré muy pronto con nuevas aventuras pintadas!</p>
      <p>Reapertura de disponibilidad y pedidos</p>
      <p class="highlight">→ principios de octubre de 2026 ←</p>
      <p class="highlight">→ contáctame para tus proyectos futuros ←</p>
      <div class="center">
        <div class="maintenance-box">
          <h2>🎨 Transforma tus miniaturas en verdaderas obras de arte</h2>
          <p>Pintura de alta gama para entusiastas, coleccionistas y jugadores exigentes.</p>
          <p>¡Tus miniaturas merecen más que un simple pincelada!</p>
          <p>En <strong>Studio PF</strong>, cada proyecto se convierte en una pieza única de colección.</p>
        </div>
      </div>
    `;
  } else {
    html = `
      <p>Je reviens très prochainement avec de nouvelles aventures peintes !</p>
      <p>Réouverture des disponibilités et prises de commande</p>
      <p class="highlight">→ début octobre 2026 ←</p>
      <p class="highlight">→ contactez-moi pour vos futures projets ←</p>
      <div class="center">
        <div class="maintenance-box">
          <h2>🎨 Transformez vos figurines en véritables œuvres d’art</h2>
          <p>Peinture haut de gamme pour passionnés, collectionneurs et joueurs exigeants.</p>
          <p>Vos figurines méritent mieux qu’un simple coup de pinceau !</p>
          <p>Chez <strong>Studio PF</strong>, chaque projet devient une pièce unique de collection.</p>
        </div>
      </div>
    `;
  }

  main.innerHTML = html;
  initializeCardToggle();
}

// ────────────────────────────────────────────────
// Langues — Galerie
// ────────────────────────────────────────────────

function initGalerieWithLang() {
  const main = document.getElementById("contenu-principal");
  if (!main) return;

  let html = '';

  if (currentLanguage === "english") {
    html = `
      <h2 class="galerie-title">🎨 Gallery</h2>
      <p class="galerie-description">✨ Step into a world where every miniature becomes a work of art.</p>
      <div class="menugallery" id="filters"></div>
      <div class="gallery" id="gallery"></div>
      <div class="lightbox" id="lightbox"><img id="lightbox-img" src="" alt=""></div>
    `;
  } else if (currentLanguage === "spanish") {
    html = `
      <h2 class="galerie-title">🎨 Galería</h2>
      <p class="galerie-description">✨ Adéntrate en un mundo donde cada miniatura se convierte en una obra de arte.</p>
      <div class="menugallery" id="filters"></div>
      <div class="gallery" id="gallery"></div>
      <div class="lightbox" id="lightbox"><img id="lightbox-img" src="" alt=""></div>
    `;
  } else {
    html = `
      <h2 class="galerie-title">🎨 Galerie</h2>
      <p class="galerie-description">✨ Entrez dans un univers où chaque figurine devient une œuvre d'art.</p>
      <div class="menugallery" id="filters"></div>
      <div class="gallery" id="gallery"></div>
      <div class="lightbox" id="lightbox"><img id="lightbox-img" src="" alt=""></div>
    `;
  }

  main.innerHTML = html;
  initializeGalerie(); // ta fonction existante
}

// ────────────────────────────────────────────────
// Scroll behaviors (retour en haut + menu mobile)
// ────────────────────────────────────────────────

function initScrollBehaviors() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  const formSection = document.getElementById("formSection");

  if (!scrollBtn) return;

  window.onscroll = () => {
    const scrolled = document.documentElement.scrollTop > 10;
    scrollBtn.style.display = scrolled ? "block" : "none";

    if (formSection) {
      formSection.style.display = scrolled && !isMobile() ? "block" : "none";
    }
  };

  // Initial state
  window.onscroll();
}

// ────────────────────────────────────────────────
// Carrousel
// ────────────────────────────────────────────────

function initializeCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  let idx = 0;
  const images = carousel.querySelectorAll("img");
  if (images.length < 2) return;

  setInterval(() => {
    idx = (idx + 1) % images.length;
    carousel.style.transform = `translateX(-${idx * 100}%)`;
  }, 4000);
}

// ────────────────────────────────────────────────
// Card toggle (accessibilité)
// ────────────────────────────────────────────────

function initializeCardToggle() {
  document.querySelectorAll('.card[role="region"]').forEach(card => {
    card.onclick = toggleCard;
    card.onkeypress = e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard(e);
      }
    };
  });
}

function toggleCard(e) {
  const card = e.currentTarget;
  const expanded = card.getAttribute("aria-expanded") === "true";
  card.setAttribute("aria-expanded", !expanded);
  card.classList.toggle("collapsed", expanded);
}

// ────────────────────────────────────────────────
// Lancement global
// ────────────────────────────────────────────────

$(document).ready(function() {
  // Langue par défaut
  highlightLanguage("french");

  // Chargement première page
  loadPage(currentPage);

  // Événements boutons langue
  document.getElementById("english")?.addEventListener("click", () => setLanguage("english"));
  document.getElementById("spanish")?.addEventListener("click", () => setLanguage("spanish"));
  document.getElementById("french")?.addEventListener("click", () => setLanguage("french"));

  // Redimensionnement → menu mobile
  $(window).on("resize", () => {
    document.getElementById("formSection")?.style.display = isMobile() ? "none" : "block";
  });
});
