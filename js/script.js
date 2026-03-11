// script.js — Version corrigée, consolidée et robuste — Mars 2026

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
    changelangueinfo();
    loadPage(currentPage); // recharge la page courante avec la nouvelle langue
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
    currentPage = page; // on met à jour la page courante

    const mainContainer = document.getElementById("contenu-principal");
    if (!mainContainer) {
        console.error("Élément #contenu-principal introuvable dans la page");
        return;
    }

    console.log(`Chargement de : ${page}`);

    mainContainer.style.opacity = "0";

    setTimeout(() => {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} — ${page} introuvable`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newContent = doc.querySelector("#contenu-principal");

                if (!newContent) {
                    console.error(`Aucun #contenu-principal trouvé dans ${page}`);
                    mainContainer.innerHTML = "<p style='color:red'>Erreur : contenu principal non trouvé dans la page chargée.</p>";
                } else {
                    mainContainer.innerHTML = newContent.innerHTML;
                }

                mainContainer.style.opacity = "1";
                applyLanguageAndInit(); // ← tout passe par ici après chargement
            })
            .catch(err => {
                console.error(`Erreur chargement ${page} :`, err);
                mainContainer.innerHTML = "<p style='color:red'>Une erreur est survenue lors du chargement.</p>";
                mainContainer.style.opacity = "1";
            });
    }, 200);
}

// ────────────────────────────────────────────────
// Initialisation globale après chaque chargement / changement langue
// ────────────────────────────────────────────────

function applyLanguageAndInit() {
    changelanguemenu();
    changelanguefoot();
    changelanguelogo();
    changelanguepartenaires();
    updateAgeDisplay();

    // Initialisations communes
    initializeCardToggle();
    initializeCarousel();
    initScrollBehaviors();

    // Initialisations spécifiques par page
    if (currentPage.includes("index")) {
        changelangueindex();
    }

    if (currentPage.includes("galerie")) {
        initGalerieWithLang();   // met le titre + structure
        initializeGalerie();     // charge les images + filtres
    }

    if (currentPage.includes("peinturecommission")) {
        if (typeof changelanguepeinturecommission === "function") {
            changelanguepeinturecommission();
        }
    }

    if (currentPage.includes("simulateur_devis")) {
        if (typeof changelanguesimulateur === "function") {
            changelanguesimulateur();
        }
        initializeFormCalculations();
    }

    if (currentPage.includes("formation")) {
        initializeFormationForm();
    }
            if (currentPage.includes("conditions")) {
                  if (typeof changelangueconditions === "function") {
       changelangueconditions();
                  }
    }
                    if (currentPage.includes("mentionslegales")) {
                          if (typeof changelanguementionslegales === "function") {
       changelanguementionslegales();
                          }
    }
                            if (currentPage.includes("horaires")) {
                                  if (typeof changelanguehoraires === "function") {
        changelanguehoraires();
                                  }
    }


}

// ────────────────────────────────────────────────
// Menus multilingues
// ────────────────────────────────────────────────

function changelanguemenu() {
    const menu = document.getElementById("menu-contenu");
    if (!menu) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `<ul class="menu">
        
            <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Gallery 🖼️</a></li>
        </ul>`;
    } else if (currentLanguage === "spanish") {
        html = `<ul class="menu">
            
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

function changelanguefoot() {
    const foot = document.getElementById("foot-contenu");
    if (!foot) return;

    let html = "";

   if (currentLanguage === "english") {
    html = `
        <ul class="menu">
            <li><a href="conditions.html" onclick="loadPage('conditions.html'); scrollToTop(); return false;">General Terms and Conditions 📜</a></li>
            <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); scrollToTop(); return false;">Legal Notice 💼</a></li>
            <li><a href="horaires.html" onclick="loadPage('horaires.html'); scrollToTop(); return false;">Opening Hours & Closures 🕖</a></li>
        </ul>
    `;
} 
else if (currentLanguage === "spanish") {
    html = `
        <ul class="menu">
            <li><a href="conditions.html" onclick="loadPage('conditions.html'); scrollToTop(); return false;">Condiciones Generales de Venta 📜</a></li>
            <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); scrollToTop(); return false;">Aviso Legal 💼</a></li>
            <li><a href="horaires.html" onclick="loadPage('horaires.html'); scrollToTop(); return false;">Horarios de Apertura y Cierres 🕖</a></li>
        </ul>
    `;
    } else {
        html = ` 
            <ul class="menu">
                     <li><a href="conditions.html"  onclick="loadPage('conditions.html'); scrollToTop(); return false;">Conditions générales de vente 📜</a></li>
        <li><a href="mentionslegales.html"  onclick="loadPage('mentionslegales.html'); scrollToTop(); return false;">Mentions Légales 💼</a></li>
        <li><a href="horaires.html"  onclick="loadPage('horaires.html');  scrollToTop(); return false;">Horaires d'ouverture et Fermetures 🕖</a></li>
</ul>  
       `;
    }

    foot.innerHTML = html;
}

function changelanguepartenaires() {
    const partenaires = document.getElementById("partenaires-contenu");
    if (!partenaires) return;

    let html = "";

   if (currentLanguage === "english") {
    html = `
        <h3>Our Partners</h3>
  
        <div class="partenaires-container">
           
            <div>
                <div class="cardpartenaire">
                    <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-totalwar.png" alt="Total Wargames Logo">
                    </a>
                </div>
                <div class="ppartenaire">
                    <p>Buy cheaper second-hand<br>5% discount with code:<br><strong>STUDIOPF</strong></p>
                </div>
            </div>
                   
            <div>
                <div class="cardpartenaire">
                    <a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-maxireve.png" alt="Maxi Rêve Logo">
                    </a>
                </div>
                <div class="ppartenaire">
                    <p>Your dream miniatures at Maxi discount!<br>up to -19% with code:<br><strong>MAXIPF</strong></p>
                </div>
            </div>
        </div>
   
        <div class="partenaires-container">
            <div>
                <div class="cardpartenaire">
                    <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-mezgike.png" alt="Mezgike Logo">
                    </a>
                </div>
                <div class="ppartenaire">
                    <p>Superb pre-supported STL miniatures for your sci-fi & fantasy tabletop battle games.<br>-10% on your order<br>with promo code:<br><strong>STUDIOPF</strong></p>
                </div>
            </div>
        </div>
    `;
} 
else if (currentLanguage === "spanish") {
    html = `
        <h3>Nuestros Socios / Partners</h3>
  
        <div class="partenaires-container">
           
            <div>
                <div class="cardpartenaire">
                    <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-totalwar.png" alt="Total Wargames Logo">
                    </a>
                </div>
                <div class="ppartenaire">
                    <p>Compra más barato de segunda mano<br>5% de descuento con el código:<br><strong>STUDIOPF</strong></p>
                </div>
            </div>
                   
            <div>
                <div class="cardpartenaire">
                    <a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-maxireve.png" alt="Maxi Rêve Logo">
                    </a>
                </div>
                <div class="ppartenaire">
                    <p>¡Tus miniaturas de ensueño con Maxi descuento!<br>hasta -19% con el código:<br><strong>MAXIPF</strong></p>
                </div>
            </div>
        </div>
   
        <div class="partenaires-container">
            <div>
                <div class="cardpartenaire">
                    <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-mezgike.png" alt="Mezgike Logo">
                    </a>
                </div>
                <div class="ppartenaire">
                    <p>Preciosas miniaturas STL pre-soportadas para tus juegos de mesa de batalla sci-fi y fantasía.<br>-10% en tu pedido<br>con el código promocional:<br><strong>STUDIOPF</strong></p>
                </div>
            </div>
        </div>
    `;
    } else {
        html = `    <h3>Nos Partenaires</h3>
   
        <div class="partenaires-container">
            
            
             <div>
          <div class="cardpartenaire">
          <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-totalwar.png" alt="Total Wargames Logo">        </a>
          </div>
              <div class="ppartenaire">
             <p>Achetez moins cher d'occasion<br>5% de remise :<br> <strong>STUDIOPF</strong></p>
             </div>
        </div>
                    

     <div>
    <div class="cardpartenaire">
        <a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-maxireve.png" alt="Maxi Rêve Logo">        </a>
            </div> 
              <div class="ppartenaire">
             <p>Vos figurines de rêves à Maxi remise !<br>jusqu'à -19% :<br><strong>MAXIPF</strong></p>
            </div>
        </div>
       
           
      </div>
    
                 <div class="partenaires-container">
                                   
                                     <div>
                                         
          <div class="cardpartenaire">
        <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-mezgike.png" alt="Mezgike Logo">        </a>
            </div> 
              
                                         <div class="ppartenaire">
             <p>Superbes figurines STL pré-supportées pour vos jeux de bataille de table sci-fi et fantasy. <br>- 10% sur votre commande<br> avec le code promo :<br><strong>STUDIOPF</strong></p>
            </div>
                                         
        </div>
 </div> `;
    }

    partenaires.innerHTML = html;
}


// ────────────────────────────────────────────────
// Page d'accueil (maintenance)
// ────────────────────────────────────────────────

function changelangueindex() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

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
}

// ────────────────────────────────────────────────
// Galerie — titre + structure multilingue
// ────────────────────────────────────────────────

function initGalerieWithLang() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

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
}

function changelangueinfo(){
if(currentLanguage=== "french"){
// Chargement du message d'information
fetch('/data/messageinfo.txt')
    .then(response => response.text())
    .then(texte => {
        // Vérifie si le texte est vide ou contient uniquement des espaces
        messageinfo = texte.trim() === '' ? "Pas d'informations pour le moment" : texte;
       if (messageinfo === '') {
    document.querySelector('.info-container').style.display = 'none';
    document.querySelector('.info').style.display = 'none';
}
        updateParagraph(); // Appel de la fonction après avoir récupéré le message
    })
    .catch(error => {
        messageinfo = "error";
        updateParagraph();
    });
}
if(currentLanguage=== "english"){
// Chargement du message d'information
fetch('/data/messageinfoUK.txt')
    .then(response => response.text())
    .then(texte => {
        // Vérifie si le texte est vide ou contient uniquement des espaces
        messageinfo = texte.trim() === '' ? "Pas d'informations pour le moment" : texte;
       if (messageinfo === '') {
    document.querySelector('.info-container').style.display = 'none';
    document.querySelector('.info').style.display = 'none';
}
        updateParagraph(); // Appel de la fonction après avoir récupéré le message
    })
    .catch(error => {
        messageinfo = "error";
        updateParagraph();
    });
}
if(currentLanguage=== "spanish"){
// Chargement du message d'information
fetch('/data/messageinfo-es.txt')
    .then(response => response.text())
    .then(texte => {
        // Vérifie si le texte est vide ou contient uniquement des espaces
        messageinfo = texte.trim() === '' ? "Pas d'informations pour le moment" : texte;
       if (messageinfo === '') {
    document.querySelector('.info-container').style.display = 'none';
    document.querySelector('.info').style.display = 'none';
}
        updateParagraph(); // Appel de la fonction après avoir récupéré le message
    })
    .catch(error => {
        messageinfo = "error";
        updateParagraph();
    });
}
}
function updateParagraph() {
    const paragraph = document.getElementById('infoParagraph');
    if (paragraph) {
        paragraph.textContent = messageinfo; // Met le contenu dans le <p>
    }
}


// ────────────────────────────────────────────────
// Scroll / boutons flottants
// ────────────────────────────────────────────────

function initScrollBehaviors() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    const scrollBtnTo = document.getElementById("scrollTotal");
    
    const formSection = document.getElementById("formSection");
    
    
    if (!scrollBtn) return;

    const update = () => {
        const scrolled = document.documentElement.scrollTop > 10;
        scrollBtn.style.display = scrolled ? "block" : "none";
         if (currentPage.includes("simulateur_devis")) {
        scrollBtnTo.style.display = scrolled ? "block" : "none";}
        if (formSection) {
            formSection.style.display = (scrolled && !isMobile()) ? "block" : "none";
        }
    };

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update(); // état initial
}

// ────────────────────────────────────────────────
// Carrousel simple (si présent)
// ────────────────────────────────────────────────

function initializeCarousel() {
    const carousel = document.getElementById("carousel");
    if (!carousel) return;

    const images = carousel.querySelectorAll("img");
    if (images.length < 2) return;

    let idx = 0;
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
        const toggle = () => {
            const expanded = card.getAttribute("aria-expanded") === "true";
            card.setAttribute("aria-expanded", !expanded);
            card.classList.toggle("collapsed", expanded);
        };

        card.addEventListener("click", toggle);
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    });
}

// ────────────────────────────────────────────────
// Simulateur de devis — logique tarifaire
// ────────────────────────────────────────────────

const niveauLabels = {
    niveau0: "Niveau Essentiel - TableTop basique 3 couleurs, texture simple : 🚀 Idéal pour les petits budgets, Minimum efficace sans détails.",
    niveau1: "Niveau Approfondi - TableTop+, Qualité supérieur qui va à l'Approfondi : 🔍 Parfait pour valoriser les figurines de jeu. Notre recommendation.",
    niveau2: "Niveau Prestige - TableTop++, Qualité supérieur plus Prestige : 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.",
    expo:   "Niveau Studio : ✨ Limitée et réservée aux passionnés souhaitant le meilleur. Pour la collection en vitrine."
};

const niveauLabelsmini = {
    niveau0: "Essentiel",
    niveau1: "Approfondi",
    niveau2: "Prestige",
    expo:    "Pièce d'exposition"
};

const tariffs = {
    petiteinfanterie:      { niveau0: 10,  niveau1: 15,  niveau2: 20  },
    infanterie:            { niveau0: 15,  niveau1: 30,  niveau2: 40  },
    infanterieelite:       { niveau0: 20,  niveau1: 35,  niveau2: 50  },
    personnage:            { niveau0: 40,  niveau1: 70,  niveau2: 90  },
    personnageelite:       { niveau0: 50,  niveau1: 90,  niveau2: 120 },
    personnagemonstrueux:  { niveau0: 100, niveau1: 190, niveau2: 240 },
    personnagesurmonstre:  { niveau0: 120, niveau1: 240, niveau2: 300 },
    personnagesurgrandmonstre: { niveau0: 180, niveau1: 360, niveau2: 450 },
    cavalerie:             { niveau0: 30,  niveau1: 40,  niveau2: 50  },
    cavalerielourde:       { niveau0: 25,  niveau1: 50,  niveau2: 70  },
    petitvehiculemonstre:  { niveau0: 40,  niveau1: 80,  niveau2: 100 },
    vehiculemonstremoyen:  { niveau0: 60,  niveau1: 120, niveau2: 150 },
    grosvehiculemonstre:   { niveau0: 100, niveau1: 190, niveau2: 240 },
    enormevehiculemonstre: { niveau0: 140, niveau1: 270, niveau2: 340 },
    titanvehiculemonstre:  { niveau0: 240, niveau1: 480, niveau2: 600 }
};

const categories = Object.keys(tariffs);

function calculateTotals() {
    const niveauSelect = document.getElementById("niveau");
    if (!niveauSelect) return;

    const niveau = niveauSelect.value || "niveau1";
    const afficheniveau   = document.getElementById("afficheniveau");
    const comparativeTable = document.getElementById("comparative-table");
    const niveausup       = document.getElementById("niveau-sup");
    const oktotal         = document.getElementById("oktotal");

    if (!afficheniveau || !comparativeTable || !oktotal) return;

    afficheniveau.textContent = niveauLabels[niveau] || "";

    if (niveau === "expo") {
        categories.forEach(cat => {
            const div = document.getElementById(cat);
            if (div) div.style.display = "none";
        });
        ["aimant", "montage"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
        comparativeTable.innerHTML = "";
        oktotal.textContent = "Sur devis 💸";
        if (niveausup) niveausup.innerHTML = "";
        return;
    }

    // Réaffichage normal
    categories.forEach(cat => {
        const div = document.getElementById(cat);
        if (div) div.style.display = "";
    });
    ["aimant-input", "montage-input", "total"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "";
    });

    let totalGeneral = 0;

    categories.forEach(cat => {
        const input     = document.getElementById(`${cat}-input`);
        const prixEl    = document.getElementById(`prix${cat}`);
        const totalEl   = document.getElementById(`total${cat}`);

        if (!input || !prixEl || !totalEl) return;

        const qty = Number(input.value) || 0;
        const unitPrice = tariffs[cat]?.[niveau] ?? 0;
        const catTotal = qty * unitPrice;

        prixEl.textContent  = unitPrice.toFixed(2);
        totalEl.textContent = catTotal.toFixed(2);
        totalGeneral += catTotal;
    });

    oktotal.innerHTML = `
        <strong>Total estimé niveau ${niveauLabelsmini[niveau] || "?"} :</strong><br>
        ${totalGeneral.toFixed(2)} €<br>
        <small>Tarif approximatif, hors frais de port et PayPal.</small>
    `;

    // ── Comparaison ───────────────────────────────────────
    comparativeTable.innerHTML = "";
    if (niveausup) niveausup.innerHTML = "";

    const prevMap = { niveau0: "niveau1", niveau1: "niveau2", niveau2: null };
    const prevLevel = prevMap[niveau];

    if (!prevLevel) return;

    let totalPrev = 0;
    categories.forEach(cat => {
        const qty = Number(document.getElementById(`${cat}-input`)?.value) || 0;
        totalPrev += qty * (tariffs[cat]?.[prevLevel] ?? 0);
    });

    const nNum  = niveau.replace("niveau", "");
    const pNum  = prevLevel.replace("niveau", "");

    if (niveau === "niveau2") {
        comparativeTable.innerHTML = `
            <table id="tablecompar" style="margin: 1rem auto; border-collapse: collapse; width: 80%; max-width: 600px;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th style="border:1px solid #ddd; padding:8px;">${niveauLabelsmini[prevLevel]}</th>
                        <th style="border:1px solid #ddd; padding:8px;">${niveauLabelsmini[niveau]}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border:1px solid #ddd; padding:12px; text-align:center;">
                            <strong>${totalPrev.toFixed(2)} €</strong><br>
                            <img src="img/exempleniveau${pNum}.jpg" class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[prevLevel]}" loading="lazy">
                        </td>
                        <td style="border:1px solid #ddd; padding:12px; text-align:center;">
                            <strong>${totalGeneral.toFixed(2)} €</strong><br>
                            <img src="img/exempleniveau${nNum}.jpg" class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[niveau]}" loading="lazy">
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    } else {
        if (niveausup) {
            niveausup.innerHTML = `
                <div style="text-align:center; margin:1rem 0;">
                    <button class="button" onclick="document.getElementById('niveau').value='niveau${parseInt(nNum)+1}'; calculateTotals();">
                        Passer au niveau supérieur ?
                    </button>
                </div>
            `;
        }

        comparativeTable.innerHTML = `
            <table id="tablecompar" style="margin: 1rem auto; border-collapse: collapse; width: 80%; max-width: 600px;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th style="border:1px solid #ddd; padding:8px;">${niveauLabelsmini[niveau]}</th>
                        <th style="border:1px solid #ddd; padding:8px;">${niveauLabelsmini[prevLevel]}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border:1px solid #ddd; padding:12px; text-align:center;">
                            <strong>${totalGeneral.toFixed(2)} €</strong><br>
                            <img src="img/exempleniveau${nNum}.jpg" class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[niveau]}" loading="lazy">
                        </td>
                        <td style="border:1px solid #ddd; padding:12px; text-align:center;">
                            <strong>${totalPrev.toFixed(2)} €</strong><br>
                            <img src="img/exempleniveau${pNum}.jpg" class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[prevLevel]}" loading="lazy">
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
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const required = form.querySelectorAll("[required]");
        let valid = true;

        required.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.classList.add("error");
            } else {
                field.classList.remove("error");
            }
        });

        if (!valid) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        const data = {
            nom:      document.getElementById("nom")?.value      || "",
            prenom:   document.getElementById("prenom")?.value   || "",
            email:    document.getElementById("email")?.value    || "",
            telephone:document.getElementById("telephone")?.value|| "",
            adresse:  document.getElementById("adresse")?.value  || "",
            cp:       document.getElementById("cp")?.value       || "",
            ville:    document.getElementById("ville")?.value    || "",
            pays:     document.getElementById("pays")?.value     || "",
            niveau:   document.getElementById("niveau")?.value   || "niveau1",
            montage:  document.getElementById("montage-input")?.value || "0",
            aimant:   document.getElementById("aimant-input")?.value  || "0",
            message:  document.getElementById("message-input")?.value || ""
        };

        const quantities = {};
        categories.forEach(cat => {
            quantities[cat] = Number(document.getElementById(`${cat}-input`)?.value) || 0;
        });

        const totalEl = document.getElementById("oktotal");
        const total = totalEl?.textContent.includes("€") ? parseFloat(totalEl.textContent.replace(/[^\d.]/g, "")) : 0;

        const subject = `Demande de Devis de ${data.prenom} ${data.nom} - ${niveauLabelsmini[data.niveau] || "?"}`;

        let body = `Bonjour,\n\nVoici ma demande de devis de peinture (${niveauLabelsmini[data.niveau] || data.niveau}) :\n\n`;

        body += `${data.nom}\n${data.prenom}\n${data.adresse}\n${data.cp} ${data.ville}\n${data.pays}\n${data.email}\n${data.telephone}\n\n`;

        if (data.niveau === "expo") {
            body += `Pièce d'exposition - Sur devis uniquement\n\n`;
        } else {
            body += categories.map(cat => `- ${cat} : ${quantities[cat]}`).join("\n") + "\n\n";
            body += `- Montage : ${data.montage}\n- Aimant : ${data.aimant}\n\n`;
            body += `Total estimé : ${total.toFixed(2)} €\n\n`;
        }

        body += `Message :\n${data.message}\n\nCordialement.`;

        const url = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    });

    // Recalcul live
    document.querySelectorAll("#contactForm input, #contactForm select").forEach(el => {
        el.addEventListener("input", calculateTotals);
    });
}

// ────────────────────────────────────────────────
// Formulaire de demande de formation
// ────────────────────────────────────────────────

function initializeFormationForm() {
    const form = document.getElementById("formationForm");
    if (!form) return;

    // On enlève les anciens listeners jQuery si présents
    if (typeof $ !== "undefined") {
        $(form).off("submit");
    }

    form.addEventListener("submit", e => {
        e.preventDefault();

        const data = {
            nom:      document.getElementById("nom")?.value      || "",
            prenom:   document.getElementById("prenom")?.value   || "",
            email:    document.getElementById("email")?.value    || "",
            telephone:document.getElementById("telephone")?.value|| "",
            adresse:  document.getElementById("adresse")?.value  || "",
            cp:       document.getElementById("cp")?.value       || "",
            ville:    document.getElementById("ville")?.value    || "",
            pays:     document.getElementById("pays")?.value     || "",
            cours:    document.getElementById("cours")?.value    || "",
            message:  document.getElementById("message")?.value  || "Aucun message"
        };

        const subject = `Demande de cours de peinture - ${data.prenom} ${data.nom}`;

        let body = `Bonjour,\n\nVoici ma demande de cours de peinture (${data.cours}) :\n\n`;
        body += `${data.nom}\n${data.prenom}\n${data.adresse}\n${data.cp} ${data.ville}\n${data.pays}\n${data.email}\n${data.telephone}\n\n`;
        body += `Message :\n${data.message}\n\nCordialement,\n${data.prenom} ${data.nom}`;

        const url = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    });
}

// ────────────────────────────────────────────────
// Galerie — chargement images + filtres
// ────────────────────────────────────────────────

function appelimg() {
    return [
        // Concours
        'concours/concours1.png','concours/concours2.png','concours/concours3.png','concours/concours4.png',
        // Niveau Prestige
        'niv3/nivtrois1.png','niv3/nivtrois2.png','niv3/nivtrois3.png','niv3/nivtrois4.png','niv3/nivtrois5.png',
        'niv3/nivtrois6.png','niv3/nivtrois7.png','niv3/nivtrois8.png','niv3/nivtrois9.png','niv3/nivtrois10.png',
        'niv3/nivtrois11.png','niv3/nivtrois12.png','niv3/nivtrois13.png','niv3/nivtrois14.png','niv3/nivtrois15.png',
        'niv3/nivtrois16.png','niv3/nivtrois17.png','niv3/nivtrois18.png','niv3/nivtrois19.png','niv3/nivtrois20.png',
        'niv3/nivtrois21.png','niv3/nivtrois22.png','niv3/nivtrois23.png','niv3/nivtrois24.png','niv3/nivtrois25.png',
        'niv3/nivtrois26.png','niv3/nivtrois27.png','niv3/nivtrois28.png',
        // Niveau Expo
        'niv4/nivquatre1.png','niv4/nivquatre2.png','niv4/nivquatre3.png','niv4/nivquatre4.png','niv4/nivquatre5.png',
        'niv4/nivquatre6.png','niv4/nivquatre7.png','niv4/nivquatre8.png',
        // Expo pure
        'expo/expo1.png','expo/expo2.png','expo/expo3.png','expo/expo4.png','expo/expo5.png',
        'expo/expo6.png','expo/expo7.png','expo/expo8.png','expo/expo9.png','expo/expo10.png'
    ];
}

function initializeGalerie() {
    const filenames = appelimg();
    const base = 'img/';
    const gallery   = document.getElementById('gallery');
    const filters   = document.getElementById('filters');
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lightbox-img');

    if (!gallery || !filters || !lightbox || !lbImg) {
        console.warn("Éléments galerie manquants → initializeGalerie annulé");
        return;
    }

    const categorized = {};
    filenames.forEach(file => {
        const [folder] = file.split('/');
        if (!folder) return;
        if (!categorized[folder]) categorized[folder] = [];
        categorized[folder].push(base + file);
    });

    // Catégorie "Tous"
    categorized.Tous = filenames.map(f => base + f);

    // Boutons filtres
    filters.innerHTML = "";
    Object.keys(categorized).sort().forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.className = cat.toLowerCase();
        if (cat === 'Tous') btn.classList.add('active');

        btn.addEventListener('click', () => {
            filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showImages(cat);
        });

        filters.appendChild(btn);
    });

    function showImages(category) {
        gallery.innerHTML = "";
        if (!categorized[category]) return;

        const frag = document.createDocumentFragment();
        categorized[category].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Peinture figurine studio – ${category}`;
            img.className = 'gallery-img';
            img.loading = 'lazy';

            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lbImg.src = src;
                lbImg.alt = img.alt;
            });

            frag.appendChild(img);
        });
        gallery.appendChild(frag);
    }

    // Fermeture lightbox
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox || e.target === lbImg) {
            lightbox.classList.remove('active');
        }
    });

    // Affichage initial
    showImages('Tous');
}

function changelanguementionslegales() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    if (currentLanguage === "english") {
        main.innerHTML = `
            <h1>✨ Legal Notice ✨</h1>
            <p><strong>Website:</strong> studiopf.fr<br>
            <strong>Last updated:</strong> January 19, 2026</p>
            <!-- Traduction anglaise complète ici -->
            <div class="section">
                <h2>Publisher</h2>
                <p>Studio PF: Pierre-François Frasse<br>Micro-entreprise<br>17 route de Lare, 42510 Saint Georges de Baroille, France</p>
            </div>
            <!-- etc. -->
        `;
    }
    else if (currentLanguage === "spanish") {
        main.innerHTML = `... version espagnole ...`;
    }
    // français = version par défaut → rien à faire, le HTML statique suffit
}
// ────────────────────────────────────────────────
// Conditions générales de vente — multilingue
// ────────────────────────────────────────────────

function changelangueconditions() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `
            <h1>✨ General Terms and Conditions of Sale ✨</h1>
            <p><strong>Website:</strong> studiopf.fr<br>
            <strong>Last updated:</strong> March 2026</p>

            <div class="section">
                <h2>1. Scope of application</h2>
                <p>These general terms and conditions apply to all painting commissions, training courses, and related services offered by Studio PF (Pierre-François Frasse, micro-entrepreneur, SIRET 832 040 380 00020).</p>
            </div>

            <div class="section">
                <h2>2. Ordering process</h2>
                <p>Any order is confirmed by written agreement (email or message) and payment of a deposit (usually 50%). The order is firm and final once the miniatures are received by the painter.</p>
            </div>

            <div class="section">
                <h2>3. Prices – Payment</h2>
                <p>Prices are in euros (€), quoted individually or via the simulator. Payment is made by PayPal, bank transfer or cash (hand delivery only). Full payment is required before shipping unless otherwise agreed.</p>
            </div>

            <div class="section">
                <h2>4. Delivery – Shipping</h2>
                <p>Shipping is done via Colissimo with tracking and insurance. Shipping costs are the responsibility of the client. Studio PF is not liable for loss or damage after handover to the carrier.</p>
            </div>

            <div class="section">
                <h2>5. Right of withdrawal</h2>
                <p>No right of withdrawal applies to custom-made products (painted miniatures) as per article L.221-28 of the French Consumer Code.</p>
            </div>

            <div class="section">
                <h2>6. Intellectual property – Photography</h2>
                <p>Studio PF retains the right to photograph and publish the finished work on its website, social networks and portfolio unless the client explicitly objects in writing before starting the project.</p>
            </div>

            <div class="section">
                <h2>7. Liability</h2>
                <p>Studio PF commits to the best possible execution of the work. In case of dispute, French law applies and the competent court is that of Saint-Étienne.</p>
            </div>

            <p><em>Last updated: March 2026 – Studio PF – All rights reserved.</em></p>
        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
            <h1>✨ Condiciones Generales de Venta ✨</h1>
            <p><strong>Sitio web:</strong> studiopf.fr<br>
            <strong>Última actualización:</strong> Marzo 2026</p>

            <div class="section">
                <h2>1. Ámbito de aplicación</h2>
                <p>Estas condiciones generales se aplican a todos los encargos de pintura, cursos de formación y servicios relacionados ofrecidos por Studio PF (Pierre-François Frasse, microempresario, SIRET 832 040 380 00020).</p>
            </div>

            <div class="section">
                <h2>2. Proceso de pedido</h2>
                <p>Cualquier pedido se confirma por acuerdo escrito (correo o mensaje) y pago de un depósito (generalmente 50 %). El pedido es firme una vez recibidas las miniaturas.</p>
            </div>

            <div class="section">
                <h2>3. Precios – Pago</h2>
                <p>Los precios están en euros (€), presupuestados individualmente o mediante el simulador. El pago se realiza por PayPal, transferencia bancaria o en efectivo (entrega en mano). El pago total es exigible antes del envío.</p>
            </div>

            <div class="section">
                <h2>4. Entrega – Envío</h2>
                <p>El envío se realiza mediante Colissimo con seguimiento y seguro. Los gastos de envío corren a cargo del cliente. Studio PF no se responsabiliza de pérdidas o daños tras la entrega al transportista.</p>
            </div>

            <div class="section">
                <h2>5. Derecho de desistimiento</h2>
                <p>No se aplica derecho de desistimiento a productos personalizados (miniaturas pintadas) según el artículo L.221-28 del Código del Consumo francés.</p>
            </div>

            <div class="section">
                <h2>6. Propiedad intelectual – Fotografías</h2>
                <p>Studio PF se reserva el derecho de fotografiar y publicar el trabajo terminado en su web, redes sociales y portafolio, salvo oposición expresa por escrito del cliente antes del inicio del proyecto.</p>
            </div>

            <div class="section">
                <h2>7. Responsabilidad</h2>
                <p>Studio PF se compromete a realizar el trabajo de la mejor manera posible. En caso de litigio, se aplica la ley francesa y el tribunal competente es el de Saint-Étienne.</p>
            </div>

            <p><em>Última actualización: Marzo 2026 – Studio PF – Todos los derechos reservados.</em></p>
        `;
    } 
    else { // français (par défaut)
        html = `
            <h1>✨ Conditions Générales de Vente ✨</h1>
            <p><strong>Site :</strong> studiopf.fr<br>
            <strong>Dernière mise à jour :</strong> Mars 2026</p>

            <div class="section">
                <h2>1. Champ d'application</h2>
                <p>Ces conditions générales de vente s'appliquent à l'ensemble des prestations de peinture, formations et services associés proposés par Studio PF (Pierre-François Frasse, micro-entrepreneur, SIRET 832 040 380 00020).</p>
            </div>

            <div class="section">
                <h2>2. Processus de commande</h2>
                <p>Toute commande est confirmée par accord écrit (email ou message) et versement d'un acompte (généralement 50 %). La commande devient ferme et définitive dès réception des figurines par le peintre.</p>
            </div>

            <div class="section">
                <h2>3. Tarifs – Paiement</h2>
                <p>Les prix sont exprimés en euros (€), établis sur devis individuel ou via le simulateur. Le règlement s'effectue par PayPal, virement bancaire ou espèces (remise en main propre). Le solde est exigible avant expédition sauf accord contraire.</p>
            </div>

            <div class="section">
                <h2>4. Livraison – Expédition</h2>
                <p>L'expédition est réalisée via Colissimo avec suivi et assurance. Les frais de port sont à la charge du client. Studio PF décline toute responsabilité en cas de perte ou avarie après remise au transporteur.</p>
            </div>

            <div class="section">
                <h2>5. Droit de rétractation</h2>
                <p>Aucun droit de rétractation ne s'applique aux produits sur mesure (figurines peintes) conformément à l'article L.221-28 du Code de la consommation.</p>
            </div>

            <div class="section">
                <h2>6. Propriété intellectuelle – Droit à l'image des œuvres</h2>
                <p>Studio PF se réserve le droit de photographier et publier les réalisations terminées sur son site, ses réseaux sociaux et son portfolio, sauf opposition expresse et écrite du client avant le début du projet.</p>
            </div>

            <div class="section">
                <h2>7. Responsabilité – Litiges</h2>
                <p>Studio PF s'engage à réaliser les prestations avec le plus grand soin. En cas de litige, la loi française est applicable et les tribunaux compétents sont ceux de Saint-Étienne.</p>
            </div>

            <p><em>Dernière mise à jour : Mars 2026 – Studio PF – Tous droits réservés.</em></p>
        `;
    }

    main.innerHTML = html;
}
// ────────────────────────────────────────────────
// Horaires d'ouverture — multilingue
// ────────────────────────────────────────────────

function changelanguehoraires() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `
            <h1>🕖 Opening Hours & Closures 🕖</h1>
            <p><strong>Current status (March 2026):</strong> Studio closed until early October 2026</p>

            <div class="section">
                <h2>Normal opening hours (when active)</h2>
                <ul>
                    <li><strong>Monday – Tuesday – Thursday – Friday :</strong> 10:00 – 19:00</li>
                    <li><strong>Wednesday, Saturday, Sunday :</strong> Closed</li>
                </ul>
            </div>

            <div class="section">
                <h2>Exceptions & temporary closures</h2>
                <p>→ Studio closed for painting commissions until beginning of October 2026<br>
                → Training sessions and coaching possible by appointment only during this period</p>
            </div>

            <p><em>Last updated: March 2026 – Studio PF</em></p>
        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
            <h1>🕖 Horarios de apertura y cierres 🕖</h1>
            <p><strong>Estado actual (marzo 2026):</strong> Estudio cerrado hasta principios de octubre de 2026</p>

            <div class="section">
                <h2>Horario habitual (cuando está activo)</h2>
                <ul>
                    <li><strong>Lunes – Martes – Jueves – Viernes :</strong> 10:00 – 19:00</li>
                    <li><strong>Miércoles, Sábado, Domingo :</strong> Cerrado</li>
                </ul>
            </div>

            <div class="section">
                <h2>Excepciones y cierres temporales</h2>
                <p>→ Estudio cerrado para encargos de pintura hasta principios de octubre de 2026<br>
                → Sesiones de formación y coaching posibles solo con cita previa durante este período</p>
            </div>

            <p><em>Última actualización: Marzo 2026 – Studio PF</em></p>
        `;
    } 
    else { // français
        html = `
            <h1>🕖 Horaires d'ouverture et Fermetures 🕖</h1>
            <p><strong>État actuel (mars 2026) :</strong> Studio fermé jusqu'au début octobre 2026</p>

            <div class="section">
                <h2>Horaires habituels (lorsque le studio est ouvert)</h2>
                <ul>
                    <li><strong>Lundi – Mardi – Jeudi – Vendredi :</strong> 10h00 – 19h00</li>
                    <li><strong>Mercredi, Samedi, Dimanche :</strong> Fermé</li>
                </ul>
            </div>

            <div class="section">
                <h2>Exceptions & fermetures temporaires</h2>
                <p>→ Studio fermé aux commandes de peinture jusqu'au début octobre 2026<br>
                → Formations et coachings possibles uniquement sur rendez-vous durant cette période</p>
            </div>

            <p><em>Dernière mise à jour : Mars 2026 – Studio PF</em></p>
        `;
    }

    main.innerHTML = html;
}


function changelanguelogo() {
    const logo = document.getElementById("logo-contenu");
    if (!logo) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `
            <div class="cardlogoimg">
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         <div class="cardlogo">
            <h1>Dare the artistic adventure!</h1>
            <p>Reopening:</p>
            <p class="highlight">→ early October 2026 ←</p>
            </div>

        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
          <div class="cardlogoimg">
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         <div class="cardlogo">
          <h1>¡Atrévete a la aventura artística!</h1>
            <p>Reapertura:</p>
            <p class="highlight">→ principios de octubre de 2026 ←</p>
            </div>

        `;
    } 
    else { // français
        html = `
         <div class="cardlogoimg">
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         <div class="cardlogo">
            <h1>Osez l'aventure artistique !</h1>
     <p>Réouverture :</p>
          <p class="highlight">→ début octobre 2026 ←</p>
            </div>

        `;
    }

    logo.innerHTML = html;
}

// ────────────────────────────────────────────────
// Lancement global
// ────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    // Langue par défaut
    highlightLanguage("french");

    // Chargement page initiale
    loadPage(currentPage);

    // Sélecteurs de langue
    document.getElementById("english")?.addEventListener("click", () => setLanguage("english"));
    document.getElementById("spanish")?.addEventListener("click", () => setLanguage("spanish"));
    document.getElementById("french")?.addEventListener("click", () => setLanguage("french"));
});
