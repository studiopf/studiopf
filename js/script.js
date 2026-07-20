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
    let currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";
    const pageName = currentPage.substring(0, currentPage.lastIndexOf(".")) || "index";
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
    if (pageSpan) pageSpan.textContent = currentPage || "inconnue";
}

function isMobile() {
    return window.innerWidth <= 768;
}

function updateAgeDisplay() {
    const el = document.getElementById("pf-age");
    if (el) el.textContent = pfAge;
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

    if (typeof page !== "string" || page.trim() === "") {
        page = "index.html";
    }
    page = page.trim();
    currentPage = page.replace(".html", "");

    mainContainer.style.opacity = "0";

    try {
        const response = await fetch(page, { cache: "no-cache" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newContent = doc.querySelector("#contenu-principal");

        if (!newContent) {
            throw new Error(`#contenu-principal absent dans "${page}"`);
        }

        mainContainer.innerHTML = newContent.innerHTML;

        // Initialisations globales et spécifiques
        applyLanguageAndInit();

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    } catch (error) {
        console.error(`Erreur dans loadPage("${page}") :`, error);
        mainContainer.innerHTML = `
            <div class="center">
                <div class="maintenance-box ajust">
                    <h2>⚠️ Erreur de chargement</h2>
                    <p>La page <strong>${page}</strong> n'a pas pu être chargée.</p>
                    <button type="button" class="button" onclick="loadPage('index.html')">
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
// INITIALISATION
// =============================
function applyLanguageAndInit() {
    updateMeta(currentLanguage);
    updateDebugDisplay();
    updateAgeDisplay();

    if (typeof initializeLightboxGlobal === "function") initializeLightboxGlobal();
    if (typeof initThemeToggle === "function") initThemeToggle();
    if (typeof initializeMaintenanceBoxes === "function") initializeMaintenanceBoxes();
    if (typeof updateBackgroundButton === "function") updateBackgroundButton();
    if (typeof initScrollBehaviors === "function") initScrollBehaviors();

    // Initialisations spécifiques par page
    if (currentPage.includes("galerie") && typeof initializeGalerie === "function") {
        initializeGalerie();
    }
    if (typeof initializeFormationForm === "function") {
        initializeFormationForm();
    }
}

// =============================
// FORMULAIRE FORMATION
// =============================
function initializeFormationForm() {
    const form = document.getElementById("formationForm");
    if (!form) return;

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
        window.location.href = mailtoUrl;
    }
}

// =============================
// INIT AUTO
// =============================
document.addEventListener("DOMContentLoaded", () => {
    loadPage(currentPage);
});
