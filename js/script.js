// ===============================
// GLOBAL
// ===============================
let currentPage = "/index.html";
let currentLanguage = "french";
let scrollInitialized = false;

const currentYear = new Date().getFullYear();
const pfAge = currentYear - 1987;

// ===============================
// UTILITAIRES
// ===============================
function $(id) {
    return document.getElementById(id);
}

// ===============================
// LANGUE
// ===============================
function highlightLanguage(langId) {
    document.querySelectorAll('.language-selector button').forEach(btn => {
        btn.classList.toggle('selected', btn.id === langId);
    });
}

function updateDebugDisplay() {
    const langSpan = $("currentLanguage");
    if (langSpan) {
        langSpan.textContent =
            currentLanguage === "english" ? "English" :
            currentLanguage === "spanish" ? "Español" :
            "Français";
    }

    const pageSpan = $("currentPage");
    if (pageSpan) {
        pageSpan.textContent = currentPage;
    }
}

function setLanguage(lang) {
    currentLanguage = lang;

    highlightLanguage(lang);
    updateDebugDisplay();
    changelangueinfo();

    if (!currentPage) currentPage = "/index.html";

    if (currentPage.includes("formation") && lang !== "french") {
        currentPage = "/index.html";
    }

    loadPage(currentPage);
}

// ===============================
// LOAD PAGE (FIX MAJEUR)
// ===============================
function loadPage(page) {
    if (!page) return;

    currentPage = page;

    const main = $("contenu-principal");
    if (!main) {
        console.error("contenu-principal introuvable");
        return;
    }

    main.style.opacity = "0";

    fetch(page)
        .then(res => {
            if (!res.ok) throw new Error(res.status);
            return res.text();
        })
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const newContent = doc.getElementById("contenu-principal");

            if (!newContent) {
                throw new Error("contenu-principal manquant");
            }

            main.innerHTML = "";
            main.append(...newContent.childNodes);

            window.scrollTo(0, 0);

            applyLanguageAndInit();
        })
        .catch(err => {
            console.error(err);
            main.innerHTML = `<p style="color:red">Erreur chargement</p>`;
        })
        .finally(() => {
            main.style.opacity = "1";
        });
}

// ===============================
// INIT GLOBAL
// ===============================
function applyLanguageAndInit() {

    updateDebugDisplay();

    changelanguemenu();
    changelanguefoot();
    changelanguepartenaires();

    updateAgeDisplay();

    initializeCarousel();
    initializeCardToggle();
    initScrollBehaviors();
}

// ===============================
// FOOTER (FIX CRITIQUE)
// ===============================
function changelanguefoot() {
    const foot = $("foot-contenu");
    if (!foot) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `
        <nav class="menu-mobile">
            <ul class="menu">
                <li><a href="/conditions.html" onclick="loadPage('/conditions.html');return false;">Terms</a></li>
                <li><a href="/mentionslegales.html" onclick="loadPage('/mentionslegales.html');return false;">Legal</a></li>
            </ul>
        </nav>
        `;
    } else if (currentLanguage === "spanish") {
        html = `
        <nav class="menu-mobile">
            <ul class="menu">
                <li><a href="/conditions.html" onclick="loadPage('/conditions.html');return false;">Condiciones</a></li>
                <li><a href="/mentionslegales.html" onclick="loadPage('/mentionslegales.html');return false;">Legal</a></li>
            </ul>
        </nav>
        `;
    } else {
        html = `
        <nav class="menu-mobile">
            <ul class="menu">
                <li><a href="/conditions.html" onclick="loadPage('/conditions.html');return false;">Conditions</a></li>
                <li><a href="/mentionslegales.html" onclick="loadPage('/mentionslegales.html');return false;">Mentions légales</a></li>
            </ul>
        </nav>
        `;
    }

    foot.innerHTML = html;
}

// ===============================
// MENU
// ===============================
function changelanguemenu() {
    const menu = $("menu-contenu");
    if (!menu) return;

    menu.innerHTML = `
    <ul class="menu">
        <li><a href="/index.html" onclick="loadPage('/index.html');return false;">Home</a></li>
        <li><a href="/galerie.html" onclick="loadPage('/galerie.html');return false;">Galerie</a></li>
    </ul>
    `;
}

// ===============================
// SCROLL (FIX)
// ===============================
function initScrollBehaviors() {
    if (scrollInitialized) return;
    scrollInitialized = true;

    const btn = $("scrollToTopBtn");

    const update = () => {
        const scrolled = document.documentElement.scrollTop > 10;
        if (btn) btn.style.display = scrolled ? "block" : "none";
    };

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
}

// ===============================
// CAROUSEL
// ===============================
function initializeCarousel() {
    const carousel = $("carousel");
    if (!carousel) return;

    let i = 0;
    const imgs = carousel.querySelectorAll("img");

    setInterval(() => {
        i = (i + 1) % imgs.length;
        carousel.style.transform = `translateX(-${i * 100}%)`;
    }, 4000);
}

// ===============================
// CARDS
// ===============================
function initializeCardToggle() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("collapsed");
        });
    });
}

// ===============================
// AGE
// ===============================
function updateAgeDisplay() {
    const el = $("pf-age");
    if (el) el.textContent = pfAge;
}

// ===============================
// INFO
// ===============================
let messageinfo = "";

function changelangueinfo() {
    const file =
        currentLanguage === "english" ? "/data/messageinfoUK.txt" :
        currentLanguage === "spanish" ? "/data/messageinfo-es.txt" :
        "/data/messageinfo.txt";

    fetch(file)
        .then(r => r.text())
        .then(t => {
            messageinfo = t || "";
            updateParagraph();
        });
}

function updateParagraph() {
    const p = $("infoParagraph");
    if (p) p.textContent = messageinfo;
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadPage(currentPage);
});
