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

