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
if(langueselect === "french"){
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
if(langueselect === "english"){
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
if(langueselect === "spanish"){
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

// ────────────────────────────────────────────────
// Scroll / boutons flottants
// ────────────────────────────────────────────────

function initScrollBehaviors() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    const formSection = document.getElementById("formSection");

    if (!scrollBtn) return;

    const update = () => {
        const scrolled = document.documentElement.scrollTop > 10;
        scrollBtn.style.display = scrolled ? "block" : "none";
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
        'niv3/nivtrois26.png',
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
