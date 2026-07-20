
// Add near the top (after global variables)
const virtualPages = [
        "galerie",
    "formation",
    "peinturecommission",
    "peinturecollection",
     "quisuisje",
    "index",
        "pourquoi",
    "conditions",
    "mentionslegales",
    "horaires"
];
// =============================
// VARIABLES GLOBALES
// =============================
const info = getPageInfo();
let currentPage = info.currentPage;
let currentLanguage = "french";

function getPageInfo() {
    const path = window.location.pathname.substring(1);

    const currentPage = path.substring(path.lastIndexOf("/") + 1);
    const pageName = currentPage.substring(0, currentPage.lastIndexOf("."));
    const folder = path.substring(0, path.lastIndexOf("/"));

    return {
        folder,
        pageName,
        currentPage
    };
}

function hideCurrentPage() {
    const url = window.location.origin + "/";
    window.history.replaceState({}, "", url);
}

const currentYear = new Date().getFullYear();
const pfAge = currentYear - 1987;

function updateMeta(lang) {
    let title;
    let description;
    let keywords;
    const author = "FRASSE Pierre-François - Studio PF";

    switch (lang) {
        case "english":
            title = "Studio PF | Professional Miniature Painter & Warhammer Commissions";
            description = "Studio PF offers professional miniature painting services: Warhammer, Warhammer 40K, Age of Sigmar, collectible miniatures and competition pieces. Free quote available.";
            keywords = "professional miniature painter, miniature painting service, Warhammer painting commission, Warhammer 40K painting, Age of Sigmar painting, collectible miniatures, display miniatures, competition miniature painting, Studio PF";
            break;

        case "spanish":
            title = "Studio PF | Pintor Profesional de Miniaturas y Encargos Warhammer";
            description = "Studio PF ofrece servicios profesionales de pintura de miniaturas: Warhammer, Warhammer 40K, Age of Sigmar, figuras de colección y piezas de competición. Presupuesto gratuito.";
            keywords = "pintor profesional de miniaturas, pintura de miniaturas, encargos Warhammer, pintura Warhammer 40K, Age of Sigmar, figuras de colección, miniaturas de exposición, pintura de competición, Studio PF";
            break;

        default:
            title = "Studio PF | Peintre Figurine Professionnel & Commission Warhammer";
            description = "Studio PF réalise vos commissions de peinture figurine haut de gamme : Warhammer, 40K, Age of Sigmar, figurines de collection et pièces de concours. Devis gratuit.";
            keywords = "peintre figurine professionnel, commission peinture figurine, peinture figurine haut de gamme, peinture Warhammer, Warhammer 40K peinture, Age of Sigmar peinture, figurines de collection, figurines d'exposition, peinture concours figurine, Studio PF";
    }

    document.title = title;

    const metaValues = { description, author, keywords };
    Object.entries(metaValues).forEach(([name, content]) => {
        const meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) meta.setAttribute("content", content);
    });
}
// =============================
// UTILITAIRES
// =============================
function highlightLanguage(langId) {
    document.querySelectorAll('.language-selector button').forEach(btn => {
        btn.classList.toggle('selected', btn.id === langId);
    });
}

function updateDebugDisplay() {
    const langSpan = document.getElementById("currentLanguage");
    if (langSpan) {
        let displayLang = "Français";
        if (currentLanguage === "english") displayLang = "English";
        if (currentLanguage === "spanish") displayLang = "Español";
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


    loadPage(currentPage);
}


// =============================
// CHARGEMENT DYNAMIQUE DES PAGES
// =============================
async function loadPage(page = "index.html") {
    const mainContainer = document.getElementById("contenu-principal");

    if (!mainContainer) {
        console.error("Erreur : #contenu-principal introuvable.");
        return;
    }

    // Page par défaut
    if (typeof page !== "string" || page.trim() === "") {
        page = "index.html";
    }

    page = page.trim();
    currentPage = page;

    mainContainer.style.opacity = "0";

    try {
        const response = await fetch(page, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `Impossible de charger "${page}" — erreur HTTP ${response.status}`
            );
        }

        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newContent = doc.querySelector("#contenu-principal");

        if (!newContent) {
            throw new Error(
                `La balise #contenu-principal est absente de "${page}".`
            );
        }

        // 1. Injection du contenu de la page
        mainContainer.innerHTML = newContent.innerHTML;

        // 2. Traduction et initialisations propres à la page
        try {
            if (typeof applyLanguageAndInit === "function") {
                applyLanguageAndInit();
            }
        } catch (initError) {
            console.error(
                `Erreur pendant applyLanguageAndInit() pour "${page}" :`,
                initError
            );
        }

        /*
         * applyLanguageAndInit() peut remplacer une nouvelle fois
         * le contenu avec main.innerHTML = html.
         *
         * On initialise donc les blocs APRÈS cette fonction.
         */
        if (typeof initializeMaintenanceBoxes === "function") {
            initializeMaintenanceBoxes();
        }

        if (typeof initializeLightboxGlobal === "function") {
            initializeLightboxGlobal();
        }

        if (typeof updateAgeDisplay === "function") {
            updateAgeDisplay();
        }

        // 3. Retour en haut
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    } catch (error) {
        console.error(`Erreur dans loadPage("${page}") :`, error);

        mainContainer.innerHTML = `
            <div class="center">
                <div class="maintenance-box ajust">

                    <h2>⚠️ Erreur de chargement</h2>

                    <p>
                        La page <strong>${page}</strong>
                        n'a pas pu être chargée.
                    </p>

                    <button
                        type="button"
                        class="button"
                        onclick="loadPage('index.html')"
                    >
                        🏠 Retour à l'accueil
                    </button>

                </div>
            </div>
        `;
    } finally {
        mainContainer.style.opacity = "1";
    }
}
// =============================
// INIT GLOBAL
// =============================
function applyLanguageAndInit() {

    if (typeof initializeLightboxGlobal === "function") {
        initializeLightboxGlobal();
    }

    if (typeof initThemeToggle === "function") {
        initThemeToggle();
    }
    if (typeof initializeMaintenanceBoxes === "function") {
        initializeMaintenanceBoxes();
    }


    if (typeof updateBackgroundButton === "function") {
        updateBackgroundButton();
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

    // =============================
    // INITIALISATION PAR PAGE
    // =============================

    if (currentPage.includes("galerie")) {


        if (typeof initializeGalerie === "function") {
            initializeGalerie();
        }
    }

 
        if (typeof initializeFormationForm === "function") {
            initializeFormationForm();
        }
    }


  

  
        mainContainer.innerHTML = newContent.innerHTML;


window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
});
}


   function envoyerMailForma(form) {
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;
  const cours = document.getElementById("cours").value;
  const message = document.getElementById("message").value || "Aucun message";
  const adresse = document.getElementById("adresse").value;
  const cp = document.getElementById("cp").value;
  const ville = document.getElementById("ville").value;
  const pays = document.getElementById("pays").value;

  const subject = `Demande de cours de peinture - ${nom} ${prenom}`;

  const body =
`Bonjour,

Voici ma demande de cours de peinture (${cours}) :

${nom}
${prenom}
${adresse}
${cp}
${ville}
${pays}
${email}
${telephone}

${message}

Cordialement,
${prenom} ${nom}`;

  const mailtoLink =
    `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}
   

// =============================
// INIT AUTO
// =============================
document.addEventListener("DOMContentLoaded", () => {
    loadPage(currentPage);
});



// ────────────────────────────────────────────────
// Utilitaires de base
// ────────────────────────────────────────────────




// ────────────────────────────────────────────────
// Scroll / boutons flottants
// ────────────────────────────────────────────────

function initScrollBehaviors() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
  
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




// ────────────────────────────────────────────────
// Formulaire de demande de formation
// ────────────────────────────────────────────────

function initializeFormationForm() {

    const form = document.getElementById("formationForm");
    if (!form) return;

    // Supprime anciens listeners jQuery si présents
    if (typeof $ !== "undefined") {
        $(form).off("submit");
    }

    // ⚠️ évite d'ajouter plusieurs listeners si la fonction est rappelée
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
        body += `${data.nom}\n${data.prenom}\n${data.adresse}\n${data.cp} ${data.ville}\n${data.pays}\n${data.email}\n${data.telephone}\n\n`;
        body += `Message :\n${data.message}\n\nCordialement,\n${data.prenom} ${data.nom}`;

        const mailtoUrl = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // ✅ plus propre que location.href
        window.open(mailtoUrl, "_self");
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
    const gallery = document.getElementById("gallery");
    const filters = document.getElementById("filters");

    // La galerie n'existe que sur galerie.html
    if (!gallery || !filters) {
        console.warn("Éléments #gallery ou #filters introuvables.");
        return;
    }

    // Vérifie que appelimg() existe
    if (typeof appelimg !== "function") {
        console.error("La fonction appelimg() est introuvable.");
        gallery.innerHTML = "<p>Impossible de charger la galerie.</p>";
        return;
    }

    const filenames = appelimg();
    const base = "img/";

    if (!Array.isArray(filenames) || filenames.length === 0) {
        console.warn("Aucune image retournée par appelimg().");
        gallery.innerHTML = "<p>Aucune image disponible dans la galerie.</p>";
        return;
    }

    const categorized = {};

    filenames.forEach(file => {
        if (typeof file !== "string" || file.trim() === "") {
            return;
        }

        const cleanFile = file.trim();
        const [folder] = cleanFile.split("/");

        if (!folder) {
            return;
        }

        if (!categorized[folder]) {
            categorized[folder] = [];
        }

        categorized[folder].push(base + cleanFile);
    });

    // Catégorie contenant toutes les images
    categorized.Tous = filenames
        .filter(file => typeof file === "string" && file.trim() !== "")
        .map(file => base + file.trim());

    filters.innerHTML = "";
    gallery.innerHTML = "";

    function showImages(category) {
        gallery.innerHTML = "";

        const images = categorized[category];

        if (!Array.isArray(images) || images.length === 0) {
            gallery.innerHTML = `
                <p>Aucune image disponible dans cette catégorie.</p>
            `;
            return;
        }

        const fragment = document.createDocumentFragment();

        images.forEach(src => {
            const imageContainer = document.createElement("div");
            imageContainer.className = "gallery-item";

            const img = document.createElement("img");

            img.src = src;
            img.alt = `Peinture figurine Studio PF – ${category}`;
            img.className = "gallery-img";
            img.loading = "lazy";
            img.decoding = "async";

            img.addEventListener("error", () => {
                console.warn("Image introuvable :", src);
                imageContainer.remove();
            });

            imageContainer.appendChild(img);
            fragment.appendChild(imageContainer);
        });

        gallery.appendChild(fragment);

        // Réinitialisation de la lightbox après ajout des images
        if (typeof initializeLightboxGlobal === "function") {
            initializeLightboxGlobal();
        }
    }

    // Tous apparaît en premier
    const categories = Object.keys(categorized).sort((a, b) => {
        if (a === "Tous") return -1;
        if (b === "Tous") return 1;

        return a.localeCompare(b, "fr");
    });

    categories.forEach(category => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);

        button.className = category
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");

        if (category === "Tous") {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            filters.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            showImages(category);
        });

        filters.appendChild(button);
    });

    // Affichage initial
    showImages("Tous");
}

function showImages(category) {
    gallery.innerHTML = "";

    const images = categorized[category];

    if (!images || images.length === 0) {
        gallery.innerHTML = `
            <p>Aucune image disponible dans cette catégorie.</p>
        `;
        return;
    }

    const fragment = document.createDocumentFragment();

    images.forEach(src => {
        const img = document.createElement("img");

        img.src = src;
        img.alt = `Peinture figurine Studio PF – ${category}`;
        img.className = "gallery-img";
        img.loading = "lazy";

        img.addEventListener("error", () => {
            console.warn("Image introuvable :", src);
            img.remove();
        });

        fragment.appendChild(img);
    });

    gallery.appendChild(fragment);

    if (typeof initializeLightboxGlobal === "function") {
        initializeLightboxGlobal();
    }
}

// Affichage initial
showImages("Tous");


function initializeLightboxGlobal() {
    const images = document.querySelectorAll(
        "#contenu-principal img"
    );

    images.forEach(function (image) {
        // Évite d'ajouter plusieurs fois l'événement
        if (image.dataset.lightboxInitialized === "true") {
            return;
        }

        image.dataset.lightboxInitialized = "true";

        image.addEventListener("click", function () {
            console.log("Image cliquée :", image.src);

            // Ton code d'ouverture de lightbox ici
        });
    });
}
function initializeMaintenanceBoxes() {
    const boxes = document.querySelectorAll(
        "#contenu-principal .maintenance-box"
    );

    boxes.forEach(function (box, index) {
        const header = box.querySelector(".maintenance-header");
        const content = box.querySelector(".maintenance-content");
        const arrow = box.querySelector(".maintenance-arrow");

        if (!header || !content) return;

        // Premier bloc ouvert, les autres fermés
        const doitEtreOuvert = index === 0;

        box.classList.toggle(
            "is-collapsed",
            !doitEtreOuvert
        );

        header.setAttribute(
            "aria-expanded",
            doitEtreOuvert ? "true" : "false"
        );

        content.hidden = !doitEtreOuvert;

        if (arrow) {
            arrow.textContent = doitEtreOuvert ? "▲" : "▼";
        }
    });
}
 


      function scrollToTop() {
    // 1. Remonter tout en haut de la page (toujours)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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
document.addEventListener("click", function (event) {
    const header = event.target.closest(".maintenance-header");

    if (!header) return;

    const box = header.closest(".maintenance-box");
    if (!box) return;

    const content = box.querySelector(".maintenance-content");
    const arrow = box.querySelector(".maintenance-arrow");

    if (!content) return;

    const doitOuvrir = box.classList.contains("is-collapsed");

    box.classList.toggle("is-collapsed", !doitOuvrir);

    header.setAttribute(
        "aria-expanded",
        doitOuvrir ? "true" : "false"
    );

    content.hidden = !doitOuvrir;

    if (arrow) {
        arrow.textContent = doitOuvrir ? "▲" : "▼";
    }
});
