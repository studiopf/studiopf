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
    ecriturl(page);
  const contenuPrincipal = document.getElementById("contenu-principal");
  if (!contenuPrincipal) {
    console.error("Element contenu-principal non trouvé");
    return;
  }

  console.log(`Chargement de la page : ${page}`);
  contenuPrincipal.style.opacity = 0;
  setTimeout(() => {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          console.error(`Échec du fetch pour ${page}: ${response.status}`);
          throw new Error('Page non trouvée');
        }
        return response.text();
      })
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newContent = doc.querySelector('#contenu-principal');
        if (!newContent) {
          console.error("Aucun élément #contenu-principal trouvé dans la page chargée");
          contenuPrincipal.innerHTML = "<p>Erreur : contenu principal non trouvé.</p>";
        } else {
          contenuPrincipal.innerHTML = newContent.innerHTML;
        }
        contenuPrincipal.style.opacity = 1;
        console.log(`Page ${page} chargée, initialisation des scripts`);
        if (typeof initializeCardToggle === 'function') {
          console.log('Appel de initializeCardToggle');
          initializeCardToggle();
       
        }
     
         
            applyLanguageAndInit();
          // Auto-advance every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);
      })
      .catch(error => {
        console.error(`Erreur lors du chargement de ${page}:`, error);
        contenuPrincipal.innerHTML = "<p>Une erreur est survenue lors du chargement de la page.</p>";
        contenuPrincipal.style.opacity = 1;
      });
  }, 200);



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

function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêche un comportement indésirable
        sendMessage(); // Envoie le message
    } else {
        var inputElement = document.getElementById("chatInput");
        var sendButton = document.getElementById("sendButton");
        if (inputElement && sendButton) {
            sendButton.style.display = inputElement.value.trim() === "" ? "none" : "block"; // Affiche ou cache le bouton d'envoi
        }
    }
}
function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

const niveauLabels = {
    niveau0: "Niveau Essentiel - TableTop basique 3 couleurs, texture simple : 🚀 Idéal pour les petits budgets, Minimum efficace sans détails.",
    niveau1: "Niveau Approfondi - TableTop+, Qualité supérieur qui va à l'Approfondi : 🔍 Parfait pour valoriser les figurines de jeu. Notre recommendation.",
    niveau2: "Niveau Prestige - TableTop++, Qualité supérieur plus Prestige : 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.",
    expo: "Niveau Studio : ✨ Limitée et réservée aux passionnés souhaitant le meilleur. Pour la collection en vitrine."
};

const niveauLabelsmini = {
    niveau0: "Essentiel",
    niveau1: "Approfondi",
    niveau2: "Prestige",
    expo: "Pièce d'exposition"
};


const tariffs = {
    petiteinfanterie: { niveau0: 10, niveau1: 15, niveau2: 20},
    infanterie: { niveau0: 15, niveau1: 30, niveau2: 40},
    infanterieelite: { niveau0: 20, niveau1: 35, niveau2: 50 },
    personnage: { niveau0: 40, niveau1: 70, niveau2: 90},
      personnageelite: { niveau0: 50, niveau1: 90, niveau2: 120},
    personnagemonstrueux: { niveau0: 100, niveau1: 190, niveau2: 240 },
    personnagesurmonstre: { niveau0: 120, niveau1: 240, niveau2: 300 },
    personnagesurgrandmonstre: { niveau0: 180, niveau1: 360, niveau2: 450 },
    cavalerie: { niveau0: 30, niveau1: 40, niveau2: 50 },
    cavalerielourde: { niveau0: 25, niveau1: 50, niveau2: 70 },
    petitvehiculemonstre: { niveau0: 40, niveau1: 80, niveau2: 100},
    vehiculemonstremoyen: { niveau0: 60, niveau1: 120, niveau2: 150 },
    grosvehiculemonstre: { niveau0: 100, niveau1: 190, niveau2: 240},
    enormevehiculemonstre: { niveau0: 140, niveau1: 270, niveau2: 340},
    titanvehiculemonstre: { niveau0: 240, niveau1: 480, niveau2: 600 }
};


const categories = Object.keys(tariffs);

function calculateTotals() {
    const niveauSelect = document.getElementById("niveau");
    const niveau = niveauSelect?.value || "niveau1";
    const afficheniveau = document.getElementById("afficheniveau");
    const comparativeTable = document.getElementById("comparative-table");
       const niveausup = document.getElementById("niveau-sup");
    const oktotal = document.getElementById("oktotal");

    // Vérification des éléments DOM nécessaires
    if (!niveauSelect || !afficheniveau || !comparativeTable || !oktotal) {
        console.error("Un ou plusieurs éléments DOM nécessaires sont manquants.");
        return;
    }

    // Mise à jour du libellé du niveau
    afficheniveau.textContent = niveauLabels[niveau];

    let totalGeneral = 0;

    // Cas particulier pour le niveau "expo"
    if (niveau === "expo") {
        categories.forEach(cat => {
            const divCat = document.getElementById(cat);
            if (divCat) divCat.style.display = "none";
        });

        ["aimant", "montage"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
        ["message"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "done";
        });
        

        comparativeTable.innerHTML = "";
        oktotal.textContent = "Sur devis 💸";
        return;
    }

    // Calcul du total pour chaque catégorie
    categories.forEach(cat => {
        const divCat = document.getElementById(cat);
        const input = document.getElementById(`${cat}-input`);
        const prixCat = document.getElementById(`prix${cat}`);
        const totalCatEl = document.getElementById(`total${cat}`);

        if (divCat) divCat.style.display = "";
        if (!input || !prixCat || !totalCatEl) return;

        const qty = Number(input.value) || 0;
        const priceUnit = tariffs[cat][niveau] || 0;
        const totalCat = qty * priceUnit;

        prixCat.textContent = priceUnit.toFixed(2);
        totalCatEl.textContent = totalCat.toFixed(2);
        totalGeneral += totalCat;
    });

    // Affichage des champs supplémentaires
    ["aimant-input", "total", "montage-input"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "";
    });

        // Gestion de la table comparative
    const previousLevel = {
        niveau0: "niveau1",
        niveau1: "niveau2",
        niveau2: "niveau1",
    }[niveau];

    
    // Mise à jour du total général
    oktotal.innerHTML = `<strong>Total estimé niveau ${niveauLabelsmini[niveau]} </strong> : ${totalGeneral.toFixed(2)} € <br>Tarif approximatif, hors frais de port et frais PayPal.`;


    
    comparativeTable.innerHTML = ""; // Réinitialisation du tableau
       niveausup.innerHTML = "";

    if (!previousLevel || niveau === "expo") {
        return; // Pas de comparaison pour niveau2 ou si previousLevel n'existe pas
    }

    // Calcul du total pour le niveau précédent
    let totalPrevious = 0;
    categories.forEach(cat => {
        const qty = Number(document.getElementById(`${cat}-input`)?.value) || 0;
        const priceUnit = tariffs[cat][previousLevel] || 0;
        totalPrevious += qty * priceUnit;
    });


    // Génération du tableau comparatif
    const niveauNumber = niveau.replace("niveau", "");
    const previousNiveauNumber = previousLevel.replace("niveau", "");
  if (niveau === "niveau2") {
       niveausup.innerHTML = "";
    comparativeTable.innerHTML = `
        <table id="tablecompar" style="margin: 5px auto; border-collapse: collapse; width: 70%;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                 <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[previousLevel]}</th>
                    <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[niveau]}</th>
                   
                </tr>
            </thead>
            <tbody>
                <tr>
                  
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalPrevious.toFixed(2)} €<br>
                        <img src="img/exempleniveau${previousNiveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[previousLevel]}">
                    </td>
                      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalGeneral.toFixed(2)} €<br>
                        <img src="img/exempleniveau${niveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[niveau]}">
                    </td>
                </tr>
            </tbody>
        </table>
    `;
  }
    else{
         niveausup.innerHTML = `
                <div>
            <button class="button" onclick="changeniveau()">Passer au niveau supérieur ?</button>
        </div>
           `;
            comparativeTable.innerHTML = `
        <table id="tablecompar" style="margin: 5px auto; border-collapse: collapse; width: 70%;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[niveau]}</th>
                    <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[previousLevel]}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalGeneral.toFixed(2)} €<br>
                        <img src="img/exempleniveau${niveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[niveau]}">
                    </td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalPrevious.toFixed(2)} €<br>
                        <img src="img/exempleniveau${previousNiveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[previousLevel]}">
                    </td>
                </tr>
            </tbody>
        </table>
    `;
    }

}





function initializeFormCalculations() {
    calculateTotals();

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const requiredFields = form.querySelectorAll("[required]");
            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("error");
                } else {
                    field.classList.remove("error");
                }
            });

            if (!isValid) {
                alert("Veuillez remplir tous les champs obligatoires.");
                return;
            }

            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            const email = document.getElementById("email").value;
            const telephone = document.getElementById("telephone").value;
            const adresse = document.getElementById("adresse").value;
            const cp = document.getElementById("cp").value;
            const ville = document.getElementById("ville").value;
            const pays = document.getElementById("pays").value;
            const niveau = document.getElementById("niveau").value;
            const montage = document.getElementById('montage-input').value || 0;
            const aimant = document.getElementById('aimant-input').value || 0;
            const message = document.getElementById("message-input").value;

            // Récupération des quantités
            const quantities = {};
            categories.forEach(cat => {
                quantities[cat] = parseInt(document.getElementById(cat + '-input').value) || 0;
            });

            // Récupération du total (si ce n'est pas "Sur devis")
            const totalText = document.getElementById("oktotal").textContent;
            const total = totalText.includes("€") ? parseFloat(totalText.replace(/[^\d.]/g, "")) : 0;

            const subject = `Demande de Devis de ${prenom} ${nom} - ${niveauLabelsmini[niveau]}`;

            let body = "";

            if (niveau === "expo") {
                body =  `Bonjour,\n\nVoici ma demande de devis de peinture (${niveauLabelsmini[niveau]}) :\n` +
                             `${nom}\n${prenom}\n${adresse}\n${cp}\n` +
                             `${ville}\n${pays}\n${email}\n${telephone}\n\n` +
                    `Pièce d'exposition - Sur devis uniquement\n\nMessage :\n${message}\n\nCordialement.`;
            } else {
                body =  `Bonjour,\n\nVoici ma demande de devis de peinture (${niveauLabelsmini[niveau]}) :\n` +
                             `${nom}\n${prenom}\n${adresse}\n${cp}\n` +
                             `${ville}\n${pays}\n${email}\n${telephone}\n\n` +
                    categories.map(cat => `- ${cat} : ${quantities[cat]}`).join('\n') + `\n\n` +
                       `- Montage : ${montage}\n- Aimant : ${aimant}\n\n` +
                       `Total estimé : ${total.toFixed(2)} €\n\nMessage :\n${message}\n\nCordialement.`;
            }

            const mailtoURL = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoURL;
        });
    }

    // Recalcul automatique quand on modifie le formulaire
    document.querySelectorAll("#contactForm input, #contactForm select").forEach(element => {
        element.addEventListener("input", calculateTotals);
    });
}

  // Initialisation du formulaire de formation
function initializeFormationForm() {
    $("#formationForm").off("submit").on("submit", function (e) {
        e.preventDefault();

        const nom = $("#nom").val();
        const prenom = $("#prenom").val();
        const email = $("#email").val();
        const telephone = $("#telephone").val();
        const cours = $("#cours").val();
        const message = $("#message").val() || "Aucun message";
        const adresse = $("#adresse").val();
        const cp = $("#cp").val();
        const ville = $("#ville").val();
        const pays = $("#pays").val();

        const subject = `Demande de cours de peinture - ${nom} ${prenom}`;
        const body = `Bonjour,

Voici ma demande de cours de peinture (${cours}) :
${nom}
${prenom}
${adresse}
${cp}
${ville}
${pays}
${email}
${telephone}

Message :
${message}

Cordialement,
${prenom} ${nom}`;

        const mailtoURL = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoURL;
    });
}


function appelimg() {
    return [
        // Concours
        'concours/concours1.png',
        'concours/concours2.png',
        'concours/concours3.png',
        'concours/concours4.png',

        // Niv3
        'niv3/nivtrois1.png',
        'niv3/nivtrois2.png',
        'niv3/nivtrois3.png',
        'niv3/nivtrois4.png',
        'niv3/nivtrois5.png',
        'niv3/nivtrois6.png',
        'niv3/nivtrois7.png',
        'niv3/nivtrois8.png',
        'niv3/nivtrois9.png',
        'niv3/nivtrois10.png',
        'niv3/nivtrois11.png',
        'niv3/nivtrois12.png',
        'niv3/nivtrois13.png',
        'niv3/nivtrois14.png',
        'niv3/nivtrois15.png',
        'niv3/nivtrois16.png',
        'niv3/nivtrois17.png',
        'niv3/nivtrois18.png',
        'niv3/nivtrois19.png',
        'niv3/nivtrois20.png',
        'niv3/nivtrois21.png',
        'niv3/nivtrois22.png',
        'niv3/nivtrois23.png',
        'niv3/nivtrois24.png',
        'niv3/nivtrois25.png',
        'niv3/nivtrois26.png',

        // Niv4
        'niv4/nivquatre1.png',
        'niv4/nivquatre2.png',
        'niv4/nivquatre3.png',
        'niv4/nivquatre4.png',
        'niv4/nivquatre5.png',
        'niv4/nivquatre6.png',
        'niv4/nivquatre7.png',
        'niv4/nivquatre8.png',

        // Expo
        'expo/expo1.png',
        'expo/expo2.png',
        'expo/expo3.png',
        'expo/expo4.png',
        'expo/expo5.png',
        'expo/expo6.png',
        'expo/expo7.png',
        'expo/expo8.png',
        'expo/expo9.png',
        'expo/expo10.png'
    ];
}

function initializeGalerie() {
    const imageFilenames = appelimg();
    const basePath = 'img/';
    const gallery = document.getElementById('gallery');
    const filters = document.getElementById('filters');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!gallery || !filters || !lightbox || !lightboxImg) {
        console.error("Un ou plusieurs éléments du DOM manquent (gallery, filters, lightbox, lightbox-img)");
        return;
    }

    const categorized = {};

    // Catégorisation automatique par dossier
    imageFilenames.forEach(filename => {
        const parts = filename.split('/');
        if (parts.length < 2) return; // sécurité

        const category = parts[0];
        const fullPath = basePath + filename;

        if (!categorized[category]) {
            categorized[category] = [];
        }
        categorized[category].push(fullPath);
    });

    // Catégorie "Tous"
    categorized['Tous'] = imageFilenames.map(f => basePath + f);

    // Création des boutons de filtre
    Object.keys(categorized)
        .sort() // optionnel : trie alphabétique
        .forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            btn.classList.add(cat.toLowerCase());

            if (cat === 'Tous') {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                // Retire .active de tous les boutons
                filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                // Ajoute .active au bouton cliqué
                btn.classList.add('active');

                showImages(cat);
            });

            filters.appendChild(btn);
        });

    // Fonction d'affichage des images
    function showImages(category) {
        gallery.innerHTML = ''; // on vide

        if (!categorized[category]) return;

        const fragment = document.createDocumentFragment(); // plus performant

        categorized[category].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = "Peinture figurine studio – " + category;
            img.classList.add('gallery-img');
            img.loading = "lazy";           // amélioration perf + SEO
            // img decoding="async";        // optionnel (support variable)

            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = src;
                lightboxImg.alt = img.alt;
            });

            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
    }

    // Fermeture de la lightbox (clic n'importe où)
    lightbox.addEventListener('click', (e) => {
        // On ferme seulement si on clique en dehors de l'image
        if (e.target === lightbox || e.target === lightboxImg) {
            lightbox.classList.remove('active');
            // lightboxImg.src = '';     // pas obligatoire (mais évite de garder l'ancienne src)
        }
    });

    // Affichage initial
    showImages('Tous');
}


// Appelle la fonction au chargement de la page
  document.addEventListener("DOMContentLoaded", initializeFormCalculations);
document.addEventListener("DOMContentLoaded", changelangueindex);
document.addEventListener("DOMContentLoaded", changelanguesimulateur);
document.addEventListener("DOMContentLoaded", changelanguepeinturecommission);
document.addEventListener("DOMContentLoaded", changelanguesimulateur);
document.addEventListener("DOMContentLoaded", changelanguecondition);
document.addEventListener("DOMContentLoaded", changelanguefigconcours);
document.addEventListener("DOMContentLoaded", changelanguepiecepop);
document.addEventListener('DOMContentLoaded', initializeGalerie);
