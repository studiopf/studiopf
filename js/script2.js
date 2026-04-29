

// ────────────────────────────────────────────────
// Utilitaires de base
// ────────────────────────────────────────────────


   
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
            <div class="center">
    <div class="maintenance-box">
        <p>Studio PF is currently temporarily closed in order to reorganize and improve the quality of its miniature painting services.</p>

        <p>Following an unexpected interruption that caused significant delays, I have chosen to restart on stronger foundations, with a new approach focused on quality rather than quantity.</p>

        <p>From now on, Studio PF is dedicated exclusively to high-end work: each miniature receives extended attention (minimum 2 hours for basic infantry, and 5 to 8 hours for characters and skirmish miniatures).</p>

        <p class="highlight">→ Reopening in January 2027 ←</p>

        <p>Bookings are already open: feel free to contact me for your miniature painting projects and to plan your future orders.</p>

        <a href="mailto:studiopeinturefigurine@gmail.com">→ Contact Studio PF for your projects ←</a>

        <p>
            <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
                Request a quote ➜
            </a>
        </p>
    </div>
</div>
            <div class="center">
                <div class="maintenance-box">
                    <h2>🎨 Transform your miniatures into true works of art</h2>
                    <p>High-end painting for enthusiasts, collectors and demanding players.</p>
                    <p>Your miniatures deserve better than a simple brush stroke!</p>
                    <p>At <strong>Studio PF</strong>, each project becomes a unique collectible piece.</p>
                </div>
            </div>
              <div class="maintenance-box">
  <h2>👋 Who’s behind the brush?</h2>
  <p>I’m <strong>Pierre-François, aka PF, <span id="pf-age">39</span> years old.</strong><br>
  A passionate painter and founder of Studio PF.<br><br>

  I’ve been involved in miniature painting since 2020 — it all started a bit by chance.<br>
  Covid turned this hobby into a true artistic journey.<br>

  Today, I work with acrylics, pigments, and oils, developing a style that brings miniatures to life.<br><br>

  My goal: to make your miniatures feel alive, as if they were coming to life.</p>

  <blockquote>“Every miniature tells a story. My role is to make it shine.” ✨</blockquote>

  <p>
    <a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent?fbclid=IwY2xjawMbHHBleHRuA2FlbQIxMQABHoFDkkpV73nHQUSLHKutNLsp1MnG2TNeNmBnK03a1bg6IpNTrylAa7rVqE8g_aem_5llSLaiTM9lgeOSTPMrLQQ" class="button" target="_blank">
      Learn more about my journey ➜
    </a>
  </p>
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
         <div class="center">
    <div class="maintenance-box">
        <p>Studio PF se encuentra actualmente cerrado temporalmente con el fin de reorganizarse y mejorar la calidad de sus servicios de pintura de miniaturas.</p>

        <p>Tras una interrupción imprevista que generó retrasos importantes, he decidido retomar la actividad sobre bases más sólidas, con un nuevo enfoque centrado en la calidad en lugar de la cantidad.</p>

        <p>A partir de ahora, Studio PF se dedica exclusivamente a trabajos de alto nivel: cada miniatura recibe un tiempo de trabajo más dedicado (mínimo 2 horas para infantería básica, y de 5 a 8 horas para personajes y miniaturas de escaramuzas).</p>

        <p class="highlight">→ Reapertura prevista en enero de 2027 ←</p>

        <p>Las reservas ya están abiertas: puedes contactarme para tus proyectos de pintura de miniaturas y planificar tus futuros pedidos.</p>

        <a href="mailto:studiopeinturefigurine@gmail.com">→ Contacta con Studio PF para tus proyectos ←</a>

        <p>
            <a href="simulateur_devis.html" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
                Solicitar un presupuesto ➜
            </a>
        </p>
    </div>
</div>
            <div class="center">
                <div class="maintenance-box">
                    <h2>🎨 Transforma tus miniaturas en verdaderas obras de arte</h2>
                    <p>Pintura de alta gama para entusiastas, coleccionistas y jugadores exigentes.</p>
                    <p>¡Tus miniaturas merecen más que un simple pincelada!</p>
                    <p>En <strong>Studio PF</strong>, cada proyecto se convierte en una pieza única de colección.</p>
                </div>
            </div>
               <div class="maintenance-box">
  <h2>👋 ¿Quién está detrás de los pinceles?</h2>
  <p>Soy <strong>Pierre-François, alias PF, <span id="pf-age">39</span> años.</strong><br>
  Pintor apasionado y fundador de Studio PF.<br><br>

  Formo parte del mundo de las miniaturas desde 2020 — todo comenzó un poco por casualidad.<br>
  El Covid transformó este hobby en una verdadera búsqueda artística.<br>

  Hoy trabajo con acrílicos, pigmentos y óleos, desarrollando un estilo que da vida a las miniaturas.<br><br>

  Mi objetivo: hacer que tus miniaturas cobren vida.</p>

  <blockquote>“Cada miniatura cuenta una historia. Mi papel es hacerla brillar.” ✨</blockquote>

  <p>
    <a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent?fbclid=IwY2xjawMbHHBleHRuA2FlbQIxMQABHoFDkkpV73nHQUSLHKutNLsp1MnG2TNeNmBnK03a1bg6IpNTrylAa7rVqE8g_aem_5llSLaiTM9lgeOSTPMrLQQ" class="button" target="_blank">
      Saber más sobre mi trayectoria ➜
    </a>
  </p>
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
    <div class="center">
            <div class="maintenance-box">
        <p>Le Studio PF est actuellement temporairement fermé afin de repenser son organisation et d'améliorer la qualité des prestations en peinture sur figurine.</p>

<p>Suite à une interruption imprévue ayant entraîné du retard, j’ai fait le choix de repartir sur des bases plus solides, avec une nouvelle approche centrée sur la qualité plutôt que la quantité.</p>

<p>Désormais, le Studio PF se consacre exclusivement à des réalisations de niveau supérieur : chaque figurine bénéficie d’un temps de travail approfondi (minimum 2h pour l’infanterie, et 5 à 8h pour les personnages et figurines d’escarmouche).</p>

<p class="highlight">→ Réouverture prévue en janvier 2027 ←</p>

<p>Les réservations sont d’ores et déjà ouvertes : vous pouvez me contacter pour vos projets de peinture figurine et planifier vos futures commandes.</p>

 <a href="mailto:studiopeinturefigurine@gmail.com">→ Contactez le Studio PF pour vos projets ←</a>
                   <p><a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis ➜</a> </p>
                
                        </div>
    </div>
            <div class="center">
                <div class="maintenance-box">
                    <h2>🎨 Transformez vos figurines en véritables œuvres d’art</h2>
                    <p>Peinture haut de gamme pour passionnés, collectionneurs et joueurs exigeants.</p>
                    <p>Vos figurines méritent mieux qu’un simple coup de pinceau !</p>
                    <p>Chez <strong>Studio PF</strong>, chaque projet devient une pièce unique de collection.</p>
                </div>
            </div>
             <div class="card" role="region" aria-expanded="true" tabindex="0">
  <h2>👋 Qui se cache derrière les pinceaux ?</h2>
  <p>Je suis  <strong>Pierre-François, alias PF, <span id="pf-age">39</span> ans. </strong><br>
            peintre passionné et fondateur de Studio PF.  <br><br>
Dans le milieu de la figurine depuis 2020, le hobby à commencer un peu par hasard.<br>Le Covid à transformé la passion en véritable quête artistique.<br> 
      Aujourd’hui, je manie acrylique, pigments et huiles, avec un style qui fait vibrer les figurines.<br>
              


  Mon objectif : faire vibrer vos figurines comme si elles prenaient vie.</p>
  <blockquote>“Chaque figurine raconte une histoire. Mon rôle, c’est de la faire briller.” ✨</blockquote>
  <p>  <a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent?fbclid=IwY2xjawMbHHBleHRuA2FlbQIxMQABHoFDkkpV73nHQUSLHKutNLsp1MnG2TNeNmBnK03a1bg6IpNTrylAa7rVqE8g_aem_5llSLaiTM9lgeOSTPMrLQQ" class="button" target="_blank">En savoir plus sur mon parcours ➜</a></p>
</div>
        `;
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
        html = `<h1>High-End Miniature Painting 🎨</h1>

<div class="maintenance-box">
    <h2>🎨 Premium Offers</h2>

    <ul>
        <li>
            <strong>⭐ Premium:</strong><br>
            Clean, high-contrast and immersive finish.<br>
            Ideal for high-end armies and display pieces.<br>
            <em>⏱️ Around 2h+ per miniature</em>
        </li>

        <li>
            <strong>👑 Fantasia:</strong><br>
            Advanced display-level quality, refined details, complex effects.<br>
            Designed for characters, heroes and centerpiece models.<br>
            <em>⏱️ 5 to 8h per miniature</em>
        </li>
    </ul>

    <p><strong>⚠️ Intentionally limited production to guarantee quality.</strong></p>

   
</div>
<div class="maintenance-box">
<h3>Preparation (included) 🛠️</h3>
<ul>
    <li>Full cleaning of parts</li>
    <li>Mold line removal</li>
    <li>Clean and optimized assembly</li>
    <li>Preparation adapted to the level of finish</li>
</ul>
<p><em>Each miniature is prepared for optimal results.</em></p>
</div>
<div class="maintenance-box">
<h3>Painting 🎨</h3>
<ul>
    <li><strong>⭐ Premium:</strong> clean blends, strong contrasts, essential details, consistent finish</li>
    <li><strong>👑 Fantasia:</strong> advanced blending, textures, OSL, NMM, freehand, highly detailed work</li>
</ul>

<p><strong>🎯 Goal: a realistic, readable and impactful result both from a distance and up close.</strong></p>
</div>
<div class="maintenance-box">
<h3>Basing 🌿</h3>
<ul>
    <li><strong>Premium:</strong> detailed base consistent with the army</li>
    <li><strong>Fantasia:</strong> scenic base with 3D elements and visual storytelling</li>
</ul>
</div>
<div class="maintenance-box">
<h2>Premium Service 🤝</h2>

<p>
Personalized support for every project.
</p>

<ul>
    <li>🎯 Artistic guidance and visual direction</li>
    <li>🎨 Fully hand-painted</li>
    <li>⭐ High-end materials and techniques</li>
    <li>📦 Limited production to ensure top-tier quality</li>
</ul>

<p><strong>⏳ Lead time: 4 to 8 months depending on project and volume</strong></p>
       </div>
            <div class="maintenance-box">
<table class="tableborder1">
<thead>
<tr>
    <th>🎨 Features</th>
    <th>⭐ Premium</th>
    <th>👑 Fantasia</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Work time</td>
    <td>2h+</td>
    <td>5 to 8h</td>
</tr>
<tr>
    <td>Finish</td>
    <td>Clean and contrasted</td>
    <td>Very high level of detail</td>
</tr>
<tr>
    <td>Details</td>
    <td>Clean and readable</td>
    <td>Highly refined and realistic</td>
</tr>
<tr>
    <td>Base</td>
    <td>Detailed</td>
    <td>Scenic / display</td>
</tr>
</tbody>
</table>
   </div>
          <div class="banniere">
         
            <a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
           
        </div> 
`;
    } else if (currentLanguage === "spanish") {
        html = `<h1>Pintura de Miniaturas de Alta Gama 🎨</h1>

<div class="maintenance-box">

    <h2>🎨 Ofertas Premium</h2>

    <ul>
        <li>
            <strong>⭐ Premium:</strong><br>
            Acabado limpio, contrastado e inmersivo.<br>
            Ideal para ejércitos de alta gama y piezas de exposición.<br>
            <em>⏱️ Aproximadamente 2h+ por miniatura</em>
        </li>

        <li>
            <strong>👑 Fantasia:</strong><br>
            Nivel avanzado de vitrina, detalles muy elaborados, efectos complejos.<br>
            Diseñado para personajes, héroes y piezas principales.<br>
            <em>⏱️ 5 a 8h por miniatura</em>
        </li>
    </ul>

    <p><strong>⚠️ Producción voluntariamente limitada para garantizar la calidad.</strong></p>

   

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
<h3>Pintura 🎨</h3>
<ul>
    <li><strong>⭐ Premium:</strong> degradados limpios, contrastes marcados, detalles esenciales, acabado homogéneo</li>
    <li><strong>👑 Fantasia:</strong> degradados avanzados, texturas, OSL, NMM, freehand, detalles muy elaborados</li>
</ul>

<p><strong>🎯 Objetivo: un resultado realista, legible e impactante tanto a distancia como de cerca.</strong></p>
</div>
<div class="maintenance-box">
<h3>Peana 🌿</h3>
<ul>
    <li><strong>Premium:</strong> peana trabajada y coherente con el ejército</li>
    <li><strong>Fantasia:</strong> peana escénica con elementos 3D y narrativa visual</li>
</ul>
</div>
<div class="maintenance-box">
<h2>Servicio Premium 🤝</h2>

<p>
Acompañamiento personalizado para cada proyecto.
</p>

<ul>
    <li>🎯 Asesoramiento artístico y dirección visual</li>
    <li>🎨 Pintura completamente realizada a mano</li>
    <li>⭐ Materiales y técnicas de alta gama</li>
    <li>📦 Producción limitada para garantizar un alto nivel de calidad</li>
</ul>

<p><strong>⏳ Plazos: 4 a 8 meses según el proyecto y el volumen</strong></p>
       </div>
            <div class="maintenance-box">
<table class="tableborder1">
<thead>
<tr>
    <th>🎨 Características</th>
    <th>⭐ Premium</th>
    <th>👑 Fantasia</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Tiempo de trabajo</td>
    <td>2h+</td>
    <td>5 a 8h</td>
</tr>
<tr>
    <td>Acabado</td>
    <td>Limpio y contrastado</td>
    <td>Muy alto nivel de detalle</td>
</tr>
<tr>
    <td>Detalles</td>
    <td>Limpios y legibles</td>
    <td>Muy elaborados y realistas</td>
</tr>
<tr>
    <td>Peana</td>
    <td>Trabajada</td>
    <td>Escénica / de vitrina</td>
</tr>
</tbody>
</table>
   </div>
          <div class="banniere">
         
            <a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
           
        </div> 

`;
    } else {
        html = `<h1>Peinture de Figurines Haut de Gamme 🎨</h1>

<div class="maintenance-box">
    <h2>🎨 Offres Premium</h2>

    <ul>
        <li>
            <strong>⭐ Premium :</strong><br>
            Finition nette, contrastée et immersive.<br>
            Idéal pour armées haut de gamme et vitrines.<br>
            <em>⏱️ Environ 2h+ par figurine</em>
        </li>

        <li>
            <strong>👑 Fantasia :</strong><br>
            Niveau vitrine avancé, détails poussés, effets complexes.<br>
            Pensé pour personnages, héros et pièces fortes.<br>
            <em>⏱️ 5 à 8h par figurine</em>
        </li>
    </ul>

    <p><strong>⚠️ Production volontairement limitée pour garantir la qualité.</strong></p>

  

</div>
<div class="maintenance-box">
       <h3>Préparation (incluse) 🛠️</h3>
<ul>
    <li>Nettoyage complet des pièces</li>
    <li>Suppression des lignes de moulage</li>
    <li>Assemblage propre et optimisé</li>
    <li>Préparation adaptée au niveau de finition</li>
</ul>
<p><em>Chaque figurine est préparée pour un rendu optimal.</em></p>
</div>
<div class="maintenance-box">
       <h3>Peinture 🎨</h3>
<ul>
    <li><strong>⭐ Premium :</strong> dégradés propres, contrastes marqués, détails essentiels, rendu homogène</li>
    <li><strong>👑 Fantasia :</strong> dégradés avancés, textures, OSL, NMM, freehand, détails poussés</li>
</ul>

<p><strong>🎯 Objectif : un rendu réaliste, lisible et impactant à distance comme de près.</strong></p>
     </div>
<div class="maintenance-box">
<h3>Soclage 🌿</h3>
<ul>
    <li><strong>Premium :</strong> socle travaillé et cohérent avec l’armée</li>
    <li><strong>Fantasia :</strong> socle scénique avec éléments 3D et narration visuelle</li>
</ul>
    </div>
<div class="maintenance-box">
<h2>Service Premium 🤝</h2>

<p>
Un accompagnement personnalisé pour chaque projet.
</p>

<ul>
    <li>🎯 Conseils artistiques et direction visuelle</li>
    <li>🎨 Peinture entièrement réalisée à la main</li>
    <li>⭐ Matériaux et techniques haut de gamme</li>
    <li>📦 Production limitée pour garantir un haut niveau de qualité</li>
</ul>

<p><strong>⏳ Délais : 4 à 8 mois selon projet et volume</strong></p>
       </div>
            <div class="maintenance-box">
       <table class="tableborder1">
<thead>
<tr>
    <th>🎨 Caractéristiques</th>
    <th>⭐ Premium</th>
    <th>👑 Fantasia</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Temps de travail</td>
    <td>2h+</td>
    <td>5 à 8h</td>
</tr>
<tr>
    <td>Finition</td>
    <td>Nette et contrastée</td>
    <td>Très haut niveau de détail</td>
</tr>
<tr>
    <td>Détails</td>
    <td>Propres et lisibles</td>
    <td>Très poussés et réalistes</td>
</tr>
<tr>
    <td>Socle</td>
    <td>Travaillé</td>
    <td>Scénique / vitrine</td>
</tr>
</tbody>
</table>
   </div>
          <div class="banniere">
         
            <a href="simulateur_devis.html" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
           
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
        html = `<ul class="menu">
            <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">Paint 🎨</a></li>
            <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Gallery 🖼️</a></li>
        </ul>`;
    } else if (currentLanguage === "spanish") {
        html = `<ul class="menu">
                <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">Pintura 🎨</a></li>
            <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Galería 🖼️</a></li>
        </ul>`;
    } else {
        html = `<ul class="menu">
             <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">Peinture 🎨</a></li>
            <li><a href="formation.html" onclick="loadPage('formation.html');return false;">Formation 📚</a></li>
            <li><a href="galerie.html" onclick="loadPage('galerie.html');return false;">Galerie 🖼️</a></li>
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
            <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">General Terms and Conditions 📜</a></li>
            <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); return false;">Legal Notice 💼</a></li>
            <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Opening Hours & Closures 🕖</a></li>
    
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
            <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">Condiciones Generales de Venta 📜</a></li>
            <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html');return false;">Aviso Legal 💼</a></li>
            <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Horarios de Apertura y Cierres 🕖</a></li>
 
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
    niveau1: "Niveau Premium - TableTop+, Qualité supérieur qui va à l'Approfondi : 🔍 Parfait pour valoriser les figurines de jeu. Notre recommendation.",
    niveau2: "Niveau Fantasia - TableTop++, Qualité supérieur plus Prestige : 🎨 Chaque pièce devient une œuvre d’art. Pour les pièces principales.",
    expo:   "Niveau Studio : ✨ Limitée et réservée aux passionnés souhaitant le meilleur. Pour la collection en vitrine."
};

const niveauLabelsmini = {
    niveau1: "Premium",
    niveau2: "Fantasia",
    expo:    "Pièce d'exposition"
};
const = tarifheure = 20;
const tariffs = {
   petiteinfanterie: { niveau1: 1,  niveau2: 2  },
    infanterie:            { niveau1: 2,  niveau2: 3  },
    infanterieelite:       { niveau1: 3, niveau2: 4  },
    personnage:            {   niveau1: 5,  niveau2: 8  },
   personnageelite:      {   niveau1: 6,  niveau2: 9  },
    personnagemonstrueux:  {  niveau1: 8, niveau2: 12 },
    personnagesurmonstre:  {  niveau1: 12, niveau2: 18 },
    personnagesurgrandmonstre: {  niveau1: 16, niveau2: 24 },
    cavalerie:             {  niveau1: 3,  niveau2: 4  },
    cavalerielourde:       {   niveau1: 4,  niveau2: 5  },
    petitvehiculemonstre:  {   niveau1: 4,  niveau2: 6 },
    vehiculemonstremoyen:  {   niveau1: 6, niveau2: 9 },
    grosvehiculemonstre:   { niveau1: 8, niveau2: 16 },
    enormevehiculemonstre: {  niveau1: 12, niveau2: 18 },
    titanvehiculemonstre:  { niveau1: 16, niveau2: 34 }
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
        const unitPrice = tariffs[cat]?.[niveau]*tarifheure ?? 0;
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
        totalPrev += qty * (tariffs[cat]?.[prevLevel]*tarifheure ?? 0);
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

<div class="maintenance-box">
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
    Pierre-François Frasse<br>
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
    Pierre-François Frasse<br>
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
    <p>These terms and conditions apply to all painting services, training sessions, and related services offered by Studio PF (Pierre-François Frasse, sole trader, SIRET 832 040 380 00020).</p>
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
    <p>Prices are expressed in euros (€), based on individual quotes or the simulator. Payment can be made via PayPal, bank transfer, or cash (in person). The balance must be paid before shipping unless otherwise agreed.</p>
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
        <li>🚚 Shipping via Colissimo with Fantasia required from €150 value (insurance up to €5000).</li>
        <li>📌 Mondial Relay available but with very limited insurance in case of damage or loss/theft (max €500).</li>
        <li>🎁 Free shipping on orders over €3000.</li>
        <li>By default, Colissimo with Fantasia and insurance is recommended, although uninsured shipping and/or Mondial Relay remain possible.</li>
    </ul>

    <ul>
        <li>📦 Colissimo with Fantasia for shipments valued between €150 and €5000 (assembly + painting + miniature value).</li>
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
        <li>🔧 <strong>Small projects – Premium level (warband, combat patrol, spearhead)</strong>: 2 business months</li>
        <li>🔧 <strong>Small projects – Fantasia level (warband, combat patrol, spearhead)</strong>: 4 business months</li>
        <li>⚙️ <strong>Medium to complex projects – Premium & Fantasia (700–1000 pts)</strong>: 4 to 6 business months</li>
        <li>🏗️ <strong>Large projects – Premium & Fantasia (1500–2000 pts)</strong>: 6 months to 1 year (business time)</li>
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
    <p>Estas condiciones generales de venta se aplican a todos los servicios de pintura, formaciones y servicios asociados ofrecidos por Studio PF (Pierre-François Frasse, autónomo, SIRET 832 040 380 00020).</p>
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
        <li>🔧 <strong>Proyectos pequeños – Nivel Premium (banda, combat patrol, spearhead)</strong>: 2 meses laborables</li>
        <li>🔧 <strong>Proyectos pequeños – Nivel Fantasia (banda, combat patrol, spearhead)</strong>: 4 meses laborables</li>
        <li>⚙️ <strong>Proyectos medios a complejos – Nivel Premium y Fantasia (700–1000 pts)</strong>: 4 a 6 meses laborables</li>
        <li>🏗️ <strong>Proyectos grandes – Nivel Premium y Fantasia (1500–2000 pts)</strong>: de 6 meses a 1 año laborable</li>
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
                <p>Ces conditions générales de vente s'appliquent à l'ensemble des prestations de peinture, formations et services associés proposés par Studio PF (Pierre-François Frasse, micro-entrepreneur, SIRET 832 040 380 00020).</p>
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
           
            <li>🚚 Expédition via Colissimo avec Fantasia à partir de 150€ de valeur (et assurance allant jusqu'à 5000€ de valeur).</li>
              <li>📌 Mondial Relay possible mais assurance très limité en cas de problèmes comme casse ou perte/vol (max 500€).</li>
            <li>🎁 Frais de port offerts à partir de 3000 € de commande.</li>
           <li>Par défaut, je conseille le service Colissimo avec Fantasia et option d'assurance même s'il est possible de ne pas garantir l'envoi et/ou d'expédier via Mondial Relay.</li>
        </ul>
         <ul>
            <li>📦 Colissimo avec Fantasia pour les envois de plus de 150 à 5000 € de valeur (valeur presation montage + peinture + valeur des figurines).</li>
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
      <li>🔧 <strong>Petits projets – Niveau Premium (bande, combat patrol, spearhead) </strong> : 2 mois ouvrés</li>
    <li>🔧 <strong>Petits projets – Niveau Fantasia (bande, combat patrol, spearhead)</strong> : 4 mois ouvrés</li>
    <li>⚙️ <strong>Projets moyens à complexes – Niveau Premium et Fantasia  (700-1000pts)</strong> : 4 à 6 mois ouvrés</li>
    <li>🏗️ <strong>Très gros projets – Niveau Premium et Fantasia (1500-2000pts)</strong> : 6 mois à 1 an ouvrés</li>
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
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
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
    <a href="index.html" onclick="loadPage('index.html'); return false;" class="logo-a" aria-label="Retour à l'accueil">

    
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


