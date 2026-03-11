
        
let delaidispo;
let moisChiffre;
let messageinfo;
let testscrolltotal;
 
// Chargement des données du mois
fetch('/data/mois.txt')
    .then(response => response.text())
    .then(texte => {
        moisChiffre = parseInt(texte.trim(), 10); // Conversion en entier et suppression des espaces
        convertirMois(); // Appel de la fonction après avoir récupéré le mois
    });

// Dictionnaires des mois en français
const moisFr = {
    1: "Janvier", 2: "Février", 3: "Mars", 4: "Avril", 5: "Mai", 6: "Juin",
    7: "Juillet", 8: "Août", 9: "Septembre", 10: "Octobre", 11: "Novembre", 12: "Décembre"
};

// Fonction de conversion et d'affichage
function convertirMois() {
    // Vérification de la validité du mois
    if (moisChiffre >= 1 && moisChiffre <= 12) {
        const moisFrancais = moisFr[moisChiffre];
        // Mise à jour des éléments sur la page
        delaidispo = moisFrancais;
        document.getElementById("resultat").textContent = delaidispo; // Affichage du mois sur la page
    } else {
       delaidispo = "1";
         document.getElementById("resultat").textContent ="Janvier";
    }
}

function changelangueinfo(){
if(langueselect === "french"){
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
if(langueselect === "english"){
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
if(langueselect === "spanish"){
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

// Fonction pour vérifier si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}

function loadPage(page) {
    ecriturl(page);
  const contenuPrincipal = document.getElementById("contenu-principal");
  if (!contenuPrincipal) {
    console.error("Element contenu-principal non trouvé");
    return;
  }

  console.log(`Chargement de la page : ${page}`);
  contenuPrincipal.style.opacity = 0;
  setTimeout(() => {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          console.error(`Échec du fetch pour ${page}: ${response.status}`);
          throw new Error('Page non trouvée');
        }
        return response.text();
      })
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newContent = doc.querySelector('#contenu-principal');
        if (!newContent) {
          console.error("Aucun élément #contenu-principal trouvé dans la page chargée");
          contenuPrincipal.innerHTML = "<p>Erreur : contenu principal non trouvé.</p>";
        } else {
          contenuPrincipal.innerHTML = newContent.innerHTML;
        }
        contenuPrincipal.style.opacity = 1;
        console.log(`Page ${page} chargée, initialisation des scripts`);
        if (typeof initializeCardToggle === 'function') {
          console.log('Appel de initializeCardToggle');
          initializeCardToggle();
       
        }
        initializePageSpecificScripts(page);
         
        adjustMenuVisibility(); 
          // Auto-advance every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);
      })
      .catch(error => {
        console.error(`Erreur lors du chargement de ${page}:`, error);
        contenuPrincipal.innerHTML = "<p>Une erreur est survenue lors du chargement de la page.</p>";
        contenuPrincipal.style.opacity = 1;
      });
  }, 200);

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const scrollTotal = document.getElementById("scrollTotal");
  const menu = document.getElementById("formSection");

  window.onscroll = function () {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      scrollToTopBtn.style.display = "block";
      if (isMobile()) {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
      }
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  if (page === "simulateur_devis.html") {
    console.log("Affichage du bouton scrollTotal pour simulateur_devis.html");
    scrollTotal.style.display = "block";

          testscrolltotal=1;
  } else {
    scrollTotal.style.display = "none";
             testscrolltotal=0;
  }
}
function initializePageSpecificScripts(page) {
  console.log(`Initialisation des scripts spécifiques pour ${page}`);
  switch (page) {
    case 'simulateur_devis.html':
      if (typeof initializeFormCalculations === 'function') {
        console.log('Appel de initializeFormCalculations');
        initializeFormCalculations();
              changelanguesimulateur();
      } else {
        console.error('initializeFormCalculations non défini');
      }
      break;
          
      case 'index.html':
      if (typeof changelangueindex === 'function') {
        console.log('Appel de changelangueindex');
        changelangueindex();
      } else {
        console.error('changelangueindex non défini');
      }
      break;
                case 'conditions.html':
      if (typeof changelanguecondition === 'function') {
        console.log('Appel de changelanguecondition');
        changelanguecondition();
      } else {
        console.error('changelangue non défini');
      }
      break;
          
      case 'figconcours.html':
      if (typeof changelanguefigconcours === 'function') {
        console.log('Appel de changelanguefigconcours');
        changelanguefigconcours();
      } else {
        console.error('changelangue non défini');
      }
      break;
      case 'piecepopculture.html':
      if (typeof changelanguepiecepop === 'function') {
        console.log('Appel de changelanguepiecepop');
        changelanguepiecepop();
      } else {
        console.error('changelangue non défini');
      }
      break;
      case 'peinturecommission.html':
      if (typeof changelanguepeinturecommission === 'function') {
        console.log('Appel de changelanguepeinturecommission');
        changelanguepeinturecommission();
      } else {
        console.error('changelangue non défini');
      }
      break;
    
    case 'formation.html':
      if (typeof initializeFormationForm === 'function') {
        console.log('Appel de initializeFormationForm');
        initializeFormationForm();
      } else {
        console.error('initializeFormationForm non défini');
      }
      break;
          
    case 'galerie.html':
      if (typeof initializeGalerie === 'function') {
        console.log('Appel de initializeGalerie');
        initializeGalerie();
      } else {
        console.error('initializeGalerie non défini');
      }
      break;   
    default:
      console.log(`Aucun script spécifique pour ${page}`);
      break;
  }
}
    
    // Ajuster la visibilité du menu selon la taille de l'écran
        function adjustMenuVisibility() {
            const menu = $("#formSection");
            if (isMobile()) {
                menu.hide();
            } else {
                menu.show();
            }
        }
        
// Initialisation au chargement de la page
window.onload = function() {
    // Fermer le chat initialement
    fermechat();

    // Initialiser l'état du bouton de retour en haut
    document.getElementById("scrollToTopBtn").style.display = "none";
    
    // Retarder l'affichage du message du bot après 30 secondes
    setTimeout(function() {
        const chatContent = document.getElementById("chatContent");

        // Vérifier si l'élément chatContent existe et est vide
        if (chatContent && chatContent.innerHTML === "") {
            // Ouvrir le chat
            ouvrechat();

            if(langueselect ==="french"){
            // Ajouter le message du bot au chat
            chatContent.innerHTML += `
                <div class="blocchat">
                    <div class="bot-message">
                        <p><strong>Peinture Figurine:</strong><br>
                        Bienvenue ! En quoi puis-je vous aider ? 😊<br>
                        Voici ce que je peux faire pour vous :<br><br>- 📌 Informations sur les services :<br>Studio Peinture Figurine propose un service de peinture sur figurine TableTop et de vitrine.<br><br>Nous proposons également un service de montage de vos figurines et d'impression 3D.<br>- 🎨 Conseils de peinture : Tapez "conseil"<br><br>- 💰 Demande de devis : <br><a href="simulateur_devis-fr.html" onclick="loadPage('simulateur_devis-fr.html'); scrollToTop(); fermechat(); return false;">Simulateur de devis 💰</a><br><br><br>- 📆 Disponibilité actuelle :<br>Mon agenda de service de peinture est disponible à partir de <strong>${delaidispo}</strong> actuellement.<br><br>- 🤣 Une blague ? Tapez "blague"</p>
                    </div>
                </div>
            `;}
                        if(langueselect ==="english"){
            // Ajouter le message du bot au chat
            chatContent.innerHTML += `
              <div class="blocchat">
    <div class="bot-message">
        <p><strong>Figurine Painting:</strong><br>
        Welcome! How can I help you? 😊<br>
        Here's what I can do for you:<br><br>- 📌 Service Information:<br>Studio Figurine Painting offers tabletop and display figurine painting services.<br><br>We also provide assembly of your figurines and 3D printing services.<br>- 🎨 Painting Tips: Type "tip"<br><br>- 💰 Request a Quote: <br><a href="simulateur_devis-fr.html" onclick="loadPage('simulateur_devis-fr.html'); scrollToTop(); fermechat(); return false;">Quote Simulator 💰</a><br><br><br>- 📆 Current Availability:<br>My painting service schedule is available from <strong>${delaidispo}</strong> currently.<br><br>- 🤣 A joke? Type "joke"</p>
    </div>
</div>

            `;}
                        if(langueselect ==="spanish"){
            // Ajouter le message du bot au chat
            chatContent.innerHTML += `
              <div class="blocchat">
    <div class="bot-message">
        <p><strong>Pintura de Figuras:</strong><br>
        ¡Bienvenido! ¿En qué puedo ayudarte? 😊<br>
        Esto es lo que puedo hacer por ti:<br><br>- 📌 Información sobre los servicios:<br>Studio Pintura de Figuras ofrece servicios de pintura para figuras de mesa y de exhibición.<br><br>También ofrecemos servicio de montaje de tus figuras e impresión 3D.<br>- 🎨 Consejos de pintura: Escribe "consejo"<br><br>- 💰 Solicitar un presupuesto: <br><a href="simulateur_devis-fr.html" onclick="loadPage('simulateur_devis-fr.html'); scrollToTop(); fermechat(); return false;">Simulador de presupuesto 💰</a><br><br><br>- 📆 Disponibilidad actual:<br>Mi agenda de servicios de pintura está disponible desde <strong>${delaidispo}</strong> actualmente.<br><br>- 🤣 ¿Un chiste? Escribe "chiste"</p>
    </div>
</div>

            `;}
        }
    }, 240000);

    // Initialiser les formulaires de devis et formation

          changelanguemenu();
changelangueinfo();
    changelanguesimulateur();
       changelangueindex();
    initializeFormationForm();
    initializeFormCalculations();
       initializeCardToggle();
initializeGalerie();

    // Ajuster la visibilité du menu
    adjustMenuVisibility();

// Auto-advance every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 50);

    // Ajuster la visibilité du menu lors du redimensionnement
    $(window).on("resize", adjustMenuVisibility);
};
// Gestion du bouton de retour en haut et du menu
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const menu = document.getElementById("formSection");
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollPosition > 10) {
        scrollToTopBtn.style.display = "block";
        menu.style.display = isMobile() ? "none" : "block";
    } else {
        scrollToTopBtn.style.display = "none";
        menu.style.display = isMobile() ? "none" : "block";
    }
};
    
// Fonctions du chat
function ouvrechat() {
    $('#chatBox').toggle();
    const inputElement = document.getElementById("chatInput");
    const chatButton = document.getElementById('chat-button');
    if (inputElement) inputElement.focus();
    if (chatButton) chatButton.style.display = 'none';
}

function fermechat() {
    $('#chatBox').toggle();
    const chatButton = document.getElementById('chat-button');
    if (chatButton) chatButton.style.display = 'block';
}


function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêche un comportement indésirable
        sendMessage(); // Envoie le message
    } else {
        var inputElement = document.getElementById("chatInput");
        var sendButton = document.getElementById("sendButton");
        if (inputElement && sendButton) {
            sendButton.style.display = inputElement.value.trim() === "" ? "none" : "block"; // Affiche ou cache le bouton d'envoi
        }
    }
}
function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

function sendMessage() {
    const inputElement = $("#chatInput");
    const chatContent = document.getElementById("chatContent");
    const sendButton = document.getElementById("sendButton");
    const input = inputElement.val().trim().toLowerCase();
    if (!input) return;

    const conseils = [
        'Pour améliorer vos éclaircissements, utilisez la technique du "layering" avec des transitions progressives.',
        'Appliquez un lavis pour Prestiger les ombrages avant d\'ajouter un éclaircissement sur les zones exposées.',
        'Pour un rendu plus naturel, travaillez les éclaircissements par petites couches pour une transition fluide.',
        'Les détails minutieux font la différence, optez pour un pinceau taille 0 ou 00 pour plus de précision.',
        'Utilisez un pinceau fin pour les petits détails, en évitant les excès de peinture.',
        'Pour un socle réaliste, ajoutez de la texture comme du sable, de la neige artificielle ou des éléments naturels.'
    ];

    const randomIndex2 = Math.floor(Math.random() * conseils.length);
    const conseil = conseils[randomIndex2];

    const datedispo = delaidispo;
    const blagues = [
        "Pourquoi les peintres de figurines ne jouent-ils jamais à cache-cache ? Parce qu'ils savent que personne ne pourra jamais les retrouver sous leur couche de peinture ! 😄",
      
        "Pourquoi les figurines détestent-elles les aérographes ? Parce qu'elles trouvent que ça met toujours trop de pression ! 😆",
        "Pourquoi les figurines ne se disputent-elles jamais ? Parce qu'elles savent qu'elles finiront toujours par se mettre d'accord sur un socle ! 😄"
    ];

    const randomIndex = Math.floor(Math.random() * blagues.length);
    const blague = blagues[randomIndex];

    let response = "Je n'ai pas compris votre demande.<br> Si je ne comprends pas certains mots.<br> Dites-le moi par mail 📧 : <a href='mailto:studiopeinturefigurine@gmail.com'>studiopeinturefigurine@gmail.com</a>";

    if (input.match(/(contact|formulaire|devis|tarif|commande|estimation|prix)/i)) {
        response = 'Voici notre formulaire de contact :<br><a href="simulateur_devis.html" onclick="loadPage(\'simulateur_devis.html\'); scrollToTop(); fermechat(); return false;">Simulateur de devis 💰</a>';
    } else if (input.match(/(bonjour|coucou|bonsoir|salut|wesh|yo|cc)/i)) {
        response = 'Bonjour 😀 Comment puis-je vous aider ? Pour savoir ce que je peux faire, tapez "aide".';
    } else if (input.match(/(merci|remercie|ca va)/i)) {
        response = 'Merci à toi 😀';

           } else if (input.match(/(service|services|commission|commissions|prestation|prestations)/i)) {
        response = "Studio Peinture Figurine propses un service de Peinture sur Figurine TableTop et Exposition.<br>Mais également le service de montage de vos figurines et de l'impression 3D.";

           } else if (input.match(/(peinture|peindre|peintre)/i)) {
        response = 'Que recherchez vous ?<br><br>Faire peindre vos figurines ?<br><a href="simulateur_devis.html" onclick="loadPage(\'simulateur_devis.html\'); scrollToTop(); fermechat(); return false;">Simulateur de devis 💰</a><br><br>Ou apprendre la peinture suir figurine ?<br><a href="formation.html" onclick="loadPage(\'formation.html\'); return false;">Formation 📚</a><br><br>Les deux sont possibles !';
        
    } else if (input.match(/(blague|rire|lol|mdr)/i)) {
        response = blague + '<br>Plus de blagues tapez "blague"<br>';
    } else if (input.match(/(infos|info|informations|conditions|condition)/i)) {
        response = 'Voici des informations utiles :<br> <a href="conditions.html" onclick="loadPage(\'conditions.html\'); scrollToTop(); fermechat(); return false;">Conditions générales de vente 📜</a>';
    } else if (input.match(/(cours|formation|apprendre|conseil|conseils|lavis|éclaircissement|pinceau|aerographe|aero)/i)) {
        response = conseil + '<br>Plus de conseils tapez "conseil"<br><br>' + 'Pour vous former contactez-moi : <br><a href="formation.html" onclick="loadPage(\'formation.html\'); fermechat(); return false;">Formation 📚</a>';
    } else if (input.match(/(impression 3d|stl|imprimante|3D)/i)) {
        response = 'Nous proposons un service d\'impression 3D haute qualité ! <br>Voici les détails :<br><a href="impression3d.html" onclick="loadPage(\'impression3d.html\'); fermechat(); return false;">Impression 3D 🖨️</a>';
} else if (input.match(/(aide|menu|que peux-tu faire)/i)) {
    response = 'Voici ce que je peux faire pour vous :<br><br>- 📌 Infos sur les services :<br>Studio Peinture Figurine propose un service de peinture sur figurines TableTop et Exposition.<br><br>Mais également un service de montage de vos figurines et d\'impression 3D.<br>- 🎨 Conseils de peinture : Tapez "conseil"<br><br>- 💰 Demande de devis : <br><a href="simulateur_devis.html" onclick="loadPage(\'simulateur_devis.html\'); scrollToTop(); fermechat(); return false;">Simulateur de devis 💰</a><br><br><br>- 📆 Disponibilité actuelle :<br>Mon planning de service de peinture est disponible à partir de <strong>' + datedispo + '</strong> actuellement.<br><br>- 🤣 Une blague ? Tapez "blague"';
} else if (input.match(/(modalités de paiement|paiement|acompte|arrhes|arrhe)/)) {
    response = 'Les modalités de paiement sont les suivantes :<br>' +
               '- **25%** pour réserver un créneau.<br>' +
               '- **25%** au démarrage ou **50%** directement en remplacement des deux premières étapes.<br>' +
               '- **50%** restants à la validation finale sur photos (présentation à 80% d\'avancement).<br>' +
         '- Possibilité de paiement 4x par PayPal.<br>' +
               'Nous acceptons les paiements par virement, carte bancaire ou PayPal <br>(des frais de 4% s\'appliquent pour PayPal). Une réduction de 4% est accordée pour les paiements hors PayPal.';
} else if (input.match(/(délais|temps|délai|delai|dispo|disponibilité)/)) {
    response = 'Mon planning de service de peinture est disponible à partir de <strong>' + datedispo + '</strong> actuellement.<br><br>' +
               'Les délais de réalisation sont les suivants :<br>' +
               '- Impression 3D : sous 72h ouvrées (hors peinture).<br>' +
               '- Peinture TableTop :<br>' +
               '  - Niveau Approfondi : 2 à 4 mois.<br>' +
               '  - Niveau Prestige : 4 à 6 mois.<br>' +
        '  - Niveau Studio : 6-8 mois ou lus.<br>' +
               '- Peinture Vitrine : 4 à 6 mois.';
} else if (input.match(/(livraison|port|expédition)/)) {
    response = 'Nous expédions via Colissimo ou Mondial Relay. Les frais de port sont offerts à partir de 1200€ de commande.'
} else if (input.match(/(publication|photos|photo|pub|publicité)/)) {
    response = 'Le Studio Peinture Figurine se réserve le droit de publier 📷 des photos et vidéos des figurines peintes.';
} else if (input.match(/(annulation|remboursement|désistement)/)) {
    response = 'Les arrhes et acomptes versés ne sont pas remboursables en cas de désistement.<br> Le paiement des arrhes valide le devis. Des frais de 30% s\'appliquent pour les commandes urgentes (moins de 15 jours). Si les figurines ne sont pas envoyées dans un délai de plus de 3 mois à compter de la date de démarrage du projet, celui-ci sera automatiquement annulé et les arrhes conservées.';
} else if (input.match(/(propriété intellectuelle|droits d'auteur|œuvre)/)) {
    response = 'Les œuvres réalisées sont protégées par le droit d\'auteur.';
}
    else if (input.match(/(je t'aime|i love u|te quiero|je taime|❤️)/)) {
    response = "Moi aussi je t'aime. ❤️";
}
    else if (input.match(/(gaelle frasse|gaelle goujon)/)) {
    response = "Je t'aime plus que tout mon épouse chérie. ❤️❤️❤️";
}
               chatContent.innerHTML += `
                <div class="blocchat">
                    <div class="user-message">
                        <p><strong>Vous :</strong><br> ${escapeHtml(input)}</p>
                    </div>
                    <div class="bot-message">
                        <p><strong>Peinture Figurine :</strong><br> ${response}</p>
                    </div>
                </div>
            `;

            inputElement.val("");
            sendButton.style.display = "none";
            chatContent.scrollTop = chatContent.scrollHeight;
        }


const niveauLabels = {
    niveau0: "Niveau Essentiel - TableTop basique 3 couleurs, texture simple : 🚀 Idéal pour les petits budgets, Minimum efficace sans détails.",
    niveau1: "Niveau Approfondi - TableTop+, Qualité supérieur qui va à l'Approfondi : 🔍 Parfait pour valoriser les figurines de jeu. Notre recommendation.",
    niveau2: "Niveau Prestige - TableTop++, Qualité supérieur plus Prestige : 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.",
    expo: "Niveau Studio : ✨ Limitée et réservée aux passionnés souhaitant le meilleur. Pour la collection en vitrine."
};

const niveauLabelsmini = {
    niveau0: "Essentiel",
    niveau1: "Approfondi",
    niveau2: "Prestige",
    expo: "Pièce d'exposition"
};


const tariffs = {
    petiteinfanterie: { niveau0: 10, niveau1: 15, niveau2: 20},
    infanterie: { niveau0: 15, niveau1: 30, niveau2: 40},
    infanterieelite: { niveau0: 20, niveau1: 35, niveau2: 50 },
    personnage: { niveau0: 40, niveau1: 70, niveau2: 90},
      personnageelite: { niveau0: 50, niveau1: 90, niveau2: 120},
    personnagemonstrueux: { niveau0: 100, niveau1: 190, niveau2: 240 },
    personnagesurmonstre: { niveau0: 120, niveau1: 240, niveau2: 300 },
    personnagesurgrandmonstre: { niveau0: 180, niveau1: 360, niveau2: 450 },
    cavalerie: { niveau0: 30, niveau1: 40, niveau2: 50 },
    cavalerielourde: { niveau0: 25, niveau1: 50, niveau2: 70 },
    petitvehiculemonstre: { niveau0: 40, niveau1: 80, niveau2: 100},
    vehiculemonstremoyen: { niveau0: 60, niveau1: 120, niveau2: 150 },
    grosvehiculemonstre: { niveau0: 100, niveau1: 190, niveau2: 240},
    enormevehiculemonstre: { niveau0: 140, niveau1: 270, niveau2: 340},
    titanvehiculemonstre: { niveau0: 240, niveau1: 480, niveau2: 600 }
};


const categories = Object.keys(tariffs);

function calculateTotals() {
    const niveauSelect = document.getElementById("niveau");
    const niveau = niveauSelect?.value || "niveau1";
    const afficheniveau = document.getElementById("afficheniveau");
    const comparativeTable = document.getElementById("comparative-table");
       const niveausup = document.getElementById("niveau-sup");
    const oktotal = document.getElementById("oktotal");

    // Vérification des éléments DOM nécessaires
    if (!niveauSelect || !afficheniveau || !comparativeTable || !oktotal) {
        console.error("Un ou plusieurs éléments DOM nécessaires sont manquants.");
        return;
    }

    // Mise à jour du libellé du niveau
    afficheniveau.textContent = niveauLabels[niveau];

    let totalGeneral = 0;

    // Cas particulier pour le niveau "expo"
    if (niveau === "expo") {
        categories.forEach(cat => {
            const divCat = document.getElementById(cat);
            if (divCat) divCat.style.display = "none";
        });

        ["aimant", "montage"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
        ["message"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "done";
        });
        

        comparativeTable.innerHTML = "";
        oktotal.textContent = "Sur devis 💸";
        return;
    }

    // Calcul du total pour chaque catégorie
    categories.forEach(cat => {
        const divCat = document.getElementById(cat);
        const input = document.getElementById(`${cat}-input`);
        const prixCat = document.getElementById(`prix${cat}`);
        const totalCatEl = document.getElementById(`total${cat}`);

        if (divCat) divCat.style.display = "";
        if (!input || !prixCat || !totalCatEl) return;

        const qty = Number(input.value) || 0;
        const priceUnit = tariffs[cat][niveau] || 0;
        const totalCat = qty * priceUnit;

        prixCat.textContent = priceUnit.toFixed(2);
        totalCatEl.textContent = totalCat.toFixed(2);
        totalGeneral += totalCat;
    });

    // Affichage des champs supplémentaires
    ["aimant-input", "total", "montage-input"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "";
    });

        // Gestion de la table comparative
    const previousLevel = {
        niveau0: "niveau1",
        niveau1: "niveau2",
        niveau2: "niveau1",
    }[niveau];

    
    // Mise à jour du total général
    oktotal.innerHTML = `<strong>Total estimé niveau ${niveauLabelsmini[niveau]} </strong> : ${totalGeneral.toFixed(2)} € <br>Tarif approximatif, hors frais de port et frais PayPal.`;


    
    comparativeTable.innerHTML = ""; // Réinitialisation du tableau
       niveausup.innerHTML = "";

    if (!previousLevel || niveau === "expo") {
        return; // Pas de comparaison pour niveau2 ou si previousLevel n'existe pas
    }

    // Calcul du total pour le niveau précédent
    let totalPrevious = 0;
    categories.forEach(cat => {
        const qty = Number(document.getElementById(`${cat}-input`)?.value) || 0;
        const priceUnit = tariffs[cat][previousLevel] || 0;
        totalPrevious += qty * priceUnit;
    });


    // Génération du tableau comparatif
    const niveauNumber = niveau.replace("niveau", "");
    const previousNiveauNumber = previousLevel.replace("niveau", "");
  if (niveau === "niveau2") {
       niveausup.innerHTML = "";
    comparativeTable.innerHTML = `
        <table id="tablecompar" style="margin: 5px auto; border-collapse: collapse; width: 70%;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                 <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[previousLevel]}</th>
                    <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[niveau]}</th>
                   
                </tr>
            </thead>
            <tbody>
                <tr>
                  
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalPrevious.toFixed(2)} €<br>
                        <img src="img/exempleniveau${previousNiveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[previousLevel]}">
                    </td>
                      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalGeneral.toFixed(2)} €<br>
                        <img src="img/exempleniveau${niveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[niveau]}">
                    </td>
                </tr>
            </tbody>
        </table>
    `;
  }
    else{
         niveausup.innerHTML = `
                <div>
            <button class="button" onclick="changeniveau()">Passer au niveau supérieur ?</button>
        </div>
           `;
            comparativeTable.innerHTML = `
        <table id="tablecompar" style="margin: 5px auto; border-collapse: collapse; width: 70%;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[niveau]}</th>
                    <th style="border: 1px solid #ddd; padding: 3px; text-align: center;">${niveauLabelsmini[previousLevel]}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalGeneral.toFixed(2)} €<br>
                        <img src="img/exempleniveau${niveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[niveau]}">
                    </td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                        <strong>Total :</strong> ${totalPrevious.toFixed(2)} €<br>
                        <img src="img/exempleniveau${previousNiveauNumber}.jpg"  class="imgcomparative-table" alt="Exemple ${niveauLabelsmini[previousLevel]}">
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
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const requiredFields = form.querySelectorAll("[required]");
            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("error");
                } else {
                    field.classList.remove("error");
                }
            });

            if (!isValid) {
                alert("Veuillez remplir tous les champs obligatoires.");
                return;
            }

            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            const email = document.getElementById("email").value;
            const telephone = document.getElementById("telephone").value;
            const adresse = document.getElementById("adresse").value;
            const cp = document.getElementById("cp").value;
            const ville = document.getElementById("ville").value;
            const pays = document.getElementById("pays").value;
            const niveau = document.getElementById("niveau").value;
            const montage = document.getElementById('montage-input').value || 0;
            const aimant = document.getElementById('aimant-input').value || 0;
            const message = document.getElementById("message-input").value;

            // Récupération des quantités
            const quantities = {};
            categories.forEach(cat => {
                quantities[cat] = parseInt(document.getElementById(cat + '-input').value) || 0;
            });

            // Récupération du total (si ce n'est pas "Sur devis")
            const totalText = document.getElementById("oktotal").textContent;
            const total = totalText.includes("€") ? parseFloat(totalText.replace(/[^\d.]/g, "")) : 0;

            const subject = `Demande de Devis de ${prenom} ${nom} - ${niveauLabelsmini[niveau]}`;

            let body = "";

            if (niveau === "expo") {
                body =  `Bonjour,\n\nVoici ma demande de devis de peinture (${niveauLabelsmini[niveau]}) :\n` +
                             `${nom}\n${prenom}\n${adresse}\n${cp}\n` +
                             `${ville}\n${pays}\n${email}\n${telephone}\n\n` +
                    `Pièce d'exposition - Sur devis uniquement\n\nMessage :\n${message}\n\nCordialement.`;
            } else {
                body =  `Bonjour,\n\nVoici ma demande de devis de peinture (${niveauLabelsmini[niveau]}) :\n` +
                             `${nom}\n${prenom}\n${adresse}\n${cp}\n` +
                             `${ville}\n${pays}\n${email}\n${telephone}\n\n` +
                    categories.map(cat => `- ${cat} : ${quantities[cat]}`).join('\n') + `\n\n` +
                       `- Montage : ${montage}\n- Aimant : ${aimant}\n\n` +
                       `Total estimé : ${total.toFixed(2)} €\n\nMessage :\n${message}\n\nCordialement.`;
            }

            const mailtoURL = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoURL;
        });
    }

    // Recalcul automatique quand on modifie le formulaire
    document.querySelectorAll("#contactForm input, #contactForm select").forEach(element => {
        element.addEventListener("input", calculateTotals);
    });
}

document.addEventListener("DOMContentLoaded", initializeFormCalculations);

    
// Appelle la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", changelangueindex);
document.addEventListener("DOMContentLoaded", changelanguesimulateur);
document.addEventListener("DOMContentLoaded", changelanguepeinturecommission);
document.addEventListener("DOMContentLoaded", changelanguesimulateur);
document.addEventListener("DOMContentLoaded", changelanguecondition);
document.addEventListener("DOMContentLoaded", changelanguefigconcours);
document.addEventListener("DOMContentLoaded", changelanguepiecepop);
document.addEventListener('DOMContentLoaded', initializeGalerie);

    

// Initialisation du formulaire de formation
function initializeFormationForm() {
    $("#formationForm").off("submit").on("submit", function (e) {
        e.preventDefault();

        const nom = $("#nom").val();
        const prenom = $("#prenom").val();
        const email = $("#email").val();
        const telephone = $("#telephone").val();
        const cours = $("#cours").val();
        const message = $("#message").val() || "Aucun message";
        const adresse = $("#adresse").val();
        const cp = $("#cp").val();
        const ville = $("#ville").val();
        const pays = $("#pays").val();

        const subject = `Demande de cours de peinture - ${nom} ${prenom}`;
        const body = `Bonjour,

Voici ma demande de cours de peinture (${cours}) :
${nom}
${prenom}
${adresse}
${cp}
${ville}
${pays}
${email}
${telephone}

Message :
${message}

Cordialement,
${prenom} ${nom}`;

        const mailtoURL = `mailto:studiopeinturefigurine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoURL;
    });
}


function appelimg() {
    return [
        // Concours
        'concours/concours1.png',
        'concours/concours2.png',
        'concours/concours3.png',
        'concours/concours4.png',

        // Niv3
        'niv3/nivtrois1.png',
        'niv3/nivtrois2.png',
        'niv3/nivtrois3.png',
        'niv3/nivtrois4.png',
        'niv3/nivtrois5.png',
        'niv3/nivtrois6.png',
        'niv3/nivtrois7.png',
        'niv3/nivtrois8.png',
        'niv3/nivtrois9.png',
        'niv3/nivtrois10.png',
        'niv3/nivtrois11.png',
        'niv3/nivtrois12.png',
        'niv3/nivtrois13.png',
        'niv3/nivtrois14.png',
        'niv3/nivtrois15.png',
        'niv3/nivtrois16.png',
        'niv3/nivtrois17.png',
        'niv3/nivtrois18.png',
        'niv3/nivtrois19.png',
        'niv3/nivtrois20.png',
        'niv3/nivtrois21.png',
        'niv3/nivtrois22.png',
        'niv3/nivtrois23.png',
        'niv3/nivtrois24.png',
        'niv3/nivtrois25.png',
        'niv3/nivtrois26.png',

        // Niv4
        'niv4/nivquatre1.png',
        'niv4/nivquatre2.png',
        'niv4/nivquatre3.png',
        'niv4/nivquatre4.png',
        'niv4/nivquatre5.png',
        'niv4/nivquatre6.png',
        'niv4/nivquatre7.png',
        'niv4/nivquatre8.png',

        // Expo
        'expo/expo1.png',
        'expo/expo2.png',
        'expo/expo3.png',
        'expo/expo4.png',
        'expo/expo5.png',
        'expo/expo6.png',
        'expo/expo7.png',
        'expo/expo8.png',
        'expo/expo9.png',
        'expo/expo10.png'
    ];
}

function initializeGalerie() {
    const imageFilenames = appelimg();
    const basePath = 'img/';
    const gallery = document.getElementById('gallery');
    const filters = document.getElementById('filters');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!gallery || !filters || !lightbox || !lightboxImg) {
        console.error("Un ou plusieurs éléments du DOM manquent (gallery, filters, lightbox, lightbox-img)");
        return;
    }

    const categorized = {};

    // Catégorisation automatique par dossier
    imageFilenames.forEach(filename => {
        const parts = filename.split('/');
        if (parts.length < 2) return; // sécurité

        const category = parts[0];
        const fullPath = basePath + filename;

        if (!categorized[category]) {
            categorized[category] = [];
        }
        categorized[category].push(fullPath);
    });

    // Catégorie "Tous"
    categorized['Tous'] = imageFilenames.map(f => basePath + f);

    // Création des boutons de filtre
    Object.keys(categorized)
        .sort() // optionnel : trie alphabétique
        .forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            btn.classList.add(cat.toLowerCase());

            if (cat === 'Tous') {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                // Retire .active de tous les boutons
                filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                // Ajoute .active au bouton cliqué
                btn.classList.add('active');

                showImages(cat);
            });

            filters.appendChild(btn);
        });

    // Fonction d'affichage des images
    function showImages(category) {
        gallery.innerHTML = ''; // on vide

        if (!categorized[category]) return;

        const fragment = document.createDocumentFragment(); // plus performant

        categorized[category].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = "Peinture figurine studio – " + category;
            img.classList.add('gallery-img');
            img.loading = "lazy";           // amélioration perf + SEO
            // img decoding="async";        // optionnel (support variable)

            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = src;
                lightboxImg.alt = img.alt;
            });

            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
    }

    // Fermeture de la lightbox (clic n'importe où)
    lightbox.addEventListener('click', (e) => {
        // On ferme seulement si on clique en dehors de l'image
        if (e.target === lightbox || e.target === lightboxImg) {
            lightbox.classList.remove('active');
            // lightboxImg.src = '';     // pas obligatoire (mais évite de garder l'ancienne src)
        }
    });

    // Affichage initial
    showImages('Tous');
}
