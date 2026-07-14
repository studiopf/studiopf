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

    document.querySelector('meta[name="description"]').setAttribute("content", description);
    document.querySelector('meta[name="author"]').setAttribute("content", author);
    document.querySelector('meta[name="keywords"]').setAttribute("content", keywords);
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
// LOAD PAGE (FIX PRINCIPAL)
// =============================
function loadPage(page) {

    if (!page) {
        console.warn("page undefined → fallback index");
        page = currentPage;
        hideCurrentPage();
    }

    currentPage = page;

    const mainContainer = document.getElementById("contenu-principal");
    if (!mainContainer) {
        console.error("contenu-principal introuvable");
        return;
    }

    mainContainer.style.opacity = "0";

    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error(`Statut ${response.status}`);
            return response.text();
        })
        .then(html => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newContent = doc.querySelector("#contenu-principal");

            if (!newContent) {
                throw new Error("contenu-principal manquant dans " + page);
            }

            // CLEAN SAFE
            mainContainer.innerHTML = "";
            mainContainer.innerHTML = newContent.innerHTML;

            window.scrollTo(0, 0);

            applyLanguageAndInit();

            mainContainer.style.opacity = "1";
        })
        .catch(err => {
            console.error(err);
            mainContainer.innerHTML = `<p style="color:red">Erreur chargement ${page}</p>`;
            mainContainer.style.opacity = "1";
        });
}


// =============================
// INIT GLOBAL
// =============================
function applyLanguageAndInit() {

    updateDebugDisplay();
    mettreAJourTarifLangue();
changelangueinfo();
    changelanguemenu();
   

    changelanguefoot();
    changelanguelogo();
    
    changelanguepartenaires();
    updateAgeDisplay();

    initializeCardToggle();
    initializecarroussel();
    initScrollBehaviors();

    hideCurrentPage();

    
    if (currentPage.includes("galerie")) {
        initGalerieWithLang();
        initializeGalerie();
    }
    if (currentPage.includes("formation") && typeof changelangueforma === "function") {
        changelangueforma();
        initializeFormationForm();
    }
        if (currentPage.includes("simulateur_devis") && typeof changelanguesimu === "function") {
        changelanguesimu();
            initializeFormCalculations();
             
            calculateTotals();
    }

    if (currentPage.includes("conditions") && typeof changelangueconditions === "function") {
        changelangueconditions();
    }

    if (currentPage.includes("mentionslegales") && typeof changelanguementionslegales === "function") {
        changelanguementionslegales();
    }
    if (currentPage.includes("peinturecommission") && typeof changelanguepeinture === "function") {
        changelanguepeinture();
       genererTableTarifs();
    
    }
        if (currentPage.includes("peinturecollection") && typeof changelanguecollection === "function") {
        changelanguecollection();
            
    
    }
           if (currentPage.includes("index") && typeof changelangueindex === "function") {
        changelangueindex();
    }
    if (currentPage.includes("horaires") && typeof changelanguehoraires === "function") {
        changelanguehoraires();
    }
    
}


function changelangueforma() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

    if (currentLanguage === "english") {
         currentPage = "index.html";
 currentLanguage = "english";
        changelangueindex();
    } else if (currentLanguage === "spanish") {
         currentPage = "index.html";
 currentLanguage = "spanish";
        changelangueindex();
    } else {
        html = `     <div class="maintenance-box">
        <h3>🎨 Formation Peinture sur Figurines</h3>
    <p>Rejoignez <strong>Studio Peinture Figurine</strong> en cours personnalisés, pour débutant ou avancé !</p>
    <p>Venez découvrir le pinceau et l’aérographe, et créez des œuvres uniques.</p>
    </div>

    <div class="maintenance-box">
      <h3>💡 Pourquoi Nous Choisir ?</h3>
      <ul>
        <li>🖌️ Cours adaptés à tous les niveaux</li>
        <li>🎯 Suivi personnalisé sur vos projets</li>
        <li>🌟 Techniques avancées : freehand, OSL, NMM, weathering</li>
      </ul>
      <p>Cours individuels ou collectifs. En présentiel au Studio uniquement.</p>
    </div>
     <div>
         <p> <a href="#formationForm" class="button">S'inscrire 💬</a></p>  
    </div>
    
       <div class="maintenance-box">
      <h3>🖍️ Forfaits de Cours</h3>
      <div class="card">
        <h3>🌱 Cours individuel Débutant ou Confirmé</h3>
        <p>Au premier contact : 1ère heure offerte pour se présenter et découvrir la peinture !</p>
        <p>Une pochette d’initiation sera remise.</p>
      </div>

        
      <div class="card-container3">
        <div class="card">
          <h3>🕐 Cours 1h</h3>
          <p>50€/h</p>
          <p>Pour un suivi de projet régulier</p>
          <p>Possibilité de placer l’heure en fin de journée, dans l’idéal début de matinée ou début après-midi.</p>
        </div>
        <div class="card">
          <h3>⏳ Cours 3h</h3>
          <p>150€</p>
          <p>La solution conseillée pour démarrer la peinture ou un projet.</p>
          <p>9h-12h, 14h-17h ou 16h-19h.</p>
        </div>
        <div class="card">
          <h3>🔥 Cours 5h</h3>
          <p>200€</p>
          <p>Grosse session pour avancer ou démarrer sur un gros projet.</p>
          <p>14h-19h</p>
        </div>
      </div>

    <p>Horaires à titre d'exemple.</p>
     <div>
         <p> <a href="#formationForm" class="button">S'inscrire 💬</a></p>  
    </div>
    
    
   </div>
       <div class="maintenance-box">
      <h3>📆 Stage en groupe</h3>
<p>Plusieurs thèmes possibles : lumières, théorie des couleurs, buste, choix d’un thème d’armée...</p>
    <div class="card-container2">
        <div class="card">
          <h3>📆 Stage 5h</h3>
          <p>200€</p>
           <p>9h-12h / 14h-16h</p>
           <p>Repas inclus.</p>
           <p>Une pochette et la figurune sera remise.</p>
          
        </div>
        <div class="card">
          <h3>📆 Stage 8h</h3>
           <p>350€</p>
            <p>9h-12h / 14h-19h</p>
           <p>Repas inclus.</p>
            <p>Une pochette et la figurune sera remise.</p>
        </div>
      </div>
         <p>Horaires à titre d'exemple.</p>
     
   </div>
       <div class="maintenance-box">
        <h3>📆 Prestation événementielle</h3>
        <p>Initiation au modélisme, premiers pas pour Warhammer (montage, peinture et jeu)...</p>
        <p>Sur devis</p>
 <div class="card-container2">
        <div class="card">
          <h3>📆 1 journée</h3>
            <p>(moyenne de 8h)</p>
          <p>700€</p>
           <p>9h-12h / 14h-19h</p>
           <p>Comprend le trajet.</p>
           <p>Fourniture peinture fourni.</p>
         <p>Hors figurines.</p>
         
        </div>
        <div class="card">
           <h3>📆 2 journées</h3>
          <p>(moyenne de 8h)</p>
           <p>1900€</p>
            <p>9h-12h / 14h-19h</p>
             <p>Comprend le trajet.</p>
           <p>Fourniture peinture fourni.</p>
           <p>Hors figurines.</p>
        </div>
      </div>

   <p>Horaires à titre d'exemple.</p>
   </div>
       <div class="maintenance-box">
      <h3>🖌️🔫 Choisissez vos armes :</h3>
  
      <div class="card-container3">
        <div class="card">
          <h3>🖌️ Pinceau</h3>
          <p>Techniques pour débutants et avancés</p>
        </div>
        <div class="card">
          <h3>🔫 Aérographe</h3>
          <p>Techniques précises pour débutants et avancés</p>
        </div>
        <div class="card">
          <h3>🖌️🔫 Les deux</h3>
          <p>Techniques précises pour débutants et avancés</p>
        </div>
      </div>
  
</div>
    <div class="maintenance-box">
  
      <h3>🚀🎨 Lancez-vous !</h3>
      
    <div class="card-container2">
        <div class="card">
          <h3>🎨 Matériel Fourni</h3>
          <p>Pinceaux, aérographe, peintures : tout est inclus pour une expérience optimale !</p>
        </div>
        <div class="card">
          <h3>🚀 Prêt à Briller ?</h3>
          <p>Prendre des cours est l’occasion de débuter un projet !</p>
          <p>Apprenez à transformer vos figurines en œuvres d’art 🖼️.</p>
        </div>
      </div>
     </div>

      <div class="maintenance-box">
   <h3>📅 Réservez divtenant et devenez expert !</h3>
    <div class="center">
   
      
      <form onsubmit="event.preventDefault(); envoyerMailForma(this);" id="formationForm">
        <div>
          <label for="nom">Nom</label>
          <input type="text" id="nom" name="nom" placeholder="Nom" required>
        </div>
        <div>
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" placeholder="Prénom" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" required>
        </div>
        <div>
          <label for="telephone">Téléphone</label>
          <input type="tel" id="telephone" name="telephone" placeholder="Téléphone" required>
        </div>
        <div>
          <label for="adresse">Adresse</label>
          <input type="text" id="adresse" name="adresse" placeholder="Adresse" required>
        </div>
        <div>
          <label for="cp">Code Postal</label>
          <input type="text" id="cp" name="cp" placeholder="Code Postal" required>
        </div>
        <div>
          <label for="ville">Ville</label>
          <input type="text" id="ville" name="ville" placeholder="Ville" required>
        </div>
        <div>
          <label for="pays">Pays</label>
          <select id="pays" name="pays" required>
            <option value="" disabled selected>Choisissez un pays</option>
            <option value="FRANCE">France</option>
            <option value="BELGIQUE">Belgique</option>
            <option value="LUXEMBOURG">Luxembourg</option>
            <option value="Autre">Autre (merci de préciser)</option>
          </select>
        </div>
        <div>
          <label for="cours">Cours</label>
          <select id="cours" name="cours" required>
            <option value="" disabled selected>Sélectionnez une option</option>
            <option value="COURS PEINTURE 1h - 50€">Cours 1h - 50€</option>
            <option value="COURS PEINTURE 3h - 150€">Cours 3h - 150€</option>
            <option value="COURS PEINTURE 5h - 200€">Cours 5h - 200€</option>
            <option value="Stage individuel 5h - 200€">Stage individuel 5h - 200€</option>
            <option value="Stage individuel 8h - 350€">Stage individuel 8h - 350€</option>
            <option value="Stage collectif - sur devis">Stage collectif - sur devis</option>
            <option value="Prestation événementielle - sur devis">Prestation événementielle - sur devis</option>
          </select>
        </div>
        <div>
          <label for="message">Votre message</label>
          <textarea id="message" name="message" placeholder="Votre message" rows="4"></textarea>
        </div>
        <div class="center">
          <button type="submit" class="button">Envoyer la demande par mail</button>
        </div>
      </form>

    </div>
    </div>`;
    }

    main.innerHTML = html;
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
    function changelanguesimu() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

    if (currentLanguage === "english") {
             html = `<h1>Quote Request</h1>

<div class="form-container">

<form id="contactForm" action="#" class="bg-white p-6 rounded-lg shadow-md">
    <div class="center">
        <fieldset>
            <legend>Contact Details TableTop+ commission</legend>

            <div class="form-group">
                <label for="nom">Last Name<span class="required">*</span></label>
                <input type="text" id="nom" name="nom" placeholder="Surname" required>
            </div>

            <div class="form-group">
                <label for="prenom">First Name<span class="required">*</span></label>
                <input type="text" id="prenom" name="prenom" placeholder="Name" required>
            </div>

            <div class="form-group">
                <label for="email">Email<span class="required">*</span></label>
                <input type="email" id="email" name="email" placeholder="Email" required>
            </div>

            <div class="form-group">
                <label for="telephone">Phone<span class="required">*</span></label>
                <input type="tel" id="telephone" name="telephone" placeholder="Phone" required>
            </div>

            <div class="form-group">
                <label for="adresse">Address<span class="required">*</span></label>
                <input type="text" id="adresse" name="adresse" placeholder="Adress" required>
            </div>

            <div class="form-group">
                <label for="cp">Postal Code<span class="required">*</span></label>
                <input type="text" id="cp" name="cp" placeholder="Postal Code" required>
            </div>

            <div class="form-group">
                <label for="ville">City<span class="required">*</span></label>
                <input type="text" id="ville" name="ville" placeholder="City" required>
            </div>

            <div class="form-group">
                <label for="pays">Country <span class="required">*</span></label>
                <select id="pays" name="pays" required>
                    <option value="" disabled hidden>Select a country</option>
                    <option value="FRANCE" selected>France</option>
                    <option value="BELGIQUE">Belgium</option>
                    <option value="LUXEMBOURG">Luxembourg</option>
                    <option value="SPAIN">Spain</option>
                    <option value="GERMANY">Germany</option>
                    <option value="ENGLAND">England</option>
                    <option value="USA">USA</option>
                    <option value="Autre">Other (please specify)</option>
                </select>
            </div>
        </fieldset>
    </div>

    <fieldset>
        <legend>My Request</legend>

        <div class="cardform">
            <label for="niveau">Painting Levels:</label><br>

            <p>Level ⭐ Gold:<br>
            TableTop+, superior quality with a detailed finish:<br>
            🔍 Perfect for enhancing gaming miniatures. (Our recommendation).<br><br></p>

            <p>Level 👑 Diamant:<br>
            TableTop++, higher quality with prestige finish:<br>
            🎨 Each piece becomes a work of art. For centerpiece models.<br><br></p>

            
            <p>Basing is included.</p>

            <select id="niveau" class="select" name="niveau" required>
                <option value="" disabled hidden>Select a level</option>
                <option value="niveau1" selected>Gold Level - TableTop+, Gold equivalent (lvl3)</option>
                <option value="niveau2">Diamant Level - TableTop++, Diamond equivalent (lvl4)</option>

            </select>

            <p><strong>Selected level:</strong> <span id="afficheniveau"></span></p><br>
        </div>

        <div id="petiteinfanterie" class="cardform">
            <label for="petiteinfanterie-input">Number of <strong>20-25mm base Infantry</strong>:</label>
            <p>Example: Skinks, Dwarf Battle, Skeletons, Goblins, Plaguebearers...</p>
            <p>Unit price: <span id="prixpetiteinfanterie">0.00</span> $</p>
            <p>Subtotal: <span id="totalpetiteinfanterie">0.00</span> $</p>
            <input type="number" id="petiteinfanterie-input" name="petiteinfanterie" min="0">
        </div>

        <div id="infanterie" class="cardform">
            <label for="infanterie-input">Number of <strong>28-32mm base Infantry</strong>:</label>
            <p>Example: Space Marines, Stormcast, Votann, Sisters of Battle, Eldar...</p>
            <p>Unit price: <span id="prixinfanterie">0.00</span> $</p>
            <p>Subtotal: <span id="totalinfanterie">0.00</span> $</p>
            <input type="number" id="infanterie-input" name="infanterie" min="0">
        </div>

        <div id="infanterieelite" class="cardform">
            <label for="infanterieelite-input">Number of <strong>Elite Infantry 40-50mm base</strong>:</label>
            <p>Example: Terminators, Custodes, Kroxigors, Tyranid Warriors...</p>
            <p>Unit price: <span id="prixinfanterieelite">0.00</span> $</p>
            <p>Subtotal: <span id="totalinfanterieelite">0.00</span> $</p>
            <input type="number" id="infanterieelite-input" name="infanterieelite" min="0">
        </div>

        <div id="personnage" class="cardform">
            <label for="personnage-input">Number of <strong>Foot Characters 25-32mm base</strong>:</label>
            <p>Example: Space Marine Captain/Sergeant, Sorcerer...</p>
            <p>Unit price: <span id="prixpersonnage">0.00</span> $</p>
            <p>Subtotal: <span id="totalpersonnage">0.00</span> $</p>
            <input type="number" id="personnage-input" name="personnage" min="0">
        </div>

        <div id="personnageelite" class="cardform">
            <label for="personnageelite-input">Number of <strong>Elite Foot Characters 40-50mm base</strong>:</label>
            <p>Example: Space Marine Captain/Sergeant in Phobos armor, Terminator Sorcerer</p>
            <p>Unit price: <span id="prixpersonnageelite">0.00</span> $</p>
            <p>Subtotal: <span id="totalpersonnageelite">0.00</span> $</p>
            <input type="number" id="personnageelite-input" name="personnageelite" min="0">
        </div>

        <div id="personnagemonstrueux" class="cardform">
            <label for="personnagemonstrueux-input">Number of <strong>Monstrous Characters 60-100mm base</strong>:</label>
            <p>Example: Primarchs, Treelord, Tyranid Prime...</p>
            <p>Unit price: <span id="prixpersonnagemonstrueux">0.00</span> $</p>
            <p>Subtotal: <span id="totalpersonnagemonstrueux">0.00</span> $</p>
            <input type="number" id="personnagemonstrueux-input" name="personnagemonstrueux" min="0">
        </div>

        <div id="personnagesurmonstre" class="cardform">
            <label for="personnagesurmonstre-input">Number of <strong>Characters on Monsters 120mm oval base</strong>:</label>
            <p>Example: MetaRodeur, Idoneth Turtle, Saurus on Carnasaur...</p>
            <p>Unit price: <span id="prixpersonnagesurmonstre">0.00</span> $</p>
            <p>Subtotal: <span id="totalpersonnagesurmonstre">0.00</span> $</p>
            <input type="number" id="personnagesurmonstre-input" name="personnagesurmonstre" min="0">
        </div>

        <div id="personnagesurgrandmonstre" class="cardform">
            <label for="personnagesurgrandmonstre-input">Number of <strong>Characters on Large Monsters 130-160mm+ base</strong>:</label>
            <p>Example: Allareille, Stormcast Dragon, Crocodile Dragon...</p>
            <p>Unit price: <span id="prixpersonnagesurgrandmonstre">0.00</span> $</p>
            <p>Subtotal: <span id="totalpersonnagesurgrandmonstre">0.00</span> $</p>
            <input type="number" id="personnagesurgrandmonstre-input" name="personnagesurgrandmonstre" min="0">
        </div>

        <div id="cavalerie" class="cardform">
            <label for="cavalerie-input">Number of <strong>Cavalry oval base 60-75mm</strong>:</label>
            <p>Example: Eldar Bikes, Idoneth Eels, Skeleton Cavalry...</p>
            <p>Unit price: <span id="prixcavalerie">0.00</span> $</p>
            <p>Subtotal: <span id="totalcavalerie">0.00</span> $</p>
            <input type="number" id="cavalerie-input" name="cavalerie" min="0">
        </div>

        <div id="cavalerielourde" class="cardform">
            <label for="cavalerielourde-input">Number of <strong>Heavy Cavalry oval base 90-105mm</strong>:</label>
            <p>Example: Custodes Bikes, Saurus on Aggradon, Idoneth Shark...</p>
            <p>Unit price: <span id="prixcavalerielourde">0.00</span> $</p>
            <p>Subtotal: <span id="totalcavalerielourde">0.00</span> $</p>
            <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
        </div>

        <div id="petitvehiculemonstre" class="cardform">
            <label for="petitvehiculemonstre-input">Number of <strong>Small Vehicles/Monsters 75-90mm oval base</strong>:</label>
            <p>Example: Sentinel, Nurgle Beast, Drone...</p>
            <p>Unit price: <span id="prixpetitvehiculemonstre">0.00</span> $</p>
            <p>Subtotal: <span id="totalpetitvehiculemonstre">0.00</span> $</p>
            <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
        </div>

        <div id="vehiculemonstremoyen" class="cardform">
            <label for="vehiculemonstremoyen-input">Number of <strong>Medium Vehicles/Monsters 90-100mm base</strong>:</label>
            <p>Example: Rhino, Dreadnought, Drone...</p>
            <p>Unit price: <span id="prixvehiculemonstremoyen">0.00</span> $</p>
            <p>Subtotal: <span id="totalvehiculemonstremoyen">0.00</span> $</p>
            <input type="number" id="vehiculemonstremoyen-input" name="vehiculemonstremoyen" min="0">
        </div>

        <div id="grosvehiculemonstre" class="cardform">
            <label for="grosvehiculemonstre-input">Number of <strong>Large Vehicles/Monsters 100-130mm base</strong>:</label>
            <p>Example: Predator, Plague Burst Crawler, Daemon Prince, Armingers, Mancrusher...</p>
            <p>Unit price: <span id="prixgrosvehiculemonstre">0.00</span> $</p>
            <p>Subtotal: <span id="totalgrosvehiculemonstre">0.00</span> $</p>
            <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
        </div>

        <div id="enormevehiculemonstre" class="cardform">
            <label for="enormevehiculemonstre-input">Number of <strong>Huge Vehicles/Monsters 130-160mm-170mm base</strong>:</label>
            <p>Example: Land Raider, Defiler, Aerodyne...</p>
            <p>Unit price: <span id="prixenormevehiculemonstre">0.00</span> $</p>
            <p>Subtotal: <span id="totalenormevehiculemonstre">0.00</span> $</p>
            <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
        </div>

        <div id="titanvehiculemonstre" class="cardform">
            <label for="titanvehiculemonstre-input">Number of <strong>Titanic Vehicles/Monsters 170mm base</strong>:</label>
            <p>Example: Spartan, Imperial Knight, Mega Gargant...</p>
            <p>Unit price: <span id="prixtitanvehiculemonstre">0.00</span> $</p>
            <p>Subtotal: <span id="totaltitanvehiculemonstre">0.00</span> $</p>
            <input type="number" id="titanvehiculemonstre-input" name="titanvehiculemonstre" min="0">
        </div>

        <div id="montage" class="cardform">
            <label for="montage-input"><strong>Assembly</strong> required?</label>
            <select id="montage-input" name="montage">
                <option value="Oui" selected>Yes</option>
                <option value="Non">No</option>
            </select>
        </div>

        <div id="aimant" class="cardform">
            <label for="aimant-input"><strong>Magnets</strong> required?</label>
            <select id="aimant-input" name="aimant">
                <option value="Oui">Yes</option>
                <option value="Non" selected>No</option>
            </select>
        </div>

        <div id="total" class="cardform">
            <h3 class="total">TOTAL :</h3>
<h3><span id="oktotal">0.00</span></h3>

        </div>

        <div id="message" class="cardform">
            <label for="message-input">
                To be as accurate as possible,<br>
                please describe the list of miniatures to paint, whether assembly is required,<br>
                and if you already have a theme or color scheme defined: <span class="required">*</span>
            </label>
            <div>
                <textarea id="message-input" name="message" placeholder="Your message" required></textarea>
            </div>
        </div>

        <p><span class="required">*</span> Required fields</p>

    </fieldset>

    <div class="center">
        <button type="submit" class="button">Send request by email</button>
    </div>

</form>

</div>        `;
    } else if (currentLanguage === "spanish") {
              html = `<h1>Solicitud de Presupuesto TableTop+</h1>

<div class="form-container">

<form id="contactForm" action="#" class="bg-white p-6 rounded-lg shadow-md">
    <div class="center">
        <fieldset>
            <legend>Datos de contacto TableTop</legend>

            <div class="form-group">
                <label for="nom">Apellido<span class="required">*</span></label>
                <input type="text" id="nom" name="nom" placeholder="Apellido" required>
            </div>

            <div class="form-group">
                <label for="prenom">Nombre<span class="required">*</span></label>
                <input type="text" id="prenom" name="prenom" placeholder="Nombre" required>
            </div>

            <div class="form-group">
                <label for="email">Correo electrónico<span class="required">*</span></label>
                <input type="email" id="email" name="email" placeholder="Correo electrónico" required>
            </div>

            <div class="form-group">
                <label for="telephone">Teléfono<span class="required">*</span></label>
                <input type="tel" id="telephone" name="telephone" placeholder="Teléfono" required>
            </div>

            <div class="form-group">
                <label for="adresse">Dirección<span class="required">*</span></label>
                <input type="text" id="adresse" name="adresse" placeholder="Dirección" required>
            </div>

            <div class="form-group">
                <label for="cp">Código postal<span class="required">*</span></label>
                <input type="text" id="cp" name="cp" placeholder="Código postal" required>
            </div>

            <div class="form-group">
                <label for="ville">Ciudad<span class="required">*</span></label>
                <input type="text" id="ville" name="ville" placeholder="Ciudad" required>
            </div>

            <div class="form-group">
                <label for="pays">País <span class="required">*</span></label>
                <select id="pays" name="pays" required>
                    <option value="" disabled hidden>Seleccione un país</option>
                    <option value="FRANCE" selected>Francia</option>
                    <option value="BELGIQUE">Bélgica</option>
                    <option value="LUXEMBOURG">Luxemburgo</option>
                    <option value="SPAIN">España</option>
                    <option value="GERMANY">Alemania</option>
                    <option value="ENGLAND">Inglaterra</option>
                    <option value="USA">EE.UU.</option>
                    <option value="Autre">Otro (por favor especifique)</option>
                </select>
            </div>
        </fieldset>
    </div>

    <fieldset>
        <legend>Mi solicitud</legend>

        <div class="cardform">
            <label for="niveau">Niveles de pintura:</label><br>

            <p>Nivel ⭐ Gold:<br>
            TableTop+, calidad superior con acabado detallado:<br>
            🔍 Perfecto para mejorar miniaturas de juego. (Nuestra recomendación).<br><br></p>

            <p>Nivel 👑 Fantasía:<br>
            TableTop++, calidad superior con acabado prestigioso:<br>
            🎨 Cada pieza se convierte en una obra de arte. Para piezas principales.<br><br></p>

           

            <p>El peana está incluido.</p>

            <select id="niveau" class="select" name="niveau" required>
                <option value="" disabled hidden>Seleccione un nivel</option>
                <option value="niveau1" selected>Nivel Gold - TableTop+, equivalente Gold (niv3)</option>
                <option value="niveau2">Nivel Fantasía - TableTop++, equivalente Diamond (niv4)</option>
             
            </select>

            <p><strong>Nivel seleccionado:</strong> <span id="afficheniveau"></span></p><br>
        </div>

        <div id="petiteinfanterie" class="cardform">
            <label for="petiteinfanterie-input">Número de <strong>infantería base 20-25mm</strong>:</label>
            <p>Ejemplo: Skinks, Enanos, Esqueletos, Goblins, Portadores de Plaga...</p>
            <p>Precio unitario: <span id="prixpetiteinfanterie">0.00</span> €</p>
            <p>Subtotal: <span id="totalpetiteinfanterie">0.00</span> €</p>
            <input type="number" id="petiteinfanterie-input" name="petiteinfanterie" min="0">
        </div>

        <div id="infanterie" class="cardform">
            <label for="infanterie-input">Número de <strong>infantería base 28-32mm</strong>:</label>
            <p>Ejemplo: Space Marines, Stormcast, Votann, Hermanas de Batalla, Eldar...</p>
            <p>Precio unitario: <span id="prixinfanterie">0.00</span> €</p>
            <p>Subtotal: <span id="totalinfanterie">0.00</span> €</p>
            <input type="number" id="infanterie-input" name="infanterie" min="0">
        </div>

        <div id="infanterieelite" class="cardform">
            <label for="infanterieelite-input">Número de <strong>infantería élite base 40-50mm</strong>:</label>
            <p>Ejemplo: Terminators, Custodes, Kroxigors, Guerreros Tiránidos...</p>
            <p>Precio unitario: <span id="prixinfanterieelite">0.00</span> €</p>
            <p>Subtotal: <span id="totalinfanterieelite">0.00</span> €</p>
            <input type="number" id="infanterieelite-input" name="infanterieelite" min="0">
        </div>

        <div id="personnage" class="cardform">
            <label for="personnage-input">Número de <strong>personajes a pie base 25-32mm</strong>:</label>
            <p>Ejemplo: Capitán/Sargento Space Marines, Hechicero...</p>
            <p>Precio unitario: <span id="prixpersonnage">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnage">0.00</span> €</p>
            <input type="number" id="personnage-input" name="personnage" min="0">
        </div>

        <div id="personnageelite" class="cardform">
            <label for="personnageelite-input">Número de <strong>personajes élite a pie base 40-50mm</strong>:</label>
            <p>Ejemplo: Capitán/ Sargento Space Marines en armadura Phobos, Hechicero en armadura Terminator</p>
            <p>Precio unitario: <span id="prixpersonnageelite">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnageelite">0.00</span> €</p>
            <input type="number" id="personnageelite-input" name="personnageelite" min="0">
        </div>

        <div id="personnagemonstrueux" class="cardform">
            <label for="personnagemonstrueux-input">Número de <strong>personajes monstruosos base 60-100mm</strong>:</label>
            <p>Ejemplo: Primarcas, Treelord, Príncipe Tiránido...</p>
            <p>Precio unitario: <span id="prixpersonnagemonstrueux">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnagemonstrueux">0.00</span> €</p>
            <input type="number" id="personnagemonstrueux-input" name="personnagemonstrueux" min="0">
        </div>

        <div id="personnagesurmonstre" class="cardform">
            <label for="personnagesurmonstre-input">Número de <strong>personajes sobre monstruos base oval 120mm</strong>:</label>
            <p>Ejemplo: MetaRodeur, Tortuga Idoneth, Saurus sobre Carnosaure...</p>
            <p>Precio unitario: <span id="prixpersonnagesurmonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnagesurmonstre">0.00</span> €</p>
            <input type="number" id="personnagesurmonstre-input" name="personnagesurmonstre" min="0">
        </div>

        <div id="personnagesurgrandmonstre" class="cardform">
            <label for="personnagesurgrandmonstre-input">Número de <strong>personajes sobre grandes monstruos base 130-160mm o superior</strong>:</label>
            <p>Ejemplo: Allareille, Dragón Stormcast, Dragón Cocodrilo...</p>
            <p>Precio unitario: <span id="prixpersonnagesurgrandmonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnagesurgrandmonstre">0.00</span> €</p>
            <input type="number" id="personnagesurgrandmonstre-input" name="personnagesurgrandmonstre" min="0">
        </div>

        <div id="cavalerie" class="cardform">
            <label for="cavalerie-input">Número de <strong>caballería base oval 60-75mm</strong>:</label>
            <p>Ejemplo: Motos Eldar, Anguilas Idoneth, Caballería esqueleto...</p>
            <p>Precio unitario: <span id="prixcavalerie">0.00</span> €</p>
            <p>Subtotal: <span id="totalcavalerie">0.00</span> €</p>
            <input type="number" id="cavalerie-input" name="cavalerie" min="0">
        </div>

        <div id="cavalerielourde" class="cardform">
            <label for="cavalerielourde-input">Número de <strong>caballería pesada base oval 90-105mm</strong>:</label>
            <p>Ejemplo: Motos Custodes, Saurus sobre Aggradon, Tiburón Idoneth...</p>
            <p>Precio unitario: <span id="prixcavalerielourde">0.00</span> €</p>
            <p>Subtotal: <span id="totalcavalerielourde">0.00</span> €</p>
            <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
        </div>

        <div id="petitvehiculemonstre" class="cardform">
            <label for="petitvehiculemonstre-input">Número de <strong>pequeños vehículos/monstruos base oval 75-90mm</strong>:</label>
            <p>Ejemplo: Centinela, Bestia de Nurgle, Dron...</p>
            <p>Precio unitario: <span id="prixpetitvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalpetitvehiculemonstre">0.00</span> €</p>
            <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
        </div>

        <div id="vehiculemonstremoyen" class="cardform">
            <label for="vehiculemonstremoyen-input">Número de <strong>vehículos/monstruos medianos base 80-100mm</strong>:</label>
            <p>Ejemplo: Rhino, Dreadnought, Drone...</p>
            <p>Precio unitario: <span id="prixvehiculemonstremoyen">0.00</span> €</p>
            <p>Subtotal: <span id="totalvehiculemonstremoyen">0.00</span> €</p>
            <input type="number" id="vehiculemonstremoyen-input" name="vehiculemonstremoyen" min="0">
        </div>

        <div id="grosvehiculemonstre" class="cardform">
            <label for="grosvehiculemonstre-input">Número de <strong>grandes vehículos/monstruos base  90-100mm ou supérieur</strong>:</label>
            <p>Ejemplo: Predator, Plague Burst, Príncipe Demonio, Armingers, Mancrusher...</p>
            <p>Precio unitario: <span id="prixgrosvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalgrosvehiculemonstre">0.00</span> €</p>
            <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
        </div>

        <div id="enormevehiculemonstre" class="cardform">
            <label for="enormevehiculemonstre-input">Número de <strong>enormes vehículos/monstruos base 100-130mm ou supérieur</strong>:</label>
            <p>Ejemplo: Land Raider, Defiler, Aerodyne...</p>
            <p>Precio unitario: <span id="prixenormevehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalenormevehiculemonstre">0.00</span> €</p>
            <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
        </div>

        <div id="titanvehiculemonstre" class="cardform">
            <label for="titanvehiculemonstre-input">Número de <strong>vehículos/monstruos titánicos base  socle 130-160mm-170mm</strong>:</label>
            <p>Ejemplo: Spartan, Caballero Imperial, Mega Gargant...</p>
            <p>Precio unitario: <span id="prixtitanvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totaltitanvehiculemonstre">0.00</span> €</p>
            <input type="number" id="titanvehiculemonstre-input" name="titanvehiculemonstre" min="0">
        </div>

        <div id="montage" class="cardform">
            <label for="montage-input"><strong>¿Montaje</strong> necesario?</label>
            <select id="montage-input" name="montage">
                <option value="Oui" selected>Sí</option>
                <option value="Non">No</option>
            </select>
        </div>

        <div id="aimant" class="cardform">
            <label for="aimant-input"><strong>¿Imanes</strong> necesarios?</label>
            <select id="aimant-input" name="aimant">
                <option value="Oui">Sí</option>
                <option value="Non" selected>No</option>
            </select>
        </div>

        <div id="total" class="cardform">
          <h3 class="total">TOTAL :</h3>
<h3><span id="oktotal">0.00</span></h3>

        </div>

        <div id="message" class="cardform">
            <label for="message-input">
                Para ser lo más preciso posible,<br>
                por favor indique la lista de miniaturas a pintar, si es necesario montaje,<br>
                y si ya tiene un tema o esquema de colores definido: <span class="required">*</span>
            </label>
            <div>
                <textarea id="message-input" name="message" placeholder="Su mensaje" required></textarea>
            </div>
        </div>

        <p><span class="required">*</span> Campos obligatorios</p>

    </fieldset>

    <div class="center">
        <button type="submit" class="button">Enviar solicitud por correo</button>
    </div>

</form>

</div>        `;
    } else {
        html = `
                       <h1>Demande de Devis commission TableTop+</h1>
       
           <div class="form-container">
            
        <form id="contactForm" action="#" class="bg-white p-6 rounded-lg shadow-md">
              <div class="center">
                  <fieldset>
                <legend>Coordonnées</legend>
                <div class="form-group">
                    <label for="nom">Nom<span class="required">*</span></label>
                    <input type="text" id="nom" name="nom" placeholder="Nom" required>
                </div>
                <div class="form-group">
                    <label for="prenom">Prénom<span class="required">*</span></label>
                    <input type="text" id="prenom" name="prenom" placeholder="Prénom" required>
                </div>
                <div class="form-group">
                    <label for="email">Email<span class="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <label for="telephone">Téléphone<span class="required">*</span></label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Téléphone" required>
                </div>
                <div class="form-group">
                    <label for="adresse">Adresse<span class="required">*</span></label>
                    <input type="text" id="adresse" name="adresse" placeholder="Adresse" required>
                </div>
                <div class="form-group">
                    <label for="cp">Code Postal<span class="required">*</span></label>
                    <input type="text" id="cp" name="cp" placeholder="Code Postal" required>
                </div>
                <div class="form-group">
                    <label for="ville">Ville<span class="required">*</span></label>
                    <input type="text" id="ville" name="ville" placeholder="Ville" required>
                </div>
                <div class="form-group">
                    <label for="pays">Pays <span class="required">*</span></label>
                    <select id="pays" name="pays" required>
                        <option value="" disabled hidden>Choisissez un pays</option>
                        <option value="FRANCE" selected>France</option>
                        <option value="BELGIQUE">Belgique</option>
                        <option value="LUXEMBOURG">Luxembourg</option>
                        <option value="SPAIN">SPAIN</option>
                        <option value="GERMANY">Germany</option>
                        <option value="ENGLAND">England</option>
                        <option value="USA">USA</option>
                        <option value="Autre">Autre (merci de préciser)</option>
                    </select>
                </div>
            </fieldset>
       </div>

                <fieldset>
                    <legend>Ma demande</legend>
                    <div class="cardform">
                        <label for="niveau">Niveaux de  :</label><br>
                        <p>Niveau ⭐ Gold :<br> TableTop+, Qualité supérieur qui va à l'Approfondi :<br> 🔍 Parfait pour valoriser les figurines de jeu. (Notre recommendation).<br><br></p>
                        <p>Niveau 👑 Diamant :<br> TableTop++, Qualité supérieur plus Prestige :<br> 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.<br><br></p>
                      
                        <p>Le soclage est inclus.</p>
                        <select id="niveau" class="select" name="niveau" required>
                            <option value="" disabled hidden>Choisissez un niveau</option>
                            <option value="niveau1" selected>Niveau Gold - TableTop+, équivalent Gold (niv3)</option>
                            <option value="niveau2">Niveau Diamant - TableTop++, équivalent Diamond (niv4)</option>
                           
                        </select>
                        <p><strong>Niveau sélectionné :</strong> <span id="afficheniveau"></span></p><br>
                    </div>

                    <div id="petiteinfanterie" class="cardform">
                        <label for="petiteinfanterie-input">Nombre de <strong>Infanteries socle 20-25mm</strong> :</label>
                        <p>Exemple : Skinks, Nains Battle, Squelettes, Gobelins, Veroleux...</p>
                        <p>Prix unitaire : <span id="prixpetiteinfanterie">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpetiteinfanterie">0.00</span> €</p>
                        <input type="number" id="petiteinfanterie-input" name="petiteinfanterie" min="0">
                    </div>

                    <div id="infanterie" class="cardform">
                        <label for="infanterie-input">Nombre d'<strong>Infanteries socle 28-32mm</strong> :</label>
                        <p>Exemple : Space Marines, Stormcast, Votann, Soeurs de Bataille, Eldar...</p>
                        <p>Prix unitaire : <span id="prixinfanterie">0.00</span> €</p>
                        <p>Sous Total : <span id="totalinfanterie">0.00</span> €</p>
                        <input type="number" id="infanterie-input" name="infanterie" min="0">
                    </div>

                    <div id="infanterieelite" class="cardform">
                        <label for="infanterieelite-input">Nombre d'<strong>Infanteries élite socle 40-50mm</strong> :</label>
                        <p>Exemple : Terminators, Custodes, Kroxigors, Guerriers Tyranid...</p>
                        <p>Prix unitaire : <span id="prixinfanterieelite">0.00</span> €</p>
                        <p>Sous Total : <span id="totalinfanterieelite">0.00</span> €</p>
                        <input type="number" id="infanterieelite-input" name="infanterieelite" min="0">
                    </div>

                    <div id="personnage" class="cardform">
                        <label for="personnage-input">Nombre de <strong>Personnages à Pied socle 25-32mm</strong> :</label>
                        <p>Exemple : Capitaine/Sergeant Space Marines, Sorcier...</p>
                        <p>Prix unitaire : <span id="prixpersonnage">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpersonnage">0.00</span> €</p>
                        <input type="number" id="personnage-input" name="personnage" min="0">
                    </div>

                    <div id="personnageelite" class="cardform">
                        <label for="personnageelite-input">Nombre de <strong>Personnages élite à Pied socle 40-50mm</strong> :</label>
                        <p>Exemple : Capitaine/Sergeant Space Marines en armure Phobos, Sorcier armure terminator</p>
                        <p>Prix unitaire : <span id="prixpersonnageelite">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpersonnageelite">0.00</span> €</p>
                        <input type="number" id="personnageelite-input" name="personnageelite" min="0">
                    </div>

                    <div id="personnagemonstrueux" class="cardform">
                        <label for="personnagemonstrueux-input">Nombre de <strong>Personnages Monstrueux socle 60-100mm</strong> :</label>
                        <p>Exemple : Primarques, Treelord, Prince Tyranid...</p>
                        <p>Prix unitaire : <span id="prixpersonnagemonstrueux">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpersonnagemonstrueux">0.00</span> €</p>
                        <input type="number" id="personnagemonstrueux-input" name="personnagemonstrueux" min="0">
                    </div>

                    <div id="personnagesurmonstre" class="cardform">
                        <label for="personnagesurmonstre-input">Nombre de <strong>Personnages sur Monstres socle 120mm ovale</strong> :</label>
                        <p>Exemple : MetaRodeur, Tortue Idoneth, Saurus sur Carnosaure...</p>
                        <p>Prix unitaire : <span id="prixpersonnagesurmonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpersonnagesurmonstre">0.00</span> €</p>
                        <input type="number" id="personnagesurmonstre-input" name="personnagesurmonstre" min="0">
                    </div>

                    <div id="personnagesurgrandmonstre" class="cardform">
                        <label for="personnagesurgrandmonstre-input">Nombre de <strong>Personnages sur Grand Monstres socle 130-160mm ou supérieur</strong> :</label>
                        <p>Exemple : Allareille, Dragon Stormcast, Dragon Crocodile...</p>
                        <p>Prix unitaire : <span id="prixpersonnagesurgrandmonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpersonnagesurgrandmonstre">0.00</span> €</p>
                        <input type="number" id="personnagesurgrandmonstre-input" name="personnagesurgrandmonstre" min="0">
                    </div>

                    <div id="cavalerie" class="cardform">
                        <label for="cavalerie-input">Nombre de <strong>Cavaleries socle ovale 60-75mm</strong> :</label>
                        <p>Exemple : Motos Eldar, Murènes Idoneth, Cavalerie squelettes...</p>
                        <p>Prix unitaire : <span id="prixcavalerie">0.00</span> €</p>
                        <p>Sous Total : <span id="totalcavalerie">0.00</span> €</p>
                        <input type="number" id="cavalerie-input" name="cavalerie" min="0">
                    </div>

                    <div id="cavalerielourde" class="cardform">
                        <label for="cavalerielourde-input">Nombre de <strong>Cavaleries lourdes socle ovale 90-105mm</strong> :</label>
                        <p>Exemple : Motos Custodes, Saurus sur Aggradon, Requin Idoneth...</p>
                        <p>Prix unitaire : <span id="prixcavalerielourde">0.00</span> €</p>
                        <p>Sous Total : <span id="totalcavalerielourde">0.00</span> €</p>
                        <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
                    </div>

                    <div id="petitvehiculemonstre" class="cardform">
                        <label for="petitvehiculemonstre-input">Nombre de <strong>Petit Véhicules/Monstres socle ovale 75-90mm</strong> :</label>
                        <p>Exemple : Sentinel, Bête de Nurgle, Drone...</p>
                        <p>Prix unitaire : <span id="prixpetitvehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpetitvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
                    </div>

  <div id="vehiculemonstremoyen" class="cardform">
                        <label for="vehiculemonstremoyen-input">Nombre de <strong>Véhicules/Monstres Moyen socle 80-100mm</strong> :</label>
                        <p>Exemple : Rhino, Dreadnought, Drone...</p>
                        <p>Prix unitaire : <span id="prixvehiculemonstremoyen">0.00</span> €</p>
                        <p>Sous Total : <span id="totalvehiculemonstremoyen">0.00</span> €</p>
                        <input type="number" id="vehiculemonstremoyen-input" name="vehiculemonstremoyen" min="0">
                    </div>

                    <div id="grosvehiculemonstre" class="cardform">
                        <label for="grosvehiculemonstre-input">Nombre de <strong>Gros Véhicules/Monstres socle 90-100mm ou supérieur</strong> :</label>
                        <p>Exemple : Prédator, Plague Burst, Prince Démon, Armingers, Mancrusher...</p>
                        <p>Prix unitaire : <span id="prixgrosvehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalgrosvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
                    </div>

                                      <div id="enormevehiculemonstre" class="cardform">
                        <label for="enormevehiculemonstre-input">Nombre de <strong>Énormes Véhicules/Monstres socle 100-130 ou supérieur</strong> :</label>
                        <p>Exemple : Land Raider, Defiler, Aerodyne, Morathi, Mortarion, Kragnos...</p>
                        <p>Prix unitaire : <span id="prixenormevehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalenormevehiculemonstre">0.00</span> €</p>
                        <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
                    </div>

                    <div id="titanvehiculemonstre" class="cardform">
                        <label for="titanvehiculemonstre-input">Nombre de <strong>Véhicules/Monstres Titanesques socle 130-160mm-170mm</strong> :</label>
                        <p>Exemple : Spartan, Allareille, Imperial Knight, Cogfort, Fulgrim, Mega Gargant...</p>
                        <p>Prix unitaire : <span id="prixtitanvehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totaltitanvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="titanvehiculemonstre-input" name="titanvehiculemonstre" min="0">
                    </div>
                    <div id="montage" class="cardform">
                        <label for="montage-input"><strong>Montage</strong> à prévoir ?</label>
                        <select id="montage-input" name="montage">
                            <option value="Oui" selected>Oui</option>
                            <option value="Non">Non</option>
                        </select>
                    </div>

                    <div id="aimant" class="cardform">
                        <label for="aimant-input"><strong>Aimant</strong> à prévoir ?</label>
                        <select id="aimant-input" name="aimant">
                            <option value="Oui">Oui</option>
                            <option value="Non" selected>Non</option>
                        </select>
                    </div>

                    <div id="total" class="cardform">
                      <h3 class="total">TOTAL :</h3>
<h3><span id="oktotal">0.00</span></h3>
</div>
                           <div id="message" class="cardform">
                            <label for="message-input">Afin d'être le plus précis possible,<br>Merci de définir la liste de figurines à peindre, si le montage est nécessaire,<br>et si vous avez un thème ou schéma de couleurs déjà défini : <span class="required">*</span></label>
                            <div><textarea id="message-input" name="message" placeholder="Votre message" required></textarea></div>
                    </div>

                    <p><span class="required">*</span> Champs obligatoires</p>

                      
                </fieldset>
            <div class="center">
              <button type="submit" class="button">Envoyer la demande par mail</button>
                   </div>   
            </form>

          </div>
        `;
    }

    main.innerHTML = html;
}

    

// =============================
// SCROLL FIX
// =============================
function initScrollBehaviors() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (!scrollBtn) return;

    const update = () => {
        scrollBtn.style.display = window.scrollY > 50 ? "block" : "none";
    };

    window.removeEventListener("scroll", update);
    window.addEventListener("scroll", update);
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


   
   function changelangueindex() {
    const main = document.getElementById("contenu-principal");
   

    let html = "";

    if (currentLanguage === "english") {
        html = `
      <div class="center">
    <div class="maintenance-box">

       <h1>Studio PF<br>Professional Miniature Painter</h1>

<h2>🎨 Warhammer, Display<br>and Collectible Miniature Painting</h2>

<p>
Specializing in <strong>high-end miniature painting</strong>, Studio PF helps hobbyists, collectors, and gamers bring their miniatures to life with professional-quality finishes.
</p>

<p>
Whether you are looking for a <strong>professional miniature painter</strong> for a Warhammer 40,000 army, an Age of Sigmar collection, a display piece, or a unique commission, every project receives meticulous attention and personalized craftsmanship.
</p>

<p>
Your miniatures deserve more than a simple coat of paint. Using advanced painting techniques, smooth blends, realistic lighting, weathering effects, and immersive basing, each model is designed to stand out both on the tabletop and in a display cabinet.
</p>

<p>
At <strong>Studio PF</strong>, every <strong>miniature painting commission</strong> is created with passion and dedication, transforming your miniatures into true works of art.
</p>
    <p> <a href="peinturecommission.html" class="button"  onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">Discover Our Painting Service ➜</a></p>
    </div>
</div>

<div class="center">
   <div class="maintenance-box">
<h1>Studio PF<br>Professional Miniature Painter</h1>

<h2>🎨 Warhammer Miniature Painting<br>Collection & Display</h2>

<p>
Specialized in <strong>high-end miniature painting</strong>, Studio PF helps hobbyists, collectors and players bring their armies and display pieces to life.
</p>

<p>
Whether you are looking for a <strong>professional miniature painter</strong> for a Warhammer 40K army, Age of Sigmar, a display miniature or a unique piece, every project receives a careful and personalized approach.
</p>

<p>
Your miniatures deserve more than just basic colours. Through advanced painting techniques, highlights, contrasts and basing work, each model is designed to stand out both on the gaming table and in a collector's display case.
</p>

<p>
At <strong>Studio PF</strong>, every <strong>miniature painting commission</strong> is created with passion to transform your miniatures into true <strong>unique collector pieces</strong>.
</p>

<p>
<a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
Discover the painting service ➜
</a>
</p>
</div></div>


<div class="center">
<div class="maintenance-box">

<h2>👋 Miniature Painter in France</h2>

<p>
I am <strong>Pierre-François, also known as PF, <span id="pf-age">39</span> years old.</strong><br>
Passionate miniature painter and founder of Studio PF.<br><br>

I have been painting miniatures since 2020, a passion that started somewhat by chance.<br>
Covid transformed this hobby into a true artistic journey.<br>

Today, I work with acrylics, pigments and oils, creating a style that brings miniatures to life.<br><br>

My goal: to make your miniatures feel alive.
</p>

<blockquote>
“Every miniature tells a story. My role is to make it shine.” ✨
</blockquote>

<p>
<a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent" class="button" target="_blank">
Learn more about my journey ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>Professional Painting Commission</h2>

<h3>⚔️ High-End TableTop Painting</h3>

<p>
👉 For demanding players who want a high-quality finish without sacrificing playability.
</p>

<ul>
<li>Levels: <strong>⭐ Gold (Level 3) & 👑 Diamant (Level 4)</strong></li>
<li>Precise, contrasted and personalized painting</li>
<li>Detailed basing</li>
<li>Customization options</li>
</ul>

<p>
<a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
Discover the painting service ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>Miniature Painting Courses & Training</h2>

<h3>🧠 Painting Training & Coaching</h3>

<p>
👉 Learn professional techniques: lighting, basing, blending and finishing.<br>
Personalized sessions, online or in the studio.
</p>

<p>
<a href="formation.html" class="button" onclick="loadPage('formation.html'); scrollToTop(); return false;">
Discover the training courses ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>🪄 Why choose Studio PF?</h2>

<ul>
<li>🎨 <strong>Custom painting</strong> : each project is adapted to your universe and your budget.</li>

<li>🔧 <strong>Careful preparation</strong> : cleaning, assembly, priming and complete preparation.</li>

<li>🧪 <strong>Immersive bases & 3D elements</strong> : for a unique and realistic result.</li>

<li>💬 <strong>Transparent customer follow-up</strong> : progress photos, direct contact and personalized advice.</li>

<li>🚚 <strong>Secure shipping</strong> : via Colissimo or hand delivery.</li>
</ul>

<p>
You receive a miniature ready to play or display, durable and completely matching your vision.
</p>

</div>
</div>

<div class="center">
    <div class="maintenance-box">

        <h2>⚙️ How does it work?</h2>

        <ol>
            <li>Contact me and request your personalized quote.</li>
            <li>Send me your miniatures or share your project.</li>
            <li>I take care of the preparation, assembly, painting and finishing.</li>
            <li>You approve the final photos before shipping or hand delivery.</li>
        </ol>

        <p>
            Simple, transparent, and 100% passion.
        </p>

        <p>
            <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
                Request a quote ➜
            </a>
        </p>

    </div>
</div>
         
        `;
    } else if (currentLanguage === "spanish") {
        html = `
      <div class="center">
  <div class="maintenance-box">
<h1>Studio PF<br>Pintor Profesional de Miniaturas</h1>

<h2>🎨 Pintura de Miniaturas Warhammer<br>Colección y Exposición</h2>

<p>
Especializado en la <strong>pintura de miniaturas de alta gama</strong>, Studio PF acompaña a jugadores, coleccionistas y aficionados que desean dar vida a sus ejércitos y piezas de exposición.
</p>

<p>
Si buscas un <strong>pintor profesional de miniaturas</strong> para un ejército de Warhammer 40K, Age of Sigmar, una miniatura de exposición o una pieza única, cada proyecto recibe un trabajo cuidado y personalizado.
</p>

<p>
Tus miniaturas merecen mucho más que una simple aplicación de color. Gracias a técnicas avanzadas de pintura, luces, contrastes y peanas trabajadas, cada modelo está creado para destacar tanto en la mesa de juego como en una vitrina de colección.
</p>

<p>
En <strong>Studio PF</strong>, cada <strong>encargo de pintura de miniaturas</strong> se realiza con pasión para transformar tus miniaturas en auténticas <strong>piezas de colección únicas</strong>.
</p>

<p>
<a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
Descubrir el servicio de pintura ➜
</a>
</p>

</div></div>


<div class="center">
<div class="maintenance-box">

<h2>👋 Pintor de Miniaturas en Francia</h2>

<p>
Soy <strong>Pierre-François, conocido como PF, <span id="pf-age">39</span> años.</strong><br>
Pintor apasionado y fundador de Studio PF.<br><br>

Practico la pintura de miniaturas desde 2020, una pasión que comenzó casi por casualidad.<br>
El Covid transformó este hobby en una verdadera búsqueda artística.<br>

Hoy trabajo con acrílicos, pigmentos y óleos, creando un estilo que da vida a las miniaturas.<br><br>

Mi objetivo: hacer que tus miniaturas cobren vida.
</p>

<blockquote>
“Cada miniatura cuenta una historia. Mi papel es hacerla brillar.” ✨
</blockquote>

<p>
<a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-meses-las-peticiones-aumentan" class="button" target="_blank">
Conoce más sobre mi trayectoria ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>Encargos Profesionales de Pintura</h2>

<h3>⚔️ Pintura TableTop de Alta Gama</h3>

<p>
👉 Para jugadores exigentes que buscan un acabado de calidad sin renunciar a la jugabilidad.
</p>

<ul>
<li>Niveles: <strong>⭐ Gold (nivel 3) & 👑 Diamant (nivel 4)</strong></li>
<li>Pintura precisa, contrastada y personalizada</li>
<li>Peanas trabajadas</li>
<li>Opciones de personalización</li>
</ul>

<p>
<a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
Descubrir el servicio de pintura ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>Cursos y Formación de Pintura de Miniaturas</h2>

<h3>🧠 Formación y Coaching de Pintura</h3>

<p>
👉 Aprende técnicas profesionales: gestión de luces, peanas, degradados y acabados.<br>
Sesiones personalizadas, online o en el taller.
</p>

<p>
<a href="formation.html" class="button" onclick="loadPage('formation.html'); scrollToTop(); return false;">
Descubrir las formaciones ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>🪄 ¿Por qué elegir Studio PF?</h2>

<ul>
<li>🎨 <strong>Pintura personalizada</strong> : cada proyecto se adapta a tu universo y presupuesto.</li>

<li>🔧 <strong>Preparación cuidada</strong> : limpieza, montaje, imprimación y preparación completa.</li>

<li>🧪 <strong>Peanas inmersivas y elementos 3D</strong> : para un resultado único y realista.</li>

<li>💬 <strong>Seguimiento transparente</strong> : fotos del avance, contacto directo y consejos personalizados.</li>

<li>🚚 <strong>Envío seguro</strong> : mediante Colissimo o entrega en mano.</li>
</ul>

<p>
Recibes una miniatura lista para jugar o exponer, resistente y totalmente adaptada a tu visión.
</p>

</div>
</div>

<div class="center">
    <div class="maintenance-box">
        <h3>⚔️ TableTop Avanzado</h3>
        <p>👉 Para jugadores exigentes que quieren un resultado espectacular sin sacrificar la jugabilidad.</p>
        <ul>
            <li>Niveles: Gold y Diamante</li>
            <li>Pintura precisa y contrastada</li>
            <li>Peanas trabajadas</li>
            <li>Opciones de personalización</li>
        </ul>
        <p><a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">Descubre nuestro servicio de pintura ➜</a></p>
    </div>
</div>

<div class="center">
    <div class="maintenance-box">
        <h3>🧠 Formación & Coaching de pintura</h3>
        <p>👉 Aprende técnicas profesionales: iluminación, peanas, degradados, acabados.  
        Sesiones personalizadas, online o en taller.</p>
        <p><a href="formation.html" class="button" onclick="loadPage('formation.html'); scrollToTop(); return false;">Descubrir las formaciones ➜</a></p>
    </div>
</div>

<div class="center">
    <div class="maintenance-box">
        <h2>🪄 ¿Por qué elegir Studio PF ?</h2>
        <ul>
            <li>🎨 <strong>Pintura a medida</strong>: cada proyecto se adapta a tu universo y presupuesto.</li>
            <li>🔧 <strong>Preparación cuidadosa</strong>: montaje, limpieza, imprimación, todo está controlado.</li>
            <li>🧪 <strong>Peanas inmersivas y bits 3D</strong>: para un resultado único y realista.</li>
            <li>💬 <strong>Seguimiento transparente</strong>: fotos del progreso, contacto directo, asesoramiento personalizado.</li>
            <li>🚚 <strong>Envío seguro</strong> por Colissimo o entrega en mano.</li>
        </ul>
        <p>Recibes una pieza lista para exhibir, duradera y totalmente a tu medida.</p>
    </div>
</div>

<div class="center">
    <div class="maintenance-box">

        <h2>⚙️ ¿Cómo funciona?</h2>

        <ol>
            <li>Contáctame y solicita tu presupuesto personalizado.</li>
            <li>Envíame tus miniaturas o comparte tu proyecto.</li>
            <li>Me encargo de la preparación, montaje, pintura y acabados.</li>
            <li>Validas las fotos finales antes del envío o la entrega en mano.</li>
        </ol>

        <p>
            Simple, transparente y 100% pasión.
        </p>

        <p>
            <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
                Solicitar presupuesto ➜
            </a>
        </p>

    </div>
</div>       
        `;
    } else {
        html = `
        
  <div class="center">
           <div class="maintenance-box">
<h1>Studio PF<br>Peintre professionnel sur Figurines</h1>

<h2>🎨 Peinture sur Figurines Warhammer<br>Collection et Exposition</h2>

<p>
Spécialisé dans la <strong>peinture sur figurines haut de gamme</strong>, Studio PF accompagne les passionnés, collectionneurs et joueurs souhaitant donner vie à leurs armées et pièces de collection.
</p>

<p>
Que vous recherchiez un <strong>peintre professionnel sur figurines</strong> pour une armée Warhammer 40K, Age of Sigmar, une figurine d'exposition ou une pièce unique, chaque projet bénéficie d'un travail minutieux et personnalisé.
</p>

<p>
Vos figurines méritent bien plus qu'une simple mise en couleur. Grâce à des techniques avancées de peinture, d'éclaircissements, de contrastes et de soclage, chaque modèle est conçu pour attirer le regard sur une table de jeu comme dans une vitrine de collection.
</p>

<p>
Chez <strong>Studio PF</strong>, chaque <strong>commission de peinture sur figurine</strong> est réalisée avec passion afin de transformer vos figurines en véritables <strong>pièces de collection uniques</strong>.
</p>

<p>
<a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
Découvrir le service peinture ➜
</a>
</p>
</div></div>


<div class="center">
<div class="maintenance-box">

<h2>👋 Peintre sur Figurine en France</h2>

<p>
Je suis <strong>Pierre-François, alias PF, <span id="pf-age">39</span> ans.</strong><br>
Peintre passionné et fondateur de Studio PF.<br><br>

Je pratique la peinture de figurines depuis 2020, une passion née un peu par hasard.<br>
Le Covid a transformé ce hobby en véritable quête artistique.<br>

Aujourd’hui, je travaille l'acrylique, les pigments et les huiles avec un style qui donne vie aux figurines.<br><br>

Mon objectif : faire vibrer vos figurines comme si elles prenaient vie.
</p>

<blockquote>
“Chaque figurine raconte une histoire. Mon rôle, c’est de la faire briller.” ✨
</blockquote>

<p>
<a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent" class="button" target="_blank">
En savoir plus sur mon parcours ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>Commission de Peinture Professionnelle</h2>

<h3>⚔️ Peinture TableTop Haut de Gamme</h3>

<p>
👉 Pour les joueurs exigeants qui souhaitent un rendu de qualité sans sacrifier la jouabilité.
</p>

<ul>
<li>Niveaux : <strong>⭐ Gold (niveau 3) & 👑 Diamant (niveau 4)</strong></li>
<li>Peinture précise, contrastée et personnalisée</li>
<li>Soclage travaillé</li>
<li>Options de personnalisation</li>
</ul>

<p>
<a href="peinturecommission.html" class="button" onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
Découvrir le service peinture ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>Cours et Formation de Peinture sur Figurine</h2>

<h3>🧠 Formations & Coaching peinture</h3>

<p>
👉 Apprenez les techniques professionnelles : gestion des lumières, soclage, dégradés et finitions.<br>
Séances personnalisées, en ligne ou en atelier.
</p>

<p>
<a href="formation.html" class="button" onclick="loadPage('formation.html'); scrollToTop(); return false;">
Découvrir les formations ➜
</a>
</p>

</div>
</div>


<div class="center">
<div class="maintenance-box">

<h2>🪄 Pourquoi choisir Studio PF ?</h2>

<ul>
<li>🎨 <strong>Peinture sur mesure</strong> : chaque projet est adapté à votre univers et votre budget.</li>

<li>🔧 <strong>Préparation soignée</strong> : nettoyage, montage, sous-couche et préparation complète.</li>

<li>🧪 <strong>Socles immersifs & éléments 3D</strong> : pour un rendu unique et réaliste.</li>

<li>💬 <strong>Suivi client transparent</strong> : photos d’avancement, contact direct et conseils personnalisés.</li>

<li>🚚 <strong>Expédition sécurisée</strong> : via Colissimo ou remise en main propre.</li>
</ul>

<p>
Vous recevez une pièce prête à jouer ou à exposer, durable et totalement à votre image.
</p>

</div>
</div>
        <div class="center">
    <div class="maintenance-box">

        <h2>⚙️ Comment ça marche ?</h2>

        <ol>
            <li>Contactez-moi et demandez votre devis personnalisé.</li>
            <li>Confiez-moi vos figurines ou votre projet.</li>
            <li>Je réalise la préparation, le montage, la peinture et les finitions.</li>
            <li>Vous validez les photos finales avant l'expédition ou la remise en main propre.</li>
        </ol>

        <p>
            Simple, transparent, et 100% passion.
        </p>

        <p>
            <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
                Demander un devis ➜
            </a>
        </p>

    </div>
</div>
        `;
    }

    main.innerHTML = html;
}

function changelanguecollection() {
      const main = document.getElementById("contenu-principal");
   

     let html = "";

    if (currentLanguage === "english") {
        html = `<div class="maintenance-box">

    <h1>Unique pieces for collection, display and competitions 🏆</h1>

    <p>
    Studio PF creates <strong>high-end miniature painting</strong> services for collectors, enthusiasts and art lovers who want to transform their models into true display pieces.
    </p>

    <p>
    Each project receives a fully customized approach, adapted to the sculpture, the miniature universe and the desired objective: collection, showcase or painting competition.
    </p>

    <p>
    This service is intended for models requiring a superior level of finish, with detailed artistic work that can represent <strong>several dozen hours of work</strong> depending on the complexity of the piece.
    </p>
<p>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Studio%20PF%20Collector%20Painting%20Project" class="button">
Present my project 💬
</a>
</p>
</div>

<div class="maintenance-box">
    <h2>⚔️ Gaming miniatures</h2>
    <p>
    Warhammer 40K, Age of Sigmar, Warhammer The Old World,
    Dungeons & Dragons, The Lord of the Rings, Star Wars Legion,
    StarCraft, Marvel Crisis Protocol, Infinity, Conquest,
    as well as many other fantasy and science-fiction universes.
    </p>
</div>


<div class="maintenance-box">
    <h2>🗿 Busts and collector pieces</h2>
    <p>
    Busts, miniature statues, resin miniatures and pieces intended for display or painting competitions.
    </p>
</div>


<div class="maintenance-box">
    <h2>🖨️ 3D printed miniatures</h2>
    <p>
    Models can come from independent artists, 3D creators or platforms such as Etsy, MyMiniFactory or other specialized printing services.
    </p>

    <p>
    The customer provides the miniature or purchases it directly from the creator or printer of their choice.
    </p>

    <h3>Important information</h3>
    <p>
    <strong>Studio PF does not provide 3D printing services for this offer.</strong><br>
    The service exclusively covers the preparation and artistic painting of the miniature.
    </p>
</div>
        <div class="maintenance-box">

<h2>Artistic Preparation 🛠️</h2>

<ul>

<li>
Careful cleaning and preparation of the model
</li>

<li>
Assembly and adjustment of the different parts
</li>

<li>
Correction of any preparation defects
</li>

<li>
Suitable primer application according to the artistic project
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Collector Painting 🎨</h2>

<ul>

<li>
<strong>✨ Volume work:</strong><br>
Smooth gradients, soft transitions, precise highlights and advanced color variations to reveal the full richness of the sculpture.
</li>

<li>
<strong>🎭 Artistic research:</strong><br>
Work on contrasts, color harmony, focal points and overall atmosphere to create a visually powerful piece.
</li>

<li>
<strong>🧪 Texture work:</strong><br>
Creation of realistic or stylized painted textures: leather, metal, skin, fabrics, wood, stone, worn surfaces and complex materials.
</li>

<li>
<strong>💡 Advanced techniques:</strong><br>
Glazes, oils, pigments, lighting effects, weathering, fine details and techniques adapted to collector and competition pieces.
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Base & Presentation 🌿</h2>

<ul>

<li>
<strong>🌱 Custom base:</strong><br>
Creation of an atmosphere consistent with the story, character and universe of the miniature.
</li>

<li>
<strong>🏆 Exhibition presentation:</strong><br>
Work on the base and overall composition to enhance the visual impact of the piece.
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>A Unique Piece ✨</h2>

<table class="tableborder1">

<thead>
<tr>
<th>🎨 Features</th>
<th>Collection</th>
</tr>
</thead>

<tbody>

<tr>
<td>Purpose</td>
<td>Collection, exhibition, display or competition</td>
</tr>

<tr>
<td>Finish level</td>
<td>Very high finish with advanced artistic work</td>
</tr>

<tr>
<td>Painting</td>
<td>Fine gradients, complex color variations, textures and advanced effects</td>
</tr>

<tr>
<td>Production time</td>
<td>Project requiring several dozen hours of work</td>
</tr>

<tr>
<td>Approach</td>
<td>Each piece is unique and individually studied</td>
</tr>

</tbody>

</table>

</div>


<div class="maintenance-box">

<h2>📩 Present your project</h2>

<p>
For a collector piece, each project is individually studied in order to offer an approach adapted to your miniature and your expectations.
</p>

<p>
To prepare your request, please send:
</p>

<ul>

<li>
Photos or a link to the miniature
</li>

<li>
Model dimensions (scale, height, base...)
</li>

<li>
Desired universe or theme
</li>

<li>
References or inspirations
</li>

<li>
Your expectations regarding the finish level
</li>

</ul>

<p>
I will reply with a personalized proposal for your project.
</p>

<p>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Studio%20PF%20Collector%20Painting%20Project" class="button">
Present my project 💬
</a>
</p>

</div>`;
    } else if (currentLanguage === "spanish") {
        html = `<div class="maintenance-box">

    <h1>Piezas únicas para colección, exposición y concursos 🏆</h1>

    <p>
    Studio PF realiza <strong>pinturas de figuras de alta gama</strong> destinadas a coleccionistas, apasionados y amantes de las piezas únicas que desean transformar sus modelos en auténticas piezas de exposición.
    </p>

    <p>
    Cada proyecto recibe un enfoque totalmente personalizado, adaptado a la escultura, al universo de la miniatura y al objetivo buscado: colección, vitrina o concurso de pintura.
    </p>

    <p>
    Este servicio está destinado a modelos que requieren un nivel de acabado superior, con un trabajo artístico detallado que puede representar <strong>varias decenas de horas de realización</strong> según la complejidad de la pieza.
    </p>
<p>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Proyecto%20de%20pintura%20de%20colección%20Studio%20PF" class="button">
Presentar mi proyecto 💬
</a>
</p>
</div>

<div class="maintenance-box">
    <h2>⚔️ Figuras de juego</h2>
    <p>
    Warhammer 40K, Age of Sigmar, Warhammer The Old World,
    Dragones y Mazmorras, El Señor de los Anillos, Star Wars Legion,
    StarCraft, Marvel Crisis Protocol, Infinity, Conquest,
    así como muchos otros universos fantásticos y de ciencia ficción.
    </p>
</div>


<div class="maintenance-box">
    <h2>🗿 Bustos y piezas de colección</h2>
    <p>
    Bustos, estatuas en miniatura, figuras de resina y piezas destinadas a exposición o concursos de pintura.
    </p>
</div>


<div class="maintenance-box">
    <h2>🖨️ Figuras impresas en 3D</h2>
    <p>
    Los modelos pueden proceder de artistas independientes, creadores 3D o plataformas como Etsy, MyMiniFactory u otros servicios especializados de impresión.
    </p>

    <p>
    El cliente proporciona la figura o la compra directamente al creador o impresor de su elección.
    </p>

    <h3>Información importante</h3>
    <p>
    <strong>Studio PF no realiza la impresión 3D de los modelos para este servicio.</strong><br>
    El servicio incluye exclusivamente la preparación y la pintura artística de la pieza.
    </p>

</div>

<div class="maintenance-box">

<h2>Preparación artística 🛠️</h2>

<ul>

<li>
Limpieza y preparación minuciosa del modelo
</li>

<li>
Montaje y ajuste de las diferentes piezas
</li>

<li>
Corrección de posibles defectos de preparación
</li>

<li>
Aplicación de imprimación adecuada al proyecto artístico
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Pintura de colección 🎨</h2>

<ul>

<li>
<strong>✨ Trabajo de volúmenes:</strong><br>
Degradados suaves, transiciones delicadas, iluminaciones precisas y variaciones de color avanzadas para revelar toda la riqueza de la escultura.
</li>

<li>
<strong>🎭 Investigación artística:</strong><br>
Trabajo de contrastes, armonías de color, puntos focales y atmósfera general para crear una pieza visualmente impactante.
</li>

<li>
<strong>🧪 Trabajo de texturas:</strong><br>
Creación de texturas pintadas realistas o estilizadas: cuero, metal, piel, tejidos, madera, piedra, superficies desgastadas y materiales complejos.
</li>

<li>
<strong>💡 Técnicas avanzadas:</strong><br>
Veladuras, óleos, pigmentos, efectos de luz, weathering, detalles finos y técnicas adaptadas a piezas de colección y concursos.
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Base y puesta en escena 🌿</h2>

<ul>

<li>
<strong>🌱 Base personalizada:</strong><br>
Creación de una atmósfera coherente con la historia, el personaje y el universo de la miniatura.
</li>

<li>
<strong>🏆 Presentación para exposición:</strong><br>
Trabajo de la base y de la composición general para reforzar el impacto visual de la pieza.
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Una pieza única ✨</h2>

<table class="tableborder1">

<thead>
<tr>
<th>🎨 Características</th>
<th>Colección</th>
</tr>
</thead>

<tbody>

<tr>
<td>Destino</td>
<td>Colección, exposición, vitrina o concurso</td>
</tr>

<tr>
<td>Nivel de acabado</td>
<td>Acabado muy alto con trabajo artístico avanzado</td>
</tr>

<tr>
<td>Pintura</td>
<td>Degradados finos, matices complejos, texturas y efectos avanzados</td>
</tr>

<tr>
<td>Tiempo de realización</td>
<td>Proyecto que puede representar varias decenas de horas de trabajo</td>
</tr>

<tr>
<td>Enfoque</td>
<td>Cada pieza es única y estudiada individualmente</td>
</tr>

</tbody>

</table>

</div>


<div class="maintenance-box">

<h2>📩 Presenta tu proyecto</h2>

<p>
Para una pieza de colección, cada proyecto se estudia individualmente para ofrecer un enfoque adaptado a tu miniatura y a tus expectativas.
</p>

<p>
Para preparar tu solicitud, envía:
</p>

<ul>

<li>
Fotos o enlace de la miniatura
</li>

<li>
Dimensiones del modelo (escala, altura, base...)
</li>

<li>
Universo o temática deseada
</li>

<li>
Referencias o inspiraciones
</li>

<li>
Tus expectativas sobre el nivel de acabado
</li>

</ul>

<p>
Te responderé con una propuesta personalizada para tu proyecto.
</p>

<p>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Proyecto%20de%20pintura%20de%20colección%20Studio%20PF" class="button">
Presentar mi proyecto 💬
</a>
</p>

</div>`;
    } else {
        html = `<div class="maintenance-box">


        <h1>Pièces uniques pour collection, exposition et concours 🏆</h1>
  


    <p>
    Studio PF réalise des <strong>peintures de figurines haut de gamme</strong> destinées aux collectionneurs, passionnés et amateurs de belles pièces souhaitant transformer leurs modèles en véritables pièces d'exposition.
    </p>

    <p>
    Chaque projet bénéficie d'une approche entièrement personnalisée, adaptée à la sculpture, à l'univers de la figurine et à l'objectif recherché : collection, vitrine ou concours.
    </p>

    <p>
    Cette prestation s'adresse aux modèles nécessitant un niveau de finition supérieur, avec un travail artistique approfondi pouvant représenter <strong>plusieurs dizaines d'heures de réalisation</strong> selon la complexité de la pièce.
    </p>
<p>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Projet%20peinture%20de%20collection%20Studio%20PF" class="button">
Présenter mon projet 💬
</a>
</p>
  </div>
    <div class="maintenance-box">
        <h2>⚔️ Figurines de jeux</h2>
        <p>
        Warhammer 40K, Age of Sigmar, Warhammer The Old World,
        Donjons & Dragons, Le Seigneur des Anneaux, Star Wars Legion,
        StarCraft, Marvel Crisis Protocol, Infinity, Conquest,
        ainsi que de nombreux autres univers fantastiques et science-fiction.
        </p>
    </div>


    <div class="maintenance-box">
        <h2>🗿 Bustes et pièces de collection</h2>
        <p>
        Bustes, statues miniatures, figurines résine et pièces destinées à l'exposition ou aux concours de peinture.
        </p>
    </div>


    <div class="maintenance-box">
        <h2>🖨️ Figurines imprimées en 3D</h2>
        <p>
        Les modèles peuvent provenir d'artisans indépendants, de créateurs 3D ou de plateformes comme Etsy, MyMiniFactory ou d'autres imprimeurs spécialisés.
        </p>

        <p>
        Le client fournit la figurine ou l'achète directement auprès du créateur ou de l'imprimeur de son choix.
        </p>

        <h3>Informations importantes</h3>
        <p>
        <strong>Studio PF ne réalise pas l'impression 3D des modèles pour cette prestation.</strong><br>
        Le service concerne exclusivement la préparation et la peinture artistique de la pièce.
        </p>
    </div>

</div>

<div class="maintenance-box">

<h2>Préparation artistique 🛠️</h2>

<ul>

<li>
Nettoyage et préparation minutieuse du modèle
</li>

<li>
Assemblage et ajustements des différentes pièces
</li>

<li>
Correction des éventuels défauts de préparation
</li>

<li>
Sous-couche adaptée au projet artistique
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Peinture de collection 🎨</h2>

<ul>

<li>
<strong>✨ Travail des volumes :</strong><br>
Dégradés fins, transitions douces, éclaircissements précis et nuances de couleurs approfondies afin de révéler toute la richesse de la sculpture.
</li>


<li>
<strong>🎭 Recherche artistique :</strong><br>
Travail des contrastes, harmonies colorées, points focaux et ambiance générale pour créer une pièce forte visuellement.
</li>


<li>
<strong>🧪 Jeux de textures :</strong><br>
Création de textures peintes réalistes ou stylisées : cuir, métal, peau, tissus, bois, pierre, surfaces usées et matières complexes.
</li>


<li>
<strong>💡 Techniques avancées :</strong><br>
Glacis, huiles, pigments, effets de lumière, weathering, détails fins et techniques adaptées aux pièces de collection et de concours.
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Soclage & mise en scène 🌿</h2>

<ul>

<li>
<strong>🌱 Socle personnalisé :</strong><br>
Création d'une ambiance cohérente avec l'histoire, le personnage et l'univers de la figurine.
</li>

<li>
<strong>🏆 Présentation exposition :</strong><br>
Travail du socle et de la composition générale afin de renforcer l'impact visuel de la pièce.
</li>

</ul>

</div>


<div class="maintenance-box">

<h2>Une pièce unique ✨</h2>

<table class="tableborder1">

<thead>
<tr>
<th>🎨 Caractéristiques</th>
<th>Collection</th>
</tr>
</thead>

<tbody>

<tr>
<td>Destination</td>
<td>Collection, exposition, vitrine ou concours</td>
</tr>

<tr>
<td>Niveau de finition</td>
<td>Très haute finition avec travail artistique approfondi</td>
</tr>

<tr>
<td>Peinture</td>
<td>Dégradés fins, nuances complexes, textures et effets avancés</td>
</tr>

<tr>
<td>Temps de réalisation</td>
<td>Projet pouvant représenter plusieurs dizaines d'heures de travail</td>
</tr>

<tr>
<td>Approche</td>
<td>Chaque pièce est unique et étudiée individuellement</td>
</tr>

</tbody>

</table>

</div>


<div class="maintenance-box">

<h2>📩 Présenter votre projet</h2>

<p>
Pour une pièce de collection, chaque projet est étudié individuellement afin de proposer une approche adaptée à votre figurine et à vos attentes.
</p>

<p>
Afin de préparer votre demande, envoyez-moi :
</p>

<ul>

<li>
Photos ou lien vers la figurine
</li>

<li>
Dimensions du modèle (échelle, hauteur, socle...)
</li>

<li>
Univers ou thème souhaité
</li>

<li>
Références ou inspirations
</li>

<li>
Vos attentes concernant le niveau de finition
</li>

</ul>

<p>
Je vous répondrai avec une proposition personnalisée pour votre projet.
</p>


<p>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Projet%20peinture%20de%20collection%20Studio%20PF" class="button">
Présenter mon projet 💬
</a>
</p>

</div>`;
     }

    main.innerHTML = html;
}
// ────────────────────────────────────────────────
// Menus multilingues
// ────────────────────────────────────────────────
function changelanguepeinture() {
    
      const main = document.getElementById("contenu-principal");
   

    let html = "";

    if (currentLanguage === "english") {
        html = `
<h1>🎨 High-End Miniature Painting</h1>

<div class="maintenance-box">


        <h2>⭐ Gold — Premium TableTop Finish</h2>

        <p>
            <strong>Ideal for:</strong> Warhammer armies, units and large quantities of miniatures.
        </p>

        <p>
            A clean, efficient and consistent finish to create an army
            with an excellent tabletop appearance while keeping an accessible price.
        </p>

        <p>
            <strong>🎨 Techniques used:</strong><br>
            Base colors, simple shading, basic highlights,
            essential details and a clean finish.
        </p>

        <p>
            <strong>💵 Indicative price: $15 to $25 per miniature</strong>
        </p>

        <p>
            ⏱️ <strong>Indicative painting time:</strong><br><br>

            <strong>Troop miniature on 20-25mm base:</strong><br>
            Less than 1 hour → <strong>$10</strong><br><br>

            <strong>Troop miniature on 28-32mm base:</strong><br>
            Around 1h+ → <strong>$20</strong>
        </p>
        <p>
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>
</p>
    </div>


 


<div class="maintenance-box">
        <h2>👑 Diamond — Superior TableTop Finish</h2>

        <p>
            <strong>Ideal for:</strong> Characters, heroes, monsters,
            vehicles and important miniatures in your collection.
        </p>

        <p>
            A more advanced painting level with stronger contrasts,
            enhanced depth and additional attention to details.
        </p>

        <p>
            <strong>🎨 Techniques used:</strong><br>
            Advanced highlights, light placement,
            gradients, oil effects, decals,
            weathering and additional effects.
        </p>

        <p>
            <strong>💵 Indicative price: $25 to $50 per miniature</strong>
        </p>

        <p>
            ⏱️ <strong>Indicative painting time:</strong><br><br>

            <strong>Troop miniature on 20-25mm base:</strong><br>
            Around 1 hour → <strong>$20</strong><br><br>

            <strong>Troop miniature on 28-32mm base:</strong><br>
            Around 2h+ → <strong>$40</strong>
        </p>
        <p>
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>
</p>
    </div>


<div class="maintenance-box">
<h2>Preparation 🛠️</h2>
<ul>
    <li>Cleaning</li>
    <li>Assembly</li>
    <li>Optimal preparation before painting</li>
</ul>
</div>

<div class="maintenance-box">
    <h2>Painting 🎨</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> clean and efficient finish</li>
        <li><strong>👑 Diamond :</strong> refined details, enhanced contrasts and carefully worked focal points</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>Basings 🌿</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> detailed and harmonious base</li>
        <li><strong>👑 Diamond :</strong> scenic base with immersive atmosphere</li>
    </ul>
</div>

<!-- Comparison table -->
<div class="maintenance-box">
    <table class="tableborder1">
        <thead>
            <tr>
                <th>🎨 Features</th>
                <th>⭐ Gold</th>
                <th>👑 Diamond</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Painting time</td>
                <td>1h+ to 2h+</td>
                <td>2h+ to 4h+</td>
            </tr>
            <tr>
                <td>Finish</td>
                <td>Clean, simple and effective</td>
                <td>Highly detailed, with strong contrasts and focal points</td>
            </tr>
            <tr>
                <td>Techniques</td>
                <td>Base colours, simple shading, clean finishing</td>
                <td>Highlights, light effects, blending, oil techniques, decals, weathering</td>
            </tr>
            <tr>
                <td>Base</td>
                <td>Detailed and coherent</td>
                <td>Scenic and immersive</td>
            </tr>
        </tbody>
    </table>
</div>
<p>
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>
</p>

<div class="maintenance-box">
    <h3>Rates 2026-2027</h3>

<table class="tableborder1">
<thead>
<tr>
    <th>Category</th>
    <th>Gold</th>
    <th>Diamond</th>
</tr>
</thead>

<tbody>

<tr><td>Infantry 20-25mm</td><td>30min / $12.50</td><td>1h / $25</td></tr>
<tr><td>Infantry 28-32mm</td><td>1h / $25</td><td>2h / $50</td></tr>
<tr><td>Elite Infantry 40-50mm</td><td>1h30 / $37.50</td><td>3h / $75</td></tr>

<tr><td>Foot Character 25-32mm</td><td>3h / $75</td><td>6h / $150</td></tr>
<tr><td>Elite Character 40-50mm</td><td>4h / $100</td><td>8h / $200</td></tr>
<tr><td>Monstrous Character 60-100mm</td><td>6h / $150</td><td>12h / $300</td></tr>
<tr><td>Character Mounted on Monster 120mm</td><td>8h / $200</td><td>16h / $400</td></tr>
<tr><td>Character on Large Monster</td><td>12h / $300</td><td>24h / $600</td></tr>

<tr><td>Cavalry 60-75mm</td><td>2h / $50</td><td>4h / $100</td></tr>
<tr><td>Heavy Cavalry 90-105mm</td><td>3h / $75</td><td>6h / $150</td></tr>

<tr><td>Small Vehicle / Monster</td><td>3h / $75</td><td>6h / $150</td></tr>
<tr><td>Medium Vehicle / Monster</td><td>5h / $125</td><td>10h / $250</td></tr>
<tr><td>Large Vehicle / Monster</td><td>8h / $200</td><td>16h / $400</td></tr>
<tr><td>Huge Vehicle / Monster</td><td>12h / $300</td><td>24h / $600</td></tr>

<tr><td>Titanic</td><td>18h / $450</td><td>36h / $900</td></tr>

</tbody>
</table>

</div>
`;
    } else if (currentLanguage === "spanish") {
        html = `

<h1>🎨 Pintura de Miniaturas de Alta Gama</h1>

<div class="maintenance-box">

           <h2>⭐ Gold — Acabado TableTop Premium</h2>

        <p>
            <strong>Ideal para:</strong> Ejércitos Warhammer, unidades
            y grandes cantidades de miniaturas.
        </p>

        <p>
            Un acabado limpio, eficiente y uniforme para conseguir un ejército
            con una excelente presencia en mesa manteniendo un precio accesible.
        </p>

        <p>
            <strong>🎨 Técnicas utilizadas:</strong><br>
            Colores base, sombras simples, iluminaciones básicas,
            detalles esenciales y acabado limpio.
        </p>

        <p>
            <strong>💵 Precio orientativo: 10€ a 20€ por miniatura</strong>
        </p>

        <p>
            ⏱️ <strong>Tiempo de pintura orientativo:</strong><br><br>

            <strong>Miniatura de tropa con peana de 20-25mm:</strong><br>
            Menos de 1 hora → <strong>10€</strong><br><br>

            <strong>Miniatura de tropa con peana de 28-32mm:</strong><br>
            Aproximadamente 1h+ → <strong>20€</strong>
        </p>
        <p>
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar un presupuesto 💬</a>
</p>
    </div>




<div class="maintenance-box">
        <h2>👑 Diamante — Acabado TableTop Superior</h2>

        <p>
            <strong>Ideal para:</strong> Personajes, héroes, monstruos,
            vehículos y miniaturas importantes de tu colección.
        </p>

        <p>
            Un nivel de pintura más avanzado con mayor contraste,
            profundidad y un trabajo más detallado.
        </p>

        <p>
            <strong>🎨 Técnicas utilizadas:</strong><br>
            Iluminaciones avanzadas, trabajo de luces,
            degradados, efectos con óleo, calcomanías,
            weathering y efectos adicionales.
        </p>

        <p>
            <strong>💵 Precio orientativo: 20€ a 40€ por miniatura</strong>
        </p>

        <p>
            ⏱️ <strong>Tiempo de pintura orientativo:</strong><br><br>

            <strong>Miniatura de tropa con peana de 20-25mm:</strong><br>
            Aproximadamente 1 hora → <strong>20€</strong><br><br>

            <strong>Miniatura de tropa con peana de 28-32mm:</strong><br>
            Aproximadamente 2h+ → <strong>40€</strong>
        </p>
        <p>
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar un presupuesto 💬</a>
</p>
    </div>


<div class="maintenance-box">
<h3>Preparación (incluida) 🛠️</h3>
<ul>
    <li>Limpieza completa de las piezas</li>
    <li>Eliminación de líneas de molde</li>
    <li>Montaje limpio y optimizado</li>
    <li>Preparación adaptada al nivel de acabado</li>
</ul>
<p><em>Cada miniatura se prepara para un resultado óptimo.</em></p>
</div>
<div class="maintenance-box">
<h2>Preparación 🛠️</h2>
<ul>
    <li>Limpieza</li>
    <li>Montaje</li>
    <li>Preparación óptima antes de pintar</li>
</ul>
</div>

<div class="maintenance-box">
    <h2>Pintura 🎨</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> acabado limpio y eficaz</li>
        <li><strong>👑 Diamante :</strong> detalles cuidados, contrastes reforzados y puntos focales trabajados</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>Peanas 🌿</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> peana trabajada y armoniosa</li>
        <li><strong>👑 Diamante :</strong> peana escénica con una ambientación inmersiva</li>
    </ul>
</div>

<!-- Tabla comparativa -->
<div class="maintenance-box">
    <table class="tableborder1">
        <thead>
            <tr>
                <th>🎨 Características</th>
                <th>⭐ Gold</th>
                <th>👑 Diamante</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tiempo de pintura</td>
                <td>1h+ a 2h+</td>
                <td>2h+ a 4h+</td>
            </tr>
            <tr>
                <td>Acabado</td>
                <td>Limpio, simple y eficaz</td>
                <td>Muy detallado, con contrastes marcados y puntos focales</td>
            </tr>
            <tr>
                <td>Técnicas</td>
                <td>Colores base, sombras simples, acabado limpio</td>
                <td>Luces, efectos de iluminación, degradados, técnicas con óleo, calcas, weathering</td>
            </tr>
            <tr>
                <td>Peana</td>
                <td>Trabajada y coherente</td>
                <td>Escénica e inmersiva</td>
            </tr>
        </tbody>
    </table>
</div>
<p>
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar un presupuesto 💬</a>
</p>

<div class="maintenance-box">
    <h3>Tarifas 2026-2027</h3>

<table class="tableborder1">
<thead>
<tr>
    <th>Categoría</th>
    <th>Gold</th>
    <th>Diamante</th>
</tr>
</thead>

<tbody>

<tr><td>Infantería 20-25mm</td><td>30min / 10€</td><td>1h / 20€</td></tr>
<tr><td>Infantería 28-32mm</td><td>1h / 20€</td><td>2h / 40€</td></tr>
<tr><td>Infantería de élite 40-50mm</td><td>1h30 / 30€</td><td>3h / 60€</td></tr>

<tr><td>Personaje a pie 25-32mm</td><td>3h / 60€</td><td>6h / 120€</td></tr>
<tr><td>Personaje de élite 40-50mm</td><td>4h / 80€</td><td>8h / 160€</td></tr>
<tr><td>Personaje monstruoso 60-100mm</td><td>6h / 120€</td><td>12h / 240€</td></tr>
<tr><td>Personaje sobre monstruo 120mm</td><td>8h / 160€</td><td>16h / 320€</td></tr>
<tr><td>Personaje sobre gran monstruo</td><td>12h / 240€</td><td>24h / 480€</td></tr>

<tr><td>Caballería 60-75mm</td><td>2h / 40€</td><td>4h / 80€</td></tr>
<tr><td>Caballería pesada 90-105mm</td><td>3h / 60€</td><td>6h / 120€</td></tr>

<tr><td>Vehículo pequeño / monstruo</td><td>3h / 60€</td><td>6h / 120€</td></tr>
<tr><td>Vehículo / monstruo mediano</td><td>5h / 100€</td><td>10h / 200€</td></tr>
<tr><td>Vehículo grande / monstruo</td><td>8h / 160€</td><td>16h / 320€</td></tr>
<tr><td>Vehículo enorme / monstruo</td><td>12h / 240€</td><td>24h / 480€</td></tr>

<tr><td>Titánico</td><td>18h / 360€</td><td>36h / 720€</td></tr>

</tbody>
</table>



</div>
`;
    } else {
        html = `

  <h1>🎨 Peinture de Figurines Haut de Gamme</h1>

<div class="maintenance-box">

  
        <h2>⭐ Gold — Finition TableTop Premium</h2>

        <p>
            <strong>Idéal pour :</strong> Armées Warhammer, unités et grandes quantités de figurines.
        </p>

        <p>
            Une finition propre, efficace et homogène pour obtenir une armée
            avec un excellent rendu sur table tout en gardant un tarif accessible.
        </p>

        <p>
            <strong>🎨 Techniques utilisées :</strong><br>
            Couleurs de base, ombrages simples, éclaircissements simples,
            détails essentiels et finition nette.
        </p>

        <p>
            <strong>💵 Prix indicatif : 10€ à 20€ par figurine</strong>
        </p>

        <p>
            ⏱️ <strong>Temps de peinture indicatif :</strong><br><br>

            <strong>Figurine de troupe socle 20-25mm :</strong><br>
            Moins d'une heure → <strong>10€</strong><br><br>

            <strong>Figurine de troupe socle 28-32mm :</strong><br>
            Environ 1h+ → <strong>20€</strong>
        </p>
   

  <p>
         <a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
    </p>
    </div>


   <div class="maintenance-box">
        <h2>👑 Diamant — Finition TableTop Supérieure</h2>

        <p>
            <strong>Idéal pour :</strong> Personnages, héros, monstres,
            véhicules et figurines importantes de votre collection.
        </p>

        <p>
            Une peinture plus poussée avec davantage de contraste,
            de profondeur et un travail renforcé sur les détails.
        </p>

        <p>
            <strong>🎨 Techniques utilisées :</strong><br>
            Éclaircissements avancés, travail des lumières,
            dégradés, effets à l'huile, décalcomanies,
            weathering et effets supplémentaires.
        </p>

        <p>
            <strong>💵 Prix indicatif : 20€ à 40€ par figurine</strong>
        </p>

        <p>
            ⏱️ <strong>Temps de peinture indicatif :</strong><br><br>

            <strong>Figurine de troupe socle 20-25mm :</strong><br>
            Environ 1 heure → <strong>20€</strong><br><br>

            <strong>Figurine de troupe socle 28-32mm :</strong><br>
            Environ 2h+ → <strong>40€</strong>
        </p>
  

            <p>
         <a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
    </p>  </div>
    
<div class="maintenance-box">
      <h2>Préparation 🛠️</h2>
<ul>
    <li>Nettoyage</li>
    <li>Assemblage</li>
    <li>Préparation optimale avant peinture</li>
</ul>
</div>

<div class="maintenance-box">
    <h2>Peinture 🎨</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> rendu propre et efficace</li>
        <li><strong>👑 Diamant :</strong> détails soignés, contrastes renforcés et points focaux travaillés</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>Soclage 🌿</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> socle travaillé et harmonieux</li>
        <li><strong>👑 Diamant :</strong> socle scénique avec mise en ambiance</li>
    </ul>
</div>

<!-- Tableau comparaison -->
<div class="maintenance-box">
    <table class="tableborder1">
        <thead>
            <tr>
                <th>🎨 Caractéristiques</th>
                <th>⭐ Gold</th>
                <th>👑 Diamant</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Temps peinture</td>
                <td>1h+ à 2h+</td>
                <td>2h+ à 4h+</td>
            </tr>
            <tr>
                <td>Finition</td>
                <td>Nette, simple et efficace</td>
                <td>Très détaillée, contrastée avec points focaux</td>
            </tr>
            <tr>
                <td>Techniques</td>
                <td>Couleurs de base, ombrages simples, finition propre</td>
                <td>Éclaircissements, lumières, dégradés, huile, décalcos, weathering</td>
            </tr>
            <tr>
                <td>Socle</td>
                <td>Travaillé et cohérent</td>
                <td>Scénique et immersif</td>
            </tr>
        </tbody>
    </table>
</div>
    <p>
          <a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
    </p>

    <div class="maintenance-box">
    <h3>Tarif 2026-2027</h3>

  <table class="tableborder1">
<thead>
<tr>
    <th>Catégorie</th>
    <th>Gold</th>
    <th>Diamant</th>
</tr>
</thead>

<tbody>

<tr><td>Infanterie 20-25mm</td><td>30min / 10€</td><td>1h / 20€</td></tr>
<tr><td>Infanterie 28-32mm</td><td>1h / 20€</td><td>2h / 40€</td></tr>
<tr><td>Infanterie élite 40-50mm</td><td>1h30 / 30€</td><td>3h / 60€</td></tr>

<tr><td>Personnage à pied 25-32mm</td><td>3h / 60€</td><td>6h / 120€</td></tr>
<tr><td>Personnage élite 40-50mm</td><td>4h / 80€</td><td>8h / 160€</td></tr>
<tr><td>Personnage monstrueux 60-100mm</td><td>6h / 120€</td><td>12h / 240€</td></tr>
<tr><td>Personnage sur monstre 120mm</td><td>8h / 160€</td><td>16h / 320€</td></tr>
<tr><td>Personnage sur grand monstre</td><td>12h / 240€</td><td>24h / 480€</td></tr>

<tr><td>Cavalerie 60-75mm</td><td>2h / 40€</td><td>4h / 80€</td></tr>
<tr><td>Cavalerie lourde 90-105mm</td><td>3h / 60€</td><td>6h / 120€</td></tr>

<tr><td>Petit véhicule / monstre</td><td>3h / 60€</td><td>6h / 120€</td></tr>
<tr><td>Véhicule / monstre moyen</td><td>5h / 100€</td><td>10h / 200€</td></tr>
<tr><td>Gros véhicule / monstre</td><td>8h / 160€</td><td>16h / 320€</td></tr>
<tr><td>Énorme véhicule / monstre</td><td>12h / 240€</td><td>24h / 480€</td></tr>

<tr><td>Titanesque</td><td>18h / 360€</td><td>36h / 720€</td></tr>

</tbody>
</table>


</div>
   
         `;
    }

    main.innerHTML = html;
}

function changelanguemenu() {
    const menu = document.getElementById("menu-contenu");
    if (!menu) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `<nav id="menu-contenu" class="menu-mobile">
    <ul class="menu">

        <li>
            <a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">
                🎨 TableTop Armies Painting
            </a>
        </li>

        <li>
            <a href="peinturecollection.html" onclick="loadPage('peinturecollection.html'); return false;">
                🏆 Collection & Competition Painting
            </a>
        </li>



        <li>
            <a href="galerie.html" onclick="loadPage('galerie.html'); return false;">
                🖼️ Gallery
            </a>
        </li>

    </ul>
</nav>`;
    } else if (currentLanguage === "spanish") {
        html = `<nav id="menu-contenu" class="menu-mobile">
    <ul class="menu">

        <li>
            <a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">
                🎨 Pintura de Ejércitos TableTop
            </a>
        </li>

        <li>
            <a href="peinturecollection.html" onclick="loadPage('peinturecollection.html'); return false;">
                🏆 Pintura de Colección y Concursos
            </a>
        </li>

    

        <li>
            <a href="galerie.html" onclick="loadPage('galerie.html'); return false;">
                🖼️ Galería
            </a>
        </li>

    </ul>
</nav>`;
    } else {
        html = `        <nav id="menu-contenu" class="menu-mobile">
            <ul class="menu">
                <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">Peinture Armées TableTop 🎨</a></li>
                 <li><a href="peinturecollection" onclick="loadPage('peinturecollection.html'); return false;">Peinture Collection & Concours 🏆</a></li>
            </ul>  <ul class="menu">
                   <li><a href="formation.html" onclick="loadPage('formation.html'); return false;">Formation 📚</a></li>
                <li><a href="galerie.html" onclick="loadPage('galerie.html'); return false;">Galerie 🖼️</a></li>
            </ul>
        </nav>`;
    }

    menu.innerHTML = html;
}

function changelanguefoot() {
    const foot = document.getElementById("foot-contenu");
    if (!foot) return;

    let html = "";

   if (currentLanguage === "english") {
    html = `
  
      
     <nav class="menu-mobile2">
        <ul class="menu2">
            <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">General Terms and Conditions 📜</a></li>
            <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); return false;">Legal Notice 💼</a></li>
            <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Opening Hours 🕖</a></li>
    
        </ul>
                </nav>
                  
                <button id="scrollToTopBtn" title="Back to top ⬆️" onclick="scrollToTop()">↑</button>
<button id="scrollTotal" title="View Total" onclick="scrollTotal()">View Total</button>



 <div class="footer">
  <p><strong>STUDIO PF</strong><br>
  FRASSE Pierre-François<br>
  17 route de Lare 42510 Saint-Georges-de-Baroille<br><br></p>

  <p>Contact 📧 : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a></p>
  <p>Phone 📞 : <a href="tel:+33775860837">07 75 86 08 37</a></p>
</div>


 <p>Showcase website created by <strong>Studio PF</strong> - © 2026 All rights reserved.</p>



    `;
} 
else if (currentLanguage === "spanish") {
    html = `
   
    
     <nav class="menu-mobile2">
   
        <ul class="menu2">
            <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">Condiciones Generales de Venta 📜</a></li>
            <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html');return false;">Aviso Legal 💼</a></li>
            <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Horarios de Apertura 🕖</a></li>
 
        </ul>
                </nav>
                 
                <button id="scrollToTopBtn" title="Volver arriba ⬆️" onclick="scrollToTop()">↑</button>
<button id="scrollTotal" title="Ver total" onclick="scrollTotal()">Ver total</button>


 <div class="footer">
  <p><strong>STUDIO PF</strong><br>
  FRASSE Pierre-François<br>
  17 route de Lare 42510 Saint-Georges-de-Baroille<br><br></p>

  <p>Contacto 📧 : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a></p>
  <p>Teléfono 📞 : <a href="tel:+33775860837">07 75 86 08 37</a></p>

 
</div>
 <p>Sitio web de presentación creado por <strong>Studio PF</strong> - © 2026 Todos los derechos reservados.</p>



    `;
    } else {
        html = ` 
       
       
 <nav class="menu-mobile2">
            <ul class="menu2">
                     <li><a href="conditions.html"  onclick="loadPage('conditions.html'); return false;">Conditions générales de vente 📜</a></li>
        <li><a href="mentionslegales.html"  onclick="loadPage('mentionslegales.html'); return false;">Mentions Légales 💼</a></li>
        <li><a href="horaires.html"  onclick="loadPage('horaires.html'); return false;">Horaires d'ouverture 🕖</a></li>
                
</ul>  
        </nav>
  
       
        <button id="scrollToTopBtn" title="Retour en haut ⬆️" onclick="scrollToTop()">↑</button>
            <button id="scrollTotal" title="Voir Total" onclick="scrollTotal()">Voir Total</button>
             
               <div class="footer">
     <p><strong>STUDIO PF</strong><br>
      FRASSE Pierre-François<br>
      17 route de Lare 42510 Saint-Georges-de-Baroille<br><br></p>
        <p>Contact 📧 : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a></p>
        <p>Téléphone 📞 : <a href="tel:+33775860837">07 75 86 08 37</a></p>
     

  </div>
       <p>Site Vitrine créé par <strong>Studio PF</strong> - @ 2026 Tous droits réservés. </p>
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
   

<div class="partenaires-container">
    
    <div class="maintenance-box">
        <div class="cardpartenaire">
            <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-totalwar.png" alt="Total Wargames Logo">
            </a>
        </div>
        <div class="ppartenaire">
            <p>Buy second-hand for less<br>5% discount:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div class="maintenance-box">
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
    
    <div class="maintenance-box">
        <div class="cardpartenaire">
            <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-mezgike.png" alt="Mezgike Logo">
            </a>
        </div> 
        <div class="ppartenaire">
            <p>High-quality pre-supported STL miniatures for your sci-fi and fantasy tabletop battles.<br>-10% on your order<br>with the promo code:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div class="maintenance-box">
        <div class="cardpartenaire">
            <a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-wargamesceneries.png" alt="Wargame Sceneries Logo">
            </a>
        </div>
        <div class="ppartenaire">
          <p>Modular 3D-printed scenery for immersive gameplay.<br>-10% on all printed models<br>with the promo code:<br><strong>STUDIOPF10</strong></p>
        </div>
    </div>

</div>
    `;
} 
else if (currentLanguage === "spanish") {
    html = `
    

<div class="partenaires-container">
    
    <div class="maintenance-box">
        <div class="cardpartenaire">
            <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-totalwar.png" alt="Logo de Total Wargames">
            </a>
        </div>
        <div class="ppartenaire">
            <p>Compra de segunda mano más barato<br>5% de descuento:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div class="maintenance-box">
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
    
    <div class="maintenance-box">
        <div class="cardpartenaire">
            <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-mezgike.png" alt="Logo de Mezgike">
            </a>
        </div> 
        <div class="ppartenaire">
            <p>Impresionantes miniaturas STL pre-soportadas para tus batallas de mesa de ciencia ficción y fantasía.<br>-10% en tu pedido<br>con el código promocional:<br><strong>STUDIOPF</strong></p>
        </div>
    </div>

    <div class="maintenance-box">
        <div class="cardpartenaire">
            <a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                <img src="img/logo-wargamesceneries.png" alt="Logo de Wargame Sceneries">
            </a>
        </div>
        <div class="ppartenaire">
          <p>Escenografía modular impresa en 3D para partidas inmersivas.<br>-10% en todos los modelos impresos<br>con el código promocional:<br><strong>STUDIOPF10</strong></p>
        </div>
    </div>

</div>
    `;
    } else {
        html = `     
   
        <div class="partenaires-container">
            
            
             <div class="maintenance-box">
          <div class="cardpartenaire">
          <a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-totalwar.png" alt="Total Wargames Logo">        </a>
          </div>
              <div class="ppartenaire">
             <p>Achetez moins cher d'occasion<br>5% de remise :<br> <strong>STUDIOPF</strong></p>
             </div>
        </div>
                    

     <div class="maintenance-box">
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
                                   
                                     <div class="maintenance-box">
                                         
          <div class="cardpartenaire">
        <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-mezgike.png" alt="Mezgike Logo">        </a>
            </div> 
              
                                         <div class="ppartenaire">
             <p>Superbes figurines STL pré-supportées pour vos jeux de bataille de table sci-fi et fantasy. <br>- 10% sur votre commande<br> avec le code promo :<br><strong>STUDIOPF</strong></p>
            </div>
                                         
        </div>
   

                 <div class="maintenance-box">
          <div class="cardpartenaire">
          <a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
          <img src="img/logo-wargamesceneries.png" alt="Wargame Sceneries Logo">        </a>
          </div>
              <div class="ppartenaire">
             <p>Des décors modulaires en impression 3D pour des parties immersives.<br>-10% tout les modèles imprimés<br>avec le code promo :<br><strong>STUDIOPF10</strong></p>
             </div>
        </div>
 `;
    }

    partenaires.innerHTML = html;
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
            <h1 class="galerie-title">🎨 Gallery</h1>
            <p class="galerie-description">✨ Step into a world where every miniature becomes a work of art.</p>
            <div class="menugallery" id="filters"></div>
            <div class="gallery" id="gallery"></div>
            <div class="lightbox" id="lightbox">
     <img id="lightbox-img" src="images/placeholder.jpg" alt="Studio PF">
    </div>
        `;
    } else if (currentLanguage === "spanish") {
        html = `
            <h1 class="galerie-title">🎨 Galería</h1>
            <p class="galerie-description">✨ Adéntrate en un mundo donde cada miniatura se convierte en una obra de arte.</p>
            <div class="menugallery" id="filters"></div>
            <div class="gallery" id="gallery"></div>
               <div class="lightbox" id="lightbox">
     <img id="lightbox-img" src="images/placeholder.jpg" alt="Studio PF">
    </div>
        `;
    } else {
        html = `
            <h1 class="galerie-title">🎨 Galerie</h1>
            <p class="galerie-description">✨ Entrez dans un univers où chaque figurine devient une œuvre d'art.</p>
            <div class="menugallery" id="filters"></div>
            <div class="gallery" id="gallery"></div>
             <div class="lightbox" id="lightbox">
     <img id="lightbox-img" src="images/placeholder.jpg" alt="Studio PF">
    </div>
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
// carroussel simple (si présent)
// ────────────────────────────────────────────────

function initializecarroussel() {
    const carroussel = document.getElementById("carroussel");
    if (!carroussel) return;

    const images = carroussel.querySelectorAll("img");
    if (images.length < 2) return;

    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % images.length;
        carroussel.style.transform = `translateX(-${idx * 100}%)`;
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

    personnage: { niveau1: 3, niveau2: 10 },
    personnageelite: { niveau1: 4, niveau2: 12 },
    personnagemonstrueux: { niveau1: 6, niveau2: 16 },

    personnagesurmonstre: { niveau1: 8, niveau2: 24 },
    personnagesurgrandmonstre: { niveau1: 12, niveau2: 32 },

    cavalerie: { niveau1: 2, niveau2: 6 },
    cavalerielourde: { niveau1: 3, niveau2: 8 },

    petitvehiculemonstre: { niveau1: 3, niveau2: 8 },
    vehiculemonstremoyen: { niveau1: 5, niveau2: 12 },
    grosvehiculemonstre: { niveau1: 8, niveau2: 16 },
    enormevehiculemonstre: { niveau1: 12, niveau2: 24 },

    titanvehiculemonstre: { niveau1: 18, niveau2: 32 }

};



// =======================
// NOMS DES CATEGORIES
// =======================

const categories = {

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


        if (!categories[categorie]) {
            console.warn("Catégorie manquante :", categorie);
            return;
        }


        let ligne = document.createElement("tr");


        ligne.innerHTML = `

            <td>
                ${categories[categorie][langue]}
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




function calculateTotals() {
    const niveauSelect = document.getElementById("niveau");
    if (!niveauSelect) return;

    const niveau = niveauSelect.value || "niveau1";

    let totalGeneral = 0;
  mettreAJourTarifLangue();

    categories.forEach(cat => {
        const input   = document.getElementById(`${cat}-input`);
        const prixEl  = document.getElementById(`prix${cat}`);
        const totalEl = document.getElementById(`total${cat}`);

        if (!input || !prixEl || !totalEl) return;

        const qty = Number(input.value) || 0;

        const unitPrice = (tariffs[cat]?.[niveau] ?? 0) * tarifheure;
        const catTotal = qty * unitPrice;

        prixEl.textContent  = unitPrice.toFixed(2);
        totalEl.textContent = catTotal.toFixed(2);

        totalGeneral += catTotal;
    });

    // 🔥 affichage du total global
    const totalEl = document.getElementById("oktotal");
    if (totalEl) {
     totalEl.textContent = `${totalGeneral.toFixed(2)} ${symboleDevise}`;
    }

    
  
   // ── Comparaison ──
    const prevMap = {
        niveau1: null,
        niveau2: "niveau1",
        expo: "niveau2"
    };

    const prevLevel = prevMap[niveau];
    let totalPrev = 0;

    if (prevLevel) {
        categories.forEach(cat => {
            const qty = Number(document.getElementById(`${cat}-input`)?.value) || 0;
            const prevPrice = (tariffs[cat]?.[prevLevel] ?? 0) * tarifheure;

            totalPrev += qty * prevPrice;
        });
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

        
            body += categories.map(cat => `- ${cat} : ${quantities[cat]}`).join("\n") + "\n\n";
            body += `- Montage : ${data.montage}\n- Aimant : ${data.aimant}\n\n`;
            body += `Total estimé : ${total.toFixed(2)} €\n\n`;
        
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

<div class="maintenance-box">
  <h2>📌 Publisher</h2> 
  <p>
    <strong>Studio PF: Miniature Painting</strong><br>
    Pierre-François FRASSE<br>
    <!-- Status: Sole proprietorship<br>
    SIRET: 832 040 380 00020<br>-->
    Address: 17 route de lare, 42510 Saint Georges de Baroille, France<br>
    Phone: +33 7 75 86 08 37<br>
    Email: <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="maintenance-box"> 
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

<div class="maintenance-box">
  <h2>🔒 Intellectual Property</h2> 
  <p>
    All content on this website (texts, images, videos, logos, icons, etc.) is the exclusive property of Studio PF, unless otherwise stated. Any reproduction or use without prior written permission is prohibited.
  </p> 
</div> 

<div class="maintenance-box">
  <h2>📊 Personal Data</h2>
  <p>
    The data collected is used solely for customer relationship purposes. In accordance with GDPR, you may request access to, modification, or deletion of your data by email at:
    <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="maintenance-box"> 
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

<div class="maintenance-box">
  <h2>📌 Editor</h2> 
  <p>
    <strong>Studio PF: Pintura de Miniaturas</strong><br>
    Pierre-François FRASSE<br>
    <!-- Estado: Autónomo<br>
    SIRET: 832 040 380 00020<br>-->
    Dirección: 17 route de lare, 42510 Saint Georges de Baroille, Francia<br>
    Teléfono: +33 7 75 86 08 37<br>
    Correo electrónico: <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="maintenance-box"> 
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

<div class="maintenance-box">
  <h2>🔒 Propiedad intelectual</h2> 
  <p>
    Todos los contenidos del sitio (textos, imágenes, vídeos, logotipos, iconos, etc.) son propiedad exclusiva de Studio PF, salvo indicación contraria. Queda prohibida cualquier reproducción o uso sin autorización previa por escrito.
  </p> 
</div> 

<div class="maintenance-box">
  <h2>📊 Datos personales</h2>
  <p>
    Los datos recopilados se utilizan únicamente con fines de relación con el cliente. De acuerdo con el RGPD, puede solicitar el acceso, la modificación o la eliminación de sus datos enviando un correo electrónico a:
    <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
  </p>
</div>

<div class="maintenance-box"> 
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
<p><strong>Site :</strong> studiopf.fr<br> <strong>Date de mise à jour :</strong> 19 janvier 2026</p> <div class="maintenance-box">
  <h2>📌 Éditeur</h2> 
  <p> <strong>Studio PF : Peinture Figurine</strong><br>
    Pierre-François FRASSE<br>
    <!-- Statut : Micro-entreprise<br>
   SIRET : 832 040 380 00020<br>-->
    Adresse : 17 route de lare, 42510 Saint Georges de Baroille, France<br>
    Téléphone : 07 75 860 837<br>
    E-mail : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> </p> </div>
  <div class="maintenance-box"> 
    <h2>💻 Hébergeur</h2>
    <p> GitHub Inc.<br> 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA<br>
      Site : <a href="https://pages.github.com" target="_blank">https://pages.github.com</a> </p>
    <p> Domaine enregistré chez : Gandi SAS<br> 63-65 boulevard Massena, 75013 Paris, France<br>
      Site : <a href="https://www.gandi.net" target="_blank">https://www.gandi.net</a> </p> 
  </div> 
   <div class="maintenance-box">
        <h2>🔒 Propriété intellectuelle</h2> 
        <p> Tous les contenus du site (textes, images, vidéos, logos, icônes, etc.) sont la propriété exclusive de Studio PF, sauf mention contraire. Toute reproduction ou utilisation sans autorisation écrite est interdite. </p> 
   </div> 
   <div class="maintenance-box"> <h2>📊 Données personnelles</h2> <p> Les données collectées sont utilisées uniquement à des fins de relation client. Conformément au RGPD, vous pouvez demander l'accès, la modification ou la suppression de vos données par e-mail à : <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a> </p>
   </div>
  <div class="maintenance-box"> 
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
           <h1>✨ Terms and Conditions of Sale ✨</h1>
<p><strong>Website:</strong> studiopf.fr<br>
<strong>Last updated:</strong> March 2026</p>

<div class="maintenance-box">
    <h2>1. Scope of Application</h2>
    <p>These terms and conditions apply to all painting services, training sessions, and related services offered by Studio PF (Pierre-François FRASSE, sole trader, SIRET 832 040 380 00020).</p>
    <ul>
        <li>🆓 VAT not applicable: Article 293 B of the French General Tax Code.</li>
        <li>📜 VAT exemption: Article 283-2 of the French General Tax Code.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>2. Order Process</h2>
    <p>Any order is confirmed by written agreement (email or message) and payment of a deposit (generally 50%). The order becomes final and binding upon receipt of the deposit.</p>
    <ul>
        <li>📅 Quotes are valid for 7 business days.</li>
        <li>✍️ The quote serves as a contract and includes working time, research, and supplies (excluding miniatures).</li>
        <li>⏳ Estimated timeframe: depends on volume, level, and start date.</li>
        <li>📸 A <strong>first preview</strong> is sent at <strong>80%</strong> completion.</li>
        <li>📸 <strong>Final photos</strong> are sent at <strong>100%</strong>, <strong>before and after touch-ups</strong>.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>3. Pricing – Payment</h2>
    <p>Prices are expressed in dollars US ($), based on individual quotes or the simulator. Payment can be made via PayPal, bank transfer, or cash (in person). The balance must be paid before shipping unless otherwise agreed.</p>
    <ul>
        <li>Payment in up to 4 installments available via PayPal.</li>
        <li>🏦 Payment methods: bank transfer, card, or PayPal (⚠️ 4% fee for PayPal).</li>
        <li>Staged payment (for card and bank transfers):
            <ul>
                <li>💳 Minimum 25% to reserve a slot.</li>
                <li>✅ The remaining balance must be paid before work begins (due to previous unpaid balances at the end of commissions).</li>
            </ul>
        </li>
        <li>🎁 4% discount for non-PayPal payments.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>4. Delivery – Shipping</h2>
    <p>Shipping is handled via Colissimo with tracking and insurance. Shipping costs are the responsibility of the client. Studio PF declines all responsibility for loss or damage after handover to the carrier.</p>

    <ul>
        <li>🚚 Shipping via Colissimo with Diamant required from €150 value (insurance up to €5000).</li>
        <li>📌 Mondial Relay available but with very limited insurance in case of damage or loss/theft (max €500). FOR EU. </li>
        <li> Shipping UPS ou FedEx for US.</li>
        <li>🎁 Free shipping on orders over $3000.</li>
        <li>By default, Colissimo with Diamant and insurance is recommended, although uninsured shipping and/or Mondial Relay remain possible.</li>
    </ul>

    <ul>
        <li>📦 Colissimo with Diamant for shipments valued between €150 and €5000 (assembly + painting + miniature value).</li>
        <li>📌 Mondial Relay available but with very limited insurance (max €500).</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>5. Right of Withdrawal</h2>
    <p>No right of withdrawal applies to custom-made products (painted miniatures) in accordance with Article L.221-28 of the French Consumer Code.</p>
    <ul>
        <li>🚫 Non-refundable in case of cancellation.</li>
        <li>✅ Deposit payment = quote validation.</li>
        <li>🔁 Deposits are <strong>non-transferable</strong> to another project or time slot.</li>
        <li>❌ No <strong>rescheduling or slot exchange</strong> possible. Any cancellation results in loss of the deposit.</li>
        <li>⏳ 30% surcharge for urgent orders (&lt; 1 month).</li>
        <li>⏳ If miniatures are not sent within more than 1 month from the project start date, the project will be automatically canceled.<br>
        In this case, the deposit will be retained.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>6. Intellectual Property – Image Rights</h2>
    <p>Studio PF reserves the right to photograph and publish completed works on its website, social media, and portfolio.</p>
</div>

<div class="maintenance-box">
    <h2>7. Liability – Disputes</h2>
    <p>Studio PF undertakes to carry out services with the utmost care. In the event of a dispute, French law applies and the competent courts are those of Saint-Étienne.</p>

    <h2 class="section-title">🏅 Quality Commitment</h2>
    <ul>
        <li>🏗️ Careful preparation of each miniature.</li>
        <li>🎨 High-quality paints and materials.</li>
        <li>🖌️ Advanced techniques for optimal results.</li>
        <li>🎯 Adaptation to client needs.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2 class="section-title">8. Return Policy</h2>

    <ul>
        <li>🏗️ Validation before shipping</li>
        <li>Final photos serve as the official reference for approval.</li>
        <li>Please review them carefully and feel free to request touch-ups or changes at this stage.</li>
    </ul>

    <ul>
        <li>🖌️ Touch-up process</li>
        <li>Each revision will be followed by new photos serving as final validation.</li>
        <li>Once approved (after touch-ups if needed), the order will be shipped.</li>
        <li>➡️ No modifications will be possible after approval.</li>
    </ul>

    <ul>
        <li>🎯 Returns and touch-ups after delivery</li>
        <li>You have 48 to 72 hours after delivery to report a defect not visible in the photos.</li>
        <li>An intervention may be offered based on a quote, depending on availability.</li>
        <li>If the request is made more than 15 days after delivery, a quote will be systematically required.</li>
    </ul>

    <ul>
        <li>🖌️ Improvements and changes outside defects</li>
        <li>Final photos serve as the official validation reference.</li>
        <li>Any request for modification or improvement not related to a defect after validation will require an additional quote.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2 class="section-title">9. Production Timeframes</h2>
    <ul>
        <li>🔧 <strong>Small projects – Gold level (warband, combat patrol, spearhead)</strong>: 2 business months</li>
        <li>🔧 <strong>Small projects – Diamant level (warband, combat patrol, spearhead)</strong>: 4 business months</li>
        <li>⚙️ <strong>Medium to complex projects – Gold & Diamant (700–1000 pts)</strong>: 4 to 6 business months</li>
        <li>🏗️ <strong>Large projects – Gold & Diamant (1500–2000 pts)</strong>: 6 months to 1 year (business time)</li>
        <li>📦 Timeframes start upon <strong>full receipt of materials</strong> and deposit payment.</li>
        <li>📅 Closure periods and public holidays are <strong>not included</strong> (business time only).</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2 class="section-title">10. Training</h2>
    <ul>
        <li>Miniatures not provided. For full-day sessions, a contribution for paint supplies may be requested.</li>
        <li>📍 On-site only (for individual lessons).</li>
        <li>📍 Event services: travel time and on-site time (such as meals) are included in the billed hours.</li>
        <li>📍 Workshops available upon quote. Location and conditions may vary and will be specified for each event.</li>
        <li>📞 Initial contact by phone.</li>
        <li>🔄 Paid hours are flexible but non-refundable.</li>
    </ul>
</div>
        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
          <h1>✨ Condiciones Generales de Venta ✨</h1>
<p><strong>Sitio web:</strong> studiopf.fr<br>
<strong>Última actualización:</strong> Marzo 2026</p>

<div class="maintenance-box">
    <h2>1. Ámbito de aplicación</h2>
    <p>Estas condiciones generales de venta se aplican a todos los servicios de pintura, formaciones y servicios asociados ofrecidos por Studio PF (Pierre-François FRASSE, autónomo, SIRET 832 040 380 00020).</p>
    <ul>
        <li>🆓 IVA no aplicable: artículo 293 B del Código General de Impuestos.</li>
        <li>📜 Exención de IVA: artículo 283-2 del Código General de Impuestos.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>2. Proceso de pedido</h2>
    <p>Cualquier pedido se confirma mediante acuerdo por escrito (correo electrónico o mensaje) y el pago de un anticipo (generalmente del 50%). El pedido se vuelve firme y definitivo tras la recepción del anticipo.</p>
    <ul>
        <li>📅 Presupuesto válido durante 7 días laborables.</li>
        <li>✍️ El presupuesto tiene valor contractual e incluye el tiempo de trabajo, investigación y materiales (excepto las miniaturas).</li>
        <li>⏳ Plazo estimado: depende del volumen, el nivel y la fecha de inicio.</li>
        <li>📸 Se envía un <strong>primer avance</strong> al <strong>80%</strong> del trabajo.</li>
        <li>📸 Se envían <strong>fotos finales</strong> al <strong>100%</strong>, <strong>antes y después de los retoques</strong>.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>3. Tarifas – Pago</h2>
    <p>Los precios se expresan en euros (€), establecidos mediante presupuesto individual o a través del simulador. El pago se realiza por PayPal, transferencia bancaria o en efectivo (entrega en mano). El saldo debe abonarse antes del envío salvo acuerdo contrario.</p>
    <ul>
        <li>Pago en hasta 4 plazos sin intereses mediante PayPal.</li>
        <li>🏦 Métodos de pago: transferencia, tarjeta o PayPal (⚠️ comisión del 4% para PayPal).</li>
        <li>Pago fraccionado (para tarjeta y transferencias):
            <ul>
                <li>💳 Mínimo 25% para reservar un turno.</li>
                <li>✅ El resto debe abonarse antes de iniciar el trabajo (debido a proyectos anteriores sin saldo finalizado).</li>
            </ul>
        </li>
        <li>🎁 Descuento del 4% para pagos fuera de PayPal.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>4. Entrega – Envío</h2>
    <p>El envío se realiza mediante Colissimo con seguimiento y seguro. Los gastos de envío corren a cargo del cliente. Studio PF no se responsabiliza de pérdidas o daños una vez entregado el paquete al transportista.</p>

    <ul>
        <li>🚚 Envío mediante Colissimo con firma obligatoria a partir de 150€ de valor (seguro hasta 5000€).</li>
        <li>📌 Mondial Relay disponible pero con seguro muy limitado en caso de problemas como rotura o pérdida/robo (máx. 500€).</li>
        <li>🎁 Envío gratuito a partir de 3000 € de pedido.</li>
        <li>Por defecto, se recomienda Colissimo con firma y seguro, aunque es posible enviar sin asegurar o mediante Mondial Relay.</li>
    </ul>

    <ul>
        <li>📦 Colissimo con firma para envíos entre 150 € y 5000 € de valor (montaje + pintura + valor de las miniaturas).</li>
        <li>📌 Mondial Relay disponible pero con seguro limitado (máx. 500€).</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>5. Derecho de desistimiento</h2>
    <p>No se aplica derecho de desistimiento a productos personalizados (miniaturas pintadas), conforme al artículo L.221-28 del Código de Consumo.</p>
    <ul>
        <li>🚫 No reembolsable en caso de cancelación.</li>
        <li>✅ El pago del anticipo valida el presupuesto.</li>
        <li>🔁 Los anticipos <strong>no son transferibles</strong> a otro proyecto o turno.</li>
        <li>❌ No es posible <strong>reprogramar ni cambiar turno</strong>. Cualquier cancelación implica la pérdida del anticipo.</li>
        <li>⏳ Recargo del 30% para pedidos urgentes (&lt; 1 mes).</li>
        <li>⏳ Si las miniaturas no se envían en un plazo superior a 1 mes desde la fecha de inicio del proyecto, este se cancelará automáticamente.<br>
        En este caso, el anticipo será retenido.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2>6. Propiedad intelectual – Derechos de imagen</h2>
    <p>Studio PF se reserva el derecho de fotografiar y publicar las obras terminadas en su sitio web, redes sociales y portfolio.</p>
</div>

<div class="maintenance-box">
    <h2>7. Responsabilidad – Litigios</h2>
    <p>Studio PF se compromete a realizar los servicios con el máximo cuidado. En caso de litigio, se aplicará la ley francesa y los tribunales competentes serán los de Saint-Étienne.</p>

    <h2 class="section-title">🏅 Compromiso de calidad</h2>
    <ul>
        <li>🏗️ Preparación minuciosa de cada miniatura.</li>
        <li>🎨 Pinturas y materiales de alta calidad.</li>
        <li>🖌️ Técnicas avanzadas para un resultado óptimo.</li>
        <li>🎯 Adaptación a las necesidades del cliente.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2 class="section-title">8. Política de devoluciones</h2>

    <ul>
        <li>🏗️ Validación antes del envío</li>
        <li>Las fotos finales sirven como referencia oficial para la validación.</li>
        <li>Por favor, revísalas cuidadosamente y no dudes en solicitar retoques o modificaciones en esta fase.</li>
    </ul>

    <ul>
        <li>🖌️ Proceso de retoques</li>
        <li>Cada retoque irá acompañado de nuevas fotos que servirán como validación final.</li>
        <li>Una vez validado el pedido (tras retoques si es necesario), será enviado.</li>
        <li>➡️ No se podrán realizar modificaciones después de la validación.</li>
    </ul>

    <ul>
        <li>🎯 Devoluciones y retoques tras la recepción</li>
        <li>Dispones de 48 a 72 horas tras la recepción para señalar un defecto no visible en las fotos.</li>
        <li>Se podrá proponer una intervención mediante presupuesto, según disponibilidad.</li>
        <li>Si la solicitud se realiza más de 15 días después de la recepción, será necesario un presupuesto de forma sistemática.</li>
    </ul>

    <ul>
        <li>🖌️ Mejoras y modificaciones fuera de defectos</li>
        <li>Las fotos finales sirven como referencia oficial de validación.</li>
        <li>Cualquier solicitud de modificación o mejora no relacionada con un defecto tras la validación requerirá un presupuesto adicional.</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2 class="section-title">9. Plazos de realización</h2>
    <ul>
        <li>🔧 <strong>Proyectos pequeños – Nivel Gold (banda, combat patrol, spearhead)</strong>: 2 meses laborables</li>
        <li>🔧 <strong>Proyectos pequeños – Nivel Diamant (banda, combat patrol, spearhead)</strong>: 4 meses laborables</li>
        <li>⚙️ <strong>Proyectos medios a complejos – Nivel Gold y Diamant (700–1000 pts)</strong>: 4 a 6 meses laborables</li>
        <li>🏗️ <strong>Proyectos grandes – Nivel Gold y Diamant (1500–2000 pts)</strong>: de 6 meses a 1 año laborable</li>
        <li>📦 Los plazos comienzan tras la <strong>recepción completa del material</strong> y el pago del anticipo.</li>
        <li>📅 Los períodos de cierre y festivos <strong>no se incluyen</strong> (tiempo laborable).</li>
    </ul>
</div>

<div class="maintenance-box">
    <h2 class="section-title">10. Formación</h2>
    <ul>
        <li>Miniaturas no incluidas. En caso de jornada completa, puede solicitarse una contribución para materiales de pintura.</li>
        <li>📍 Solo en el lugar (para clases individuales).</li>
        <li>📍 Servicios para eventos: el tiempo de desplazamiento y el tiempo en el lugar (como comidas) se contabilizan en las horas de servicio.</li>
        <li>📍 Talleres bajo presupuesto. El lugar y las condiciones pueden variar y se especificarán en cada anuncio.</li>
        <li>📞 Primer contacto por teléfono.</li>
        <li>🔄 Horas pagadas flexibles pero no reembolsables.</li>
    </ul>
</div>
        `;
    } 
    else { // français (par défaut)
        html = `
            <h1>✨ Conditions Générales de Vente ✨</h1>
            <p><strong>Site :</strong> studiopf.fr<br>
            <strong>Dernière mise à jour :</strong> Mars 2026</p>

            <div class="maintenance-box">
                <h2>1. Champ d'application</h2>
                <p>Ces conditions générales de vente s'appliquent à l'ensemble des prestations de peinture, formations et services associés proposés par Studio PF (Pierre-François FRASSE, micro-entrepreneur, SIRET 832 040 380 00020).</p>
             <ul>
            <li>🆓 TVA non applicable : article 293 B du Code général des impôts.</li>
            <li>📜 Exonération de TVA : article 283-2 du Code général des impôts.</li>
        </ul>
        </div>

            <div class="maintenance-box">
                <h2>2. Processus de commande</h2>
                <p>Toute commande est confirmée par accord écrit (email ou message) et versement d'un acompte (généralement 50 %). La commande devient ferme et définitive dès réception des acomptes/arrhes.</p>
            <ul>
            <li>📅 Devis valable 7 jours ouvré.</li>
            <li>✍️ Fait foi de contrat et inclut le temps de travail, recherche et fournitures (hors figurines).</li>
            <li>⏳ Délai provisoire : dépend du volume, du niveau et la date de démarrage.</li>

                <li>📸 Un <strong>premier aperçu</strong> est envoyé à <strong>80 %</strong> d’avancement.</li>
    <li>📸 Des <strong>photos finales</strong> sont envoyées à <strong>100 %</strong>, <strong>avant et après retouches</strong>.</li>
        </ul>
            </div>

            <div class="maintenance-box">
                <h2>3. Tarifs – Paiement</h2>
                <p>Les prix sont exprimés en euros (€), établis sur devis individuel ou via le simulateur. Le règlement s'effectue par PayPal, virement bancaire ou espèces (remise en main propre). Le solde est exigible avant expédition sauf accord contraire.</p>
           <ul>
            <li>Paiement possible en x4 sans frais via PayPal.</li>
            <li>🏦 Moyens de paiement : virement, CB ou PayPal (⚠️ frais de 4 % pour PayPal).</li>
            <li>Paiement en plusieurs étapes (pour les paiements CB et virements) :
                <ul>
                    <li>💳 25 % minimum pour réserver un créneau.</li>
                    <li>✅ Le restant doit être réglé pour démarrer la commabde (suite à trop de projets restant sans soldes en fin de commissions).</li>
                </ul>
            </li>
            <li>🎁 Réduction de 4 % pour les paiements hors PayPal.</li>
        </ul>
            </div>

            <div class="maintenance-box">
                <h2>4. Livraison – Expédition</h2>
                <p>L'expédition est réalisée via Colissimo avec suivi et assurance. Les frais de port sont à la charge du client. Studio PF décline toute responsabilité en cas de perte ou avarie après remise au transporteur.</p>
            
            <ul>
           
            <li>🚚 Expédition via Colissimo avec Diamant à partir de 150€ de valeur (et assurance allant jusqu'à 5000€ de valeur).</li>
              <li>📌 Mondial Relay possible mais assurance très limité en cas de problèmes comme casse ou perte/vol (max 500€).</li>
            <li>🎁 Frais de port offerts à partir de 3000 € de commande.</li>
           <li>Par défaut, je conseille le service Colissimo avec Diamant et option d'assurance même s'il est possible de ne pas garantir l'envoi et/ou d'expédier via Mondial Relay.</li>
        </ul>
         <ul>
            <li>📦 Colissimo avec Diamant pour les envois de plus de 150 à 5000 € de valeur (valeur presation montage + peinture + valeur des figurines).</li>
            <li>📌 Mondial Relay possible mais assurance très limité en cas de problèmes comme casse ou perte/vol (max 500€).</li>
           
        </ul>
        </div>

            <div class="maintenance-box">
                <h2>5. Droit de rétractation</h2>
                <p>Aucun droit de rétractation ne s'applique aux produits sur mesure (figurines peintes) conformément à l'article L.221-28 du Code de la consommation.</p>
            <ul>
            <li>🚫 Non remboursables en cas de désistement.</li>
            <li>✅ Paiement des arrhes = validation du devis.</li>
             <li>🔁 Les arrhes <strong>ne sont pas transférables</strong> à un autre projet ou créneau.</li>
                <li>❌ Aucun <strong>report ou échange de créneau</strong> possible. Toute annulation entraîne la perte des arrhes.</li>
            <li>⏳ Frais de 30 % pour toutes commandes en urgence (&lt; 1 mois).</li>
            <li>⏳ Si les figurines ne sont pas envoyées dans un délai de plus de 1 mois à compter de la date de démarrage du projet, la projet sera automatiquement annulée.<br>
               Dans ce cas, les arrhes versées seront conservées.</li>
        </ul>

        <ul>
 
   

  </ul>
            </div>

            <div class="maintenance-box">
                <h2>6. Propriété intellectuelle – Droit à l'image des œuvres</h2>
                <p>Studio PF se réserve le droit de photographier et publier les réalisations terminées sur son site, ses réseaux sociaux et son portfolio.</p>
            </div>

            <div class="maintenance-box">
                <h2>7. Responsabilité – Litiges</h2>
                <p>Studio PF s'engage à réaliser les prestations avec le plus grand soin. En cas de litige, la loi française est applicable et les tribunaux compétents sont ceux de Saint-Étienne.</p>
                  <h2 class="section-title">🏅 Engagement Qualité</h2>
        <ul>
            <li>🏗️ Préparation minutieuse de chaque figurine.</li>
            <li>🎨 Peintures et matériaux de qualité.</li>
            <li>🖌️ Techniques avancées pour un rendu optimal.</li>
            <li>🎯 Adaptation aux besoins du client.</li>
        </ul>
            </div>
 <div class="maintenance-box">
<h2 class="section-title">8. Politique de retour</h2>

        <ul>
            <li>🏗️ Validation avant envoi</li>
            <li>Les photos finales de la commande servent de référence officielle pour validation.</li>
              <li>Prenez bien le temps de les examiner attentivement et n’hésitez pas à demander des retouches ou modifications à ce stade.</li>
        </ul>
                <ul>
            <li>🖌️ Processus de retouche</li>
            <li>Chaque retouche donnera lieu à de nouvelles photos qui feront office de validation définitive.</li>
              <li>Une fois la commande validée (après retouches si besoin), elle sera expédiée.</li>
                   <li>➡️ Aucune modification ne sera possible après validation.</li>
        </ul>
                  <ul>
            <li>🎯 Retour et retouches après réception</li>
            <li>Vous disposez de 48 à 72 heures maximum après réception pour signaler un défaut non visible sur les photos.</li>
              <li>Une intervention sur devis pourra toutefois être proposée, selon les disponibilités.</li>
                   <li>Si la demande intervient plus de 15 jours après réception, un devis systématique sera nécessaire.</li>
        </ul>
                <ul>
            <li>🖌️ Améliorations et modifications hors défauts</li>
            <li>Les photos finales de la commande servent de référence officielle pour validation.</li>
              <li>Toute demande de modification ou d’amélioration non liée à un défaut après validation fera l’objet d’un devis complémentaire.</li>
        </ul>

</div>
<div class="maintenance-box">
  <h2 class="section-title">9. Délais de Réalisation</h2>
  <ul>
      <li>🔧 <strong>Petits projets – Niveau Gold (bande, combat patrol, spearhead) </strong> : 2 mois ouvrés</li>
    <li>🔧 <strong>Petits projets – Niveau Diamant (bande, combat patrol, spearhead)</strong> : 4 mois ouvrés</li>
    <li>⚙️ <strong>Projets moyens à complexes – Niveau Gold et Diamant  (700-1000pts)</strong> : 4 à 6 mois ouvrés</li>
    <li>🏗️ <strong>Très gros projets – Niveau Gold et Diamant (1500-2000pts)</strong> : 6 mois à 1 an ouvrés</li>
    <li>📦 Les délais sont calculés à partir de la <strong>réception complète du matériel</strong> et du paiement des arrhes.</li>
    <li>📅 Les mois de fermeture et jours fériés <strong>ne sont pas comptabilisés</strong> dans les délais (délais ouvrés).</li>
  </ul>
    </div>

             <div class="maintenance-box">
             <h2 class="section-title">10. Formation</h2>
        <ul>
            <li>Figurines non fourni. Dans le cas de journée complète, une participation aux fournitures peinture peux être demandé.</li>
            <li>📍 Uniquement sur place (pour les cours individuels).</li>
           <li>📍 Prestation évenements : les temps de trajet et temps sur place (comme repas) sera compté dans le volume d'heures de prestation.</li>
            <li>📍 Stage sur devis. Le lieu peux varié et les conditions indiqué à l'annonce d'un nouveau stage.</li>
            <li>📞 Premier contact par téléphone.</li>
            <li>🔄 Heures réglées modulables mais non remboursables.</li>
        </ul>
 </div>

           
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
         <div class="maintenance-box">
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
</div>
   <div class="maintenance-box">
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

</div>
   <div class="maintenance-box">

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
</div>
        `;
    } 
    else if (currentLanguage === "spanish") {
        html = `
      
   <div class="maintenance-box">
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
</div>
   <div class="maintenance-box">
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

</div>
   <div class="maintenance-box">

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
</div>
        `;
    } 
    else { // français
        html = `
    
   <div class="maintenance-box">
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
    </div>
   <div class="maintenance-box">
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
 </div>
   <div class="maintenance-box">
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
</div>
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
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
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
         

        `;
    } 
    else { // français
        html = `
         <div class="cardlogoimg">
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
        <img src="/img/logo.png" alt="Studio PF Logo" class="logo">

         </a>    
</div>
         
        `;
    }

    logo.innerHTML = html;
}

 function changeniveau() {
const select = document.getElementById('niveau');
    
    // Si on est déjà sur l'avant-dernier ou le dernier → on ne fait rien
    if (select.selectedIndex >= select.options.length - 2) {
        return; // on bloque
    }
    
    // Sinon on passe à l'option suivante
    select.selectedIndex = select.selectedIndex + 1;
    
    // On prévient le formulaire qu’il y a eu un changement
    select.dispatchEvent(new Event('change'));
       calculateTotals();
    scrollTotal();

}
      function scrollToTop() {
    // 1. Remonter tout en haut de la page (toujours)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
            
function scrollTotal(offset=100) {
              if (currentPage.includes("simulateur_devis")) {
   document.getElementById('scrollTotal').style.display = 'block';}
     document.getElementById('scrollTotal').style.display = 'none';
  const totalElement = document.querySelector("h3.total");
  if (totalElement) {
    const elementTop = totalElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth"
    });
  }
}
