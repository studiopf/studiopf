// =============================
// VARIABLES GLOBALES
// =============================
let currentPage = "index.html";
let currentLanguage = "french";

const currentYear = new Date().getFullYear();
const pfAge = currentYear - 1987;


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
        page = "index.html";
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
changelangueinfo();
    changelanguemenu();
   

    changelanguefoot();
    changelanguelogo();
    
    changelanguepartenaires();
    updateAgeDisplay();

    initializeCardToggle();
    initializeCarousel();
    initScrollBehaviors();


    
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
        tableauprix();
      
    }
           if (currentPage.includes("index") && typeof changelangueindex === "function") {
        changelangueindex();
    }
    if (currentPage.includes("horaires") && typeof changelanguehoraires === "function") {
        changelanguehoraires();
    }
    
}

function tableauprix() {

    const tbody = document.getElementById("tarif-table-body");
    if (!tbody) {
        console.error("❌ tableau tarif-table-body introuvable");
        return;
    }

    if (!window.tariffs || !window.categories) {
        console.error("❌ tariffs ou categories non définis");
        return;
    }

    tbody.innerHTML = "";

    categories.forEach(key => {

        const t = tariffs[key];
        if (!t) {
            console.warn("clé inconnue :", key);
            return;
        }

        const fantasiaHeures = t.niveau1 ?? 0;
        const premiumHeures = t.niveau2 ?? 0;

        const fantasiaPrix = fantasiaHeures * (tarifheure ?? 0);
        const premiumPrix = premiumHeures * (tarifheure ?? 0);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${labelscat?.[key] ?? key}</td>
            <td>${premiumHeures}h / ${premiumPrix}€</td>
            <td>${fantasiaHeures}h / ${fantasiaPrix}€</td>
        `;

        tbody.appendChild(tr);
    });
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
    <p>Premier pas ? Découvrez les premières <a href="premierpas.html" onclick="loadPage('premierpas.html'); return false;">informations théoriques en peinture sur figurine. 🎨</a></p>
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

       <div class="maintenance-box">
      <h3>🖍️ Forfaits de Cours</h3>
      <div class="card">
        <h5>🌱 Cours individuel Débutant ou Confirmé</h5>
        <p>Au premier contact : 1ère heure offerte pour se présenter et découvrir la peinture !</p>
        <p>Une pochette d’initiation sera remise.</p>
      </div>

        
      <div class="card-container3">
        <div class="card">
          <h5>🕐 Cours 1h</h5>
          <p>50€/h</p>
          <p>Pour un suivi de projet régulier</p>
          <p>Possibilité de placer l’heure en fin de journée, dans l’idéal début de matinée ou début après-midi.</p>
        </div>
        <div class="card">
          <h5>⏳ Cours 3h</h5>
          <p>150€</p>
          <p>La solution conseillée pour démarrer la peinture ou un projet.</p>
          <p>9h-12h, 14h-17h ou 16h-19h.</p>
        </div>
        <div class="card">
          <h5>🔥 Cours 5h</h5>
          <p>200€</p>
          <p>Grosse session pour avancer ou démarrer sur un gros projet.</p>
          <p>14h-19h</p>
        </div>
      </div>

    <p>Horaires à titre d'exemple.</p>

    
   </div>
       <div class="maintenance-box">
      <h3>📆 Stage en groupe</h3>
<p>Plusieurs thèmes possibles : lumières, théorie des couleurs, buste, choix d’un thème d’armée...</p>
    <div class="card-container2">
        <div class="card">
          <h5>📆 Stage 5h</h5>
          <p>200€</p>
           <p>9h-12h / 14h-16h</p>
           <p>Repas inclus.</p>
           <p>Une pochette et la figurune sera remise.</p>
          
        </div>
        <div class="card">
          <h5>📆 Stage 8h</h5>
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
          <h5>📆 1 journée</h5>
            <p>(moyenne de 8h)</p>
          <p>700€</p>
           <p>9h-12h / 14h-19h</p>
           <p>Comprend le trajet.</p>
           <p>Fourniture peinture fourni.</p>
         <p>Hors figurines.</p>
         
        </div>
        <div class="card">
           <h5>📆 2 journées</h5>
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
          <h5>🖌️ Pinceau</h5>
          <p>Techniques pour débutants et avancés</p>
        </div>
        <div class="card">
          <h5>🔫 Aérographe</h5>
          <p>Techniques précises pour débutants et avancés</p>
        </div>
        <div class="card">
          <h5>🖌️🔫 Les deux</h5>
          <p>Techniques précises pour débutants et avancés</p>
        </div>
      </div>
  
</div>
    <div class="maintenance-box">
  
      <h3>🚀🎨 Lancez-vous !</h3>
      
    <div class="card-container2">
        <div class="card">
          <h5>🎨 Matériel Fourni</h5>
          <p>Pinceaux, aérographe, peintures : tout est inclus pour une expérience optimale !</p>
        </div>
        <div class="card">
          <h5>🚀 Prêt à Briller ?</h5>
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
            <option value="COURS PEINTURE 1h - 40€">Cours 1h - 40€</option>
            <option value="COURS PEINTURE 3h - 120€">Cours 3h - 120€</option>
            <option value="COURS PEINTURE 5h - 200€">Cours 5h - 200€</option>
            <option value="Stage individuel 5h - 220€">Stage individuel 5h - 220€</option>
            <option value="Stage individuel 8h - 340€">Stage individuel 8h - 340€</option>
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
            <legend>Contact Details</legend>

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
                <input type="text" id="adresse" name="adresse" placeholder="Address" required>
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

            <p>Level ⭐ Premium:<br>
            TableTop+, superior quality with a detailed finish:<br>
            🔍 Perfect for enhancing gaming miniatures. (Our recommendation).<br><br></p>

            <p>Level 👑 Fantasia:<br>
            TableTop++, higher quality with prestige finish:<br>
            🎨 Each piece becomes a work of art. For centerpiece models.<br><br></p>

            <p>Level 🎨 Studio:<br>
            ✨ Limited and reserved for enthusiasts seeking the best:<br>
            🎨 For display collection pieces.<br><br></p>

            <p>Basing is included.</p>

            <select id="niveau" class="select" name="niveau" required>
                <option value="" disabled hidden>Select a level</option>
                <option value="niveau1" selected>Premium Level - TableTop+, Gold equivalent (lvl3)</option>
                <option value="niveau2">Fantasia Level - TableTop++, Diamond equivalent (lvl4)</option>
                <option value="expo">Studio Level - Display piece for showcase</option>
            </select>

            <p><strong>Selected level:</strong> <span id="afficheniveau"></span></p><br>
        </div>

        <div id="petiteinfanterie" class="cardform">
            <label for="petiteinfanterie-input">Number of <strong>20-25mm base Infantry</strong>:</label>
            <p>Example: Skinks, Dwarf Battle, Skeletons, Goblins, Plaguebearers...</p>
            <p>Unit price: <span id="prixpetiteinfanterie">0.00</span> €</p>
            <p>Subtotal: <span id="totalpetiteinfanterie">0.00</span> €</p>
            <input type="number" id="petiteinfanterie-input" name="petiteinfanterie" min="0">
        </div>

        <div id="infanterie" class="cardform">
            <label for="infanterie-input">Number of <strong>28-32mm base Infantry</strong>:</label>
            <p>Example: Space Marines, Stormcast, Votann, Sisters of Battle, Eldar...</p>
            <p>Unit price: <span id="prixinfanterie">0.00</span> €</p>
            <p>Subtotal: <span id="totalinfanterie">0.00</span> €</p>
            <input type="number" id="infanterie-input" name="infanterie" min="0">
        </div>

        <div id="infanterieelite" class="cardform">
            <label for="infanterieelite-input">Number of <strong>Elite Infantry 40-50mm base</strong>:</label>
            <p>Example: Terminators, Custodes, Kroxigors, Tyranid Warriors...</p>
            <p>Unit price: <span id="prixinfanterieelite">0.00</span> €</p>
            <p>Subtotal: <span id="totalinfanterieelite">0.00</span> €</p>
            <input type="number" id="infanterieelite-input" name="infanterieelite" min="0">
        </div>

        <div id="personnage" class="cardform">
            <label for="personnage-input">Number of <strong>Foot Characters 25-32mm base</strong>:</label>
            <p>Example: Space Marine Captain/Sergeant, Sorcerer...</p>
            <p>Unit price: <span id="prixpersonnage">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnage">0.00</span> €</p>
            <input type="number" id="personnage-input" name="personnage" min="0">
        </div>

        <div id="personnageelite" class="cardform">
            <label for="personnageelite-input">Number of <strong>Elite Foot Characters 40-50mm base</strong>:</label>
            <p>Example: Space Marine Captain/Sergeant in Phobos armor, Terminator Sorcerer</p>
            <p>Unit price: <span id="prixpersonnageelite">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnageelite">0.00</span> €</p>
            <input type="number" id="personnageelite-input" name="personnageelite" min="0">
        </div>

        <div id="personnagemonstrueux" class="cardform">
            <label for="personnagemonstrueux-input">Number of <strong>Monstrous Characters 60-100mm base</strong>:</label>
            <p>Example: Primarchs, Treelord, Tyranid Prime...</p>
            <p>Unit price: <span id="prixpersonnagemonstrueux">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnagemonstrueux">0.00</span> €</p>
            <input type="number" id="personnagemonstrueux-input" name="personnagemonstrueux" min="0">
        </div>

        <div id="personnagesurmonstre" class="cardform">
            <label for="personnagesurmonstre-input">Number of <strong>Characters on Monsters 120mm oval base</strong>:</label>
            <p>Example: MetaRodeur, Idoneth Turtle, Saurus on Carnasaur...</p>
            <p>Unit price: <span id="prixpersonnagesurmonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnagesurmonstre">0.00</span> €</p>
            <input type="number" id="personnagesurmonstre-input" name="personnagesurmonstre" min="0">
        </div>

        <div id="personnagesurgrandmonstre" class="cardform">
            <label for="personnagesurgrandmonstre-input">Number of <strong>Characters on Large Monsters 130-160mm+ base</strong>:</label>
            <p>Example: Allareille, Stormcast Dragon, Crocodile Dragon...</p>
            <p>Unit price: <span id="prixpersonnagesurgrandmonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalpersonnagesurgrandmonstre">0.00</span> €</p>
            <input type="number" id="personnagesurgrandmonstre-input" name="personnagesurgrandmonstre" min="0">
        </div>

        <div id="cavalerie" class="cardform">
            <label for="cavalerie-input">Number of <strong>Cavalry oval base 60-75mm</strong>:</label>
            <p>Example: Eldar Bikes, Idoneth Eels, Skeleton Cavalry...</p>
            <p>Unit price: <span id="prixcavalerie">0.00</span> €</p>
            <p>Subtotal: <span id="totalcavalerie">0.00</span> €</p>
            <input type="number" id="cavalerie-input" name="cavalerie" min="0">
        </div>

        <div id="cavalerielourde" class="cardform">
            <label for="cavalerielourde-input">Number of <strong>Heavy Cavalry oval base 90-105mm</strong>:</label>
            <p>Example: Custodes Bikes, Saurus on Aggradon, Idoneth Shark...</p>
            <p>Unit price: <span id="prixcavalerielourde">0.00</span> €</p>
            <p>Subtotal: <span id="totalcavalerielourde">0.00</span> €</p>
            <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
        </div>

        <div id="petitvehiculemonstre" class="cardform">
            <label for="petitvehiculemonstre-input">Number of <strong>Small Vehicles/Monsters 75-90mm oval base</strong>:</label>
            <p>Example: Sentinel, Nurgle Beast, Drone...</p>
            <p>Unit price: <span id="prixpetitvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalpetitvehiculemonstre">0.00</span> €</p>
            <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
        </div>

        <div id="vehiculemonstremoyen" class="cardform">
            <label for="vehiculemonstremoyen-input">Number of <strong>Medium Vehicles/Monsters 80-100mm base</strong>:</label>
            <p>Example: Rhino, Dreadnought, Drone...</p>
            <p>Unit price: <span id="prixvehiculemonstremoyen">0.00</span> €</p>
            <p>Subtotal: <span id="totalvehiculemonstremoyen">0.00</span> €</p>
            <input type="number" id="vehiculemonstremoyen-input" name="vehiculemonstremoyen" min="0">
        </div>

        <div id="grosvehiculemonstre" class="cardform">
            <label for="grosvehiculemonstre-input">Number of <strong>Large Vehicles/Monsters 90-100mm+ base</strong>:</label>
            <p>Example: Predator, Plague Burst Crawler, Daemon Prince, Armingers, Mancrusher...</p>
            <p>Unit price: <span id="prixgrosvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalgrosvehiculemonstre">0.00</span> €</p>
            <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
        </div>

        <div id="enormevehiculemonstre" class="cardform">
            <label for="enormevehiculemonstre-input">Number of <strong>Huge Vehicles/Monsters 130-160mm+ base</strong>:</label>
            <p>Example: Land Raider, Defiler, Aerodyne...</p>
            <p>Unit price: <span id="prixenormevehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalenormevehiculemonstre">0.00</span> €</p>
            <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
        </div>

        <div id="titanvehiculemonstre" class="cardform">
            <label for="titanvehiculemonstre-input">Number of <strong>Titanic Vehicles/Monsters 170mm base</strong>:</label>
            <p>Example: Spartan, Imperial Knight, Mega Gargant...</p>
            <p>Unit price: <span id="prixtitanvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totaltitanvehiculemonstre">0.00</span> €</p>
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
            <h3 class="total"><span id="oktotal">0.00</span></h3>

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
              html = `<h1>Solicitud de Presupuesto</h1>

<div class="form-container">

<form id="contactForm" action="#" class="bg-white p-6 rounded-lg shadow-md">
    <div class="center">
        <fieldset>
            <legend>Datos de contacto</legend>

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

            <p>Nivel ⭐ Premium:<br>
            TableTop+, calidad superior con acabado detallado:<br>
            🔍 Perfecto para mejorar miniaturas de juego. (Nuestra recomendación).<br><br></p>

            <p>Nivel 👑 Fantasía:<br>
            TableTop++, calidad superior con acabado prestigioso:<br>
            🎨 Cada pieza se convierte en una obra de arte. Para piezas principales.<br><br></p>

            <p>Nivel 🎨 Estudio:<br>
            ✨ Limitado y reservado para entusiastas que buscan lo mejor:<br>
            🎨 Para piezas de colección en vitrina.<br><br></p>

            <p>El peana está incluido.</p>

            <select id="niveau" class="select" name="niveau" required>
                <option value="" disabled hidden>Seleccione un nivel</option>
                <option value="niveau1" selected>Nivel Premium - TableTop+, equivalente Gold (niv3)</option>
                <option value="niveau2">Nivel Fantasía - TableTop++, equivalente Diamond (niv4)</option>
                <option value="expo">Nivel Estudio - Pieza de exposición para vitrina</option>
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
            <label for="grosvehiculemonstre-input">Número de <strong>grandes vehículos/monstruos base 90-100mm o superior</strong>:</label>
            <p>Ejemplo: Predator, Plague Burst, Príncipe Demonio, Armingers, Mancrusher...</p>
            <p>Precio unitario: <span id="prixgrosvehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalgrosvehiculemonstre">0.00</span> €</p>
            <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
        </div>

        <div id="enormevehiculemonstre" class="cardform">
            <label for="enormevehiculemonstre-input">Número de <strong>enormes vehículos/monstruos base 130-160mm o superior</strong>:</label>
            <p>Ejemplo: Land Raider, Defiler, Aerodyne...</p>
            <p>Precio unitario: <span id="prixenormevehiculemonstre">0.00</span> €</p>
            <p>Subtotal: <span id="totalenormevehiculemonstre">0.00</span> €</p>
            <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
        </div>

        <div id="titanvehiculemonstre" class="cardform">
            <label for="titanvehiculemonstre-input">Número de <strong>vehículos/monstruos titánicos base 170mm</strong>:</label>
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
            <h3 class="total"><span id="oktotal">0.00</span></h3>

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
                       <h1>Demande de Devis</h1>
       
           <div class="form-container">
            
        <form id="contactForm" action="#" class="bg-white p-6 rounded-lg shadow-md">
              <div class="center">
                  <fieldset>
                <legend>Coordonnées</legend>
                <div class="form-group">
                    <label for="nom">Nom<span class="required">*</span></label>
                    <input type="text" id="nom" name="nom" placeholder="Surname" required>
                </div>
                <div class="form-group">
                    <label for="prenom">Prénom<span class="required">*</span></label>
                    <input type="text" id="prenom" name="prenom" placeholder="Name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email<span class="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <label for="telephone">Téléphone<span class="required">*</span></label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Phone" required>
                </div>
                <div class="form-group">
                    <label for="adresse">Adresse<span class="required">*</span></label>
                    <input type="text" id="adresse" name="adresse" placeholder="Address" required>
                </div>
                <div class="form-group">
                    <label for="cp">Code Postal<span class="required">*</span></label>
                    <input type="text" id="cp" name="cp" placeholder="Postal Code" required>
                </div>
                <div class="form-group">
                    <label for="ville">Ville<span class="required">*</span></label>
                    <input type="text" id="ville" name="ville" placeholder="City" required>
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
                        <label for="niveau">Niveaux de Peinture :</label><br>
                        <p>Niveau ⭐ Premium :<br> TableTop+, Qualité supérieur qui va à l'Approfondi :<br> 🔍 Parfait pour valoriser les figurines de jeu. (Notre recommendation).<br><br></p>
                        <p>Niveau 👑 Fantasia :<br> TableTop++, Qualité supérieur plus Prestige :<br> 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.<br><br></p>
                        <p>Niveau 🎨 Studio :<br> ✨ Limitée et réservée aux passionnés souhaitant le meilleur:<br> 🎨 Pour la collection en vitrine.<br><br></p>
                        <p>Le soclage est inclus.</p>
                        <select id="niveau" class="select" name="niveau" required>
                            <option value="" disabled hidden>Choisissez un niveau</option>
                            <option value="niveau1" selected>Niveau Premium - TableTop+, équivalent Gold (niv3)</option>
                            <option value="niveau2">Niveau Fantasia - TableTop++, équivalent Diamond (niv4)</option>
                            <option value="expo">Niveau Studio - Pièce d'exposition pour vitrine</option>
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
                        <label for="enormevehiculemonstre-input">Nombre de <strong>Énormes Véhicules/Monstres socle 130-160mm ou supérieur</strong> :</label>
                        <p>Exemple : Land Raider, Defiler, Aerodyne...</p>
                        <p>Prix unitaire : <span id="prixenormevehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalenormevehiculemonstre">0.00</span> €</p>
                        <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
                    </div>

                    <div id="titanvehiculemonstre" class="cardform">
                        <label for="titanvehiculemonstre-input">Nombre de <strong>Véhicules/Monstres Titanesques socle 170mm</strong> :</label>
                        <p>Exemple : Spartan, Imperial Knight, Mega Gargant...</p>
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
                        <h3 class="total"><span id="oktotal">0.00</span></h3>

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
