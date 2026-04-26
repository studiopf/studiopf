// script.js — Version corrigée, consolidée et robuste — Mars 2026
// ===============================
// GLOBAL
// ===============================
let currentPage = "/index.html";
let currentLanguage = "french";
let scrollInitialized = false;

const currentYear = new Date().getFullYear();
const pfAge = currentYear - 1987;
// ===============================
// UTILITAIRE
// ===============================
function $(id) {
    return document.getElementById(id);
}

// ────────────────────────────────────────────────
// Utilitaires de base
// ────────────────────────────────────────────────


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


function isMobile() {
    return window.innerWidth <= 768;
}

function updateAgeDisplay() {
    const el = document.getElementById("pf-age");
    if (el) el.textContent = pfAge;
}

// ===============================
// LOAD PAGE (STABLE)
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
            if (!res.ok) throw new Error("Erreur HTTP " + res.status);
            return res.text();
        })
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const newContent = doc.getElementById("contenu-principal");

            if (!newContent) {
                throw new Error("contenu-principal absent dans " + page);
            }

            // nettoyage complet
            main.innerHTML = "";
            main.append(...newContent.childNodes);

            window.scrollTo(0, 0);

            applyLanguageAndInit();
        })
        .catch(err => {
            console.error(err);
            main.innerHTML = `<p style="color:red">Erreur de chargement</p>`;
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

   function changelangueindex() {
    const main = document.getElementById("contenu-principal");
   

    let html = "";

    if (currentLanguage === "english") {
        html = `
        <div class="carousel-container">
        <div class="carousel" id="carousel">
            <img src="https://studiopf.fr/carroussel/carrousel1.jpg" alt="Studio PF"  loading="eager">
            <img src="https://studiopf.fr/carroussel/carrousel2.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel3.jpg" alt="Studio PF"  loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel4.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel5.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel6.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel7.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel8.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel9.jpg" alt="Studio PF" loading="eager">
        </div>

    </div>
            <p>I'll be back very soon with new painted adventures!</p>
            <p>Reopening of availability and orders</p>
            <p class="highlight">→ early January 2027 ←</p>
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
        <div class="carousel-container">
        <div class="carousel" id="carousel">
            <img src="https://studiopf.fr/carroussel/carrousel1.jpg" alt="Studio PF"  loading="eager">
            <img src="https://studiopf.fr/carroussel/carrousel2.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel3.jpg" alt="Studio PF"  loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel4.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel5.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel6.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel7.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel8.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel9.jpg" alt="Studio PF" loading="eager">
        </div>

    </div>
            <p>¡Volveré muy pronto con nuevas aventuras pintadas!</p>
            <p>Reapertura de disponibilidad y pedidos</p>
            <p class="highlight">→ principios de Enero de 2027 ←</p>
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
        <div class="carousel-container">
        <div class="carousel" id="carousel">
            <img src="https://studiopf.fr/carroussel/carrousel1.jpg" alt="Studio PF"  loading="eager">
            <img src="https://studiopf.fr/carroussel/carrousel2.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel3.jpg" alt="Studio PF"  loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel4.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel5.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel6.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel7.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel8.jpg" alt="Studio PF" loading="eager">
                        <img src="https://studiopf.fr/carroussel/carrousel9.jpg" alt="Studio PF" loading="eager">
        </div>

    </div>
            <p>Je reviens très prochainement avec de nouvelles aventures peintes !</p>
            <p>Réouverture des disponibilités et prises de commande</p>
            <p class="highlight">→ début Janvier 2027 ←</p>
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
// Menus multilingues
// ────────────────────────────────────────────────

function changelanguemenu() {
    const menu = document.getElementById("menu-contenu");
    if (!menu) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `<ul class="menu">
        
            <li><a href="/galerie.html" onclick="loadPage('/galerie.html');return false;">Gallery 🖼️</a></li>
        </ul>`;
    } else if (currentLanguage === "spanish") {
        html = `<ul class="menu">
            
            <li><a href="/galerie.html" onclick="loadPage('/galerie.html');return false;">Galería 🖼️</a></li>
        </ul>`;
    } else {
        html = `<ul class="menu">
         
            <li><a href="/formation.html" onclick="loadPage('/formation.html');return false;">Formation 📚</a></li>
            <li><a href="/galerie.html" onclick="loadPage('/galerie.html');return false;">Galerie 🖼️</a></li>
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
     <nav class="menu-mobile">
        <ul class="menu">
            <li><a href="/conditions.html" onclick="loadPage('/conditions.html'); return false;">General Terms and Conditions 📜</a></li>
            <li><a href="/mentionslegales.html" onclick="loadPage('/mentionslegales.html'); return false;">Legal Notice 💼</a></li>
            <li><a href="/horaires.html" onclick="loadPage('/horaires.html'); return false;">Opening Hours & Closures 🕖</a></li>
    
        </ul>
                </nav>
                <button id="scrollToTopBtn" title="Back to top ⬆️" onclick="scrollToTop()">↑</button>
<button id="scrollTotal" title="View Total" onclick="scrollTotal()">View Total</button>

<div class="footer">
  <strong>STUDIO PF</strong><br>
  Frasse Pierre-François<br>
  17 route de Lare 42510 Saint-Georges-de-Baroille<br><br>

  <p>Contact 📧 : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> - Phone 📞 : <a href="tel:+33775860837">07 75 86 08 37</a></p>
  <p>© 2026 Studio PF. All rights reserved.</p>
</div>

<p>Showcase website created by <strong>Studio PF</strong> - © 2026 All rights reserved.</p>

    `;
} 
else if (currentLanguage === "spanish") {
    html = `
     <nav class="menu-mobile">
        <ul class="menu">
            <li><a href="/conditions.html" onclick="loadPage('/conditions.html'); return false;">Condiciones Generales de Venta 📜</a></li>
            <li><a href="/mentionslegales.html" onclick="loadPage('/mentionslegales.html');return false;">Aviso Legal 💼</a></li>
            <li><a href="/horaires.html" onclick="loadPage('/horaires.html'); return false;">Horarios de Apertura y Cierres 🕖</a></li>
 
        </ul>
                </nav>
                <button id="scrollToTopBtn" title="Volver arriba ⬆️" onclick="scrollToTop()">↑</button>
<button id="scrollTotal" title="Ver total" onclick="scrollTotal()">Ver total</button>

<div class="footer">
  <strong>STUDIO PF</strong><br>
  Frasse Pierre-François<br>
  17 route de Lare 42510 Saint-Georges-de-Baroille<br><br>

  <p>Contacto 📧 : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> - Teléfono 📞 : <a href="tel:+33775860837">07 75 86 08 37</a></p>
  <p>© 2026 Studio PF. Todos los derechos reservados.</p>
</div>

<p>Sitio web de presentación creado por <strong>Studio PF</strong> - © 2026 Todos los derechos reservados.</p>

    `;
    } else {
        html = ` 
             <div id="foot-contenu">
        
 <nav class="menu-mobile">
            <ul class="menu">
                     <li><a href="conditions.html"  onclick="loadPage('conditions.html'); return false;">Conditions générales de vente 📜</a></li>
        <li><a href="mentionslegales.html"  onclick="loadPage('mentionslegales.html'); return false;">Mentions Légales 💼</a></li>
        <li><a href="horaires.html"  onclick="loadPage('horaires.html'); return false;">Horaires d'ouverture et Fermetures 🕖</a></li>
                
</ul>  
        </nav>

   
       
        <button id="scrollToTopBtn" title="Retour en haut ⬆️" onclick="scrollToTop()">↑</button>
            <button id="scrollTotal" title="Voir Total" onclick="scrollTotal()">Voir Total</button>
              <div class="footer">
      <strong>STUDIO PF</strong><br>
      Frasse Pierre-François<br>
      17 route de Lare 42510 Saint-Georges-de-Baroille<br><br>
        <p>Contact 📧 : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> - Téléphone 📞 : <a href="tel:+33775860837">07 75 86 08 37</a></p>
        <p>© 2026 Studio PF. Tous droits réservés.</p>

     </div>  
        <p>Site Vitrine créé par <strong>Studio PF</strong> - @ 2026 Tous droits réservés. </p>
        <!-- Bouton de retour en haut -->
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
            <p>Buy second-hand for less<br>5% discount:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div>
        <div class="cardpartenaire">
            <a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-maxireve.png" alt="Maxi Rêve Logo">
            </a>
        </div> 
        <div class="ppartenaire">
            <p>Your dream miniatures at a huge discount!<br>up to -19%:<br><strong>MAXIPF</strong></p>
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
            <p>High-quality pre-supported STL miniatures for your sci-fi and fantasy tabletop battles.<br>-10% on your order<br>with the promo code:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div>
        <div class="cardpartenaire">
            <a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-wargamesceneries.png" alt="Wargame Sceneries Logo">
            </a>
        </div>
        <div class="ppartenaire">
            <p>3D printed scenery for immersive gaming sessions.<br><br><strong></strong></p>
        </div>
    </div>

</div>
    `;
} 
else if (currentLanguage === "spanish") {
    html = `
      <h3>Nuestros Socios</h3>

<div class="partenaires-container">
    
    <div>
        <div class="cardpartenaire">
            <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-totalwar.png" alt="Logo de Total Wargames">
            </a>
        </div>
        <div class="ppartenaire">
            <p>Compra de segunda mano más barato<br>5% de descuento:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div>
        <div class="cardpartenaire">
            <a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-maxireve.png" alt="Logo de Maxi Rêve">
            </a>
        </div> 
        <div class="ppartenaire">
            <p>¡Tus miniaturas soñadas con grandes descuentos!<br>hasta -19%:<br><strong>MAXIPF</strong></p>
        </div>
    </div>
       
</div>

<div class="partenaires-container">
    
    <div>
        <div class="cardpartenaire">
            <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-mezgike.png" alt="Logo de Mezgike">
            </a>
        </div> 
        <div class="ppartenaire">
            <p>Impresionantes miniaturas STL pre-soportadas para tus batallas de mesa de ciencia ficción y fantasía.<br>-10% en tu pedido<br>con el código promocional:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div>
        <div class="cardpartenaire">
            <a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-wargamesceneries.png" alt="Logo de Wargame Sceneries">
            </a>
        </div>
        <div class="ppartenaire">
            <p>Escenografía impresa en 3D para partidas inmersivas.<br><br><strong></strong></p>
        </div>
    </div>

</div>
    `;
    } else {
        html = `      <h3>Nos Partenaires</h3>
   
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
   

                 <div>
          <div class="cardpartenaire">
          <a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-wargamesceneries.png" alt="Wargame Sceneries Logo">        </a>
          </div>
              <div class="ppartenaire">
             <p>Des décors en impression 3D pour des parties immersives.<br><br> <strong></strong></p>
             </div>
        </div>
 `;
    }

    partenaires.innerHTML = html;
}


// ────────────────────────────────────────────────
// Page d'accueil (maintenance)
// ────────────────────────────────────────────────


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
        'niv3/nivtrois26.png','niv3/nivtrois27.png','niv3/nivtrois28.png','niv3/nivtrois29.png','niv3/nivtrois30.png',
        // Niveau Expo
        'niv4/nivquatre1.png','niv4/nivquatre2.png','niv4/nivquatre3.png','niv4/nivquatre4.png','niv4/nivquatre5.png',
        'niv4/nivquatre6.png','niv4/nivquatre7.png','niv4/nivquatre8.png','niv4/nivquatre9.png','niv4/nivquatre10.png','niv4/nivquatre11.png',
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
let html = "";
    if (currentLanguage === "english") {
        html = `
       
          <h1>✨ Legal Notice ✨</h1>
<p><strong>Website:</strong> studiopf.fr<br> <strong>Last updated:</strong> January 19, 2026</p>

<div class="section">
  <h2>📌 Publisher</h2> 
  <p>
    <strong>Studio PF: Miniature Painting</strong><br>
    Pierre-François Frasse<br>
    <!-- Status: Sole proprietorship<br>
    SIRET: 832 040 380 00020<br>-->
    Address: 17 route de lare, 42510 Saint Georges de Baroille, France<br>
    Phone: +33 7 75 86 08 37<br>
    Email: <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="section"> 
  <h2>💻 Hosting Provider</h2>
  <p>
    GitHub Inc.<br>
    88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA<br>
    Website: <a href="https://pages.github.com" target="_blank">https://pages.github.com</a>
  </p>
  <p>
    Domain registered with: Gandi SAS<br>
    63-65 boulevard Massena, 75013 Paris, France<br>
    Website: <a href="https://www.gandi.net" target="_blank">https://www.gandi.net</a>
  </p> 
</div> 

<div class="section">
  <h2>🔒 Intellectual Property</h2> 
  <p>
    All content on this website (texts, images, videos, logos, icons, etc.) is the exclusive property of Studio PF, unless otherwise stated. Any reproduction or use without prior written permission is prohibited.
  </p> 
</div> 

<div class="section">
  <h2>📊 Personal Data</h2>
  <p>
    The data collected is used solely for customer relationship purposes. In accordance with GDPR, you may request access to, modification, or deletion of your data by email at:
    <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="section"> 
  <h2>🌐 Cookies</h2>
  <p>
    This website may use cookies to improve navigation and statistical analysis. You can disable cookies in your browser settings.
  </p> 
</div>

<p>
  Showcase website created by <strong>Studio PF</strong> – Last updated: 03/09/2026 – All rights reserved.
</p>
        `;
    }
    else if (currentLanguage === "spanish") {
      html = `
           
          <h1>✨ Aviso Legal ✨</h1>
<p><strong>Sitio web:</strong> studiopf.fr<br> <strong>Fecha de actualización:</strong> 19 de enero de 2026</p>

<div class="section">
  <h2>📌 Editor</h2> 
  <p>
    <strong>Studio PF: Pintura de Miniaturas</strong><br>
    Pierre-François Frasse<br>
    <!-- Estado: Autónomo<br>
    SIRET: 832 040 380 00020<br>-->
    Dirección: 17 route de lare, 42510 Saint Georges de Baroille, Francia<br>
    Teléfono: +33 7 75 86 08 37<br>
    Correo electrónico: <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="section"> 
  <h2>💻 Proveedor de alojamiento</h2>
  <p>
    GitHub Inc.<br>
    88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, EE. UU.<br>
    Sitio web: <a href="https://pages.github.com" target="_blank">https://pages.github.com</a>
  </p>
  <p>
    Dominio registrado en: Gandi SAS<br>
    63-65 boulevard Massena, 75013 París, Francia<br>
    Sitio web: <a href="https://www.gandi.net" target="_blank">https://www.gandi.net</a>
  </p> 
</div> 

<div class="section">
  <h2>🔒 Propiedad intelectual</h2> 
  <p>
    Todos los contenidos del sitio (textos, imágenes, vídeos, logotipos, iconos, etc.) son propiedad exclusiva de Studio PF, salvo indicación contraria. Queda prohibida cualquier reproducción o uso sin autorización previa por escrito.
  </p> 
</div> 

<div class="section">
  <h2>📊 Datos personales</h2>
  <p>
    Los datos recopilados se utilizan únicamente con fines de relación con el cliente. De acuerdo con el RGPD, puede solicitar el acceso, la modificación o la eliminación de sus datos enviando un correo electrónico a:
    <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="section"> 
  <h2>🌐 Cookies</h2>
  <p>
    El sitio puede utilizar cookies para mejorar la navegación y el análisis estadístico. Puede desactivar las cookies en la configuración de su navegador.
  </p> 
</div>

<p>
  Sitio web escaparate creado por <strong>Studio PF</strong> – Última actualización: 09/03/2026 – Todos los derechos reservados.
</p>
        `;
    }
    // français = version par défaut → rien à faire, le HTML statique suffit
else { // français (par défaut)
      html = `
          <h1>✨ Mentions Légales ✨</h1>
<p><strong>Site :</strong> studiopf.fr<br> <strong>Date de mise à jour :</strong> 19 janvier 2026</p> <div class="section">
  <h2>📌 Éditeur</h2> 
  <p> <strong>Studio PF : Peinture Figurine</strong><br>
    Pierre-François Frasse<br>
    <!-- Statut : Micro-entreprise<br>
   SIRET : 832 040 380 00020<br>-->
    Adresse : 17 route de lare, 42510 Saint Georges de Baroille, France<br>
    Téléphone : 07 75 860 837<br>
    E-mail : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> </p> </div>
  <div class="section"> 
    <h2>💻 Hébergeur</h2>
    <p> GitHub Inc.<br> 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA<br>
      Site : <a href="https://pages.github.com" target="_blank">https://pages.github.com</a> </p>
    <p> Domaine enregistré chez : Gandi SAS<br> 63-65 boulevard Massena, 75013 Paris, France<br>
      Site : <a href="https://www.gandi.net" target="_blank">https://www.gandi.net</a> </p> 
  </div> 
   <div class="section">
        <h2>🔒 Propriété intellectuelle</h2> 
        <p> Tous les contenus du site (textes, images, vidéos, logos, icônes, etc.) sont la propriété exclusive de Studio PF, sauf mention contraire. Toute reproduction ou utilisation sans autorisation écrite est interdite. </p> 
   </div> 
   <div class="section"> <h2>📊 Données personnelles</h2> <p> Les données collectées sont utilisées uniquement à des fins de relation client. Conformément au RGPD, vous pouvez demander l'accès, la modification ou la suppression de vos données par e-mail à : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> </p>
   </div>
  <div class="section"> 
     <h2>🌐 Cookies</h2>
    <p> Le site peut utiliser des cookies pour améliorer la navigation et l’analyse sttistique. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur. </p> 
  </div>
          <p>Site Vitrine créé par <strong>Studio PF</strong> - @ dernière mise à jour 09.03.2026 - Tous droits réservés. </p>
        `;
}
        main.innerHTML = html;
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
           <h2>🕓 Studio Opening Hours</h2>
<ul>
    <li>Monday: 🕘 09:00 - 18:00 🕖</li>
    <li>Tuesday: 🕘 09:00 - 18:00 🕖</li>
    <li>Wednesday: 🚫 Closed 🚫</li>
    <li>Thursday: 🕘 09:00 - 18:00 🕖</li>
    <li>Friday: 🕘 09:00 - 18:00 🕖</li>
    <li>Saturday: 🚫 Closed 🚫</li>
    <li>Sunday: 🚫 Closed 🚫</li>
</ul>

<h2>🕓 Twitch Live Schedule</h2>
<ul>
    <li>Monday: 🕘 13:00 - 16:00 🕖</li>
    <li>Tuesday: 🕘 13:00 - 16:00 🕖</li>
    <li>Wednesday: 🚫 OFF 🚫</li>
    <li>Thursday: 🕘 13:00 - 16:00 🕖</li>
    <li>Friday: 🕘 13:00 - 16:00 🕖</li>
    <li>Saturday: 🚫 OFF 🚫</li>
    <li>Sunday: 🚫 OFF 🚫</li>
</ul>

<hr>

<h2>🕓 School Holidays: Studio Closed</h2>
<h3>📅 The studio will be closed for holidays during the following school holiday periods:</h3>

<h4>📅 2026:</h4>
<ul>
    <li><strong>Winter Holidays ⛄ :</strong> <br> 📅 From Saturday, February 7, 2026 to Monday, February 23, 2026 🏔️</li>
    <li><strong>Spring Holidays 🌷 :</strong> <br> 📅 From Saturday, April 4, 2026 to Monday, April 20, 2026 🌸</li>
    <li><strong>Summer Holidays ☀️ :</strong> <br> 📅 From Saturday, July 4, 2026 to Monday, August 31, 2026 included 🏖️</li>
    <li><strong>Autumn Holidays (All Saints) 🎃 :</strong> <br> 📅 From Saturday, October 17, 2026 to Monday, November 2, 2026 🍂</li>
    <li><strong>Christmas Holidays 🎄 :</strong> <br> 📅 From Saturday, December 19, 2026 to Monday, January 4, 2027 ❄️</li>
    <li><strong>Winter Holidays 2027 ⛄ :</strong> <br> 📅 From Saturday, February 20, 2027 to Monday, March 8, 2027 🏔️</li>
    <li><strong>Spring Holidays 2027 🌷 :</strong> <br> 📅 From Saturday, April 17, 2027 to Monday, May 3, 2027 🌸</li>
</ul>

<h4>📅 2027:</h4>
<ul>
    <li><strong>Winter Holidays ⛄ :</strong> <br> 📅 From Saturday, February 20, 2027 to Monday, March 8, 2027 🏔️</li>
    <li><strong>Spring Holidays 🌷 :</strong> <br> 📅 From Saturday, April 17, 2027 to Monday, May 3, 2027 🌸</li>
    <li><strong>Summer Holidays ☀️ :</strong> <br> 📅 From Saturday, July 3, 2027 to Monday, August 30, 2027 included 🏖️</li>
    <li><strong>Autumn Holidays (All Saints) 🎃 :</strong> <br> 📅 From Saturday, October 23, 2027 to Monday, November 8, 2027 🍂</li>
    <li><strong>Christmas Holidays 🎄 :</strong> <br> 📅 From Saturday, December 18, 2027 to Monday, January 3, 2028 ❄️</li>
    <li><strong>Winter Holidays 2028 ⛄ :</strong> <br> 📅 From Saturday, February 5, 2028 to Monday, February 21, 2028 🏔️</li>
    <li><strong>Spring Holidays 2028 🌷 :</strong> <br> 📅 From Saturday, April 1, 2028 to Monday, April 17, 2028 🌸</li>
</ul>
        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
         <h2>🕓 Horario de apertura del estudio</h2>
<ul>
    <li>Lunes: 🕘 09:00 - 18:00 🕖</li>
    <li>Martes: 🕘 09:00 - 18:00 🕖</li>
    <li>Miércoles: 🚫 Cerrado 🚫</li>
    <li>Jueves: 🕘 09:00 - 18:00 🕖</li>
    <li>Viernes: 🕘 09:00 - 18:00 🕖</li>
    <li>Sábado: 🚫 Cerrado 🚫</li>
    <li>Domingo: 🚫 Cerrado 🚫</li>
</ul>

<h2>🕓 Horario de directos en Twitch</h2>
<ul>
    <li>Lunes: 🕘 13:00 - 16:00 🕖</li>
    <li>Martes: 🕘 13:00 - 16:00 🕖</li>
    <li>Miércoles: 🚫 OFF 🚫</li>
    <li>Jueves: 🕘 13:00 - 16:00 🕖</li>
    <li>Viernes: 🕘 13:00 - 16:00 🕖</li>
    <li>Sábado: 🚫 OFF 🚫</li>
    <li>Domingo: 🚫 OFF 🚫</li>
</ul>

<hr>

<h2>🕓 Vacaciones escolares: Estudio cerrado</h2>
<h3>📅 El estudio estará cerrado por vacaciones durante los siguientes periodos de vacaciones escolares:</h3>

<h4>📅 2026:</h4>
<ul>
    <li><strong>Vacaciones de invierno ⛄ :</strong> <br> 📅 Desde el sábado 7 de febrero de 2026 hasta el lunes 23 de febrero de 2026 🏔️</li>
    <li><strong>Vacaciones de primavera 🌷 :</strong> <br> 📅 Desde el sábado 4 de abril de 2026 hasta el lunes 20 de abril de 2026 🌸</li>
    <li><strong>Vacaciones de verano ☀️ :</strong> <br> 📅 Desde el sábado 4 de julio de 2026 hasta el lunes 31 de agosto de 2026 inclusive 🏖️</li>
    <li><strong>Vacaciones de otoño (Todos los Santos) 🎃 :</strong> <br> 📅 Desde el sábado 17 de octubre de 2026 hasta el lunes 2 de noviembre de 2026 🍂</li>
    <li><strong>Vacaciones de Navidad 🎄 :</strong> <br> 📅 Desde el sábado 19 de diciembre de 2026 hasta el lunes 4 de enero de 2027 ❄️</li>
    <li><strong>Vacaciones de invierno 2027 ⛄ :</strong> <br> 📅 Desde el sábado 20 de febrero de 2027 hasta el lunes 8 de marzo de 2027 🏔️</li>
    <li><strong>Vacaciones de primavera 2027 🌷 :</strong> <br> 📅 Desde el sábado 17 de abril de 2027 hasta el lunes 3 de mayo de 2027 🌸</li>
</ul>

<h4>📅 2027:</h4>
<ul>
    <li><strong>Vacaciones de invierno ⛄ :</strong> <br> 📅 Desde el sábado 20 de febrero de 2027 hasta el lunes 8 de marzo de 2027 🏔️</li>
    <li><strong>Vacaciones de primavera 🌷 :</strong> <br> 📅 Desde el sábado 17 de abril de 2027 hasta el lunes 3 de mayo de 2027 🌸</li>
    <li><strong>Vacaciones de verano ☀️ :</strong> <br> 📅 Desde el sábado 3 de julio de 2027 hasta el lunes 30 de agosto de 2027 inclusive 🏖️</li>
    <li><strong>Vacaciones de otoño (Todos los Santos) 🎃 :</strong> <br> 📅 Desde el sábado 23 de octubre de 2027 hasta el lunes 8 de noviembre de 2027 🍂</li>
    <li><strong>Vacaciones de Navidad 🎄 :</strong> <br> 📅 Desde el sábado 18 de diciembre de 2027 hasta el lunes 3 de enero de 2028 ❄️</li>
    <li><strong>Vacaciones de invierno 2028 ⛄ :</strong> <br> 📅 Desde el sábado 5 de febrero de 2028 hasta el lunes 21 de febrero de 2028 🏔️</li>
    <li><strong>Vacaciones de primavera 2028 🌷 :</strong> <br> 📅 Desde el sábado 1 de abril de 2028 hasta el lunes 17 de abril de 2028 🌸</li>
</ul>
        `;
    } 
    else { // français
        html = `
               <h2>🕓 Horaires d'ouverture du Studio</h2>
    <ul>
        <li>Lundi : 🕘 09:00 - 18:00 🕖</li>
        <li>Mardi : 🕘 09:00 - 18:00 🕖</li>
        <li>Mercredi : 🚫 Fermé 🚫</li>
        <li>Jeudi : 🕘 09:00 - 18:00 🕖</li>
        <li>Vendredi : 🕘 09:00 - 18:00 🕖</li>
        <li>Samedi : 🚫 Fermé 🚫</li>
        <li>Dimanche : 🚫 Fermé 🚫</li>
    </ul>
  <h2>🕓 Horaires des lives Twitch</h2>
    <ul>
        <li>Lundi : 🕘 13:00 - 16:00 🕖</li>
        <li>Mardi : 🕘 13:00 - 16:00 🕖</li>
        <li>Mercredi : 🚫 OFF 🚫</li>
        <li>Jeudi : 🕘 13:00 - 16:00 🕖</li>
        <li>Vendredi : 🕘 13:00 - 16:00 🕖</li>
        <li>Samedi : 🚫 OFF 🚫</li>
        <li>Dimanche : 🚫 OFF 🚫</li>
    </ul>
    <hr>
  <h2>🕓 Congès Scolaires : Fermeture du Studio</h2>
    <h3>📅 Le studio sera fermé pour congés pendant les périodes de vacances scolaires suivantes :</h3>
    <h4>📅 2026:</h4>
 <ul>
    <li><strong>Vacances d'hiver ⛄ :</strong> <br> 📅 Du samedi 7 février 2026 au lundi 23 février 2026 🏔️</li>
    <li><strong>Vacances de printemps 🌷 :</strong> <br> 📅 Du samedi 4 avril 2026 au lundi 20 avril 2026 🌸</li>
    <li><strong>Vacances d'été ☀️ :</strong> <br> 📅 À partir du samedi 4 juillet 2026 au lundi 31 août 2026 inclus 🏖️</li>
    <li><strong>Vacances de la Toussaint 🎃 :</strong> <br> 📅 Du samedi 17 octobre 2026 au lundi 2 novembre 2026 🍂</li>
    <li><strong>Vacances de Noël 🎄 :</strong> <br> 📅 Du samedi 19 décembre 2026 au lundi 4 janvier 2027 ❄️</li>
    <li><strong>Vacances d'hiver 2027 ⛄ :</strong> <br> 📅 Du samedi 20 février 2027 au lundi 8 mars 2027 🏔️</li>
    <li><strong>Vacances de printemps 2027 🌷 :</strong> <br> 📅 Du samedi 17 avril 2027 au lundi 3 mai 2027 🌸</li>
</ul>
  <h4>📅 2026:</h4>
<ul>
    <li><strong>Vacances d'hiver ⛄ :</strong> <br> 📅 Du samedi 20 février 2027 au lundi 8 mars 2027 🏔️</li>
    <li><strong>Vacances de printemps 🌷 :</strong> <br> 📅 Du samedi 17 avril 2027 au lundi 3 mai 2027 🌸</li>
    <li><strong>Vacances d'été ☀️ :</strong> <br> 📅 À partir du samedi 3 juillet 2027 au lundi 30 août 2027 inclus 🏖️</li>
    <li><strong>Vacances de la Toussaint 🎃 :</strong> <br> 📅 Du samedi 23 octobre 2027 au lundi 8 novembre 2027 🍂</li>
    <li><strong>Vacances de Noël 🎄 :</strong> <br> 📅 Du samedi 18 décembre 2027 au lundi 3 janvier 2028 ❄️</li>
    <li><strong>Vacances d'hiver 2028 ⛄ :</strong> <br> 📅 Du samedi 5 février 2028 au lundi 21 février 2028 🏔️</li>
    <li><strong>Vacances de printemps 2028 🌷 :</strong> <br> 📅 Du samedi 1 avril 2028 au lundi 17 avril 2028 🌸</li>
</ul>
        `;
    }

    main.innerHTML = html;

    scrollToTop();
}


function changelanguelogo() {
    const logo = document.getElementById("logo-contenu");
    if (!logo) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `
            <div class="cardlogoimg">
    <a href="/index.html" onclick="loadPage('/index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         <div class="cardlogo">
            <h1>Dare the artistic adventure!</h1>
            <p>Reopening:</p>
            <p class="highlight">→ early January 2027 ←</p>
            </div>

        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
          <div class="cardlogoimg">
    <a href="/index.html" onclick="loadPage('/index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         <div class="cardlogo">
          <h1>¡Atrévete a la aventura artística!</h1>
            <p>Reapertura:</p>
            <p class="highlight">→ principios de Enero de 2027 ←</p>
            </div>

        `;
    } 
    else { // français
        html = `
         <div class="cardlogoimg">
    <a href="/index.html" onclick="loadPage('/index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         <div class="cardlogo">
            <h1>Osez l'aventure artistique !</h1>
     <p>Réouverture :</p>
          <p class="highlight">→ début Janvier 2027 ←</p>
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



    // Sélecteurs de langue
    document.getElementById("english")?.addEventListener("click", () => setLanguage("english"));
    document.getElementById("spanish")?.addEventListener("click", () => setLanguage("spanish"));
    document.getElementById("french")?.addEventListener("click", () => setLanguage("french"));
});
