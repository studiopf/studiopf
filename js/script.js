let urlencours;
urlencours = "index.html";

function highlightLanguage(selectedId) {
    // Récupère tous les boutons
    const buttons = document.querySelectorAll('.language-selector button');
    
    buttons.forEach(btn => {
        if (btn.id === selectedId) {
            btn.classList.add('selected'); // surbrillance
        } else {
            btn.classList.remove('selected'); // gris
        }
    });
}

function ecriturl(url){
    urlencours=url;
}

function changelanguegalerie() {
    const contenupagegalerie = document.getElementById("contenupage-galerie");
    if (!contenupagegalerie) {
        return;
    }

    if (langueselect === "english") {

               contenupagegalerie.innerHTML = `<h2 class="galerie-title">🎨 Miniature Art Gallery</h2>
<p class="galerie-description">
  ✨ Step into a world where every miniature becomes a work of art.
    
 
    </p>

     <!-- Les filtres seront insérés ici automatiquement par JS -->
    <div class="menugallery" id="filters"></div>
 
    <div class="gallery" id="gallery"></div>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
      <img id="lightbox-img" src="" alt="">
    </div>

`;
               }
        if (langueselect === "spanish") {

               contenupagegalerie.innerHTML = `<h2 class="galerie-title">🎨 Galería de Arte en Miniatura</h2>
<p class="galerie-description">
  ✨ Adéntrate en un mundo donde cada miniatura se convierte en una obra de arte.
    </p>

     <!-- Les filtres seront insérés ici automatiquement par JS -->
    <div class="menugallery" id="filters"></div>
 
    <div class="gallery" id="gallery"></div>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
      <img id="lightbox-img" src="" alt="">
    </div>

`;
               }
        if (langueselect === "french") {

               contenupagegalerie.innerHTML = `  <h2 class="galerie-title">🎨 Galerie d’Art en Miniature</h2>
  <p class="galerie-description">
    ✨ Entrez dans un univers où chaque figurine devient une œuvre d'art.

    </p>

     <!-- Les filtres seront insérés ici automatiquement par JS -->
    <div class="menugallery" id="filters"></div>
 
    <div class="gallery" id="gallery"></div>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
      <img id="lightbox-img" src="" alt="">
    </div>

`;
               }
}

/***********************
 * Gestion de la langue
 ***********************/
let langueselect = "french";

function setLangue(lang) {
    langueselect = lang;
    const affichelangue = document.getElementById("affichelangue");
    if (affichelangue) {
        affichelangue.textContent = lang;
    }
}

function changelangueenglish() {
    setLangue("english");
            highlightLanguage('english');
loadPage(urlencours);
     changelanguemenu();
    changelangueinfo();
changelangueindex();
} 

function changelanguespanish() {
    setLangue("spanish");
           highlightLanguage('spanish');
    loadPage(urlencours);
    changelanguemenu();
      changelangueinfo();
changelangueindex();
}

function changelanguefrench() {
    setLangue("french");
       highlightLanguage('french');
    loadPage(urlencours);
      changelanguemenu();
   changelangueinfo();
changelangueindex();
}
function changelanguemenu() {
    const menucontenu = document.getElementById("menu-contenu");
    if (!menucontenu) {
        return;
    }

    if (langueselect === "english") {

               menucontenu.innerHTML = `<ul class="menu">
    <!--<li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); changelanguepeinturecommission(); return false;">TableTop Painting 🎨</a></li>-->
    <!--<li><a href="simulateur_devis.html" onclick="loadPage('simulateur_devis.html'); changelanguesimulateur(); return false;">Quote Simulator 💰</a></li>-->
    <li><a href="galerie.html" onclick="loadPage('galerie.html');  return false;">Gallery 🖼️</a></li>
</ul>
`
               }
        if (langueselect === "spanish") {

               menucontenu.innerHTML = `<ul class="menu">
   <!-- <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); changelanguepeinturecommission(); return false;">Pintura TableTop 🎨</a></li>-->
   <!-- <li><a href="simulateur_devis.html" onclick="loadPage('simulateur_devis.html'); changelanguesimulateur(); return false;">Simulador de Presupuesto 💰</a></li>-->
    <li><a href="galerie.html" onclick="loadPage('galerie.html');  return false;">Galería 🖼️</a></li>
</ul>
`
               }
        if (langueselect === "french") {

               menucontenu.innerHTML = `  <ul class="menu">
     <!--  <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); changelanguepeinturecommission(); return false;">Commission Peinture 🎨</a></li>-->
              <li><a href="formation.html" onclick="loadPage('formation.html'); return false;">Formation 📚</a></li>
              <!--  <li><a href="simulateur_devis.html" onclick="loadPage('simulateur_devis.html'); return false;">Demande de devis 💰</a></li>-->
                <li><a href="galerie.html" onclick="loadPage('galerie.html');  return false;">Galerie 🖼️</a></li>
            </ul>
`
               }}
/*****************************************
 * Page peinture sur commission
 *****************************************/
function changelanguepeinturecommission() {
    const contenupagepeinturecommission = document.getElementById("contenupage-peinturecommission");
    if (!contenupagepeinturecommission) {
        return;
    }

    if (langueselect === "english") {

               contenupagepeinturecommission.innerHTML = `<h1>Tabletop & Display Commission Painting 🎲</h1>
<p>Your miniatures deserve more than a simple paint job: turn them into unique pieces.</p>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🎨 Painting Levels</h2>
    <p>A solid foundation for your miniatures:</p>
    <ul>
        <li><strong>💸 Essential:</strong> equivalent to TableTop (Silver level).</li>
        <li><strong>⭐ Advanced:</strong> equivalent to TableTop+ (Gold level).</li>
        <li><strong>👑 Prestige:</strong> equivalent to TableTop++ (Diamond level).</li>
        <li><strong>🎨 Studio:</strong> competition and display pieces.</li>
    </ul>
    <p><em>Included if assembled by us.</em></p>
    <div>
        <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 🎨</a>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🎨 Preparation, Painting & Basing</h2>

    <div class="card-container3">

        <div class="card">
            <h3>Preparation (included) 🛠️</h3>
            <p>A perfect base for your miniatures:</p>
            <ul>
                <li><strong>💸 Essential:</strong> Treated as-is if already assembled.</li>
                <li><strong>⭐ Advanced:</strong> Mold lines removed, gaps filled.</li>
                <li><strong>👑 Prestige:</strong> Custom conversions ✨.</li>
                <li><strong>🎨 Studio:</strong> Quote on request 💎.</li>
            </ul>
            <p><em>Included if assembled by us.</em></p>
        </div>

        <div class="card">
            <h3>Painting (basing included) 🎨</h3>
            <p>From Tabletop to masterpiece:</p>
            <ul>
                <li><strong>💸 Essential:</strong> Base colors, one shading pass.</li>
                <li><strong>⭐ Advanced:</strong> Washes, basic highlights, main details, blends, lining, weathering 🌟.</li>
                <li><strong>👑 Prestige:</strong> Fine details, texture work, NMM, freehand, gems, realistic eyes, OSL 🖌️.</li>
                <li><strong>🎨 Studio:</strong> Competition level, quote on request 🏆.</li>
            </ul>
            <p><strong><em>Essential unavailable.</em></strong></p>
        </div>

        <div class="card">
            <h3>Basing (included in the service) 🌿</h3>
            <p>Bases that enhance your miniatures:</p>
            <ul>
                <li><strong>💸 Essential:</strong> Simple texture.</li>
                <li><strong>⭐ Advanced:</strong> Simple texture, shading, highlighting, grass.</li>
                <li><strong>👑 Prestige:</strong> More nuances and highlights, 3D elements 🌳.</li>
                <li><strong>🎨 Studio:</strong> Wooden display base, quote on request 🪵.</li>
            </ul>
        </div>

    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Custom Service 🤝</h2>
    <p>Delivery within 4 months depending on complexity for small and medium projects:</p>
    <p>Delivery within 6–8 months depending on complexity and volume for large projects:</p>
    <ul>
        <li>Meticulous preparation 🔍</li>
        <li>Premium materials ⭐</li>
        <li>Advanced techniques 🎨</li>
        <li>Full customization 💡</li>
    </ul>
    <div>
        <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Service Overview 📊</h2>
    <div class="table-container center">
        <table class="tableborder1">
            <thead>
                <tr>
                    <th>🎨 Features</th>
                    <th>💸 Essential</th>
                    <th>⭐ Advanced</th>
                    <th>👑 Prestige</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Quality</td>
                    <td>Best budget</td>
                    <td>Clean and consistent finish</td>
                    <td>More details, stronger contrast</td>
                </tr>
                <tr>
                    <td>Details</td>
                    <td>Simple and effective</td>
                    <td>Clean and efficient enhancement</td>
                    <td>More refined work on key areas</td>
                </tr>
                <tr>
                    <td>Colors</td>
                    <td>Base colors</td>
                    <td>Color harmony, blends and contrast</td>
                    <td>Smoother blends and finer nuances</td>
                </tr>
                <tr>
                    <td>Bases</td>
                    <td>Simple texture</td>
                    <td>Included, enhances the miniature</td>
                    <td>More scenic base</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Detailed Services 📊</h2>

    <h3>Preparation</h3>
    <!-- Tables conservées, intitulés traduits -->
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🧟‍♂️ Difference Between Essential and Advanced – Example: Ghoul</h2>
    <div class="center">
        <img src="img/comparatif-ghoul.jpg" alt="Comparison Ghoul Essential and Advanced" class="responsive-img">
    </div>
    <p class="caption">
        Left: <strong>Essential</strong>.  
        Right: <strong>Advanced</strong>.
    </p>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>👾 Difference Between Essential and Advanced – Example: Tyranid</h2>
    <div class="center">
        <img src="img/comparatif-tyty.jpg" alt="Comparison Tyranid Essential and Advanced" class="responsive-img">
    </div>
    <p class="caption">
        Left: <strong>Essential</strong>.  
        Right: <strong>Advanced</strong>.
    </p>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🛡️ Difference Between Essential, Advanced and Prestige – Example: Space Marine</h2>
    <div class="center">
              <div class="card-container3">
        <div class="card"><img src="img/exempleniveau0.jpg" class="responsive-img"></div>
        <div class="card"><img src="img/exempleniveau1.jpg" class="responsive-img"></div>
         <div class="card"><img src="img/exempleniveau2.jpg" class="responsive-img"></div>
    </div>
    </div>
    <p class="caption">
        Left: <strong>Essential</strong>.  
        Center: <strong>Advanced</strong>.  
        Right: <strong>Prestige</strong>.
    </p>
</div>

<div class="banniere">
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>
</div>
`;
    } else if (langueselect === "spanish") {

      contenupagepeinturecommission.innerHTML = `<h1>Pintura por Encargo Tabletop y Vitrina 🎲</h1>
<p>Tus miniaturas merecen más que una simple pintura: transfórmalas en piezas únicas.</p>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🎨 Niveles de pintura</h2>
    <p>Una base sólida para tus miniaturas:</p>
    <ul>
        <li><strong>💸 Esencial:</strong> equivalente a TableTop (nivel Bronce).</li>
        <li><strong>⭐ Avanzado:</strong> equivalente a TableTop+ (nivel Oro).</li>
        <li><strong>👑 Prestigio:</strong> equivalente a TableTop++ (nivel Diamante).</li>
        <li><strong>🎨 Estudio:</strong> piezas de concurso y exhibición.</li>
    </ul>
    <p><em>Incluido si el montaje es realizado por nosotros.</em></p>
    <div>
        <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar presupuesto 🎨</a>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🎨 Preparación, Pintura y Peana</h2>

    <div class="card-container3">

        <div class="card">
            <h3>Preparación (incluida) 🛠️</h3>
            <p>Una base perfecta para tus miniaturas:</p>
            <ul>
                <li><strong>💸 Esencial:</strong> Tratada tal cual si ya está montada.</li>
                <li><strong>⭐ Avanzado:</strong> Eliminación de líneas de molde, relleno de uniones.</li>
                <li><strong>👑 Prestigio:</strong> Conversiones personalizadas ✨.</li>
                <li><strong>🎨 Estudio:</strong> Presupuesto a medida 💎.</li>
            </ul>
            <p><em>Incluido si el montaje es realizado por nosotros.</em></p>
        </div>

        <div class="card">
            <h3>Pintura (peana incluida) 🎨</h3>
            <p>Del Tabletop a la obra maestra:</p>
            <ul>
                <li><strong>💸 Esencial:</strong> Colores base, un sombreado.</li>
                <li><strong>⭐ Avanzado:</strong> Lavados, iluminaciones básicas, detalles principales, degradados, perfilado, weathering 🌟.</li>
                <li><strong>👑 Prestigio:</strong> Detalles finos, trabajo de texturas, NMM, freehand, gemas, ojos realistas, OSL 🖌️.</li>
                <li><strong>🎨 Estudio:</strong> Nivel concurso, presupuesto a medida 🏆.</li>
            </ul>
            <p><strong><em>Esencial no disponible.</em></strong></p>
        </div>

        <div class="card">
            <h3>Peana (incluida en el servicio) 🌿</h3>
            <p>Peanas que realzan tus miniaturas:</p>
            <ul>
                <li><strong>💸 Esencial:</strong> Textura simple.</li>
                <li><strong>⭐ Avanzado:</strong> Textura simple, sombreado, iluminación, hierba.</li>
                <li><strong>👑 Prestigio:</strong> Más matices e iluminaciones, elementos 3D 🌳.</li>
                <li><strong>🎨 Estudio:</strong> Peana de madera para exhibición, presupuesto a medida 🪵.</li>
            </ul>
        </div>

    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Servicio Personalizado 🤝</h2>
    <p>Entrega en 4 meses según complejidad para proyectos pequeños y medianos:</p>
    <p>Entrega en 6–8 meses según complejidad y volumen para proyectos grandes:</p>
    <ul>
        <li>Preparación meticulosa 🔍</li>
        <li>Materiales premium ⭐</li>
        <li>Técnicas avanzadas 🎨</li>
        <li>Personalización completa 💡</li>
    </ul>
    <div>
        <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar presupuesto 💬</a>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Resumen del Servicio 📊</h2>
    <div class="table-container center">
        <table class="tableborder1">
            <thead>
                <tr>
                    <th>🎨 Características</th>
                    <th>💸 Esencial</th>
                    <th>⭐ Avanzado</th>
                    <th>👑 Prestigio</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Calidad</td>
                    <td>Mejor presupuesto</td>
                    <td>Acabado limpio y consistente</td>
                    <td>Más detalles, contraste más fuerte</td>
                </tr>
                <tr>
                    <td>Detalles</td>
                    <td>Simple y efectivo</td>
                    <td>Mejora limpia y eficiente</td>
                    <td>Trabajo más refinado en áreas clave</td>
                </tr>
                <tr>
                    <td>Colores</td>
                    <td>Colores base</td>
                    <td>Armonía de colores, degradados y contraste</td>
                    <td>Degradados más suaves y matices más finos</td>
                </tr>
                <tr>
                    <td>Peanas</td>
                    <td>Textura simple</td>
                    <td>Incluida, realza la miniatura</td>
                    <td>Peana más escénica</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Servicios Detallados 📊</h2>

    <h3>Preparación</h3>
    <!-- Tables conservées, intitulés traduits -->
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🧟‍♂️ Diferencia entre Esencial y Avanzado – Ejemplo: Ghoul</h2>
    <div class="center">
        <img src="img/comparatif-ghoul.jpg" alt="Comparación Ghoul Esencial y Avanzado" class="responsive-img">
    </div>
    <p class="caption">
        Izquierda: <strong>Esencial</strong>.  
        Derecha: <strong>Avanzado</strong>.
    </p>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>👾 Diferencia entre Esencial y Avanzado – Ejemplo: Tiránido</h2>
    <div class="center">
        <img src="img/comparatif-tyty.jpg" alt="Comparación Tiránido Esencial y Avanzado" class="responsive-img">
    </div>
    <p class="caption">
        Izquierda: <strong>Esencial</strong>.  
        Derecha: <strong>Avanzado</strong>.
    </p>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🛡️ Diferencia entre Esencial, Avanzado y Prestigio – Ejemplo: Space Marine</h2>
    <div class="center">
              <div class="card-container3">
        <div class="card"><img src="img/exempleniveau0.jpg" class="responsive-img"></div>
        <div class="card"><img src="img/exempleniveau1.jpg" class="responsive-img"></div>
         <div class="card"><img src="img/exempleniveau2.jpg" class="responsive-img"></div>
    </div>
    </div>
    <p class="caption">
        Izquierda: <strong>Esencial</strong>.  
        Centro: <strong>Avanzado</strong>.  
        Derecha: <strong>Prestigio</strong>.
    </p>
</div>

<div class="banniere">
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar presupuesto 💬</a>
</div>
`;
    } else { // Français par défaut
        contenupagepeinturecommission.innerHTML = `<h1>Commission Peinture Tabletop & Vitrine 🎲</h1>
<p>Vos figurines méritent mieux qu’un simple coup de pinceau : transformez-les en pièces uniques.</p>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🎨 Niveaux de peinture</h2>
    <p>Une base solide pour vos figurines :</p>
    <ul>
        <li><strong>💸 Essentiel :</strong> équivalent TableTop (niveau Argent).</li>
        <li><strong>⭐ Avancé :</strong> équivalent TableTop+ (niveau Or).</li>
        <li><strong>👑 Prestige :</strong> équivalent TableTop++ (niveau Diamant).</li>
        <li><strong>🎨 Studio :</strong> pièces de concours et d'exposition.</li>
    </ul>
    <p><em>Inclus si montage réalisé par nos soins.</em></p>
    <div>
        <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 🎨</a>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🎨 Préparation, Peinture & Soclage</h2>

    <div class="card-container3">

        <div class="card">
            <h3>Préparation (incluse) 🛠️</h3>
            <p>Une base parfaite pour vos figurines :</p>
            <ul>
                <li><strong>💸 Essentiel :</strong> Traitée telle quelle si déjà montée.</li>
                <li><strong>⭐ Avancé :</strong> Lignes de moulage retirées, joints rebouchés.</li>
                <li><strong>👑 Prestige :</strong> Conversions personnalisées ✨.</li>
                <li><strong>🎨 Studio :</strong> Devis sur mesure 💎.</li>
            </ul>
            <p><em>Inclus si montage réalisé par nos soins.</em></p>
        </div>

        <div class="card">
            <h3>Peinture (socle inclus) 🎨</h3>
            <p>Du Tabletop au chef-d'œuvre :</p>
            <ul>
                <li><strong>💸 Essentiel :</strong> Couleurs de base, un ombrage.</li>
                <li><strong>⭐ Avancé :</strong> Lavages, éclaircissements basiques, détails principaux, dégradés, lining, weathering 🌟.</li>
                <li><strong>👑 Prestige :</strong> Détails fins, travail des textures, NMM, freehand, gemmes, yeux réalistes, OSL 🖌️.</li>
                <li><strong>🎨 Studio :</strong> Niveau concours, devis sur mesure 🏆.</li>
            </ul>
            <p><strong><em>Essentiel indisponible.</em></strong></p>
        </div>

        <div class="card">
            <h3>Soclage (inclus dans le service) 🌿</h3>
            <p>Des socles qui subliment vos figurines :</p>
            <ul>
                <li><strong>💸 Essentiel :</strong> Texture simple.</li>
                <li><strong>⭐ Avancé :</strong> Texture simple, ombrage, éclaircissement, herbe.</li>
                <li><strong>👑 Prestige :</strong> Plus de nuances et éclaircissements, éléments 3D 🌳.</li>
                <li><strong>🎨 Studio :</strong> Socle bois d'exposition, devis sur mesure 🪵.</li>
            </ul>
        </div>

    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Service Sur Mesure 🤝</h2>
    <p>Livraison sous 4 mois selon complexité pour projets petits et moyens :</p>
    <p>Livraison sous 6–8 mois selon complexité et volume pour projets grands :</p>
    <ul>
        <li>Préparation minutieuse 🔍</li>
        <li>Matériaux premium ⭐</li>
        <li>Techniques avancées 🎨</li>
        <li>Personnalisation totale 💡</li>
    </ul>
    <div>
        <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Résumé du Service 📊</h2>
    <div class="table-container center">
        <table class="tableborder1">
            <thead>
                <tr>
                    <th>🎨 Caractéristiques</th>
                    <th>💸 Essentiel</th>
                    <th>⭐ Avancé</th>
                    <th>👑 Prestige</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Qualité</td>
                    <td>Meilleur budget</td>
                    <td>Finitions propres et constantes</td>
                    <td>Plus de détails, contraste plus fort</td>
                </tr>
                <tr>
                    <td>Détails</td>
                    <td>Simple et efficace</td>
                    <td>Valorisation propre et efficace</td>
                    <td>Travail plus affiné sur zones clés</td>
                </tr>
                <tr>
                    <td>Couleurs</td>
                    <td>Couleurs base</td>
                    <td>Harmonie des couleurs, dégradés et contraste</td>
                    <td>Dégradés plus lisses et nuances plus fines</td>
                </tr>
                <tr>
                    <td>Socles</td>
                    <td>Texture simple</td>
                    <td>Inclus, valorise la figurine</td>
                    <td>Socle plus scénique</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>Services Détaillés 📊</h2>

    <h3>Préparation</h3>
    <!-- Tables conservées, intitulés traduits -->
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🧟‍♂️ Différence Essentiel / Avancé – Exemple : Ghoul</h2>
    <div class="center">
        <img src="img/comparatif-ghoul.jpg" alt="Comparaison Ghoul Essentiel et Avancé" class="responsive-img">
    </div>
    <p class="caption">
        Gauche : <strong>Essentiel</strong>.  
        Droite : <strong>Avancé</strong>.
    </p>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>👾 Différence Essentiel / Avancé – Exemple : Tiránido</h2>
    <div class="center">
        <img src="img/comparatif-tyty.jpg" alt="Comparaison Tiránido Essentiel et Avancé" class="responsive-img">
    </div>
    <p class="caption">
        Gauche : <strong>Essentiel</strong>.  
        Droite : <strong>Avancé</strong>.
    </p>
</div>

<div class="card" role="region" aria-expanded="true" tabindex="0">
    <h2>🛡️ Différence Essentiel, Avancé et Prestige – Exemple : Space Marine</h2>
    <div class="center">
              <div class="card-container3">
        <div class="card"><img src="img/exempleniveau0.jpg" class="responsive-img"></div>
        <div class="card"><img src="img/exempleniveau1.jpg" class="responsive-img"></div>
         <div class="card"><img src="img/exempleniveau2.jpg" class="responsive-img"></div>
    </div>
    </div>
    <p class="caption">
        Gauche : <strong>Essentiel</strong>.  
        Centre : <strong>Avancé</strong>.  
        Droite : <strong>Prestige</strong>.
    </p>
</div>

<div class="banniere">
    <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
</div>
`;
    }
}

/*****************************************
 * Chargement dynamique des pages
 *****************************************/
function loadPage(page) {
    const contenuPrincipal = document.getElementById('contenu-principal');
    if (!contenuPrincipal) return;

    fetch(page)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const newContent = doc.getElementById('contenu-principal').innerHTML;
            contenuPrincipal.innerHTML = newContent;

            // Réinitialiser les scripts et événements après chargement
            initializeCardToggle();
            changelangueindex(); // Appel pour index si nécessaire
            changelanguepeinturecommission(); // Appel pour peinturecommission si nécessaire
            changelanguesimulateur(); // Appel pour simulateur si nécessaire
            changelanguecondition(); // Appel pour conditions si nécessaire
            changelanguefigconcours(); // Appel pour figconcours si nécessaire
            changelanguepiecepop(); // Appel pour piecepop si nécessaire
            initializeGalerie(); // Appel pour galerie si nécessaire
            initializeFormCalculations(); // Appel pour formulaires si nécessaire
            initializeFormationForm(); // Appel pour formation si nécessaire
        })
        .catch(error => console.error('Erreur de chargement de page:', error));
}

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
