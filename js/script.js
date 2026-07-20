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


  function scrollToTop() {
    // 1. Remonter tout en haut de la page (toujours)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
