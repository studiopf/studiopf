// =============================
// VARIABLES GLOBALES
// =============================
const virtualPages = [
    "galerie", "formation", "peinturecommission", "peinturecollection",
    "quisuisje", "index", "pourquoi", "conditions",
    "mentionslegales", "horaires"
];

const info = getPageInfo();
let currentPage = info.pageName || "index";
let currentLanguage = localStorage.getItem("language") || "french";
let messageinfo = "";

function getPageInfo() {
    const path = window.location.pathname.substring(1);
    const lastSegment = path.substring(path.lastIndexOf("/") + 1);
    
    let currentPage = lastSegment || "index.html";
    const pageName = currentPage.includes(".") 
        ? currentPage.substring(0, currentPage.lastIndexOf(".")) 
        : currentPage;

    const folder = path.substring(0, path.lastIndexOf("/"));

    return { folder, pageName, currentPage };
}

const currentYear = new Date().getFullYear();
const pfAge = currentYear - 1987;

// =============================
// UTILITAIRES
// =============================
function hideCurrentPage() {
    const url = window.location.origin + "/";
    window.history.replaceState({}, "", url);
}

function highlightLanguage(langId) {
    document.querySelectorAll('.language-selector button').forEach(btn => {
        btn.classList.toggle('selected', btn.id === langId);
    });
}

function updateDebugDisplay() {
    const langSpan = document.getElementById("currentLanguage");
    if (langSpan) {
        const displayLang = currentLanguage === "english" ? "English" :
                           currentLanguage === "spanish" ? "Español" : "Français";
        langSpan.textContent = displayLang;
    }

    const pageSpan = document.getElementById("currentPage");
    if (pageSpan) {
        pageSpan.textContent = currentPage || "inconnue";
    }
}

function isMobile() {
    return window.innerWidth <= 768;
}

function updateAgeDisplay() {
    const el = document.getElementById("pf-age");
    if (el) el.textContent = pfAge;
}

// =============================
// LANGUE
// =============================
function setLanguage(lang) {

    const folders = {
        french: "",
        english: "US",
        spanish: "ES"
    };

    // Page actuelle
    let page = currentPage || "index";

    // Formation n'existe qu'en français
    if (page === "formation" && lang !== "french") {
        page = "index";
    }

    localStorage.setItem("language", lang);

    const folder = folders[lang];
    const url =
        (folder ? "/" + folder : "") +
        "/" +
        (page === "index" ? "" : page + ".html");

    window.location.href = url;
}

// =============================
// FORMULAIRE FORMATION
// =============================
function initializeFormationForm() {
    const form = document.getElementById("formationForm");
    if (!form) return;

    form.onsubmit = function handleSubmit(e) {
        e.preventDefault();

        const getValue = id => document.getElementById(id)?.value.trim() || "";

        const data = {
            nom: getValue("nom"),
            prenom: getValue("prenom"),
            email: getValue("email"),
            telephone: getValue("telephone"),
            adresse: getValue("adresse"),
            cp: getValue("cp"),
            ville: getValue("ville"),
            pays: getValue("pays"),
            cours: getValue("cours"),
            message: getValue("message") || "Aucun message"
        };

        const subject = `Demande de cours de peinture - ${data.prenom} ${data.nom}`;

        let body = `Bonjour,\n\nVoici ma demande de cours de peinture (${data.cours}) :\n\n`;
        body += `${data.nom} ${data.prenom}\n`;
        body += `${data.adresse}\n${data.cp} ${data.ville}\n${data.pays}\n`;
        body += `${data.email}\n${data.telephone}\n\n`;
        body += `Message :\n${data.message}\n\nCordialement,\n${data.prenom} ${data.nom}`;

        const mailtoUrl = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    };
}

// ────────────────────────────────────────────────
// Galerie — chargement images + filtres
// ────────────────────────────────────────────────

function appelimg() {
    return [
        // Concours
        'concours/concours1.png','concours/concours2.png','concours/concours3.png','concours/concours4.png','concours/concours5.png','concours/concours6.png','concours/concours7.png','concours/concours8.png',
        // Niveau Prestige
        'niv3/nivtrois1.png','niv3/nivtrois2.png','niv3/nivtrois3.png','niv3/nivtrois4.png','niv3/nivtrois5.png',
        'niv3/nivtrois6.png','niv3/nivtrois7.png','niv3/nivtrois8.png','niv3/nivtrois9.png','niv3/nivtrois10.png',
        'niv3/nivtrois11.png','niv3/nivtrois12.png','niv3/nivtrois13.png','niv3/nivtrois14.png','niv3/nivtrois15.png',
        'niv3/nivtrois16.png','niv3/nivtrois17.png','niv3/nivtrois18.png','niv3/nivtrois19.png','niv3/nivtrois20.png',
        'niv3/nivtrois21.png','niv3/nivtrois22.png','niv3/nivtrois23.png','niv3/nivtrois24.png','niv3/nivtrois25.png',
        'niv3/nivtrois26.png','niv3/nivtrois27.png','niv3/nivtrois28.png','niv3/nivtrois29.png','niv3/nivtrois30.png','niv3/nivtrois31.png','niv3/nivtrois32.png','niv3/nivtrois33.png','niv3/nivtrois34.png','niv3/nivtrois35.png','niv3/nivtrois36.png',
        'niv3/nivtrois37.png',
        // Niveau Expo
        'niv4/nivquatre1.png','niv4/nivquatre2.png','niv4/nivquatre3.png','niv4/nivquatre4.png','niv4/nivquatre5.png',
        'niv4/nivquatre6.png','niv4/nivquatre7.png','niv4/nivquatre8.png','niv4/nivquatre9.png','niv4/nivquatre10.png','niv4/nivquatre11.png','niv4/nivquatre12.png','niv4/nivquatre13.png','niv4/nivquatre14.png','niv4/nivquatre15.png','niv4/nivquatre16.png','niv4/nivquatre17.png',
        'niv4/nivquatre18.png','niv4/nivquatre19.png',
        // Expo pure
        'expo/expo1.png','expo/expo2.png','expo/expo3.png','expo/expo4.png','expo/expo5.png',
        'expo/expo6.png','expo/expo7.png','expo/expo8.png','expo/expo9.png','expo/expo10.png','expo/expo11.png','expo/expo12.png'
    ];
}


    
   function initializeGalerie() {
    const filenames = appelimg();
    const base = "../img/";
    const gallery = document.getElementById("gallery");
    const filters = document.getElementById("filters");

    /*
    Initialise la lightbox globale.
    */
    initializeLightboxGlobal();

    if (!gallery || !filters) {
        console.warn("Éléments de galerie absents sur cette page.");
        return;
    }

    const categorized = {};

    filenames.forEach(file => {
        const [folder] = file.split("/");

        if (!folder) {
            return;
        }

        if (!categorized[folder]) {
            categorized[folder] = [];
        }

        categorized[folder].push(base + file);
    });

    /*
    Catégorie regroupant toutes les images
    retournées par appelimg().
    */
    categorized.Tous = filenames.map(file => base + file);

    // Réinitialisation des filtres
    filters.innerHTML = "";

    Object.keys(categorized)
        .sort((a, b) => {
            /*
            Place toujours "Tous" en premier.
            */
            if (a === "Tous") return -1;
            if (b === "Tous") return 1;

            return a.localeCompare(b);
        })
        .forEach(category => {
            const button = document.createElement("button");

            button.type = "button";

            button.textContent =
                category.charAt(0).toUpperCase() +
                category.slice(1);

            button.className = category.toLowerCase();

            if (category === "Tous") {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                filters
                    .querySelectorAll("button")
                    .forEach(btn => {
                        btn.classList.remove("active");
                    });

                button.classList.add("active");

                showImages(category);
            });

            filters.appendChild(button);
        });

    function showImages(category) {
        gallery.innerHTML = "";

        if (!categorized[category]) {
            return;
        }

        const fragment = document.createDocumentFragment();

        categorized[category].forEach((src, index) => {
            const img = document.createElement("img");

            img.src = src;
            img.alt =
                `Peinture figurine Studio PF – ${category} – image ${index + 1}`;

            img.className = "gallery-img";
            img.loading = "lazy";

            /*
            Permet d'identifier explicitement les images
            pouvant être ouvertes dans la lightbox.
            */
            img.setAttribute("data-lightbox", "gallery");

            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
    }

    // Affichage initial
    showImages("Tous");
}




  function initializeLightboxGlobal() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) {
        console.warn("Éléments de la lightbox manquants.");
        return;
    }

    /*
    Évite d'installer plusieurs fois les événements,
    même après plusieurs appels à loadPage().
    */
    if (lightbox.dataset.initialized === "true") {
        return;
    }

    lightbox.dataset.initialized = "true";

    let currentImages = [];
    let currentIndex = 0;

    // =============================
    // CRÉATION DES BOUTONS
    // =============================

    let previousButton =
        lightbox.querySelector(".lightbox-prev");

    let nextButton =
        lightbox.querySelector(".lightbox-next");

    let closeButton =
        lightbox.querySelector(".lightbox-close");

    if (!previousButton) {
        previousButton = document.createElement("button");

        previousButton.type = "button";
        previousButton.className =
            "lightbox-nav lightbox-prev";

        previousButton.innerHTML = "❮";

        previousButton.setAttribute(
            "aria-label",
            "Image précédente"
        );

        lightbox.appendChild(previousButton);
    }

    if (!nextButton) {
        nextButton = document.createElement("button");

        nextButton.type = "button";
        nextButton.className =
            "lightbox-nav lightbox-next";

        nextButton.innerHTML = "❯";

        nextButton.setAttribute(
            "aria-label",
            "Image suivante"
        );

        lightbox.appendChild(nextButton);
    }

    if (!closeButton) {
        closeButton = document.createElement("button");

        closeButton.type = "button";
        closeButton.className = "lightbox-close";

        closeButton.innerHTML = "✕";

        closeButton.setAttribute(
            "aria-label",
            "Fermer l'image"
        );

        lightbox.appendChild(closeButton);
    }

    // =============================
    // RÉCUPÉRATION DES IMAGES
    // =============================
function getVisiblePageImages() {
    return Array.from(document.images).filter(img => {
        return (
            img !== lightboxImg &&
            img.id !== "lightbox-img" &&
            !img.hasAttribute("data-no-lightbox") &&
            img.offsetParent !== null &&
            !img.closest(".logo, .social-icon, nav, footer")
        );
    });
}
    // =============================
    // AFFICHAGE D'UNE IMAGE
    // =============================

    function displayImage(index) {
        if (!currentImages.length) {
            return;
        }

        currentIndex =
            (index + currentImages.length) %
            currentImages.length;

        const selectedImage =
            currentImages[currentIndex];

        lightboxImg.src =
            selectedImage.currentSrc ||
            selectedImage.src;

        lightboxImg.alt =
            selectedImage.alt ||
            "Image agrandie";

        const hasSeveralImages =
            currentImages.length > 1;

        previousButton.style.display =
            hasSeveralImages ? "flex" : "none";

        nextButton.style.display =
            hasSeveralImages ? "flex" : "none";
    }

    // =============================
    // OUVERTURE
    // =============================

    function openLightbox(clickedImage) {
        currentImages = getVisiblePageImages();

        currentIndex =
            currentImages.indexOf(clickedImage);

        if (currentIndex === -1) {
            currentImages = [clickedImage];
            currentIndex = 0;
        }

        displayImage(currentIndex);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");
    }

    // =============================
    // FERMETURE
    // =============================

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

        lightboxImg.src = "";
        lightboxImg.alt = "";

        currentImages = [];
        currentIndex = 0;
    }

    // =============================
    // CLIC GLOBAL SUR LES IMAGES
    // =============================

    document.addEventListener("click", function (event) {
      const clickedImage = event.target.closest("img");

        if (!clickedImage) {
            return;
        }

        if (
            clickedImage === lightboxImg ||
            clickedImage.id === "lightbox-img" ||
            clickedImage.hasAttribute("data-no-lightbox") ||
            clickedImage.closest(".logo, .social-icon, nav, footer")
        ) {
            return;
        }

        event.preventDefault();

        openLightbox(clickedImage);
    });

    // =============================
    // NAVIGATION
    // =============================

    previousButton.addEventListener("click", function (event) {
        event.stopPropagation();
        displayImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", function (event) {
        event.stopPropagation();
        displayImage(currentIndex + 1);
    });

    closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        closeLightbox();
    });

    // Fermer en cliquant sur le fond
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // =============================
    // CLAVIER
    // =============================

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            displayImage(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            displayImage(currentIndex + 1);
        }
    });
}
function changelangueinfo() {

    let fichier = "/data/messageinfo.txt";

    if (currentLanguage === "english") {
        fichier = "/data/messageinfoUK.txt";
    } else if (currentLanguage === "spanish") {
        fichier = "/data/messageinfo-es.txt";
    }

    fetch(fichier)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
            return response.text();
        })
        .then(texte => {

            messageinfo = texte.trim() === ""
                ? "Pas d'informations pour le moment"
                : texte;

            const container = document.querySelector(".info-container");
            const info = document.querySelector(".info");

            if (container) container.style.display = texte.trim() === "" ? "none" : "";
            if (info) info.style.display = texte.trim() === "" ? "none" : "";

            updateParagraph();
        })
        .catch(() => {
            messageinfo = "error";
            updateParagraph();
        });
}

function updateParagraph() {
    const paragraph = document.getElementById("infoParagraph");

    if (paragraph) {
        paragraph.innerHTML = messageinfo.replace(/\r?\n/g, "<br>");
    }
}


function initThemeToggle() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    // Charger le thème enregistré
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }


    // Éviter de créer plusieurs événements
    themeToggle.onclick = function () {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");
            themeToggle.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌙";

        }

    };

}
function initScrollBehaviors() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    const scrollBtnTo = document.getElementById("scrollBtnTo");
    const formSection = document.getElementById("formSection");

    // Une navigation dynamique rappelle cette fonction : on retire donc
    // les anciens écouteurs avant d'en enregistrer de nouveaux.
    if (initScrollBehaviors._update) {
        window.removeEventListener("scroll", initScrollBehaviors._update);
        window.removeEventListener("resize", initScrollBehaviors._update);
    }

    if (!scrollBtn) {
        initScrollBehaviors._update = null;
        return;
    }

    const update = () => {
        const scrolled = document.documentElement.scrollTop > 10;
        scrollBtn.style.display = scrolled ? "block" : "none";

        if (scrollBtnTo) {
            scrollBtnTo.style.display =
                currentPage.includes("simulateur_devis") && scrolled ? "block" : "none";
        }

        if (formSection) {
            formSection.style.display = scrolled && !isMobile() ? "block" : "none";
        }
    };

    initScrollBehaviors._update = update;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
}

// ────────────────────────────────────────────────
// Simulateur de devis — logique tarifaire
// ────────────────────────────────────────────────

const niveauLabels = {
    niveau1: "Niveau Gold - Niv3, Qualité supérieur : 🔍 Parfait pour valoriser les figurines de jeu. Notre recommandation.",
    niveau2: "Niveau Diamant - Niv4, Qualité supérieur ultime : 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.",
};

const niveauLabelsmini = {
    niveau1: "Gold",
    niveau2: "Diamant",
};


const tarifheureeu = 20;
const tarifheureus = 25;

let tarifheure = tarifheureeu;
let symboleDevise = "€";


const TarifLangLabels = {
    english: "Rates 2026-2027",
     french: "Tarif 2026-2027",
    spanish: "Tarifas 2026-2027",
};



function mettreAJourTarifLangue() {

    if (currentLanguage === "english") {
        tarifheure = tarifheureus;
        symboleDevise = "$";

    } else {
        tarifheure = tarifheureeu;
        symboleDevise = "€";
    }

}



// =======================
// TARIFS
// =======================

const tariffs = {

    petiteinfanterie: { niveau1: 0.5, niveau2: 1 },
    infanterie: { niveau1: 1, niveau2: 2 },
    infanterieelite: { niveau1: 1.5, niveau2: 3 },

    personnage: { niveau1: 3, niveau2: 6 },
    personnageelite: { niveau1: 4, niveau2: 8 },
    personnagemonstrueux: { niveau1: 6, niveau2: 12 },

    personnagesurmonstre: { niveau1: 8, niveau2: 16 },
    personnagesurgrandmonstre: { niveau1: 12, niveau2: 24 },

    cavalerie: { niveau1: 2, niveau2: 4 },
    cavalerielourde: { niveau1: 3, niveau2: 6 },

    petitvehiculemonstre: { niveau1: 3, niveau2: 6 },
    vehiculemonstremoyen: { niveau1: 5, niveau2: 10 },
    grosvehiculemonstre: { niveau1: 8, niveau2: 16 },
    enormevehiculemonstre: { niveau1: 12, niveau2: 24 },

    titanvehiculemonstre: { niveau1: 18, niveau2: 36 }

};

const categories = Object.keys(tariffs);

// =======================
// NOMS DES CATEGORIES
// =======================

const categoriesLabel = {

    petiteinfanterie: {
        fr: "Infanterie 20-25mm",
        en: "Infantry 20-25mm",
        es: "Infantería 20-25mm"
    },

    infanterie: {
        fr: "Infanterie 28-32mm",
        en: "Infantry 28-32mm",
        es: "Infantería 28-32mm"
    },

    infanterieelite: {
        fr: "Infanterie élite 40-50mm",
        en: "Elite Infantry 40-50mm",
        es: "Infantería élite 40-50mm"
    },

    personnage: {
        fr: "Personnage à pied 25-32mm",
        en: "Foot Character 25-32mm",
        es: "Personaje a pie 25-32mm"
    },

    personnageelite: {
        fr: "Personnage élite 40-50mm",
        en: "Elite Character 40-50mm",
        es: "Personaje élite 40-50mm"
    },

    personnagemonstrueux: {
        fr: "Personnage monstrueux 60-100mm",
        en: "Monstrous Character 60-100mm",
        es: "Personaje monstruoso 60-100mm"
    },

    personnagesurmonstre: {
        fr: "Personnage sur monstre 120mm",
        en: "Character Mounted on Monster 120mm",
        es: "Personaje sobre monstruo 120mm"
    },

    personnagesurgrandmonstre: {
        fr: "Personnage sur grand monstre",
        en: "Character Mounted on Large Monster",
        es: "Personaje sobre gran monstruo"
    },

    cavalerie: {
        fr: "Cavalerie 60-75mm",
        en: "Cavalry 60-75mm",
        es: "Caballería 60-75mm"
    },

    cavalerielourde: {
        fr: "Cavalerie lourde 90-105mm",
        en: "Heavy Cavalry 90-105mm",
        es: "Caballería pesada 90-105mm"
    },

    petitvehiculemonstre: {
        fr: "Petit véhicule / monstre",
        en: "Small Vehicle / Monster",
        es: "Vehículo pequeño / Monstruo"
    },

    vehiculemonstremoyen: {
        fr: "Véhicule / monstre moyen",
        en: "Medium Vehicle / Monster",
        es: "Vehículo mediano / Monstruo"
    },

    grosvehiculemonstre: {
        fr: "Gros véhicule / monstre",
        en: "Large Vehicle / Monster",
        es: "Vehículo grande / Monstruo"
    },

    enormevehiculemonstre: {
        fr: "Énorme véhicule / monstre",
        en: "Huge Vehicle / Monster",
        es: "Vehículo enorme / Monstruo"
    },

    titanvehiculemonstre: {
        fr: "Titanesque",
        en: "Titanic",
        es: "Titánico"
    }

};



// =======================
// GENERATION TABLE TARIFS
// =======================

function genererTableTarifs() {


    const tbody = document.getElementById("tarifTableBody");

    if (!tbody) {
        console.error("Table tarifTableBody introuvable");
        return;
    }


    mettreAJourTarifLangue();


    tbody.innerHTML = "";


    let langue = currentLanguage === "english" ? "en" :
                 currentLanguage === "spanish" ? "es" : "fr";



    Object.keys(tariffs).forEach(categorie => {


        if (!categoriesLabel[categorie]) {
            console.warn("Catégorie manquante :", categorie);
            return;
        }


        let ligne = document.createElement("tr");


        ligne.innerHTML = `

            <td>
                ${categoriesLabel[categorie][langue]}
            </td>

            <td>
                ${tariffs[categorie].niveau1}h /
                ${(tariffs[categorie].niveau1 * tarifheure).toFixed(0)}${symboleDevise}
            </td>

            <td>
                ${tariffs[categorie].niveau2}h /
                ${(tariffs[categorie].niveau2 * tarifheure).toFixed(0)}${symboleDevise}
            </td>

        `;


        tbody.appendChild(ligne);

    });

}

  function scrollToTop() {
    // 1. Remonter tout en haut de la page (toujours)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
/* =====================================================
   ACCORDÉONS MAINTENANCE — H1 / H2 / H3
===================================================== */

function getMaintenanceHeader(box) {
    return box.querySelector(
        ":scope > .maintenance-header, " +
        ":scope > h1 > .maintenance-header, " +
        ":scope > h2 > .maintenance-header, " +
        ":scope > h3 > .maintenance-header"
    );
}

function getMaintenanceTitle(box) {
    /*
     * Cas 1 :
     * le H1, H2 ou H3 contient le bouton.
     */
    const directTitle = box.querySelector(
        ":scope > h1, :scope > h2, :scope > h3"
    );

    if (directTitle) {
        return directTitle;
    }

    /*
     * Cas 2 :
     * le bouton contient réellement le titre.
     */
    const header = getMaintenanceHeader(box);

    return header?.querySelector("h1, h2, h3") || null;
}

function getMaintenanceContent(box) {
    return Array.from(box.children).filter(child => {
        return (
            !child.matches("h1, h2, h3") &&
            !child.classList.contains("maintenance-header") &&
            !child.classList.contains("maintenance-box")
        );
    });
}

function getDirectMaintenanceChildren(box, level) {
    return Array.from(box.children).filter(child =>
        child.classList?.contains("maintenance-box") &&
        getMaintenanceTitle(child)?.tagName === level
    );
}

function setMaintenanceState(box, isOpen) {
    const header = getMaintenanceHeader(box);
    const arrow = header?.querySelector(".maintenance-arrow");

    box.classList.toggle("is-collapsed", !isOpen);
    box.classList.toggle("is-open", isOpen);
    box.hidden = false;
    box.removeAttribute("hidden");

    if (header) {
        header.hidden = false;
        header.setAttribute("aria-expanded", String(isOpen));
    }

    if (arrow) {
        arrow.textContent = "▼";
        arrow.classList.toggle("is-open", isOpen);
    }
}

function showOwnMaintenanceContent(box, show) {
    getMaintenanceContent(box).forEach(element => {
        element.hidden = !show;
    });
}

function openH1Box(box) {
    setMaintenanceState(box, true);
    showOwnMaintenanceContent(box, true);

    Array.from(box.children).forEach(child => {
        if (child.classList?.contains("maintenance-box")) {
            child.hidden = false;
            child.removeAttribute("hidden");
        }
    });
}

function closeH2Box(box) {
    setMaintenanceState(box, false);
    showOwnMaintenanceContent(box, false);

    getDirectMaintenanceChildren(box, "H3").forEach(h3Box => {
        h3Box.hidden = false;
        h3Box.removeAttribute("hidden");
        closeH3Box(h3Box);
    });
}

function openH2Box(box) {
    setMaintenanceState(box, true);
    showOwnMaintenanceContent(box, true);

    const h3Boxes = getDirectMaintenanceChildren(box, "H3");
    h3Boxes.forEach(closeH3Box);

    if (h3Boxes[0]) {
        openH3Box(h3Boxes[0]);
    }
}

function closeH3Box(box) {
    setMaintenanceState(box, false);
    showOwnMaintenanceContent(box, false);
}

function openH3Box(box) {
    setMaintenanceState(box, true);
    showOwnMaintenanceContent(box, true);
}

function closeSameLevelBoxes(currentBox, level) {
    const parent = currentBox.parentElement;
    if (!parent) return;

    Array.from(parent.children).forEach(box => {
        if (
            box !== currentBox &&
            box.classList?.contains("maintenance-box") &&
            getMaintenanceTitle(box)?.tagName === level
        ) {
            level === "H2" ? closeH2Box(box) : closeH3Box(box);
        }
    });
}

function getStickyTopOffset() {
    const candidates = Array.from(document.querySelectorAll(
        "header, .header-top, .info-container"
    ));

    const active = candidates.filter(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
            (style.position === "fixed" || style.position === "sticky") &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.top <= 2
        );
    });

    const topLevel = active.filter(element =>
        !active.some(other => other !== element && other.contains(element))
    );

    return topLevel.reduce((height, element) =>
        height + element.getBoundingClientRect().height, 0
    );
}

function scrollMaintenanceTitleIntoView(header) {
    if (!header) return;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const offset = getStickyTopOffset() + 12;
            const top = window.scrollY + header.getBoundingClientRect().top - offset;

            window.scrollTo({
                top: Math.max(0, top),
                behavior: "smooth"
            });
        });
    });
}

function handleMaintenanceClick(event) {
    const header = event.target.closest(".maintenance-header");
    if (!header) return;

    const box = header.closest(".maintenance-box");
    const title = box ? getMaintenanceTitle(box) : null;
    if (!box || !title) return;

    event.preventDefault();

    const level = title.tagName;

    if (level === "H1") {
        openH1Box(box);
        scrollMaintenanceTitleIntoView(header);
        return;
    }

    const isOpen = box.classList.contains("is-open");

    if (level === "H2") {
        if (isOpen) {
            closeH2Box(box);
        } else {
            closeSameLevelBoxes(box, "H2");
            openH2Box(box);
        }
    }

    if (level === "H3") {
        if (isOpen) {
            closeH3Box(box);
        } else {
            closeSameLevelBoxes(box, "H3");
            openH3Box(box);
        }
    }

    scrollMaintenanceTitleIntoView(header);
}

function initializeMaintenanceBoxes(root = document) {
    root.querySelectorAll(".maintenance-box").forEach(box => {
        const title = getMaintenanceTitle(box);
        const header = getMaintenanceHeader(box);
        if (!title || !header) return;

        header.setAttribute("type", "button");

        if (title.tagName === "H1") {
            openH1Box(box);
        } else if (title.tagName === "H2") {
            closeH2Box(box);
        } else if (title.tagName === "H3") {
            closeH3Box(box);
        }
    });
}

if (!window.__maintenanceAccordionBound) {
    document.addEventListener("click", handleMaintenanceClick);
    window.__maintenanceAccordionBound = true;
}

const maintenanceObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;

            if (node.matches?.(".maintenance-box")) {
                initializeMaintenanceBoxes(node.parentElement || document);
            } else if (node.querySelector?.(".maintenance-box")) {
                initializeMaintenanceBoxes(node);
            }
        }
    }
});

function startMaintenanceObserver() {
    if (!document.body || window.__maintenanceObserverStarted) return;
    maintenanceObserver.observe(document.body, { childList: true, subtree: true });
    window.__maintenanceObserverStarted = true;
}

/* =====================================================
   CARROUSEL
===================================================== */
let currentSlide = 0;
let carouselInterval = null;

const carouselImages = [
    "../img/carrousel/carrousel1.jpg",
    "../img/carrousel/carrousel2.jpg",
    "../img/carrousel/carrousel3.jpg",
    "../img/carrousel/carrousel4.jpg",
    "../img/carrousel/carrousel5.jpg",
    "../img/carrousel/carrousel6.jpg",
    "../img/carrousel/carrousel7.jpg",
    "../img/carrousel/carrousel8.jpg",
    "../img/carrousel/carrousel9.jpg"
];

function initializeCarousel() {
    const carousel = document.getElementById("carousel");
    const dotsContainer = document.getElementById("carousel-dots");

    if (!carousel || !dotsContainer) {
        stopAutoSlide();
        return;
    }

    if (carousel.dataset.initialized === "true") return;
    carousel.dataset.initialized = "true";

    currentSlide = 0;
    carousel.replaceChildren();
    dotsContainer.replaceChildren();

    const imagesFragment = document.createDocumentFragment();
    const dotsFragment = document.createDocumentFragment();

    carouselImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Studio PF – image ${index + 1}`;
        img.loading = index === 0 ? "eager" : "lazy";
        img.setAttribute("data-no-lightbox", "");
        img.style.flex = "0 0 100%";
        img.style.width = "100%";
        img.style.objectFit = "contain";
        img.style.objectPosition = "center 80%";
        imagesFragment.appendChild(img);

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Afficher l’image ${index + 1}`);
        dot.classList.toggle("active", index === 0);
        dot.addEventListener("click", () => goToSlide(index, true));
        dotsFragment.appendChild(dot);
    });

    carousel.appendChild(imagesFragment);
    dotsContainer.appendChild(dotsFragment);
    applyCarouselPosition(false);
    startAutoSlide();
}

function applyCarouselPosition(animate = true) {
    const carousel = document.getElementById("carousel");
    if (!carousel) return;

    carousel.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll("#carousel-dots .carousel-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
        dot.setAttribute("aria-current", index === currentSlide ? "true" : "false");
    });
}

function goToSlide(index, restartTimer = false) {
    if (!carouselImages.length) return;
    currentSlide = (index + carouselImages.length) % carouselImages.length;
    applyCarouselPosition(true);
    if (restartTimer) startAutoSlide();
}

function nextSlide() {
    goToSlide(currentSlide + 1, false);
}

function prevSlide() {
    goToSlide(currentSlide - 1, true);
}

function stopAutoSlide() {
    if (carouselInterval !== null) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function startAutoSlide() {
    stopAutoSlide();
    if (!document.getElementById("carousel") || carouselImages.length < 2) return;
    carouselInterval = window.setInterval(nextSlide, 4000);
}

/* =====================================================
   MENU MOBILE
===================================================== */
function initializeMobileMenu() {
    const button = document.getElementById("pf-menu-button");
    const nav = document.getElementById("pf-mobile-nav");
    if (!button || !nav || button.dataset.initialized === "true") return;

    button.dataset.initialized = "true";

    const closeMenu = () => {
        button.classList.remove("active");
        nav.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
    };

    button.addEventListener("click", event => {
        event.stopPropagation();
        const isOpen = nav.classList.toggle("active");
        button.classList.toggle("active", isOpen);
        button.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", event => {
        if (event.target.closest("a, button")) closeMenu();
    });

    document.addEventListener("click", event => {
        if (!nav.contains(event.target) && !button.contains(event.target)) closeMenu();
    });
}

/* =====================================================
   INITIALISATION UNIQUE
===================================================== */
function initializePageFeatures(root = document) {
   if (root.querySelector(".prix-dynamique")) {
    genererPrixPageCommission(root);
}
    initializeMaintenanceBoxes(root);
    initializeMobileMenu();
    initializeFormationForm();
    initializeLightboxGlobal();
    initThemeToggle();
    updateDebugDisplay();
    updateAgeDisplay();
    initScrollBehaviors();
    initializeCarousel();

    if (document.getElementById("tarifTableBody")) genererTableTarifs();

    if (document.getElementById("gallery") && document.getElementById("filters")) {
        const gallery = document.getElementById("gallery");
        if (gallery.dataset.initialized !== "true") {
            gallery.dataset.initialized = "true";
            initializeGalerie();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("french")?.addEventListener("click", () => setLanguage("french"));
    document.getElementById("english")?.addEventListener("click", () => setLanguage("english"));
    document.getElementById("spanish")?.addEventListener("click", () => setLanguage("spanish"));

    highlightLanguage(currentLanguage);
    changelangueinfo();

    initializePageFeatures();
    startMaintenanceObserver();
});

// À appeler après un chargement dynamique de contenu (loadPage/AJAX).
window.reinitializePageFeatures = initializePageFeatures;

function genererPrixPageCommission(root = document) {
    mettreAJourTarifLangue();

    root.querySelectorAll(".prix-dynamique").forEach(element => {
        const heures = Number.parseFloat(element.dataset.heures);

        if (!Number.isFinite(heures)) {
            console.warn(
                "Valeur data-heures invalide :",
                element.dataset.heures,
                element
            );
            return;
        }

        const montant = tarifheure * heures;

        element.textContent =
            `${montant.toFixed(0)}${symboleDevise}`;
    });
}
