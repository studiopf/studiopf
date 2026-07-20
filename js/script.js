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
let currentLanguage = "french";

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
    currentLanguage = lang;

    highlightLanguage(lang);
    updateDebugDisplay();



}

function highlightLanguage(langId) {
    document.querySelectorAll('.language-selector button').forEach(btn => {
        btn.classList.toggle('selected', btn.id === langId);
    });
}

// =============================
// FORMULAIRE FORMATION
// =============================
function initializeFormationForm() {
    const form = document.getElementById("formationForm");
    if (!form) return;

    // Retirer les anciens listeners pour éviter les doublons
    form.removeEventListener("submit", handleSubmit);
    form.addEventListener("submit", handleSubmit);

    function handleSubmit(e) {
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
    }
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
    const base = 'img/';
    const gallery = document.getElementById('gallery');
    const filters = document.getElementById('filters');

    /*
    La galerie n'existe pas forcément sur toutes les pages.
    Dans ce cas, on initialise seulement la lightbox globale.
    */
    initializeLightboxGlobal();

    if (!gallery || !filters) {
        console.warn("Éléments de galerie absents sur cette page.");
        return;
    }

    const categorized = {};

    filenames.forEach(file => {
        const [folder] = file.split('/');

        if (!folder) return;

        if (!categorized[folder]) {
            categorized[folder] = [];
        }

        categorized[folder].push(base + file);
    });

    // Catégorie contenant toutes les images
    categorized.Tous = filenames.map(file => base + file);

    // Création des boutons de filtres
    filters.innerHTML = "";

    Object.keys(categorized).sort().forEach(category => {
        const button = document.createElement('button');

        button.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);

        button.className = category.toLowerCase();

        if (category === 'Tous') {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            filters
                .querySelectorAll('button')
                .forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            showImages(category);
        });

        filters.appendChild(button);
    });

    function showImages(category) {
        gallery.innerHTML = "";

        if (!categorized[category]) return;

        const fragment = document.createDocumentFragment();

        categorized[category].forEach(src => {
            const img = document.createElement('img');

            img.src = src;
            img.alt = `Peinture figurine Studio PF – ${category}`;
            img.className = 'gallery-img';
            img.loading = 'lazy';

            /*
            Il n'est plus nécessaire d'ajouter un événement click ici.
            La lightbox globale détectera automatiquement cette image.
            */

            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
    }

    // Affichage initial
    showImages('Tous');
}
function initializeLightboxGlobal() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!lightbox || !lightboxImg) {
        console.warn("Éléments de la lightbox manquants.");
        return;
    }

    /*
    Évite d'installer plusieurs fois les événements
    lorsque initializeGalerie() est rappelée.
    */
    if (document.body.dataset.lightboxInitialized === "true") {
        return;
    }

    document.body.dataset.lightboxInitialized = "true";

    /*
    Ouverture de la lightbox pour toutes les images du site,
    y compris les images ajoutées dynamiquement.
    */
    document.addEventListener('click', event => {
        const img = event.target.closest('img');

        if (!img) return;

        // Ne pas ouvrir la lightbox en cliquant sur son image
        if (img.id === 'lightbox-img') return;

        // Permet d'exclure certaines images
        if (img.hasAttribute('data-no-lightbox')) return;

        // Ignore les images situées dans un bouton
        if (img.closest('button')) return;

        // Ignore les images situées dans un lien externe
        const parentLink = img.closest('a');

        if (
            parentLink &&
            parentLink.getAttribute('href') &&
            !parentLink.hasAttribute('data-lightbox')
        ) {
            return;
        }

        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || "Image agrandie";

        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    });

    // Fermeture en cliquant sur le fond ou l'image agrandie
    lightbox.addEventListener('click', event => {
        if (
            event.target === lightbox ||
            event.target === lightboxImg
        ) {
            closeLightbox();
        }
    });

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', event => {
        if (
            event.key === 'Escape' &&
            lightbox.classList.contains('active')
        ) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');

        /*
        On efface l'image après l'animation de fermeture.
        */
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) {
                lightboxImg.src = "";
                lightboxImg.alt = "";
            }
        }, 300);
    }
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
document.addEventListener("DOMContentLoaded", function () {

    const pfButton = document.getElementById("pf-menu-button");
    const pfNav = document.getElementById("pf-mobile-nav");

    if (!pfButton || !pfNav) return;

    function fermerMenu() {
        pfButton.classList.remove("active");
        pfNav.classList.remove("active");
        pfButton.setAttribute("aria-expanded", "false");
    }

    // Ouvrir ou fermer le menu
    pfButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const menuOuvert = pfNav.classList.toggle("active");
        pfButton.classList.toggle("active", menuOuvert);
        pfButton.setAttribute("aria-expanded", menuOuvert);
    });

    // Fermer avant l'exécution de loadPage()
    pfNav.addEventListener("click", function (event) {

        const elementClique = event.target.closest("a, button");

        if (elementClique) {
            fermerMenu();
        }

    }, true);

    // Fermer en cliquant à l'extérieur
    document.addEventListener("click", function (event) {

        if (
            !pfNav.contains(event.target) &&
            !pfButton.contains(event.target)
        ) {
            fermerMenu();
        }

    });

});
function initScrollBehaviors() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    const scrollBtnTo = document.getElementById("scrollTotal");
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
document.addEventListener("click", function (event) {
    const header = event.target.closest(".maintenance-header");

    if (!header) return;

    const box = header.closest(".maintenance-box");

    if (!box) return;

    const content = box.querySelector(".maintenance-content");
    const arrow = box.querySelector(".maintenance-arrow");

    const isCurrentlyCollapsed = box.classList.contains("is-collapsed");

    if (isCurrentlyCollapsed) {
        box.classList.remove("is-collapsed");
        header.setAttribute("aria-expanded", "true");

        if (content) {
            content.hidden = false;
        }

        if (arrow) {
            arrow.textContent = "▲";
        }
    } else {
        box.classList.add("is-collapsed");
        header.setAttribute("aria-expanded", "false");

        if (content) {
            content.hidden = true;
        }

        if (arrow) {
            arrow.textContent = "▼";
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if (typeof changelangueinfo === "function") {
        changelangueinfo();
    }

    if (typeof initializeLightboxGlobal === "function") {
        initializeLightboxGlobal();
    }

    if (typeof initThemeToggle === "function") {
        initThemeToggle();
    }

    if (typeof updateDebugDisplay === "function") {
        updateDebugDisplay();
    }

    if (typeof updateAgeDisplay === "function") {
        updateAgeDisplay();
    }

    if (typeof initScrollBehaviors === "function") {
        initScrollBehaviors();
    }

    if (typeof hideCurrentPage === "function") {
        hideCurrentPage();
    }

    if (
        document.getElementById("gallery") &&
        document.getElementById("filters") &&
        typeof initializeGalerie === "function"
    ) {
        initializeGalerie();
    }
});
