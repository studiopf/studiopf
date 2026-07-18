
// Add near the top (after global variables)
const virtualPages = [
    "simulateur_devis",
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

            // Remplacement direct du contenu (évite une opération DOM inutile).
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
changelangueinfo();
    
    initializeLightboxGlobal();
     initThemeToggle();
    updateDebugDisplay();
    mettreAJourTarifLangue();

    changelanguemenu();
    changelanguefoot();
    changelanguelogo();

    changelanguepartenaires();
   
    updateAgeDisplay();


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
    }
            if (currentPage.includes("quisuisje") && typeof changelanguequisuisje === "function") {
  changelanguequisuisje();
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
            if (currentPage.includes("pourquoi") && typeof changelanguepourquoi === "function") {
        changelanguepourquoi();

    }
           if (currentPage.includes("index") && typeof changelangueindex === "function") {
        changelangueindex();
    }
    if (currentPage.includes("horaires") && typeof changelanguehoraires === "function") {
        changelanguehoraires();
    }

}

function changelanguepourquoi() {
    const main = document.getElementById("contenu-principal");
    if (!main) return;

    let html = "";

    if (currentLanguage === "english") {
         html = ` <div class="center">
<div class="maintenance-box ajust fonddemon">
 <h1>❓FAQ</h1>
<h2>🪄 Why choose Studio PF?</h2>
<ul>
<li>🎨 <strong>A 100% custom project</strong>: each miniature is painted according to your wishes, your universe, your budget, and the desired level of finish.</li>
<li>🔧 <strong>Professional preparation</strong>: cleaning, assembly, priming, corrections, and meticulous preparation to ensure a durable result.</li>
<li>🧪 <strong>Immersive bases and advanced effects</strong>: textures, pigments, vegetation, 3D accessories, and many painting techniques to bring your army or collectible piece to life.</li>
<li>📸 <strong>Transparent follow-up</strong>: you are informed at every important step and validate the final photos before shipping.</li>
<li>📦 <strong>A turnkey service</strong>: your miniatures can be ordered from my partners, delivered directly to Studio PF, painted, and then shipped to you, ready to play or display.</li>
<li>🛡️ <strong>Careful packaging and secure shipping</strong>: each order is protected with the utmost care to arrive in perfect condition.</li>
</ul>
<p>
From the first contact to delivery, I do everything possible to make your project a simple, transparent experience that meets your expectations.
</p>
</div>
</div>

<div class="center">
<div class="maintenance-box ajust fondknigt">
    <h2>⚙️ How does it work?</h2>
    <ol>
        <li>💬 Contact me to discuss your project and get a personalized quote.</li>
        <li>🎲 Do you already own your miniatures? Send them directly to <strong>Studio PF</strong>. Don't have your army yet? Order it from my partners <a href="https://maxireves.fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Maxi Rêves</strong></a> or <a href="https://www.totalwargame.com/fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Total Wargame</strong></a> (new and second-hand miniatures) and have it delivered directly to the workshop.</li>
        <li>🎨 I take care of the entire project: preparation, assembly, painting, basing, and finishing according to the chosen quality level.</li>
        <li>📸 Once the painting is complete, I send you high-definition photos for validation before shipping or in-person handover.</li>
        <li>📦 After your approval, your order is carefully packed and shipped securely.</li>
    </ol>
    <p>
        This organization saves you time: your miniatures can be ordered, delivered, painted, and shipped back to you without any handling on your part.
    </p>

        <a href="simulateur_devis.html"
           class="button"
           onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
            💬 Request a quote
        </a>

</div>
</div>

<div class="center">
<div class="maintenance-box ajust fondfreezer">
<h2>❓ Frequently Asked Questions</h2>
<h3>💰 How much does it cost to paint a miniature?</h3>
<p>
The price depends on several factors: the size of the miniature, its level of detail, the desired painting level, possible assembly, and chosen options. You can get a quick estimate using the quote simulator or contact me for a free personalized quote.
</p>
<hr>
<h3>⏳ What are the production times?</h3>
<p>
Lead times vary depending on the size of the project and the time of year. On average, expect between 2 and 12 months depending on the complexity of the order. An estimated deadline is always provided when the quote is validated.
</p>
<hr>
<h3>📦 Do I have to send you my miniatures?</h3>
<p>
Yes, if you already own your miniatures, you can ship them directly to the workshop. If you don't have them yet, they can be ordered from my partners and delivered directly to Studio PF so I can handle the entire project.
</p>
<hr>
<h3>🖌️ Can I choose the colors for my army?</h3>
<p>
Of course. Every project is fully customized. You can provide a color scheme, illustrations, photos, or simply explain your vision. I can also advise you if you're unsure.
</p>
<hr>
<h3>📸 Will I see the miniatures before shipping?</h3>
<p>
Yes. Before any shipment, high-definition photos are sent to you so you can validate the final result.
</p>
<hr>
<h3>🎲 Do you only paint Warhammer?</h3>
<p>
No. I also paint miniatures for board games, role-playing games, historical miniatures, busts, collectibles, 3D prints, and many other ranges.
</p>
<hr>
<h3>🚚 Do you ship outside France?</h3>
<p>
Yes. Orders can be shipped to France, Belgium, and many other countries. Shipping costs are calculated based on the destination.
</p>
<hr>
<h3>💳 How does payment work?</h3>
<p>
To reserve your painting slot, a deposit is required when validating the quote. The balance is paid only after validation of the final photos, before shipping your order.
</p>
<hr>
<h3>📅 Can I cancel my order?</h3>
<p>
An order can be cancelled before it starts according to the conditions set out in the Terms and Conditions. Deposits already paid correspond to the reservation of the work slot and are non-refundable.
</p>
<hr>
<h3>🎁 Do you make personalized gifts?</h3>
<p>
Yes. A hand-painted miniature makes a unique gift for a collector, player, or painting enthusiast. Feel free to detail your project when requesting a quote.
</p>
<hr>
<h3>🧲 Do you offer assembly and magnetization?</h3>
<p>
Yes. Assembly is one of the services offered. Magnetization is also possible upon request to facilitate transport or equipment changes.
</p>
<hr>
<h3>🧑‍🎨 Do you offer painting classes?</h3>
<p>
Yes. Individual classes are available for all levels, from beginner to experienced painter. Sessions can focus on brushwork, airbrushing, or specific techniques according to your goals.
</p>
<hr>
<h3>🖨️ Do you also offer 3D printing?</h3>
<p>
Yes. Studio PF also performs resin 3D printing from STL files provided by clients. The rights to use the files remain the responsibility of the client.
</p>
<hr>
<h3>🏆 What is the difference between TableTop painting and collection painting?</h3>
<p>
TableTop painting is designed for gaming with an excellent look at tabletop distance. Collection or competition painting has a much higher level of finish, with more details, advanced techniques, and hours of work.
</p>
</div>
</div>`;
    } else if (currentLanguage === "spanish") {
         html = ` <div class="center">
<div class="maintenance-box ajust fonddemon">
 <h1>❓FAQ</h1>
<h2>🪄 ¿Por qué elegir Studio PF?</h2>
<ul>
<li>🎨 <strong>Un proyecto 100 % personalizado</strong>: cada figura es pintada según tus deseos, tu universo, tu presupuesto y el nivel de acabado deseado.</li>
<li>🔧 <strong>Una preparación profesional</strong>: desbarbado, montaje, imprimación, correcciones y preparación minuciosa para garantizar un resultado duradero.</li>
<li>🧪 <strong>Socles inmersivos y efectos avanzados</strong>: texturas, pigmentos, vegetación, accesorios 3D y numerosas técnicas de pintura para dar vida a tu ejército o a tu pieza de colección.</li>
<li>📸 <strong>Un seguimiento transparente</strong>: se te informa en cada etapa importante y validas las fotos finales antes de cualquier envío.</li>
<li>📦 <strong>Un servicio llave en mano</strong>: tus figuras pueden ser encargadas en mis socios, entregadas directamente al Studio PF, pintadas y luego enviadas a tu casa, listas para jugar o exponer.</li>
<li>🛡️ <strong>Un embalaje cuidadoso y un envío seguro</strong>: cada pedido está protegido con el mayor cuidado para llegar en perfecto estado.</li>
</ul>
<p>
Desde el primer contacto hasta la entrega, pongo todo mi esfuerzo para que tu proyecto sea una experiencia sencilla, transparente y a la altura de tus expectativas.
</p>
</div>
</div>

<div class="center">
<div class="maintenance-box ajust fondknigt">
    <h2>⚙️ ¿Cómo funciona?</h2>
    <ol>
        <li>💬 Contáctame para hablar de tu proyecto y obtener un presupuesto personalizado.</li>
        <li>🎲 ¿Ya tienes tus figuras? Envíalas directamente al <strong>Studio PF</strong>. ¿Aún no tienes tu ejército? Encuéntralo en mis socios <a href="https://maxireves.fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Maxi Rêves</strong></a> o <a href="https://www.totalwargame.com/fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Total Wargame</strong></a> (figuras nuevas y de segunda mano) y haz que lo envíen directamente al taller.</li>
        <li>🎨 Me encargo de todo el proyecto: preparación, montaje, pintura, bases y acabados según el nivel de calidad elegido.</li>
        <li>📸 Una vez terminada la pintura, te envío fotos en alta definición para su validación antes del envío o entrega en mano.</li>
        <li>📦 Tras tu validación, tu pedido es cuidadosamente embalado y enviado de forma segura.</li>
    </ol>
    <p>
        Esta organización te permite ahorrar tiempo: tus figuras pueden ser encargadas, entregadas, pintadas y reenviadas, sin que tengas que manipular nada.
    </p>

        <a href="simulateur_devis.html"
           class="button"
           onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
            💬 Solicitar presupuesto
        </a>

</div>
</div>

<div class="center">
<div class="maintenance-box ajust fondfreezer">
<h2>❓ Preguntas frecuentes</h2>
<h3>💰 ¿Cuánto cuesta pintar una figura?</h3>
<p>
El precio depende de varios criterios: el tamaño de la figura, su nivel de detalle, el nivel de pintura deseado, el montaje eventual y las opciones elegidas. Puedes obtener una estimación rápida gracias al simulador de presupuestos o contactarme para un presupuesto personalizado y gratuito.
</p>
<hr>
<h3>⏳ ¿Cuáles son los plazos de realización?</h3>
<p>
Los plazos varían según el tamaño del proyecto y la época del año. Por término medio, cuenta entre 2 y 12 meses según la complejidad del pedido. Siempre se indica un plazo estimado al validar el presupuesto.
</p>
<hr>
<h3>📦 ¿Debo enviarte mis figuras?</h3>
<p>
Sí, si ya tienes tus figuras, puedes enviarlas directamente al taller. Si aún no las tienes, pueden ser encargadas en mis socios y entregadas directamente al Studio PF para que yo me encargue de todo el proyecto.
</p>
<hr>
<h3>🖌️ ¿Puedo elegir los colores de mi ejército?</h3>
<p>
Por supuesto. Cada proyecto es completamente personalizado. Puedes proporcionar un esquema de colores, ilustraciones, fotos o simplemente explicar tus deseos. También puedo aconsejarte si tienes dudas.
</p>
<hr>
<h3>📸 ¿Veré las figuras antes de su envío?</h3>
<p>
Sí. Antes de cualquier envío, se te envían fotos en alta definición para que puedas validar el resultado final.
</p>
<hr>
<h3>🎲 ¿Pintas solo Warhammer?</h3>
<p>
No. También pinto figuras de juegos de mesa, juegos de rol, figuras históricas, bustos, piezas de colección, impresiones 3D y muchas otras gamas.
</p>
<hr>
<h3>🚚 ¿Envías fuera de Francia?</h3>
<p>
Sí. Los pedidos pueden enviarse a Francia, Bélgica y a muchos otros países. Los gastos de envío se calculan según el destino.
</p>
<hr>
<h3>💳 ¿Cómo funciona el pago?</h3>
<p>
Para reservar tu franja de pintura, se solicita un anticipo al validar el presupuesto. El saldo se paga únicamente después de validar las fotos finales, antes del envío de tu pedido.
</p>
<hr>
<h3>📅 ¿Puedo cancelar mi pedido?</h3>
<p>
Un pedido puede cancelarse antes de su inicio según las condiciones previstas en las CGV. Los anticipos ya pagados corresponden a la reserva de la franja de trabajo y no son reembolsables.
</p>
<hr>
<h3>🎁 ¿Haces regalos personalizados?</h3>
<p>
Sí. Una figura pintada a mano es un regalo único para un coleccionista, un jugador o un apasionado de la pintura. No dudes en detallar tu proyecto al solicitar presupuesto.
</p>
<hr>
<h3>🧲 ¿Ofreces montaje e imantación?</h3>
<p>
Sí. El montaje forma parte de los servicios ofrecidos. La imantación también es posible bajo demanda para facilitar el transporte o los cambios de equipo.
</p>
<hr>
<h3>🧑‍🎨 ¿Das clases de pintura?</h3>
<p>
Sí. Se ofrecen clases individuales para todos los niveles, desde principiante hasta pintor experimentado. Las sesiones pueden centrarse en el pincel, el aerógrafo o técnicas específicas según tus objetivos.
</p>
<hr>
<h3>🖨️ ¿También ofreces impresión 3D?</h3>
<p>
Sí. El Studio PF también realiza impresiones 3D en resina a partir de los archivos STL proporcionados por los clientes. Los derechos de uso de los archivos siguen siendo responsabilidad del cliente.
</p>
<hr>
<h3>🏆 ¿Cuál es la diferencia entre una pintura TableTop y una pintura de colección?</h3>
<p>
Una pintura TableTop está pensada para el juego con un excelente aspecto a distancia de juego. Una pintura de colección o de concurso tiene un nivel de acabado mucho más alto, con más detalles, técnicas avanzadas y horas de trabajo.
</p>
</div>
</div>`;
    } else {
           html = `     <div class="center">
<div class="maintenance-box ajust fonddemon">
 <h1>❓FAQ</h1>
<h2>🪄 Pourquoi choisir Studio PF ?</h2>
<ul>
<li>🎨 <strong>Un projet 100 % personnalisé</strong> : chaque figurine est peinte selon vos envies, votre univers, votre budget et le niveau de finition souhaité.</li>
<li>🔧 <strong>Une préparation professionnelle</strong> : ébarbage, montage, sous-couche, corrections et préparation minutieuse pour garantir un résultat durable.</li>
<li>🧪 <strong>Des socles immersifs et des effets avancés</strong> : textures, pigments, végétation, accessoires 3D et nombreuses techniques de peinture pour donner vie à votre armée ou à votre pièce de collection.</li>
<li>📸 <strong>Un suivi transparent</strong> : vous êtes informé à chaque étape importante et validez les photos finales avant toute expédition.</li>
<li>📦 <strong>Un service clé en main</strong> : vos figurines peuvent être commandées chez mes partenaires, livrées directement au Studio PF, peintes puis expédiées chez vous, prêtes à jouer ou à exposer.</li>
<li>🛡️ <strong>Un emballage soigné et une expédition sécurisée</strong> : chaque commande est protégée avec le plus grand soin pour arriver en parfait état.</li>
</ul>
<p>
De la première prise de contact jusqu'à la livraison, je mets tout en œuvre pour que votre projet soit une expérience simple, transparente et à la hauteur de vos attentes.
</p>
</div>
</div>
      <div class="center">
    <div class="maintenance-box ajust fondknigt">
        <h2>⚙️ Comment ça marche ?</h2>
        <ol>
            <li>💬 Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé.</li>
            <li>🎲 Vous possédez déjà vos figurines ? Envoyez-les directement au <strong>Studio PF</strong>. Vous n'avez pas encore votre armée ? Commandez-la chez mes partenaires <a href="https://maxireves.fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Maxi Rêves</strong></a> ou <a href="https://www.totalwargame.com/fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Total Wargame</strong></a> (figurines neuves et d'occasion) et faites-la livrer directement à l'atelier.</li>
            <li>🎨 Je prends en charge l'ensemble du projet : préparation, montage, peinture, soclage et finitions selon le niveau de qualité choisi.</li>

            <li>📸 Une fois la peinture terminée, je vous envoie des photos haute définition pour validation avant l'expédition ou une remise en main propre.</li>

            <li>📦 Après votre validation, votre commande est soigneusement emballée et expédiée en toute sécurité.</li>
        </ol>

        <p>
            Cette organisation vous permet de gagner du temps : vos figurines peuvent être commandées, livrées, peintes puis réexpédiées, sans aucune manipulation de votre part.
        </p>


            <a href="simulateur_devis.html"
               class="button"
               onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">
                💬 Demander un devis
            </a>

    </div>
    </div>
      <div class="center">
<div class="maintenance-box ajust fondfreezer">

<h2>❓ Questions fréquentes</h2>

<h3>💰 Combien coûte la peinture d'une figurine ?</h3>

<p>
Le tarif dépend de plusieurs critères : la taille de la figurine, son niveau de détail, le niveau de peinture souhaité, le montage éventuel et les options choisies. Vous pouvez obtenir une estimation rapidement grâce au simulateur de devis ou me contacter pour un devis personnalisé et gratuit.
</p>

<hr>

<h3>⏳ Quels sont les délais de réalisation ?</h3>

<p>
Les délais varient selon la taille du projet et la période de l'année. En moyenne, comptez entre 2 et 12 mois selon la complexité de la commande. Un délai estimatif est toujours indiqué lors de la validation du devis.
</p>

<hr>

<h3>📦 Dois-je vous envoyer mes figurines ?</h3>

<p>
Oui, si vous possédez déjà vos figurines, vous pouvez les expédier directement à l'atelier. Si vous ne les avez pas encore, elles peuvent être commandées chez mes partenaires et livrées directement au Studio PF afin que je prenne en charge l'ensemble du projet.
</p>

<hr>

<h3>🖌️ Puis-je choisir les couleurs de mon armée ?</h3>

<p>
Bien sûr. Chaque projet est entièrement personnalisé. Vous pouvez fournir un schéma de couleurs, des illustrations, des photos ou simplement expliquer vos envies. Je peux également vous conseiller si vous hésitez.
</p>

<hr>

<h3>📸 Vais-je voir les figurines avant leur expédition ?</h3>

<p>
Oui. Avant toute expédition, des photos haute définition vous sont envoyées afin que vous puissiez valider le résultat final.
</p>

<hr>

<h3>🎲 Peignez-vous uniquement du Warhammer ?</h3>

<p>
Non. Je peins également des figurines de jeux de plateau, de jeux de rôle, des figurines historiques, des bustes, des pièces de collection, des impressions 3D et de nombreuses autres gammes.
</p>

<hr>

<h3>🚚 Expédiez-vous en dehors de la France ?</h3>

<p>
Oui. Les commandes peuvent être expédiées en France, en Belgique et dans de nombreux autres pays. Les frais de port sont calculés en fonction de la destination.
</p>

<hr>

<h3>💳 Comment se déroule le paiement ?</h3>

<p>
Afin de réserver votre créneau de peinture, un acompte est demandé lors de la validation du devis. Le solde est réglé uniquement après validation des photos finales, avant l'expédition de votre commande.
</p>

<hr>

<h3>📅 Puis-je annuler ma commande ?</h3>

<p>
Une commande peut être annulée avant son démarrage selon les conditions prévues dans les CGV. Les acomptes déjà versés correspondent à la réservation du créneau de travail et ne sont pas remboursables.
</p>

<hr>

<h3>🎁 Réalisez-vous des cadeaux personnalisés ?</h3>

<p>
Oui. Une figurine peinte à la main constitue un cadeau unique pour un collectionneur, un joueur ou un passionné de peinture. N'hésitez pas à préciser votre projet lors de votre demande de devis.
</p>

<hr>

<h3>🧲 Proposez-vous le montage et l'aimantation ?</h3>

<p>
Oui. Le montage fait partie des prestations proposées. L'aimantation est également possible sur demande afin de faciliter le transport ou les changements d'équipement.
</p>

<hr>

<h3>🧑‍🎨 Donnez-vous des cours de peinture ?</h3>

<p>
Oui. Des cours individuels sont proposés pour tous les niveaux, du débutant au peintre confirmé. Les séances peuvent porter sur le pinceau, l'aérographe ou des techniques spécifiques selon vos objectifs.
</p>

<hr>

<h3>🖨️ Proposez-vous également de l'impression 3D ?</h3>

<p>
Oui. Le Studio PF réalise également des impressions 3D résine à partir des fichiers STL fournis par les clients. Les droits d'utilisation des fichiers restent sous la responsabilité du client.
</p>

<hr>

<h3>🏆 Quelle est la différence entre une peinture TableTop et une peinture de collection ?</h3>

<p>
Une peinture TableTop est pensée pour le jeu avec un excellent rendu à distance de jeu. Une peinture de collection ou de concours bénéficie d'un niveau de finition beaucoup plus poussé, avec davantage de détails, de techniques avancées et d'heures de travail.
</p>

</div>
</div>`;
    }

    main.innerHTML = html;
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
           html = `
            <div class="maintenance-box ajust fonddg">
       <h1>🎨 Cours de Peinture sur Figurines</h1>

<p>
    Rejoignez <strong>Studio PF</strong> pour des <strong>cours personnalisés</strong>, adaptés aussi bien aux débutants qu'aux peintres souhaitant perfectionner leurs techniques.
</p>

<p>
    Découvrez la peinture au pinceau ou l'aérographe et de nombreuses techniques avancées comme les huiles pour donner vie à vos figurines et progresser à votre rythme.
</p>
  <div class="exemples-photos">

     <img src="img/studio.jpg" alt="Mon Studio et Setup Stream">
    </div>

</div>


    </div>

    <div class="maintenance-box ajust fondnurgle">
      <h2>💡 Pourquoi Nous Choisir ?</h2>

      <ul>
        <li>🖌️ Cours adaptés à tous les niveaux</li>
        <li>🎯 Suivi personnalisé sur vos projets</li>
        <li>🌟 Techniques avancées : freehand, OSL, NMM, weathering</li>
      </ul>
      <p>Cours individuels ou collectifs. En présentiel au Studio uniquement.</p>
    </div>

     <div>
         <a href="#formationForm" class="button">S'inscrire 💬</a>
    </div>

       <div class="maintenance-box ajust fondmort">
      <h2>🖍️ Forfaits de Cours</h2>
      <div class="card">
        <h3>🌱 Cours individuel Débutant ou Confirmé</h3>
        <p>Au premier contact : 1ère heure offerte pour se présenter et découvrir la peinture !</p>
        <p>Une pochette d’initiation sera remise.</p>
      </div>


      <div class="card-container3">
        <div class="card">
          <h3>🕐 Cours 1h</h3>
          <p>50€/h</p>
          <p>Pour un suivi régulier</p>

        </div>
        <div class="card">
          <h3>⏳ Cours 3h</h3>
          <p>150€</p>
          <p>Pour démarrer la peinture</p>

        </div>
        <div class="card">
          <h3>🔥 Cours 5h</h3>
          <p>200€</p>
          <p>Pour lancer projet.</p>

        </div>
      </div>

    <p>Horaires à titre d'exemple.</p>

             <div>
         <a href="#formationForm" class="button">S'inscrire 💬</a>
    </div>


   </div>
       <div class="maintenance-box ajust fondnain">
      <h2>📆 Stage en groupe</h2>
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
       <div class="maintenance-box ajust fondlilia">
        <h2>📆 Prestation événementielle</h2>
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
       <div class="maintenance-box ajust fondfreezer">
      <h2>🖌️🔫 Choisissez vos armes :</h2>

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
    <div class="maintenance-box ajust fondmoi">

      <h2>🚀🎨 Lancez-vous !</h2>

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

      <div class="maintenance-box ajust fondcusto">
   <h2>📅 Réservez dès maintenant et devenez expert !</h2>
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
        <div class="banniere">
          <button type="submit" class="button">Envoyer la demande par mail</button>
        </div>
      </form>

    </div>
    </div>

           `;
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
             html = `
             <h1>Quote Request - TableTop+ Commission</h1>

        <form id="contactForm" action="#">



       <fieldset class="maintenance-box-fieldset">

                    <legend>Quote Simulator</legend>
                    <div class="maintenance-box-fieldset fondcusto">
                        <label for="niveau">Painting Levels :</label><br>
                      <p>
    Level ⭐ Gold :<br>
    Premium TableTop+ finish.<br>
    🔍 Ideal for armies, collections and gaming miniatures requiring a clean, detailed and efficient result.<br>
    <em>Our recommendation for most projects.</em><br><br>
</p>
<p>
    Level 👑 Diamond :<br>
    High-end TableTop++ finish, close to display quality.<br>
    🎨 Each miniature becomes a unique piece with more details, contrasts and artistic work.<br>
    <em>Intended for centerpiece miniatures, iconic characters and collector pieces.</em><br><br>
</p>
                        <p>Basing is included.</p>
                        <select id="niveau" class="select" name="niveau" required>
                            <option value="" disabled hidden>Choose a level</option>
                            <option value="niveau1" selected>Gold - TableTop+ lvl3</option>
                            <option value="niveau2">Diamond - TableTop++ lvl4</option>

                        </select>
                       
                    </div>


       <div class="maintenance-box">
                    <div id="petiteinfanterie" class="cardform">
                        <label for="petiteinfanterie-input">Number of <strong>Infantry base 20-25mm</strong> :</label>
                        <p>Example: Skinks, Battle Dwarfs, Skeletons, Goblins, Plaguebearers...</p>
                        <p>Unit price : <span id="prixpetiteinfanterie">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpetiteinfanterie">0.00</span> €</p>
                        <input type="number" id="petiteinfanterie-input" name="petiteinfanterie" min="0">
                    </div>
                    <div id="infanterie" class="cardform">
                        <label for="infanterie-input">Number of <strong>Infantry base 28-32mm</strong> :</label>
                        <p>Example: Space Marines, Stormcast, Votann, Sisters of Battle, Eldar...</p>
                        <p>Unit price : <span id="prixinfanterie">0.00</span> €</p>
                        <p>Subtotal : <span id="totalinfanterie">0.00</span> €</p>
                        <input type="number" id="infanterie-input" name="infanterie" min="0">
                    </div>
                    <div id="infanterieelite" class="cardform">
                        <label for="infanterieelite-input">Number of <strong>Elite Infantry base 40-50mm</strong> :</label>
                        <p>Example: Terminators, Custodes, Kroxigors, Tyranid Warriors...</p>
                        <p>Unit price : <span id="prixinfanterieelite">0.00</span> €</p>
                        <p>Subtotal : <span id="totalinfanterieelite">0.00</span> €</p>
                        <input type="number" id="infanterieelite-input" name="infanterieelite" min="0">
                    </div>
                    <div id="personnage" class="cardform">
                        <label for="personnage-input">Number of <strong>Foot Characters base 25-32mm</strong> :</label>
                        <p>Example: Space Marine Captain/Sergeant, Wizard...</p>
                        <p>Unit price : <span id="prixpersonnage">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnage">0.00</span> €</p>
                        <input type="number" id="personnage-input" name="personnage" min="0">
                    </div>
                    <div id="personnageelite" class="cardform">
                        <label for="personnageelite-input">Number of <strong>Elite Foot Characters base 40-50mm</strong> :</label>
                        <p>Example: Space Marine Captain/Sergeant in Phobos armour, Terminator Sorcerer</p>
                        <p>Unit price : <span id="prixpersonnageelite">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnageelite">0.00</span> €</p>
                        <input type="number" id="personnageelite-input" name="personnageelite" min="0">
                    </div>
                    <div id="personnagemonstrueux" class="cardform">
                        <label for="personnagemonstrueux-input">Number of <strong>Monstrous Characters base 60-100mm</strong> :</label>
                        <p>Example: Primarchs, Treelord, Tyranid Prince...</p>
                        <p>Unit price : <span id="prixpersonnagemonstrueux">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnagemonstrueux">0.00</span> €</p>
                        <input type="number" id="personnagemonstrueux-input" name="personnagemonstrueux" min="0">
                    </div>
                    <div id="personnagesurmonstre" class="cardform">
                        <label for="personnagesurmonstre-input">Number of <strong>Characters on Monsters base 120mm oval</strong> :</label>
                        <p>Example: MetaRodeur, Idoneth Turtle, Saurus on Carnosaur...</p>
                        <p>Unit price : <span id="prixpersonnagesurmonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnagesurmonstre">0.00</span> €</p>
                        <input type="number" id="personnagesurmonstre-input" name="personnagesurmonstre" min="0">
                    </div>
                    <div id="personnagesurgrandmonstre" class="cardform">
                        <label for="personnagesurgrandmonstre-input">Number of <strong>Characters on Large Monsters base 130-160mm or larger</strong> :</label>
                        <p>Example: Fulgrim, Allarielle, Stormcast Dragon, Crocodile Dragon...</p>
                        <p>Unit price : <span id="prixpersonnagesurgrandmonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnagesurgrandmonstre">0.00</span> €</p>
                        <input type="number" id="personnagesurgrandmonstre-input" name="personnagesurgrandmonstre" min="0">
                    </div>
                    <div id="cavalerie" class="cardform">
                        <label for="cavalerie-input">Number of <strong>Cavalry base oval 60-75mm</strong> :</label>
                        <p>Example: Eldar Jetbikes, Idoneth Morenas, Skeleton Cavalry...</p>
                        <p>Unit price : <span id="prixcavalerie">0.00</span> €</p>
                        <p>Subtotal : <span id="totalcavalerie">0.00</span> €</p>
                        <input type="number" id="cavalerie-input" name="cavalerie" min="0">
                    </div>
                    <div id="cavalerielourde" class="cardform">
                        <label for="cavalerielourde-input">Number of <strong>Heavy Cavalry base oval 90-105mm</strong> :</label>
                        <p>Example: Custodes Jetbikes, Saurus on Aggradon, Idoneth Allopex...</p>
                        <p>Unit price : <span id="prixcavalerielourde">0.00</span> €</p>
                        <p>Subtotal : <span id="totalcavalerielourde">0.00</span> €</p>
                        <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
                    </div>
                    <div id="petitvehiculemonstre" class="cardform">
                        <label for="petitvehiculemonstre-input">Number of <strong>Small Vehicles/Monsters base oval 75-90mm or larger</strong> :</label>
                        <p>Example: Sentinel, Beast of Nurgle, Drone...</p>
                        <p>Unit price : <span id="prixpetitvehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpetitvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
                    </div>
                    <div id="vehiculemonstremoyen" class="cardform">
                        <label for="vehiculemonstremoyen-input">Number of <strong>Medium Vehicles/Monsters base 80-100mm or larger</strong> :</label>
                        <p>Example: Rhino, Dreadnought, Drone...</p>
                        <p>Unit price : <span id="prixvehiculemonstremoyen">0.00</span> €</p>
                        <p>Subtotal : <span id="totalvehiculemonstremoyen">0.00</span> €</p>
                        <input type="number" id="vehiculemonstremoyen-input" name="vehiculemonstremoyen" min="0">
                    </div>
                    <div id="grosvehiculemonstre" class="cardform">
                        <label for="grosvehiculemonstre-input">Number of <strong>Large Vehicles/Monsters base 90-100mm or larger</strong> :</label>
                        <p>Example: Predator, Plagueburst, Daemon Prince, Armigers, Mancrusher...</p>
                        <p>Unit price : <span id="prixgrosvehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalgrosvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
                    </div>
                    <div id="enormevehiculemonstre" class="cardform">
                        <label for="enormevehiculemonstre-input">Number of <strong>Huge Vehicles/Monsters base 100-130mm or larger</strong> :</label>
                        <p>Example: Land Raider, Defiler, Aerodyne, Kragnos...</p>
                        <p>Unit price : <span id="prixenormevehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalenormevehiculemonstre">0.00</span> €</p>
                        <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
                    </div>
                    <div id="titanvehiculemonstre" class="cardform">
                        <label for="titanvehiculemonstre-input">Number of <strong>Titanic Vehicles/Monsters base 130-160mm or larger</strong> :</label>
                        <p>Example: Spartan, Imperial Knight, Cogfort, Mega Gargant...</p>
                        <p>Unit price : <span id="prixtitanvehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totaltitanvehiculemonstre">0.00</span> €</p>
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
                        <label for="aimant-input"><strong>Magnetization</strong> required?</label>
                        <select id="aimant-input" name="aimant">
                            <option value="Oui">Yes</option>
                            <option value="Non" selected>No</option>
                        </select>
                    </div>
                    <div id="total" class="cardform">
                        <h2 class="total">TOTAL :</h2>
<h3><span id="oktotal">0.00</span></h3>
</div></div>
        </fieldset>
          <fieldset class="maintenance-box-fieldset fondknigt">
             <legend>Contact Information</legend>
                <div class="center">
                    <label for="nom">Last Name<span>*</span></label>
                    <input type="text" id="nom" name="nom" placeholder="Last Name" required>
                </div>
                <div class="center">
                    <label for="prenom">First Name<span>*</span></label>
                    <input type="text" id="prenom" name="prenom" placeholder="First Name" required>
                </div>
                <div class="center">
                    <label for="email">Email<span>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="center">
                    <label for="telephone">Phone<span>*</span></label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Phone" required>
                </div>
                <div class="center">
                    <label for="adresse">Address<span>*</span></label>
                    <input type="text" id="adresse" name="adresse" placeholder="Address" required>
                </div>
                <div class="center">
                    <label for="cp">Postal Code<span>*</span></label>
                    <input type="text" id="cp" name="cp" placeholder="Postal Code" required>
                </div>
                <div class="center">
                    <label for="ville">City<span>*</span></label>
                    <input type="text" id="ville" name="ville" placeholder="City" required>
                </div>
                <div class="center">
                    <label for="pays">Country <span>*</span></label>
                    <select id="pays" name="pays" required>
                        <option value="" disabled hidden>Choose a country</option>
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
         <div class="maintenance-box">
                           <div id="message" class="cardform fondknigt">
                            <label for="message-input">To be as accurate as possible,<br>please provide the list of miniatures to paint, whether assembly is required,<br>and if you have a specific theme or colour scheme in mind : <span>*</span></label>
                            <div class="center"><textarea id="message-input" name="message" placeholder="Your message" required></textarea></div>

                    <p><span>*</span> Required fields</p>
                             <div class="center">
              <button type="submit" class="button">Send Quote Request by Email</button>
                   </div> </div>



            </form>
            `;
    } else if (currentLanguage === "spanish") {
              html = `
              <h1>Solicitud de Presupuesto comisión TableTop+</h1>

        <form id="contactForm" action="#">



       <fieldset class="maintenance-box-fieldset">

                    <legend>Simulación de presupuesto</legend>
                    <div class="cardform">
                        <label for="niveau">Niveles de Pintura :</label><br>
                      <p>
    Nivel ⭐ Oro :<br>
    Acabado TableTop+ de alta calidad.<br>
    🔍 Ideal para ejércitos, colecciones y miniaturas de juego que requieren un resultado limpio, detallado y eficiente.<br>
    <em>Nuestra recomendación para la mayoría de los proyectos.</em><br><br>
</p>
<p>
    Nivel 👑 Diamante :<br>
    Acabado TableTop++ de gama alta, cercano a pieza de exposición.<br>
    🎨 Cada miniatura se convierte en una pieza única con más detalles, contrastes y trabajo artístico.<br>
    <em>Destinado a miniaturas principales, personajes emblemáticos y piezas de colección.</em><br><br>
</p>
                        <p>El entarimado está incluido.</p>
                        <select id="niveau" class="select" name="niveau" required>
                            <option value="" disabled hidden>Elige un nivel</option>
                            <option value="niveau1" selected>Oro - TableTop+ niv3</option>
                            <option value="niveau2">Diamante - TableTop++ niv4</option>

                        </select>
                        
                    </div>


       <div class="maintenance-box">
                    <div id="petiteinfanterie" class="cardform">
                        <label for="petiteinfanterie-input">Número de <strong>Infantería peana 20-25mm</strong> :</label>
                        <p>Ejemplo: Skinks, Enanos Battle, Esqueletos, Goblins, Pútridos...</p>
                        <p>Precio unitario : <span id="prixpetiteinfanterie">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpetiteinfanterie">0.00</span> €</p>
                        <input type="number" id="petiteinfanterie-input" name="petiteinfanterie" min="0">
                    </div>
                    <div id="infanterie" class="cardform">
                        <label for="infanterie-input">Número de <strong>Infantería peana 28-32mm</strong> :</label>
                        <p>Ejemplo: Space Marines, Stormcast, Votann, Hermanas de Batalla, Eldar...</p>
                        <p>Precio unitario : <span id="prixinfanterie">0.00</span> €</p>
                        <p>Subtotal : <span id="totalinfanterie">0.00</span> €</p>
                        <input type="number" id="infanterie-input" name="infanterie" min="0">
                    </div>
                    <div id="infanterieelite" class="cardform">
                        <label for="infanterieelite-input">Número de <strong>Infantería élite peana 40-50mm</strong> :</label>
                        <p>Ejemplo: Terminators, Custodes, Kroxigors, Guerreros Tyranid...</p>
                        <p>Precio unitario : <span id="prixinfanterieelite">0.00</span> €</p>
                        <p>Subtotal : <span id="totalinfanterieelite">0.00</span> €</p>
                        <input type="number" id="infanterieelite-input" name="infanterieelite" min="0">
                    </div>
                    <div id="personnage" class="cardform">
                        <label for="personnage-input">Número de <strong>Personajes a Pie peana 25-32mm</strong> :</label>
                        <p>Ejemplo: Capitán/Sargento Space Marines, Hechicero...</p>
                        <p>Precio unitario : <span id="prixpersonnage">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnage">0.00</span> €</p>
                        <input type="number" id="personnage-input" name="personnage" min="0">
                    </div>
                    <div id="personnageelite" class="cardform">
                        <label for="personnageelite-input">Número de <strong>Personajes élite a Pie peana 40-50mm</strong> :</label>
                        <p>Ejemplo: Capitán/Sargento Space Marines en armadura Phobos, Hechicero en armadura terminator</p>
                        <p>Precio unitario : <span id="prixpersonnageelite">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnageelite">0.00</span> €</p>
                        <input type="number" id="personnageelite-input" name="personnageelite" min="0">
                    </div>
                    <div id="personnagemonstrueux" class="cardform">
                        <label for="personnagemonstrueux-input">Número de <strong>Personajes Monstruosos peana 60-100mm</strong> :</label>
                        <p>Ejemplo: Primarcas, Treelord, Príncipe Tyranid...</p>
                        <p>Precio unitario : <span id="prixpersonnagemonstrueux">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnagemonstrueux">0.00</span> €</p>
                        <input type="number" id="personnagemonstrueux-input" name="personnagemonstrueux" min="0">
                    </div>
                    <div id="personnagesurmonstre" class="cardform">
                        <label for="personnagesurmonstre-input">Número de <strong>Personajes sobre Monstruos peana 120mm oval</strong> :</label>
                        <p>Ejemplo: MetaRodeur, Tortuga Idoneth, Saurus sobre Carnosaurio...</p>
                        <p>Precio unitario : <span id="prixpersonnagesurmonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnagesurmonstre">0.00</span> €</p>
                        <input type="number" id="personnagesurmonstre-input" name="personnagesurmonstre" min="0">
                    </div>
                    <div id="personnagesurgrandmonstre" class="cardform">
                        <label for="personnagesurgrandmonstre-input">Número de <strong>Personajes sobre Grandes Monstruos peana 130-160mm o superior</strong> :</label>
                        <p>Ejemplo: Fulgrim, Allarielle, Dragón Stormcast, Dragón Cocodrilo...</p>
                        <p>Precio unitario : <span id="prixpersonnagesurgrandmonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpersonnagesurgrandmonstre">0.00</span> €</p>
                        <input type="number" id="personnagesurgrandmonstre-input" name="personnagesurgrandmonstre" min="0">
                    </div>
                    <div id="cavalerie" class="cardform">
                        <label for="cavalerie-input">Número de <strong>Caballería peana oval 60-75mm</strong> :</label>
                        <p>Ejemplo: Motos Eldar, Morenas Idoneth, Caballería esqueletos...</p>
                        <p>Precio unitario : <span id="prixcavalerie">0.00</span> €</p>
                        <p>Subtotal : <span id="totalcavalerie">0.00</span> €</p>
                        <input type="number" id="cavalerie-input" name="cavalerie" min="0">
                    </div>
                    <div id="cavalerielourde" class="cardform">
                        <label for="cavalerielourde-input">Número de <strong>Caballería pesada peana oval 90-105mm</strong> :</label>
                        <p>Ejemplo: Motos Custodes, Saurus sobre Aggradon, Allopex Idoneth...</p>
                        <p>Precio unitario : <span id="prixcavalerielourde">0.00</span> €</p>
                        <p>Subtotal : <span id="totalcavalerielourde">0.00</span> €</p>
                        <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
                    </div>
                    <div id="petitvehiculemonstre" class="cardform">
                        <label for="petitvehiculemonstre-input">Número de <strong>Pequeños Vehículos/Monstruos peana oval 75-90mm o superior</strong> :</label>
                        <p>Ejemplo: Sentinel, Bestia de Nurgle, Dron...</p>
                        <p>Precio unitario : <span id="prixpetitvehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalpetitvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
                    </div>
                    <div id="vehiculemonstremoyen" class="cardform">
                        <label for="vehiculemonstremoyen-input">Número de <strong>Vehículos/Monstruos Medianos peana 80-100mm o superior</strong> :</label>
                        <p>Ejemplo: Rhino, Dreadnought, Dron...</p>
                        <p>Precio unitario : <span id="prixvehiculemonstremoyen">0.00</span> €</p>
                        <p>Subtotal : <span id="totalvehiculemonstremoyen">0.00</span> €</p>
                        <input type="number" id="vehiculemonstremoyen-input" name="vehiculemonstremoyen" min="0">
                    </div>
                    <div id="grosvehiculemonstre" class="cardform">
                        <label for="grosvehiculemonstre-input">Número de <strong>Grandes Vehículos/Monstruos peana 90-100mm o superior</strong> :</label>
                        <p>Ejemplo: Predator, Plague Burst, Príncipe Demonio, Armigers, Mancrusher...</p>
                        <p>Precio unitario : <span id="prixgrosvehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalgrosvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="grosvehiculemonstre-input" name="grosvehiculemonstre" min="0">
                    </div>
                    <div id="enormevehiculemonstre" class="cardform">
                        <label for="enormevehiculemonstre-input">Número de <strong>Enormes Vehículos/Monstruos peana 100-130 o superior</strong> :</label>
                        <p>Ejemplo: Land Raider, Defiler, Aerodyne, Kragnos...</p>
                        <p>Precio unitario : <span id="prixenormevehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totalenormevehiculemonstre">0.00</span> €</p>
                        <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
                    </div>
                    <div id="titanvehiculemonstre" class="cardform">
                        <label for="titanvehiculemonstre-input">Número de <strong>Vehículos/Monstruos Titánicos peana 130-160mm o superior</strong> :</label>
                        <p>Ejemplo: Spartan, Imperial Knight, Cogfort, Mega Gargant...</p>
                        <p>Precio unitario : <span id="prixtitanvehiculemonstre">0.00</span> €</p>
                        <p>Subtotal : <span id="totaltitanvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="titanvehiculemonstre-input" name="titanvehiculemonstre" min="0">
                    </div>
                    <div id="montage" class="cardform">
                        <label for="montage-input"><strong>Montaje</strong> previsto ?</label>
                        <select id="montage-input" name="montage">
                            <option value="Oui" selected>Sí</option>
                            <option value="Non">No</option>
                        </select>
                    </div>
                    <div id="aimant" class="cardform">
                        <label for="aimant-input"><strong>Imán</strong> previsto ?</label>
                        <select id="aimant-input" name="aimant">
                            <option value="Oui">Sí</option>
                            <option value="Non" selected>No</option>
                        </select>
                    </div>
                    <div id="total" class="cardform">
                        <h2 class="total">TOTAL :</h2>
<h3><span id="oktotal">0.00</span></h3>
</div></div>
        </fieldset>
          <fieldset class="maintenance-box-fieldset">
             <legend>Datos de contacto</legend>
                <div class="center">
                    <label for="nom">Nombre<span>*</span></label>
                    <input type="text" id="nom" name="nom" placeholder="Nombre" required>
                </div>
                <div class="center">
                    <label for="prenom">Apellido<span>*</span></label>
                    <input type="text" id="prenom" name="prenom" placeholder="Apellido" required>
                </div>
                <div class="center">
                    <label for="email">Email<span>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="center">
                    <label for="telephone">Teléfono<span>*</span></label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Teléfono" required>
                </div>
                <div class="center">
                    <label for="adresse">Dirección<span>*</span></label>
                    <input type="text" id="adresse" name="adresse" placeholder="Dirección" required>
                </div>
                <div class="center">
                    <label for="cp">Código Postal<span>*</span></label>
                    <input type="text" id="cp" name="cp" placeholder="Código Postal" required>
                </div>
                <div class="center">
                    <label for="ville">Ciudad<span>*</span></label>
                    <input type="text" id="ville" name="ville" placeholder="Ciudad" required>
                </div>
                <div class="center">
                    <label for="pays">País <span>*</span></label>
                    <select id="pays" name="pays" required>
                        <option value="" disabled hidden>Elige un país</option>
                        <option value="FRANCE" selected>Francia</option>
                        <option value="BELGIQUE">Bélgica</option>
                        <option value="LUXEMBOURG">Luxemburgo</option>
                        <option value="SPAIN">España</option>
                        <option value="GERMANY">Alemania</option>
                        <option value="ENGLAND">Inglaterra</option>
                        <option value="USA">USA</option>
                        <option value="Autre">Otro (por favor especificar)</option>
                    </select>
    </div>
       </fieldset>
         <div class="maintenance-box">
                           <div id="message" class="cardform">
                            <label for="message-input">Para ser lo más preciso posible,<br>por favor indica la lista de miniaturas a pintar, si se necesita montaje,<br>y si tienes un tema o esquema de colores ya definido : <span>*</span></label>
                            <div class="center"><textarea id="message-input" name="message" placeholder="Tu mensaje" required></textarea></div>

                    <p><span>*</span> Campos obligatorios</p>
                             <div class="center">
              <button type="submit" class="button">Enviar solicitud por correo</button>
                   </div> </div>



            </form>
              `;
    } else {
        html = `
                          <h1>Demande de Devis commission TableTop+</h1>



        <form id="contactForm" action="#">



       <fieldset class="maintenance-box-fieldset">

                    <legend>Simulation de devis</legend>
                    <div class="cardform">
                        <label for="niveau">Niveaux de Peinture :</label><br>
                      <p>
    Niveau ⭐ Gold :<br>
    Finition TableTop+ de qualité supérieure.<br>
    🔍 Idéal pour les armées, les collections et les figurines de jeu nécessitant un rendu propre, détaillé et efficace.<br>
    <em>Notre recommandation pour la majorité des projets.</em><br><br>
</p>

<p>
    Niveau 👑 Diamant :<br>
    Finition TableTop++ haut de gamme, proche de la pièce d’exposition.<br>
    🎨 Chaque figurine devient une pièce unique avec davantage de détails, de contrastes et de travail artistique.<br>
    <em>Destiné aux figurines principales, personnages emblématiques et pièces de collection.</em><br><br>
</p>
                        <p>Le soclage est inclus.</p>
                        <select id="niveau" class="select" name="niveau" required>
                            <option value="" disabled hidden>Choisissez un niveau</option>
                            <option value="niveau1" selected>Gold - TableTop+ niv3</option>
                            <option value="niveau2">Diamant - TableTop++ niv4</option>

                        </select>
                      
                    </div>


       <div class="maintenance-box">
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
                        <p>Exemple : Fulgrim, Allareille, Dragon Stormcast, Dragon Crocodile...</p>
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
                        <p>Exemple : Motos Custodes, Saurus sur Aggradon, Allopex Idoneth...</p>
                        <p>Prix unitaire : <span id="prixcavalerielourde">0.00</span> €</p>
                        <p>Sous Total : <span id="totalcavalerielourde">0.00</span> €</p>
                        <input type="number" id="cavalerielourde-input" name="cavalerielourde" min="0">
                    </div>

                    <div id="petitvehiculemonstre" class="cardform">
                        <label for="petitvehiculemonstre-input">Nombre de <strong>Petit Véhicules/Monstres socle ovale 75-90mm ou supérieur</strong> :</label>
                        <p>Exemple : Sentinel, Bête de Nurgle, Drone...</p>
                        <p>Prix unitaire : <span id="prixpetitvehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalpetitvehiculemonstre">0.00</span> €</p>
                        <input type="number" id="petitvehiculemonstre-input" name="petitvehiculemonstre" min="0">
                    </div>

                    <div id="vehiculemonstremoyen" class="cardform">
                        <label for="vehiculemonstremoyen-input">Nombre de <strong>Véhicules/Monstres Moyen socle 80-100mm ou supérieur</strong> :</label>
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
                        <p>Exemple : Land Raider, Defiler, Aerodyne, Kragnos...</p>
                        <p>Prix unitaire : <span id="prixenormevehiculemonstre">0.00</span> €</p>
                        <p>Sous Total : <span id="totalenormevehiculemonstre">0.00</span> €</p>
                        <input type="number" id="enormevehiculemonstre-input" name="enormevehiculemonstre" min="0">
                    </div>

                    <div id="titanvehiculemonstre" class="cardform">
                        <label for="titanvehiculemonstre-input">Nombre de <strong>Véhicules/Monstres Titanesques socle 130-160mm ou supérieur</strong> :</label>
                        <p>Exemple : Spartan, Imperial Knight, Cogfort, Mega Gargant...</p>
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
                        <h2 class="total">TOTAL :</h2>
<h3><span id="oktotal">0.00</span></h3>

</div></div>
        </fieldset>
          <fieldset class="maintenance-box-fieldset">
             <legend>Coordonnées</legend>
                <div class="center">
                    <label for="nom">Nom<span>*</span></label>
                    <input type="text" id="nom" name="nom" placeholder="Nom" required>
                </div>
                <div class="center">
                    <label for="prenom">Prénom<span>*</span></label>
                    <input type="text" id="prenom" name="prenom" placeholder="Prénom" required>
                </div>
                <div class="center">
                    <label for="email">Email<span>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="center">
                    <label for="telephone">Téléphone<span>*</span></label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Téléphone" required>
                </div>
                <div class="center">
                    <label for="adresse">Adresse<span>*</span></label>
                    <input type="text" id="adresse" name="adresse" placeholder="Adresse" required>
                </div>
                <div class="center">
                    <label for="cp">Code Postal<span>*</span></label>
                    <input type="text" id="cp" name="cp" placeholder="Code Postal" required>
                </div>
                <div class="center">
                    <label for="ville">Ville<span>*</span></label>
                    <input type="text" id="ville" name="ville" placeholder="Ville" required>
                </div>
                <div class="center">
                    <label for="pays">Pays <span>*</span></label>
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
         <div class="maintenance-box">
                           <div id="message" class="cardform">
                            <label for="message-input">Afin d'être le plus précis possible,<br>Merci de définir la liste de figurines à peindre, si le montage est nécessaire,<br>et si vous avez un thème ou schéma de couleurs déjà défini : <span>*</span></label>
                            <div class="center"><textarea id="message-input" name="message" placeholder="Votre message" required></textarea></div>


                    <p><span>*</span> Champs obligatoires</p>
                             <div class="center">
              <button type="submit" class="button">Envoyer la demande par mail</button>
                   </div>   </div>



            </form>
        `;
    }

    main.innerHTML = html;
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
    <div class="maintenance-box ajust fondlilia">
        <h1>🎨 Professional Miniature Painting</h1>
        <p>
            Welcome to <strong>Studio PF</strong>, a workshop specialized in 
            <strong>professional miniature painting</strong>.
        </p>
        <p>
            Whether you are a player, collector, or painter looking to improve,
            I will support you with services tailored to your project.
        </p>
        <p>
            Discover my three painting services:
        </p>
         <nav class="menu-mobile">
            <ul class="menu">
    <li>
        <a href="peinturecommission.html"
           onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">⚔️ Gaming Army Miniatures
        </a>
    </li>
    <li>
        <a href="peinturecollection.html"
           onclick="loadPage('peinturecollection.html'); scrollToTop(); return false;">🏆 Collection & Competition Pieces
        </a>
    </li>
    <li>
        <a href="formation.html"
           onclick="loadPage('formation.html'); scrollToTop(); return false;">📚 Miniature Painting Courses
        </a>
    </li>
</ul>
         </nav>
    </div></div>
  
 <div class="center">
    <div class="maintenance-box ajust fondknigt">
      <h2>⚔️ Gaming Army Miniatures</h2>
<p>
    Do you want a visually cohesive and pleasant-to-play army?
</p>
<p>
    I create <strong>TableTop</strong> quality paintings for miniature wargames with two levels of finish:
    <strong>Gold</strong> and <strong>Diamond</strong>.
</p>
<p>
    Whether you play
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer Age of Sigmar</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-the-old-world/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer The Old World</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/seigneur-des-anneaux/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>The Lord of the Rings</strong></a>,
    board games, skirmish games, or 3D-printed miniatures, each army is painted with care to achieve an excellent look on the gaming table.
</p>
<!-- Illustrations -->
<div class="exemples-photos3">
 <div class="exemples-photos">
    <img src="img/gold1.jpg" alt="Example of a painted army"></div>
 <div class="exemples-photos">
    <img src="img/gold3.jpg" alt="Example of a TableTop painted army"></div>
 <div class="exemples-photos">
    <img src="img/diamant3.jpg" alt="Example of a Warhammer painted army"></div>
</div>
    <a href="peinturecommission.html"
       class="button"
       onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
        ⚔️ Discover TableTop+ Army Painting
    </a>
    </div>
    </div>
 <div class="center">
    <div class="maintenance-box ajust fondfreezer">
        <h2>🏆 Collection & Competition Pieces</h2>
        <p>
            Looking for a <strong>unique</strong> miniature for a display cabinet,
            exhibition, or competition?
        </p>
        <p>
            I create high-end pieces with in-depth work on 
            <strong>lighting</strong>, textures, contrasts, and finishes.
        </p>
        <p>
            Busts, resins, pop culture miniatures, manga, 
            video games, cinema, fantasy or science-fiction:
            every project is treated as a true miniature artwork.
        </p>
  <!-- Illustrations -->
    <div class="exemples-photos3">
             <div class="exemples-photos">
        <img src="img/pop3.jpg" alt="Painted collectible miniature"></div>
                   <div class="exemples-photos">
        <img src="img/buste2.jpg" alt="Painted exhibition piece"></div>
                   <div class="exemples-photos">
        <img src="img/pop1.jpg" alt="Painted competition miniature"></div>
    </div>
            <a href="peinturecollection.html"
               class="button"
               onclick="loadPage('peinturecollection.html'); scrollToTop(); return false;">
                🏆 Discover Collection Pieces
           
        </a>
    </div></div>
 <div class="center">
    <div class="maintenance-box ajust fonddemon">
        <h2>📚 Miniature Painting Courses</h2>
        <p>
            Want to <strong>learn</strong> or <strong>improve</strong> your technique?
        </p>
        <p>
            I offer personalized <strong>courses</strong> adapted to your level,
            in-person or online.
        </p>
        <p>
             <strong>Airbrush</strong>, blending, highlighting,
            light management, basing, textures,
            oils or pigments:<br>I share all the techniques
            I use daily in my professional work.
        </p>
       
            <a href="formation.html"
               class="button"
               onclick="loadPage('formation.html'); scrollToTop(); return false;">
                📚 Discover Course Packages
            </a>
       
    </div>
    </div>
 <div class="center">
    <div class="maintenance-box ajust fondnurgle">
        <h2>🖼️ Discover My Work</h2>
        <p>
            From TableTop+ armies to competition pieces,
            explore several hundred miniatures created
            for players and collectors.
        </p>
       
            <a href="galerie.html"
               class="button"
               onclick="loadPage('galerie.html'); scrollToTop(); return false;">
                🖼️ View the Gallery
            </a>
       
    </div>
    </div>
 <div class="center">
<div class="maintenance-box ajust fondmoi">
<h2>👋 Miniature Painter in France</h2>
<p>
I am <strong>Pierre-François, aka PF, <span id="pf-age">39</span> years old.</strong><br>
Passionate painter and founder of Studio PF.<br><br>
I have been painting miniatures since 2020, a passion that started somewhat by chance.<br>
Covid turned this hobby into a true artistic journey.<br>
Today I work with acrylics, pigments, and oils in a style that brings miniatures to life.<br><br>
My goal: make your miniatures come alive.
</p>
<p><strong>“Every miniature tells a story. My role is to make it shine.” ✨</strong> </p>
 
            <a href="quisuisje.html" class="button" onclick="loadPage('quisuisje.html'); scrollToTop(); return false;">✨ Learn more about my journey</a>
</div>
</div>
        `;
    } else if (currentLanguage === "spanish") {
        html = `
<div class="center">
    <div class="maintenance-box ajust fondlilia">
        <h1>🎨 Pintura profesional de miniaturas</h1>
        <p>
            Bienvenido a <strong>Studio PF</strong>, taller especializado en 
            <strong>pintura profesional de miniaturas</strong>.
        </p>
        <p>
            Ya seas jugador, coleccionista o pintor que desea progresar,
            te acompaño con servicios adaptados a tu proyecto.
        </p>
        <p>
            Descubre mis tres servicios de pintura:
        </p>
         <nav class="menu-mobile">
            <ul class="menu">
    <li>
        <a href="peinturecommission.html"
           onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">⚔️ Miniaturas de Ejércitos de juego
        </a>
    </li>
    <li>
        <a href="peinturecollection.html"
           onclick="loadPage('peinturecollection.html'); scrollToTop(); return false;">🏆 Piezas de colección y concursos
        </a>
    </li>
    <li>
        <a href="formation.html"
           onclick="loadPage('formation.html'); scrollToTop(); return false;">📚 Cursos de pintura de miniaturas
        </a>
    </li>
</ul>
         </nav>
    </div></div>
  
 <div class="center">
    <div class="maintenance-box ajust fondknigt">
      <h2>⚔️ Miniaturas de Ejércitos de juego</h2>
<p>
    ¿Quieres un ejército agradable de jugar y visualmente homogéneo?
</p>
<p>
    Realizo pinturas <strong>TableTop</strong> destinadas a juegos de miniaturas con dos niveles de acabado:
    <strong>Oro</strong> y <strong>Diamante</strong>.
</p>
<p>
    Ya juegues a
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer Age of Sigmar</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-the-old-world/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer The Old World</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/seigneur-des-anneaux/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>El Señor de los Anillos</strong></a>,
    a juegos de mesa, escaramuzas o con miniaturas impresas en 3D, cada ejército se pinta con esmero para obtener un excelente resultado en la mesa de juego.
</p>
<!-- Illustrations -->
<div class="exemples-photos3">
 <div class="exemples-photos">
    <img src="img/gold1.jpg" alt="Ejemplo de ejército pintado"></div>
 <div class="exemples-photos">
    <img src="img/gold3.jpg" alt="Ejemplo de ejército TableTop pintado"></div>
 <div class="exemples-photos">
    <img src="img/diamant3.jpg" alt="Ejemplo de ejército Warhammer pintado"></div>
</div>
    <a href="peinturecommission.html"
       class="button"
       onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
        ⚔️ Descubrir la pintura de ejércitos TableTop+
    </a>
    </div>
    </div>
 <div class="center">
    <div class="maintenance-box ajust fondfreezer">
        <h2>🏆 Piezas de colección y concursos</h2>
        <p>
            ¿Buscas una miniatura <strong>única</strong> destinada a una vitrina,
            una exposición o un concurso?
        </p>
        <p>
            Realizo piezas de alta gama con un trabajo <strong>profundo</strong>
            de luces, texturas, contrastes y acabados.
        </p>
        <p>
            Bustos, resinas, miniaturas de pop culture, mangas,
            videojuegos, cine, fantasía o ciencia ficción:
            cada proyecto se trata como una verdadera obra en miniatura.
        </p>
  <!-- Illustrations -->
    <div class="exemples-photos3">
             <div class="exemples-photos">
        <img src="img/pop3.jpg" alt="Miniatura de colección pintada"></div>
                   <div class="exemples-photos">
        <img src="img/buste2.jpg" alt="Pieza de exposición pintada"></div>
                   <div class="exemples-photos">
        <img src="img/pop1.jpg" alt="Miniatura de concurso pintada"></div>
    </div>
       
            <a href="peinturecollection.html"
               class="button"
               onclick="loadPage('peinturecollection.html'); scrollToTop(); return false;">
                🏆 Descubrir las piezas de colección
           
        </a>
    </div></div>
 <div class="center">
    <div class="maintenance-box ajust fonddemon">
        <h2>📚 Cursos de pintura de miniaturas</h2>
        <p>
            ¿Quieres <strong>aprender</strong> o <strong>perfeccionar</strong> tu técnica?
        </p>
        <p>
            Ofrezco <strong>cursos</strong> personalizados adaptados a tu nivel,
            en taller o a distancia.
        </p>
        <p>
             <strong>Aerógrafo</strong>, degradados, iluminaciones,
            gestión de luces, bases, texturas,
            óleos o pigmentos:<br>Comparto todas las técnicas
            que utilizo diariamente en mi actividad profesional.
        </p>
       
            <a href="formation.html"
               class="button"
               onclick="loadPage('formation.html'); scrollToTop(); return false;">
                📚 Descubrir los paquetes de cursos
            </a>
       
    </div>
    </div>
 <div class="center">
    <div class="maintenance-box ajust fondnurgle">
        <h2>🖼️ Descubre mis realizaciones</h2>
        <p>
            Desde ejércitos TableTop+ hasta piezas de concurso,
            explora varios cientos de miniaturas realizadas
            para jugadores y coleccionistas.
        </p>
       
            <a href="galerie.html"
               class="button"
               onclick="loadPage('galerie.html'); scrollToTop(); return false;">
                🖼️ Ver la galería
            </a>
       
    </div>
    </div>
 <div class="center">
<div class="maintenance-box ajust fondmoi">
<h2>👋 Pintor de Miniaturas en Francia</h2>
<p>
Soy <strong>Pierre-François, alias PF, <span id="pf-age">39</span> años.</strong><br>
Pintor apasionado y fundador de Studio PF.<br><br>
Practico la pintura de miniaturas desde 2020, una pasión que surgió un poco por casualidad.<br>
El Covid transformó este hobby en una verdadera búsqueda artística.<br>
Hoy trabajo el acrílico, los pigmentos y los óleos con un estilo que da vida a las miniaturas.<br><br>
Mi objetivo: hacer vibrar tus miniaturas como si cobraran vida.
</p>
<p><strong>“Cada miniatura cuenta una historia. Mi rol es hacerla brillar.” ✨</strong> </p>
 
            <a href="quisuisje.html" class="button" onclick="loadPage('quisuisje.html'); scrollToTop(); return false;">✨ Saber más sobre mi trayectoria</a>
</div>
</div>

        `;
    } else {
        html = `
<div class="center">
    <div class="maintenance-box ajust fondlilia">

        <h1>🎨 Peinture professionnelle sur figurines</h1>

        <p>
            Bienvenue chez <strong>Studio PF</strong>, atelier spécialisé dans la
            <strong>peinture professionnelle sur figurines</strong>.
        </p>

        <p>
            Que vous soyez joueur, collectionneur ou peintre souhaitant progresser,
            je vous accompagne avec des prestations adaptées à votre projet.
        </p>

        <p>
            Découvrez mes trois services peinture :
        </p>

         <nav class="menu-mobile">
            <ul class="menu">
    <li>
        <a href="peinturecommission.html"
           onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">⚔️ Figurines d'Armées de jeu
        </a>
    </li>

    <li>
        <a href="peinturecollection.html" 
           onclick="loadPage('peinturecollection.html'); scrollToTop(); return false;">🏆 Pièces de collection & concours
        </a>
    </li>

    <li>
        <a href="formation.html" 
           onclick="loadPage('formation.html'); scrollToTop(); return false;">📚 Cours de peinture sur figurines
        </a>
    </li>
</ul>
         </nav>

    </div></div>
   

 <div class="center">
    <div class="maintenance-box ajust fondknigt">

      <h2>⚔️ Figurines d'Armées de jeu</h2>

<p>
    Vous souhaitez une armée agréable à jouer et visuellement homogène ?
</p>

<p>
    Je réalise des peintures <strong>TableTop</strong> destinées aux jeux de figurines avec deux niveaux de finition :
    <strong>Gold</strong> et <strong>Diamant</strong>.
</p>

<p>
    Que vous jouiez à
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer Age of Sigmar</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-the-old-world/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer The Old World</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/seigneur-des-anneaux/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Le Seigneur des Anneaux</strong></a>,
    à des jeux de plateau, d'escarmouche ou avec des figurines imprimées en 3D, chaque armée est peinte avec soin afin d'obtenir un excellent rendu sur la table de jeu.
</p>


<!-- Illustrations -->
<div class="exemples-photos3">
 <div class="exemples-photos">
    <img src="img/gold1.jpg" alt="Exemple d'armée peinte"></div>
 <div class="exemples-photos">
    <img src="img/gold3.jpg" alt="Exemple d'armée TableTop peinte"></div>
 <div class="exemples-photos">
    <img src="img/diamant3.jpg" alt="Exemple d'armée Warhammer peinte"></div>
</div>

    <a href="peinturecommission.html"
       class="button"
       onclick="loadPage('peinturecommission.html'); scrollToTop(); return false;">
        ⚔️ Découvrir la peinture d'armées TableTop+
    </a>

    </div>
    </div>


 <div class="center">
    <div class="maintenance-box ajust fondfreezer">

        <h2>🏆 Pièces de collection & concours</h2>

        <p>
            Vous recherchez une figurine  <strong>unique</strong> destinée à une vitrine,
            une exposition ou un concours ?
        </p>

        <p>
            Je réalise des pièces haut de gamme avec un travail  <strong>approfondi</strong>
            des lumières, des textures, des contrastes et des finitions.
        </p>

        <p>
            Bustes, résines, figurines de pop culture, mangas,
            jeux vidéo, cinéma, fantasy ou science-fiction :
            chaque projet est traité comme une véritable œuvre miniature.
        </p>
  <!-- Illustrations -->
    <div class="exemples-photos3">
             <div class="exemples-photos">
        <img src="img/pop3.jpg" alt="Figurine de collection peinte"></div>
                   <div class="exemples-photos">
        <img src="img/buste2.jpg" alt="Pièce d'exposition peinte"></div>
                   <div class="exemples-photos">
        <img src="img/pop1.jpg" alt="Figurine de concours peinte"></div>
    </div>
        
            <a href="peinturecollection.html"
               class="button"
               onclick="loadPage('peinturecollection.html'); scrollToTop(); return false;">
                🏆 Découvrir les pièces de collection
            
        </a>

    </div></div>


 <div class="center">
    <div class="maintenance-box ajust fonddemon">

        <h2>📚 Cours de peinture sur figurines</h2>

        <p>
            Vous souhaitez  <strong>apprendre</strong> ou  <strong>perfectionner</strong> votre technique ?
        </p>

        <p>
            Je propose des  <strong>cours</strong> personnalisés adaptés à votre niveau,
            en atelier ou à distance.
        </p>

        <p>
             <strong>Aérographe</strong>, dégradés, éclaircissements,
            gestion des lumières, soclage, textures,
            huiles ou pigments :<br>Je partage toutes les techniques
            que j'utilise quotidiennement dans mon activité professionnelle.
        </p>

        
            <a href="formation.html"
               class="button"
               onclick="loadPage('formation.html'); scrollToTop(); return false;">
                📚 Découvrir les forfaits cours
            </a>
        
    </div>
    </div>


 <div class="center">
    <div class="maintenance-box ajust fondnurgle">

        <h2>🖼️ Découvrez mes réalisations</h2>

        <p>
            Des armées TableTop+ aux pièces de concours,
            explorez plusieurs centaines de figurines réalisées
            pour des joueurs et des collectionneurs.
        </p>

        
            <a href="galerie.html"
               class="button"
               onclick="loadPage('galerie.html'); scrollToTop(); return false;">
                🖼️ Voir la galerie
            </a>
        
    </div>
    </div>




 <div class="center">
<div class="maintenance-box ajust fondmoi">
<h2>👋 Peintre sur Figurine en France</h2>
<p>
Je suis <strong>Pierre-François, alias PF, <span id="pf-age">39</span> ans.</strong><br>
Peintre passionné et fondateur de Studio PF.<br><br>

Je pratique la peinture de figurines depuis 2020, une passion née un peu par hasard.<br>
Le Covid a transformé ce hobby en véritable quête artistique.<br>

Aujourd’hui, je travaille l'acrylique, les pigments et les huiles avec un style qui donne vie aux figurines.<br><br>

Mon objectif : faire vibrer vos figurines comme si elles prenaient vie.
</p>
<p><strong>“Chaque figurine raconte une histoire. Mon rôle, c’est de la faire briller.” ✨</strong> </p>
  
            <a href="quisuisje.html" class="button" onclick="loadPage('quisuisje.html'); scrollToTop(); return false;">✨ En savoir plus sur mon parcours</a>
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
        html = `<div class="maintenance-box ajust fondorc">
    <h1>🏆 Unique Pieces for Collection, Exhibition & Competitions</h1>
    <p>
        Studio PF creates <strong>high-end figurines</strong> for collectors, enthusiasts and competitors who want to transform their models into true exhibition pieces.
    </p>
    <p>
        Each project is fully customized according to the sculpture, its universe and its purpose: enriching a collection, being displayed in a showcase or participating in a painting competition.
    </p>
    <p>
        These creations benefit from in-depth artistic work that can represent <strong>dozens or even hundreds of hours of painting</strong>, using advanced techniques, meticulous attention to every detail, and a constant pursuit of the best possible result.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/collection1.jpg" alt="Painted collectible figurine"></div>
        <div class="exemples-photos">
        <img src="img/collection2.jpg" alt="Painted exhibition piece"></div>
        <div class="exemples-photos">
        <img src="img/collection3.jpg" alt="Painted competition figurine"></div>
    </div>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Quote%20Request%20-%20Miniature%20Painting%20Project&body=Hello%20Studio%20PF,%0A%0AI%20would%20like%20to%20request%20a%20quote%20for%20the%20following%20project:%0A%0A---%20Project%20type%20(Army%20/%20Collection%20/%20Competition)%20:%0A%0A---%20Game%20or%20universe%20:%0A%0A---%20Miniature(s)%20name%20:%0A%0A---%20Number%20of%20miniatures%20:%0A%0A---%20Desired%20painting%20level%20(TableTop%20/%20TableTop%2B%20/%20Display)%20:%0A%0A---%20Assembly%20required%20(Yes%20/%20No)%20:%0A%0A---%20Preferred%20deadline%20(if%20urgent)%20:%0A%0A---%20Reference%20photos%20or%20links%20:%0A%0A---%20Additional%20comments%20or%20special%20requests%20:%0A%0AThank%20you!"
   class="button">
     Request a personalized quote 💬
</a>

</div>

<div class="maintenance-box ajust fondknigt">
    <h2>🏞️ Dioramas & Exhibition Scenes</h2>
    <p>
        Studio PF creates <strong>custom dioramas</strong> that stage one or more figurines in a setting entirely designed to tell a story.
    </p>
    <p>
        Battlefields, ancient ruins, dungeons, snowy landscapes, forests, futuristic cities or post-apocalyptic environments: each project is designed to create a truly living and immersive scene.
    </p>
    <p>
        Intended for collectors, exhibition or competitions, the dioramas combine painting, composition, scenery, textures, vegetation, special effects and staging to transform a simple figurine into a unique work of art.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/diorama1.jpg" alt="Figurine diorama"></div>
        <div class="exemples-photos">
        <img src="img/diorama2.jpg" alt="Exhibition scene on diorama"></div>
        <div class="exemples-photos">
        <img src="img/diorama3.jpg" alt="Diorama painted by Studio PF"></div>
    </div>

<a href="mailto:studiopeinturefigurine@gmail.com?subject=Quote%20Request%20-%20Miniature%20Painting%20Project&body=Hello%20Studio%20PF,%0A%0AI%20would%20like%20to%20request%20a%20quote%20for%20the%20following%20project:%0A%0A---%20Project%20type%20(Army%20/%20Collection%20/%20Competition)%20:%0A%0A---%20Game%20or%20universe%20:%0A%0A---%20Miniature(s)%20name%20:%0A%0A---%20Number%20of%20miniatures%20:%0A%0A---%20Desired%20painting%20level%20(TableTop%20/%20TableTop%2B%20/%20Display)%20:%0A%0A---%20Assembly%20required%20(Yes%20/%20No)%20:%0A%0A---%20Preferred%20deadline%20(if%20urgent)%20:%0A%0A---%20Reference%20photos%20or%20links%20:%0A%0A---%20Additional%20comments%20or%20special%20requests%20:%0A%0AThank%20you!"
   class="button">
     Request a personalized quote 💬
</a>

</div>

<div class="maintenance-box ajust fondnain">
    <h2>🗿 Busts & Collectible Pieces</h2>
    <p>
        Studio PF paints <strong>busts, miniature statues and collectible pieces</strong> intended to be displayed in a showcase or to enrich a personal collection.
    </p>
    <p>
        Each project is approached in a fully personalized way to highlight the sculpture, volumes, textures and character expression. Skin tones, metals, leather, fabrics, weathering or ambient effects: every detail is worked on to bring the piece to life.
    </p>
    <p>
        These creations are aimed at both collectors and enthusiasts who want a unique piece, whether it is a historical, fantasy, science-fiction bust or an original creation.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/buste1.jpg" alt="Painted historical bust"></div>
        <div class="exemples-photos">
        <img src="img/buste2.jpg" alt="Painted fantasy bust"></div>
        <div class="exemples-photos">
        <img src="img/buste3.jpg" alt="Painted collectible bust"></div>
    </div>
 <a href="mailto:studiopeinturefigurine@gmail.com?subject=Quote%20Request%20-%20Miniature%20Painting%20Project&body=Hello%20Studio%20PF,%0A%0AI%20would%20like%20to%20request%20a%20quote%20for%20the%20following%20project:%0A%0A---%20Project%20type%20(Army%20/%20Collection%20/%20Competition)%20:%0A%0A---%20Game%20or%20universe%20:%0A%0A---%20Miniature(s)%20name%20:%0A%0A---%20Number%20of%20miniatures%20:%0A%0A---%20Desired%20painting%20level%20(TableTop%20/%20TableTop%2B%20/%20Display)%20:%0A%0A---%20Assembly%20required%20(Yes%20/%20No)%20:%0A%0A---%20Preferred%20deadline%20(if%20urgent)%20:%0A%0A---%20Reference%20photos%20or%20links%20:%0A%0A---%20Additional%20comments%20or%20special%20requests%20:%0A%0AThank%20you!"
   class="button">
     Request a personalized quote 💬
</a>

</div>

<div class="maintenance-box ajust fondfreezer">
    <h2>🎬 Manga, Movies, Series & Video Games</h2>
    <p>
        Do you own a figurine inspired by your favorite universe?
        Studio PF paints pieces from <strong>mangas, movies, series, video games and pop culture licenses</strong>, whether iconic characters or original creations.
    </p>
    <p>
        Dragon Ball, One Piece, Naruto, Demon Slayer, Star Wars, Marvel, DC Comics, The Lord of the Rings, The Witcher, Elden Ring, Zelda, WarCraft... All licenses are welcome.
    </p>
    <p>
        Most of these models come from independent 3D creators or are available on specialized platforms such as Etsy, MyMiniFactory or other stores dedicated to collectors.
    </p>
    <h3>Important information</h3>
    <p>
        <strong>Studio PF does not supply the figurines and does not perform 3D printing as part of this service.</strong><br>
        The client provides the piece or acquires it directly from the creator or seller of their choice. Studio PF’s work then consists of preparing, painting and enhancing the figurine with a high-end finish.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/pop1.jpg" alt="Painted manga figurine"></div>
          <div class="exemples-photos">
        <img src="img/pop2.jpg" alt="Painted series figurine"></div>
          <div class="exemples-photos">
        <img src="img/pop3.jpg" alt="Painted video game figurine"></div>
    </div>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Quote%20Request%20-%20Miniature%20Painting%20Project&body=Hello%20Studio%20PF,%0A%0AI%20would%20like%20to%20request%20a%20quote%20for%20the%20following%20project:%0A%0A---%20Project%20type%20(Army%20/%20Collection%20/%20Competition)%20:%0A%0A---%20Game%20or%20universe%20:%0A%0A---%20Miniature(s)%20name%20:%0A%0A---%20Number%20of%20miniatures%20:%0A%0A---%20Desired%20painting%20level%20(TableTop%20/%20TableTop%2B%20/%20Display)%20:%0A%0A---%20Assembly%20required%20(Yes%20/%20No)%20:%0A%0A---%20Preferred%20deadline%20(if%20urgent)%20:%0A%0A---%20Reference%20photos%20or%20links%20:%0A%0A---%20Additional%20comments%20or%20special%20requests%20:%0A%0AThank%20you!"
   class="button">
     Request a personalized quote 💬
</a>

</div>

<div class="maintenance-box ajust fonddg">
    <h2>🎨 An Artistic Approach to Painting</h2>
    <p>
        <strong>✨ Volume work:</strong><br>
        Each piece is painted with subtle gradients, natural transitions and precise highlighting to reveal all the richness of the sculpture and enhance its readability from every angle.
    </p>
    <p>
        <strong>🎭 Artistic direction:</strong><br>
        Colors, contrasts and lighting effects are considered as a whole to create a harmonious composition. The goal is to guide the viewer’s eye and give the figurine a true visual identity.
    </p>
    <p>
        <strong>🧪 Materials & textures:</strong><br>
        Metal, leather, fabrics, skin, wood, stone, rust or fantasy materials: each texture is worked individually to reinforce the realism or the desired style of the piece.
    </p>
    <p>
        <strong>💡 Advanced techniques:</strong><br>
        Depending on the project’s needs, Studio PF uses glazes, oil paints, pigments, lighting effects (OSL), weathering, blends, very fine details and many professional techniques to achieve a result worthy of an exhibition or competition piece.
    </p>
</div>

<div class="maintenance-box ajust fondslann">
    <h2>A Unique Piece ✨</h2>
    <table class="tableborder1">
    <thead>
    <tr>
    <th>🎨 Characteristics</th>
    <th>Collection</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Purpose</td>
    <td>Collection<br>exhibition<br>showcase or competition</td>
    </tr>
    <tr>
    <td>Finish level</td>
    <td>Very high finish with in-depth artistic work</td>
    </tr>
    <tr>
    <td>Painting</td>
    <td>Fine gradients<br>complex shades<br>textures<br>advanced effects</td>
    </tr>
    <tr>
    <td>Production time</td>
    <td>Project that can represent dozens of hours of work</td>
    </tr>
    <tr>
    <td>Approach</td>
    <td>Each piece is unique<br>studied individually</td>
    </tr>
    </tbody>
    </table>
</div>`;
    } else if (currentLanguage === "spanish") {
        html = `<div class="maintenance-box ajust fondorc">
    <h1>🏆 Piezas únicas para Colección, Exposición y Concursos</h1>
    <p>
        Studio PF realiza <strong>figurillas de alta gama</strong> destinadas a coleccionistas, apasionados y competidores que desean transformar sus modelos en verdaderas obras de exposición.
    </p>
    <p>
        Cada proyecto se personaliza completamente según la escultura, su universo y su objetivo: enriquecer una colección, ser expuesta en vitrina o participar en un concurso de pintura.
    </p>
    <p>
        Estas realizaciones cuentan con un trabajo artístico profundo que puede representar <strong>decenas, incluso cientos de horas de pintura</strong>, con técnicas avanzadas, atención a los mínimos detalles y una búsqueda constante del mejor resultado posible.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/collection1.jpg" alt="Figurilla de colección pintada"></div>
          <div class="exemples-photos">
        <img src="img/collection2.jpg" alt="Pieza de exposición pintada"></div>
          <div class="exemples-photos">
        <img src="img/collection3.jpg" alt="Figurilla de concurso pintada"></divX
    </div>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Solicitud%20de%20presupuesto%20-%20Proyecto%20de%20pintura%20de%20miniaturas&body=Hola%20Studio%20PF,%0A%0ADeseo%20solicitar%20un%20presupuesto%20para%20el%20siguiente%20proyecto:%0A%0A---%20Tipo%20de%20proyecto%20(Ej%C3%A9rcito%20/%20Colecci%C3%B3n%20/%20Concurso)%20:%0A%0A---%20Juego%20o%20universo%20:%0A%0A---%20Nombre%20de%20las%20miniaturas%20:%0A%0A---%20Cantidad%20de%20miniaturas%20:%0A%0A---%20Nivel%20de%20acabado%20deseado%20(TableTop%20/%20TableTop%2B%20/%20Vitrina)%20:%0A%0A---%20%C2%BFEs%20necesario%20el%20montaje%3F%20(S%C3%AD%20/%20No)%20:%0A%0A---%20Fecha%20deseada%20(si%20es%20urgente)%20:%0A%0A---%20Fotos%20o%20enlaces%20de%20referencia%20:%0A%0A---%20Comentarios%20o%20solicitudes%20especiales%20:%0A%0A%C2%A1Muchas%20gracias!"
   class="button">
     Solicitar un presupuesto personalizado 💬
</a>

</div>

<div class="maintenance-box ajust fondknigt">
    <h2>🏞️ Dioramas y Escenas de Exposición</h2>
    <p>
        Studio PF realiza <strong>dioramas a medida</strong> que escenifican una o varias figurillas en un decorado completamente diseñado para contar una historia.
    </p>
    <p>
        Campos de batalla, ruinas antiguas, mazmorras, paisajes nevados, bosques, ciudades futuristas o entornos post-apocalípticos: cada proyecto está concebido para crear una escena viva e inmersiva.
    </p>
    <p>
        Destinados a coleccionistas, exposición o concursos, los dioramas combinan pintura, composición, decorados, texturas, vegetación, efectos especiales y puesta en escena para transformar una simple figurilla en una obra única.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/diorama1.jpg" alt="Diorama de figurillas"></div>
          <div class="exemples-photos">
        <img src="img/diorama2.jpg" alt="Escena de exposición en diorama"></div>
          <div class="exemples-photos">
        <img src="img/diorama3.jpg" alt="Diorama pintado por Studio PF"></div>
    </div>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Solicitud%20de%20presupuesto%20-%20Proyecto%20de%20pintura%20de%20miniaturas&body=Hola%20Studio%20PF,%0A%0ADeseo%20solicitar%20un%20presupuesto%20para%20el%20siguiente%20proyecto:%0A%0A---%20Tipo%20de%20proyecto%20(Ej%C3%A9rcito%20/%20Colecci%C3%B3n%20/%20Concurso)%20:%0A%0A---%20Juego%20o%20universo%20:%0A%0A---%20Nombre%20de%20las%20miniaturas%20:%0A%0A---%20Cantidad%20de%20miniaturas%20:%0A%0A---%20Nivel%20de%20acabado%20deseado%20(TableTop%20/%20TableTop%2B%20/%20Vitrina)%20:%0A%0A---%20%C2%BFEs%20necesario%20el%20montaje%3F%20(S%C3%AD%20/%20No)%20:%0A%0A---%20Fecha%20deseada%20(si%20es%20urgente)%20:%0A%0A---%20Fotos%20o%20enlaces%20de%20referencia%20:%0A%0A---%20Comentarios%20o%20solicitudes%20especiales%20:%0A%0A%C2%A1Muchas%20gracias!"
   class="button">
     Solicitar un presupuesto personalizado 💬
</a>

</div>

<div class="maintenance-box ajust fondnain">
    <h2>🗿 Bustos y Piezas de Colección</h2>
    <p>
        Studio PF realiza la pintura de <strong>bustos, estatuas en miniatura y piezas de colección</strong> destinadas a ser expuestas en vitrina o enriquecer una colección personal.
    </p>
    <p>
        Cada proyecto se aborda de forma completamente personalizada para realzar la escultura, los volúmenes, las texturas y la expresión del personaje. Encarnado, metales, cuero, telas, envejecimiento o efectos de ambiente: cada detalle se trabaja para dar vida a la pieza.
    </p>
    <p>
        Estas realizaciones se dirigen tanto a coleccionistas como a apasionados que desean disponer de una pieza única, ya sea un busto histórico, de fantasía, ciencia ficción o una creación original.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/buste1.jpg" alt="Busto histórico pintado"></div>
          <div class="exemples-photos">
        <img src="img/buste2.jpg" alt="Busto de fantasía pintado"></div>
          <div class="exemples-photos">
        <img src="img/buste3.jpg" alt="Busto de colección pintado"></div>
    </div>
<a href="mailto:studiopeinturefigurine@gmail.com?subject=Solicitud%20de%20presupuesto%20-%20Proyecto%20de%20pintura%20de%20miniaturas&body=Hola%20Studio%20PF,%0A%0ADeseo%20solicitar%20un%20presupuesto%20para%20el%20siguiente%20proyecto:%0A%0A---%20Tipo%20de%20proyecto%20(Ej%C3%A9rcito%20/%20Colecci%C3%B3n%20/%20Concurso)%20:%0A%0A---%20Juego%20o%20universo%20:%0A%0A---%20Nombre%20de%20las%20miniaturas%20:%0A%0A---%20Cantidad%20de%20miniaturas%20:%0A%0A---%20Nivel%20de%20acabado%20deseado%20(TableTop%20/%20TableTop%2B%20/%20Vitrina)%20:%0A%0A---%20%C2%BFEs%20necesario%20el%20montaje%3F%20(S%C3%AD%20/%20No)%20:%0A%0A---%20Fecha%20deseada%20(si%20es%20urgente)%20:%0A%0A---%20Fotos%20o%20enlaces%20de%20referencia%20:%0A%0A---%20Comentarios%20o%20solicitudes%20especiales%20:%0A%0A%C2%A1Muchas%20gracias!"
   class="button">
     Solicitar un presupuesto personalizado 💬
</a>

</div>

<div class="maintenance-box ajust fondfreezer">
    <h2>🎬 Manga, Películas, Series y Videojuegos</h2>
    <p>
        ¿Posees una figurilla inspirada en tu universo favorito?
        Studio PF realiza la pintura de piezas provenientes de <strong>mangas, películas, series, videojuegos y licencias de pop culture</strong>, ya sean personajes icónicos o creaciones originales.
    </p>
    <p>
        Dragon Ball, One Piece, Naruto, Demon Slayer, Star Wars, Marvel, DC Comics, El Señor de los Anillos, The Witcher, Elden Ring, Zelda, WarCraft... Todas las licencias son bienvenidas.
    </p>
    <p>
        La mayoría de estos modelos provienen de creadores 3D independientes o están disponibles en plataformas especializadas como Etsy, MyMiniFactory u otras tiendas dedicadas a coleccionistas.
    </p>
    <h3>Información importante</h3>
    <p>
        <strong>Studio PF no suministra las figurillas ni realiza su impresión 3D en el marco de este servicio.</strong><br>
        El cliente proporciona la pieza o la adquiere directamente del creador o vendedor de su elección. El trabajo de Studio PF consiste luego en preparar, pintar y realzar la figurilla con un acabado de alta gama.
    </p>
    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/pop1.jpg" alt="Figurilla manga pintada"></div>
          <div class="exemples-photos">
        <img src="img/pop2.jpg" alt="Figurilla de serie pintada"></div>
          <div class="exemples-photos">
        <img src="img/pop3.jpg" alt="Figurilla de videojuego pintada"></div>
    </div>

<a href="mailto:studiopeinturefigurine@gmail.com?subject=Solicitud%20de%20presupuesto%20-%20Proyecto%20de%20pintura%20de%20miniaturas&body=Hola%20Studio%20PF,%0A%0ADeseo%20solicitar%20un%20presupuesto%20para%20el%20siguiente%20proyecto:%0A%0A---%20Tipo%20de%20proyecto%20(Ej%C3%A9rcito%20/%20Colecci%C3%B3n%20/%20Concurso)%20:%0A%0A---%20Juego%20o%20universo%20:%0A%0A---%20Nombre%20de%20las%20miniaturas%20:%0A%0A---%20Cantidad%20de%20miniaturas%20:%0A%0A---%20Nivel%20de%20acabado%20deseado%20(TableTop%20/%20TableTop%2B%20/%20Vitrina)%20:%0A%0A---%20%C2%BFEs%20necesario%20el%20montaje%3F%20(S%C3%AD%20/%20No)%20:%0A%0A---%20Fecha%20deseada%20(si%20es%20urgente)%20:%0A%0A---%20Fotos%20o%20enlaces%20de%20referencia%20:%0A%0A---%20Comentarios%20o%20solicitudes%20especiales%20:%0A%0A%C2%A1Muchas%20gracias!"
   class="button">
     Solicitar un presupuesto personalizado 💬
</a>

</div>

<div class="maintenance-box ajust fonddg">
    <h2>🎨 Un enfoque artístico de la pintura</h2>
    <p>
        <strong>✨ Trabajo de volúmenes:</strong><br>
        Cada pieza se pinta buscando degradados sutiles, transiciones naturales y aclarados precisos para revelar toda la riqueza de la escultura y acentuar su legibilidad desde todos los ángulos.
    </p>
    <p>
        <strong>🎭 Dirección artística:</strong><br>
        Los colores, contrastes y efectos de luz se piensan en su conjunto para crear una composición armoniosa. El objetivo es guiar la mirada y dar a la figurilla una verdadera identidad visual.
    </p>
    <p>
        <strong>🧪 Materias y texturas:</strong><br>
        Metal, cuero, telas, piel, madera, piedra, óxido o materiales fantásticos: cada textura se trabaja individualmente para reforzar el realismo o el estilo buscado en la pieza.
    </p>
    <p>
        <strong>💡 Técnicas avanzadas:</strong><br>
        Según las necesidades del proyecto, Studio PF utiliza veladuras, pinturas al óleo, pigmentos, efectos de luz (OSL), weathering, fundidos, detalles muy finos y numerosas técnicas profesionales para obtener un resultado digno de una pieza de exposición o concurso.
    </p>
</div>

<div class="maintenance-box ajust fondslann">
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
    <td>Colección<br>exposición<br>vitrina o concurso</td>
    </tr>
    <tr>
    <td>Nivel de acabado</td>
    <td>Muy alto acabado con trabajo artístico profundo</td>
    </tr>
    <tr>
    <td>Pintura</td>
    <td>Degradados finos<br>matices complejos<br>texturas<br>efectos avanzados</td>
    </tr>
    <tr>
    <td>Tiempo de realización</td>
    <td>Proyecto que puede representar decenas de horas de trabajo</td>
    </tr>
    <tr>
    <td>Enfoque</td>
    <td>Cada pieza es única<br>estudiada individualmente</td>
    </tr>
    </tbody>
    </table>
</div>`;
    } else {
        html = `<div class="maintenance-box ajust fondorc">

    <h1>🏆 Pièces uniques pour Collection, Exposition & Concours</h1>

    <p>
        Studio PF réalise des <strong>figurines haut de gamme</strong> destinées aux collectionneurs, passionnés et compétiteurs souhaitant transformer leurs modèles en véritables œuvres d'exposition.
    </p>

    <p>
        Chaque projet est entièrement personnalisé en fonction de la sculpture, de son univers et de son objectif : enrichir une collection, être exposé en vitrine ou participer à un concours de peinture.
    </p>

    <p>
        Ces réalisations bénéficient d'un travail artistique approfondi pouvant représenter <strong>plusieurs dizaines, voire plusieurs centaines d'heures de peinture</strong>, avec des techniques avancées, une attention portée aux moindres détails et une recherche permanente du meilleur rendu possible.
    </p>

    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/collection1.jpg" alt="Figurine de collection peinte"></div>
          <div class="exemples-photos">
        <img src="img/collection2.jpg" alt="Pièce d'exposition peinte"></div>
          <div class="exemples-photos">
        <img src="img/collection3.jpg" alt="Figurine de concours peinte"></div>
    </div>

<a href="mailto:studiopeinturefigurine@gmail.com?subject=Demande%20de%20devis%20-%20Projet%20de%20peinture%20sur%20figurines&body=Bonjour%20Studio%20PF,%0A%0AJe%20souhaite%20obtenir%20un%20devis%20pour%20le%20projet%20suivant%20:%0A%0A---%20Type%20de%20projet%20(Arm%C3%A9e%20/%20Collection%20/%20Concours)%20:%0A%0A---%20Jeu%20ou%20univers%20:%0A%0A---%20Nom%20des%20figurines%20:%0A%0A---%20Nombre%20de%20figurines%20:%0A%0A---%20Niveau%20de%20peinture%20souhait%C3%A9%20(TableTop%20/%20TableTop%2B%20/%20Vitrine)%20:%0A%0A---%20Montage%20%C3%A0%20r%C3%A9aliser%20(Oui%20/%20Non)%20:%0A%0A---%20Date%20souhait%C3%A9e%20(si%20urgence)%20:%0A%0A---%20Photos%20ou%20liens%20de%20r%C3%A9f%C3%A9rence%20:%0A%0A---%20Commentaires%20ou%20demandes%20particuli%C3%A8res%20:%0A%0AMerci%20!"
   class="button">
     Demander un devis personnalisé 💬
</a>


</div>
  <div class="maintenance-box ajust fondknigt">

    <h2>🏞️ Dioramas & Scènes d'exposition</h2>

    <p>
        Studio PF réalise des <strong>dioramas sur mesure</strong> mettant en scène une ou plusieurs figurines dans un décor entièrement pensé pour raconter une histoire.
    </p>

    <p>
        Champs de bataille, ruines antiques, donjons, paysages enneigés, forêts, cités futuristes ou environnements post-apocalyptiques : chaque projet est conçu pour créer une véritable scène vivante et immersive.
    </p>

    <p>
        Destinés aux collectionneurs, à l'exposition ou aux concours, les dioramas associent peinture, composition, décors, textures, végétation, effets spéciaux et mise en scène afin de transformer une simple figurine en une œuvre unique.
    </p>

    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/diorama1.jpg" alt="Diorama de figurines"></div>
          <div class="exemples-photos">
        <img src="img/diorama2.jpg" alt="Scène d'exposition sur diorama"></div>
          <div class="exemples-photos">
        <img src="img/diorama3.jpg" alt="Diorama peint par Studio PF"></div>
    </div>

<a href="mailto:studiopeinturefigurine@gmail.com?subject=Demande%20de%20devis%20-%20Projet%20de%20peinture%20sur%20figurines&body=Bonjour%20Studio%20PF,%0A%0AJe%20souhaite%20obtenir%20un%20devis%20pour%20le%20projet%20suivant%20:%0A%0A---%20Type%20de%20projet%20(Arm%C3%A9e%20/%20Collection%20/%20Concours)%20:%0A%0A---%20Jeu%20ou%20univers%20:%0A%0A---%20Nom%20des%20figurines%20:%0A%0A---%20Nombre%20de%20figurines%20:%0A%0A---%20Niveau%20de%20peinture%20souhait%C3%A9%20(TableTop%20/%20TableTop%2B%20/%20Vitrine)%20:%0A%0A---%20Montage%20%C3%A0%20r%C3%A9aliser%20(Oui%20/%20Non)%20:%0A%0A---%20Date%20souhait%C3%A9e%20(si%20urgence)%20:%0A%0A---%20Photos%20ou%20liens%20de%20r%C3%A9f%C3%A9rence%20:%0A%0A---%20Commentaires%20ou%20demandes%20particuli%C3%A8res%20:%0A%0AMerci%20!"
   class="button">
     Demander un devis personnalisé 💬
</a>


</div>


    <div class="maintenance-box ajust fondnain">

    <h2>🗿 Bustes & Pièces de Collection</h2>

    <p>
        Studio PF réalise la peinture de <strong>bustes, statues miniatures et pièces de collection</strong> destinés à être exposés en vitrine ou à enrichir une collection personnelle.
    </p>

    <p>
        Chaque projet fait l'objet d'une approche entièrement personnalisée afin de mettre en valeur la sculpture, les volumes, les textures et l'expression du personnage. Carnation, métaux, cuir, tissus, vieillissement ou effets d'ambiance : chaque détail est travaillé pour donner vie à la pièce.
    </p>

    <p>
        Ces réalisations s'adressent aussi bien aux collectionneurs qu'aux passionnés souhaitant disposer d'une pièce unique, qu'il s'agisse d'un buste historique, fantasy, science-fiction ou d'une création originale.
    </p>

    <!-- Illustrations -->
    <div class="exemples-photos3">
      <div class="exemples-photos">
        <img src="img/buste1.jpg" alt="Buste historique peint"></div>
          <div class="exemples-photos">
        <img src="img/buste2.jpg" alt="Buste fantasy peint"></div>
          <div class="exemples-photos">
        <img src="img/buste3.jpg" alt="Buste de collection peint"></div>
    </div>

  <a href="mailto:studiopeinturefigurine@gmail.com?subject=Demande%20de%20devis%20-%20Projet%20de%20peinture%20sur%20figurines&body=Bonjour%20Studio%20PF,%0A%0AJe%20souhaite%20obtenir%20un%20devis%20pour%20le%20projet%20suivant%20:%0A%0A---%20Type%20de%20projet%20(Arm%C3%A9e%20/%20Collection%20/%20Concours)%20:%0A%0A---%20Jeu%20ou%20univers%20:%0A%0A---%20Nom%20des%20figurines%20:%0A%0A---%20Nombre%20de%20figurines%20:%0A%0A---%20Niveau%20de%20peinture%20souhait%C3%A9%20(TableTop%20/%20TableTop%2B%20/%20Vitrine)%20:%0A%0A---%20Montage%20%C3%A0%20r%C3%A9aliser%20(Oui%20/%20Non)%20:%0A%0A---%20Date%20souhait%C3%A9e%20(si%20urgence)%20:%0A%0A---%20Photos%20ou%20liens%20de%20r%C3%A9f%C3%A9rence%20:%0A%0A---%20Commentaires%20ou%20demandes%20particuli%C3%A8res%20:%0A%0AMerci%20!"
   class="button">
     Demander un devis personnalisé 💬
</a>


</div>


    <div class="maintenance-box ajust fondfreezer">

    <h2>🎬 Manga, Films, Séries & Jeux vidéo</h2>

    <p>
        Vous possédez une figurine inspirée de votre univers préféré ?
        Studio PF réalise la peinture de pièces issues de <strong>mangas, films, séries, jeux vidéo et licences de pop culture</strong>, qu'il s'agisse de personnages iconiques ou de créations originales.
    </p>

    <p>
        Dragon Ball, One Piece, Naruto, Demon Slayer, Star Wars, Marvel, DC Comics, Le Seigneur des Anneaux, The Witcher, Elden Ring, Zelda, WarCraft... Toutes les licences sont les bienvenues.
    </p>

    <p>
        La plupart de ces modèles proviennent de créateurs 3D indépendants ou sont disponibles auprès de plateformes spécialisées telles que Etsy, MyMiniFactory ou d'autres boutiques dédiées aux collectionneurs.
    </p>

    <h3>Informations importantes</h3>

    <p>
        <strong>Studio PF ne fournit pas les figurines et ne réalise pas leur impression 3D dans le cadre de cette prestation.</strong><br>
        Le client fournit la pièce ou l'acquiert directement auprès du créateur ou du vendeur de son choix. Le travail de Studio PF consiste ensuite à préparer, peindre et mettre en valeur la figurine avec une finition haut de gamme.
    </p>

    <!-- Illustrations -->
    <div class="exemples-photos3">  <div class="exemples-photos">
        <img src="img/pop1.jpg" alt="Figurine manga peinte"></div>
          <div class="exemples-photos">
        <img src="img/pop2.jpg" alt="Figurine de série peinte"></div>
          <div class="exemples-photos">
        <img src="img/pop3.jpg" alt="Figurine de jeu vidéo peinte"></div>
    </div>

<a href="mailto:studiopeinturefigurine@gmail.com?subject=Demande%20de%20devis%20-%20Projet%20de%20peinture%20sur%20figurines&body=Bonjour%20Studio%20PF,%0A%0AJe%20souhaite%20obtenir%20un%20devis%20pour%20le%20projet%20suivant%20:%0A%0A---%20Type%20de%20projet%20(Arm%C3%A9e%20/%20Collection%20/%20Concours)%20:%0A%0A---%20Jeu%20ou%20univers%20:%0A%0A---%20Nom%20des%20figurines%20:%0A%0A---%20Nombre%20de%20figurines%20:%0A%0A---%20Niveau%20de%20peinture%20souhait%C3%A9%20(TableTop%20/%20TableTop%2B%20/%20Vitrine)%20:%0A%0A---%20Montage%20%C3%A0%20r%C3%A9aliser%20(Oui%20/%20Non)%20:%0A%0A---%20Date%20souhait%C3%A9e%20(si%20urgence)%20:%0A%0A---%20Photos%20ou%20liens%20de%20r%C3%A9f%C3%A9rence%20:%0A%0A---%20Commentaires%20ou%20demandes%20particuli%C3%A8res%20:%0A%0AMerci%20!"
   class="button">
     Demander un devis personnalisé 💬
</a>


</div>



<div class="maintenance-box ajust fonddg">

    <h2>🎨 Une approche artistique de la peinture</h2>

    <p>
        <strong>✨ Travail des volumes :</strong><br>
        Chaque pièce est peinte en recherchant des dégradés subtils, des transitions naturelles et des éclaircissements précis afin de révéler toute la richesse de la sculpture et d'accentuer sa lisibilité sous tous les angles.
    </p>

    <p>
        <strong>🎭 Direction artistique :</strong><br>
        Les couleurs, les contrastes et les effets de lumière sont pensés dans leur ensemble pour créer une composition harmonieuse. L'objectif est de guider le regard et de donner à la figurine une véritable identité visuelle.
    </p>

    <p>
        <strong>🧪 Matières & textures :</strong><br>
        Métal, cuir, tissus, peau, bois, pierre, rouille ou matériaux fantastiques : chaque texture est travaillée individuellement afin de renforcer le réalisme ou le style recherché par la pièce.
    </p>

    <p>
        <strong>💡 Techniques avancées :</strong><br>
        Selon les besoins du projet, Studio PF utilise des glacis, peintures à l'huile, pigments, effets de lumière (OSL), weathering, fondus, détails très fins et de nombreuses techniques professionnelles pour obtenir un résultat digne d'une pièce d'exposition ou de concours.
    </p>

</div>



<div class="maintenance-box ajust fondslann">

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
<td>Collection<br>exposition<br>vitrine ou concours</td>
</tr>

<tr>
<td>Niveau de finition</td>
<td>Très haute finition avec travail artistique approfondi</td>
</tr>

<tr>
<td>Peinture</td>
<td>Dégradés fins<br> nuances complexes<br>textures<br>effets avancés</td>
</tr>

<tr>
<td>Temps de réalisation</td>
<td>Projet pouvant représenter plusieurs dizaines d'heures de travail</td>
</tr>

<tr>
<td>Approche</td>
<td>Chaque pièce est unique<br>étudiée individuellement</td>
</tr>

</tbody>

</table>

</div>`;
     }

    main.innerHTML = html;
}

// ────────────────────────────────────────────────
// Menus multilingues
// ────────────────────────────────────────────────
function changelanguequisuisje() {

      const main = document.getElementById("contenu-principal");


    let html = "";

    if (currentLanguage === "english") {
        html = `<div class="maintenance-box ajust fondmoi">
     <h1>👋 Who am I?</h1>
<h2>Pierre-François, aka PF — Professional Figurine Painter & Founder of Studio PF</h2>
<p>
    My name is <strong>Pierre-François</strong>, known in the community as <strong>PF</strong>. I am a professional figurine painter and the founder of <strong>Studio PF</strong>, a workshop specializing in high-end painting, collectible pieces, competition projects, and training.
</p>
<p>
    In 2025, I had the pleasure of seeing <a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Le Progrès</strong></a> dedicate an article to my journey, recounting the birth of <strong>Studio PF</strong> and the evolution of my career as a professional figurine painter.
</p>
<p>
    I work mainly with acrylics, oils, and pigments to bring expressive, readable, and faithful-to-their-universe figurines to life.
</p>
<p>
    <strong>« Every figurine tells a story. My role is to make it shine. » ✨</strong>
</p>
 <div class="exemples-photos">
     <img src="img/moi.jpg" alt="Pierre-François FRASSE - fondateur de Studio PF">
    </div>

<a href="galerie.html" onclick="loadPage('galerie.html'); return false;" class="button">
    Discover my artistic universe 🖼️
</a>
    </div>

    <!-- ================================================== -->
    <!-- ORIGINES & DÉBUTS -->
    <!-- ================================================== -->
    <div class="maintenance-box ajust fondfreezer">
    <h2>🏰 From imaginary worlds to the first brushes</h2>
    <p>
        Passionate since childhood about fantasy, science fiction, Tolkien,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/star-wars/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Star Wars</strong></a>,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/marvel-crisi-protocol-maxireves/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Marvel Crisis Protocol</strong></a>,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/autres-jeux-de-figurines/heroquest/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>HeroQuest</strong></a>,
        <a href="https://maxireves.fr/shop/?s=donjons+et+dragons" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Dungeons & Dragons</strong></a>
        and board games, I discovered
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>
        in high school. My first attempts on Eldar were… catastrophic! Thick layers, garish colors, lack of technique: I quickly gave up, convinced that painting was not for me.
    </p>
    <p>
        The real breakthrough came later at
        <a href="https://www.facebook.com/replaygames.shop" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Replay Games</strong></a>
        in Roanne, thanks to an introduction to
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer Age of Sigmar</strong></a>
        and the kindness of Valentin. I left with an army of
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/seraphon/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Seraphon</strong></a>,
        and this time I never stopped.
    </p>
    <p>
        Since then, I have also had the pleasure of painting figurines from many universes, such as
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-the-old-world/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer The Old World</strong></a>,
        <a href="https://maxireves.fr/shop/?s=seigneur+des+anneaux" class="surligne" target="_blank" rel="noopener noreferrer"><strong>The Lord of the Rings™ Strategy Battle Game</strong></a>,
        as well as many other miniature, board, and collectible games.
    </p>
    <a href="peinturecollection.html"
   onclick="loadPage('peinturecollection.html'); return false;"
   class="button">
    🏆 What if your universe became a collectible piece?
</a>
</div>

    <!-- ================================================== -->
    <!-- PROGRESSION & CRÉATION DU STUDIO -->
    <!-- ================================================== -->
<div class="maintenance-box ajust fondslann">
    <h2>🦎 From passion to profession</h2>
<p>
    Over the years, I have had the opportunity to paint many armies and factions. It all started with my
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/seraphon/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Seraphon</strong></a>,
    then came the
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/grand-alliance-destruction/sons-of-behemat/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Sons of Behemat</strong></a>,
    the
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/daughters-of-khaine/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Daughters of Khaine</strong></a>,
    then three
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/idoneth-deepkin/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Idoneth Deepkin</strong></a>
    armies, with which I participated in numerous tournaments. I then painted
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-de-limperium/adeptus-custodes/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Adeptus Custodes</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-du-chaos/chaos-knights/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Chaos Knights</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-du-chaos/death-guard/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Death Guard</strong></a>,
    as well as many other armies from
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Age of Sigmar</strong></a>
    and
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>.
</p>
<p>
    During the Covid period, I had a lot of free time. I then fully 3D printed and painted a complete army of <strong>2,000 points of Nurgle</strong> in just one week. Advancing day after day, without really realizing it, I understood how much I had progressed and everything that could be achieved with motivation and effective organization. It was during this period that the idea of creating a true professional painting studio began to take shape.
</p>
<p>
    It was around that time that my friend <strong>Jérémy</strong> said something to me that I have never forgotten: <em>“You’ll end up making this your job, mate.”</em> At the time, it seemed almost unrealistic. However, the idea started to grow, and the project of creating a real painting studio was gradually born.
</p>
<p>
    A few months later, after a work accident followed by a layoff, and thanks to the support of my wife <strong>Gaëlle</strong>, I decided to turn this idea into reality. This is how <strong>Studio PF</strong> was born, with a simple ambition: to offer a professional painting service capable of bringing every figurine to life, whether intended for gaming, collecting, or competition.
</p>
<div class="exemples-photos">
    <img src="img/covid.jpg" alt="One of the units printed and painted during the COVID pandemic...">
</div>
<a href="peinturecommission.html"
   onclick="loadPage('peinturecommission.html'); return false;"
   class="button">
    ⚔️ What if your army became unique?
</a>
</div>

    <!-- ================================================== -->
    <!-- FORMATION & COMMUNAUTÉ -->
    <!-- ================================================== -->

  <!--
  <div class="maintenance-box ajust fondnurgle">
    <h2>📚 Transmission and community</h2>
 <p>
    When I created <strong>Studio PF</strong>, I didn’t just want to paint figurines. I also wanted to pass on everything I wish I had learned when I started. My own difficulties taught me the importance of a clear method: avoiding classic mistakes, understanding the right techniques, mastering the airbrush, and progressing with confidence. Today, it is this experience that I share through my training courses and content.
</p>
    <p>
        To go even further, I chose to train with
        <a href="https://mohand-art.com/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Mohand Art</strong></a>,
        a professional painter who has won multiple awards at the <a href="https://thegoldendemoncompendium.com/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Golden Demon</strong></a>. This training allowed me to refine my techniques, structure my working method, and adopt an even more professional approach to figurine painting. Today, I am passionate about passing on this experience through my courses, demonstrations, and educational content.
    </p>
    <p>
        Studio PF is also a community of enthusiasts I regularly connect with during
        <a href="https://www.twitch.tv/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Twitch live streams</strong></a>,
        where I paint live, share my projects, answer questions, and interact with viewers. You can also find demonstrations, tutorials, guides, and videos on my
        <a href="https://www.youtube.com/@studiopf-fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a> channel,
        as well as exclusive content and more in-depth support on
        <a href="https://www.patreon.com/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Patreon</strong></a>.
    </p>
    <ul>
        <li>🎥 Interactive live streams on <a href="https://www.twitch.tv/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Twitch</strong></a> and detailed tutorials on <a href="https://www.youtube.com/@studiopf-fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a>.</li>
        <li>📱 Tips, creations, and behind-the-scenes of the workshop on <a href="https://www.instagram.com/studiopf.fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Instagram</strong></a> and <a href="https://www.tiktok.com/@studiopf.fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>TikTok</strong></a>.</li>
        <li>💬 Community exchanges on <a href="https://discord.com/invite/Jpa4yvfQVN" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Discord</strong></a> and exclusive content, personalized advice, and follow-up on <a href="https://www.patreon.com/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Patreon</strong></a>.</li>
    </ul>
    <a href="formation.html" onclick="loadPage('formation.html'); return false;" class="button">
        Discover the training packages 📚
    </a>
</div>
-->
    <!-- ================================================== -->
    <!-- AUJOURD’HUI & ENGAGEMENTS -->
    <!-- ================================================== -->
  <div class="maintenance-box ajust fondknigt">
    <h2>🚀 Studio PF today</h2>
    <p>
        Alongside my professional painting activity, I am the president of the miniature wargaming association
        <a href="https://grognards.fr/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Les Grognards</strong>
        </a>
        in <strong>Riorges</strong>. We bring together enthusiasts for games, initiations, demonstrations, and events to introduce the hobby and develop the local community in a friendly atmosphere.
    </p>
    <p>
        I also participate in numerous conventions and painting competitions, notably at
        <a href="https://www.octogones.org/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>OctoGônes</strong>
        </a>.
        My next major goal is to present a piece at the prestigious
        <a href="https://thegoldendemoncompendium.com/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Golden Demon</strong>
        </a>,
        one of the most renowned miniature painting competitions in the world.
    </p>
    <p>
        I am also involved in charity events such as
        <a href="https://sam.collectemuco.org/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Stream Against Muco</strong>
        </a>,
        which mobilizes the streaming community every year to raise funds in the fight against cystic fibrosis.
    </p>
    <p>
        Today, I devote most of my time to high-end painting projects, competition pieces, training, and sharing my experience with the community, both online and at shows, conventions, and events.
    </p>
    <p>
        <strong>
            « If my journey can help even one person dare to pick up their brushes, then it will all have been worth it. » ✨
        </strong>
    </p>
    <a href="galerie.html"
       onclick="loadPage('galerie.html'); return false;"
       class="button">
        Discover Studio PF creations 🎨
    </a>
</div>`;
    } else if (currentLanguage === "spanish") {
        html = `<div class="maintenance-box ajust fondmoi">
     <h1>👋 ¿Quién soy?</h1>
<h2>Pierre-François, alias PF — Artista pintor de figurillas y fundador de Studio PF</h2>
<p>
    Me llamo <strong>Pierre-François</strong>, conocido en el medio como <strong>PF</strong>. Soy artista pintor profesional de figurillas y fundador de <strong>Studio PF</strong>, un taller especializado en pintura de alta gama, piezas de colección, proyectos de concurso y formación.
</p>
<p>
    En 2025, tuve el placer de ver cómo <a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Le Progrès</strong></a> dedicaba un artículo a mi trayectoria, relatando el nacimiento de <strong>Studio PF</strong> y la evolución de mi actividad como pintor profesional de figurillas.
</p>
<p>
    Trabajo principalmente con acrílico, óleo y pigmentos para dar vida a figurillas expresivas, legibles y fieles a su universo.
</p>
<p>
    <strong>« Cada figurilla cuenta una historia. Mi rol es hacerla brillar. » ✨</strong>
</p>
 <div class="exemples-photos">
     <img src="img/moi.jpg" alt="Pierre-François FRASSE - fondateur de Studio PF">
    </div>

<a href="galerie.html" onclick="loadPage('galerie.html'); return false;" class="button">
    Descubrir mi universo artístico 🖼️
</a>
    </div>

    <!-- ================================================== -->
    <!-- ORIGINES & DÉBUTS -->
    <!-- ================================================== -->
    <div class="maintenance-box ajust fondfreezer">
    <h2>🏰 De los mundos imaginarios a los primeros pinceles</h2>
    <p>
        Apasionado desde la infancia por la fantasía, la ciencia ficción, Tolkien,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/star-wars/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Star Wars</strong></a>,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/marvel-crisi-protocol-maxireves/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Marvel Crisis Protocol</strong></a>,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/autres-jeux-de-figurines/heroquest/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>HeroQuest</strong></a>,
        <a href="https://maxireves.fr/shop/?s=donjons+et+dragons" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Donjons & Dragons</strong></a>
        y los juegos de mesa, descubrí
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>
        en el instituto. Mis primeros intentos con Eldars fueron… ¡catastróficos! Capas gruesas, colores chillones, ausencia de técnica: rápidamente abandoné, convencido de que la pintura no era para mí.
    </p>
    <p>
        El verdadero clic llegó más tarde en
        <a href="https://www.facebook.com/replaygames.shop" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Replay Games</strong></a>
        en Roanne, gracias a una iniciación a
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer Age of Sigmar</strong></a>
        y a la amabilidad de Valentin. Salí de allí con un ejército de
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/seraphon/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Seraphon</strong></a>,
        y esta vez no me detuve más.
    </p>
    <p>
        Desde entonces, también he tenido el placer de pintar figurillas de numerosos universos, como
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-the-old-world/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer The Old World</strong></a>,
        <a href="https://maxireves.fr/shop/?s=seigneur+des+anneaux" class="surligne" target="_blank" rel="noopener noreferrer"><strong>El Señor de los Anillos™ Strategy Battle Game</strong></a>,
        así como muchos otros juegos de figurillas, de mesa y de colección.
    </p>
    <a href="peinturecollection.html"
   onclick="loadPage('peinturecollection.html'); return false;"
   class="button">
    🏆 ¿Y si tu universo se convirtiera en una pieza de colección?
</a>
</div>

    <!-- ================================================== -->
    <!-- PROGRESSION & CRÉATION DU STUDIO -->
    <!-- ================================================== -->
<div class="maintenance-box ajust fondslann">
    <h2>🦎 De la pasión al oficio</h2>
<p>
    A lo largo de los años, he tenido la oportunidad de pintar numerosos ejércitos y facciones. Todo comenzó con mis
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/seraphon/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Seraphon</strong></a>,
    luego llegaron los
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/grand-alliance-destruction/sons-of-behemat/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Sons of Behemat</strong></a>,
    las
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/daughters-of-khaine/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Daughters of Khaine</strong></a>,
    luego tres ejércitos
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/idoneth-deepkin/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Idoneth Deepkin</strong></a>,
    con los que participé en numerosos torneos. Después pinté
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-de-limperium/adeptus-custodes/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Adeptus Custodes</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-du-chaos/chaos-knights/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Chaos Knights</strong></a>,
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-du-chaos/death-guard/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Death Guard</strong></a>,
    así como muchos otros ejércitos de
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Age of Sigmar</strong></a>
    y
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>.
</p>
<p>
    Durante el periodo del Covid, disponía de mucho tiempo libre. Entonces imprimí completamente en 3D y pinté un ejército completo de <strong>2.000 puntos de Nurgle</strong> en solo una semana. Avanzando día tras día, sin darme realmente cuenta, comprendí cuánto había progresado y todo lo que se podía lograr con motivación y una organización eficaz. Fue en esa época cuando la idea de crear un verdadero estudio de pintura profesional empezó a tomar forma.
</p>
<p>
    Fue en esa época que mi amigo <strong>Jérémy</strong> me soltó una frase que nunca olvidé: <em>« Terminarás haciendo de esto tu profesión, amigo. »</em> En ese momento me parecía casi irreal. Sin embargo, esa idea comenzó a madurar y el proyecto de crear un verdadero estudio de pintura nació progresivamente.
</p>
<p>
    Algunos meses después, tras un accidente laboral seguido de un despido, y gracias al apoyo de mi esposa <strong>Gaëlle</strong>, decidí convertir esa idea en realidad. Así nació <strong>Studio PF</strong>, con una ambición sencilla: ofrecer un servicio de pintura profesional capaz de dar vida a cada figurilla, ya sea destinada al juego, a la colección o a la competición.
</p>
<div class="exemples-photos">
    <img src="img/covid.jpg" alt="Una de las unidades impresa y pintada durante la pandemia de COVID...">
</div>

<a href="peinturecommission.html"
   onclick="loadPage('peinturecommission.html'); return false;"
   class="button">
    ⚔️ ¿Y si tu ejército se volviera único?
</a>
</div>

    <!-- ================================================== -->
    <!-- FORMATION & COMMUNAUTÉ -->
    <!-- ================================================== -->
 <!--
 <div class="maintenance-box ajust fondnurgle">
    <h2>📚 Transmisión y comunidad</h2>
 <p>
    Al crear <strong>Studio PF</strong>, no quería solo pintar figurillas. También quería transmitir todo lo que me hubiera gustado aprender cuando empecé. Mis propias dificultades me enseñaron la importancia de un método claro: evitar errores clásicos, comprender los gestos correctos, dominar el aerógrafo y progresar con confianza. Hoy, es esa experiencia la que comparto a través de mis formaciones y contenidos.
</p>
    <p>
        Para ir aún más lejos, elegí formarme con
        <a href="https://mohand-art.com/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Mohand Art</strong></a>,
        pintor profesional galardonado varias veces en el <a href="https://thegoldendemoncompendium.com/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Golden Demon</strong></a>. Esta formación me permitió perfeccionar mis técnicas, estructurar mi método de trabajo y adoptar un enfoque aún más profesional de la pintura de figurillas. Hoy, me apasiona transmitir a mi vez esta experiencia a través de mis cursos, demostraciones y contenidos pedagógicos.
    </p>
    <p>
        Studio PF también es una comunidad de apasionados con los que me reencuentro regularmente durante
        <a href="https://www.twitch.tv/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>lives en Twitch</strong></a>,
        donde pinto en directo, comparto mis proyectos, respondo preguntas e intercambio con los espectadores. También puedes encontrar demostraciones, tutoriales, guías y vídeos en mi canal de
        <a href="https://www.youtube.com/@studiopf-fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a>,
        así como contenidos exclusivos y un acompañamiento más profundo en
        <a href="https://www.patreon.com/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Patreon</strong></a>.
    </p>
    <ul>
        <li>🎥 Lives interactivos en <a href="https://www.twitch.tv/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Twitch</strong></a> y tutoriales detallados en <a href="https://www.youtube.com/@studiopf-fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a>.</li>
        <li>📱 Consejos, realizaciones y bastidores del taller en <a href="https://www.instagram.com/studiopf.fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Instagram</strong></a> y <a href="https://www.tiktok.com/@studiopf.fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>TikTok</strong></a>.</li>
        <li>💬 Intercambios con la comunidad en <a href="https://discord.com/invite/Jpa4yvfQVN" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Discord</strong></a> y contenidos exclusivos, consejos personalizados y seguimiento en <a href="https://www.patreon.com/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Patreon</strong></a>.</li>
    </ul>
    <a href="formation.html" onclick="loadPage('formation.html'); return false;" class="button">
        Descubrir los paquetes de formación 📚
    </a>
</div>
-->
    <!-- ================================================== -->
    <!-- AUJOURD’HUI & ENGAGEMENTS -->
    <!-- ================================================== -->
  <div class="maintenance-box ajust fondknigt">
    <h2>🚀 Studio PF hoy</h2>
    <p>
        Paralelamente a mi actividad como pintor profesional, soy presidente de la asociación de juegos de figurillas
        <a href="https://grognards.fr/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Les Grognards</strong>
        </a>
        en <strong>Riorges</strong>. Reunimos a apasionados alrededor de partidas, iniciaciones, demostraciones y eventos para dar a conocer el hobby y desarrollar la comunidad local en un ambiente cordial.
    </p>
    <p>
        También participo en numerosas convenciones y concursos de pintura, especialmente en
        <a href="https://www.octogones.org/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>OctoGônes</strong>
        </a>.
        Mi próximo gran objetivo es presentar una pieza en el prestigioso
        <a href="https://thegoldendemoncompendium.com/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Golden Demon</strong>
        </a>,
        uno de los concursos de pintura de figurillas más reputados del mundo.
    </p>
    <p>
        También me involucro en eventos benéficos como el
        <a href="https://sam.collectemuco.org/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Stream Against Muco</strong>
        </a>,
        que moviliza cada año a la comunidad del streaming para recaudar fondos en la lucha contra la fibrosis quística.
    </p>
    <p>
        Hoy en día, dedico la mayor parte de mi tiempo a proyectos de pintura de alta gama, piezas de concurso, formaciones y al intercambio de mi experiencia con la comunidad, tanto en línea como en salones, convenciones y eventos.
    </p>
    <p>
        <strong>
            « Si mi trayectoria puede ayudar aunque sea a una sola persona a atreverse a tomar sus pinceles, entonces todo esto habrá valido la pena. » ✨
        </strong>
    </p>
    <a href="galerie.html"
       onclick="loadPage('galerie.html'); return false;"
       class="button">
        Descubrir las creaciones de Studio PF 🎨
    </a>
</div>`;
    } else {
        html = ` <div class="maintenance-box ajust fondmoi">
     <h1>👋 Qui suis-je ?</h1>

<h2>Pierre-François, alias PF — Artiste peintre sur figurines & fondateur de Studio PF</h2>

<p>
    Je m’appelle <strong>Pierre-François</strong>, connu dans le milieu sous le nom de <strong>PF</strong>. Je suis artiste peintre professionnel sur figurines et fondateur de <strong>Studio PF</strong>, un atelier spécialisé dans la peinture haut de gamme, les pièces de collection, les projets de concours et la formation.
</p>

<p>
    En 2025, j'ai eu le plaisir de voir <a href="https://www.leprogres.fr/culture-loisirs/2025/05/12/il-est-peintre-professionnel-sur-figurines-depuis-quelques-mois-les-demandes-affluent" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Le Progrès</strong></a> consacrer un article à mon parcours, retraçant la naissance de <strong>Studio PF</strong> et l'évolution de mon activité de peintre professionnel sur figurines.
</p>

<p>
    Je travaille principalement à l’acrylique, à l’huile et aux pigments pour donner vie à des figurines expressives, lisibles et fidèles à leur univers.
</p>

<p>
    <strong>« Chaque figurine raconte une histoire. Mon rôle, c’est de la faire briller. » ✨</strong>
</p>
 <div class="exemples-photos">
     <img src="img/moi.jpg" alt="Pierre-François FRASSE - fondateur de Studio PF">
    </div>

<a href="galerie.html" onclick="loadPage('galerie.html'); return false;" class="button">
    Découvrir mon univers artistique 🖼️
</a>
    </div>

    <!-- ================================================== -->
    <!-- ORIGINES & DÉBUTS -->
    <!-- ================================================== -->
    <div class="maintenance-box ajust fondfreezer">
    <h2>🏰 Des mondes imaginaires aux premiers pinceaux</h2>

    <p>
        Passionné depuis l’enfance par la fantasy, la science-fiction, Tolkien,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/star-wars/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Star Wars</strong></a>,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/marvel-crisi-protocol-maxireves/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Marvel Crisis Protocol</strong></a>,
        <a href="https://maxireves.fr/selection-jeux/jeux-de-figurines/autres-jeux-de-figurines/heroquest/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>HeroQuest</strong></a>,
        <a href="https://maxireves.fr/shop/?s=donjons+et+dragons" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Donjons & Dragons</strong></a>
        et les jeux de plateau, j’ai découvert
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>
        au lycée. Mes premiers essais sur des Eldars furent… catastrophiques ! Couches épaisses, couleurs criardes, absence de technique : j’ai rapidement abandonné, persuadé que la peinture n’était pas faite pour moi.
    </p>

    <p>
        Le véritable déclic est arrivé plus tard chez
        <a href="https://www.facebook.com/replaygames.shop" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Replay Games</strong></a>
        à Roanne, grâce à une initiation à
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer Age of Sigmar</strong></a>
        et à la bienveillance de Valentin. J’en suis ressorti avec une armée de
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/seraphon/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Séraphons</strong></a>,
        et cette fois, je ne me suis plus arrêté.
    </p>

    <p>
        Depuis, j'ai également eu le plaisir de peindre des figurines issues de nombreux univers, comme
        <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-the-old-world/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer The Old World</strong></a>,
        <a href="https://maxireves.fr/shop/?s=seigneur+des+anneaux" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Le Seigneur des Anneaux™ Strategy Battle Game</strong></a>,
        ainsi que de nombreux autres jeux de figurines, de plateau et de collection.
    </p>

    <a href="peinturecollection.html"
   onclick="loadPage('peinturecollection.html'); return false;"
   class="button">
    🏆 Et si votre univers devenait une pièce de collection ?
</a>
</div>

    <!-- ================================================== -->
    <!-- PROGRESSION & CRÉATION DU STUDIO -->
    <!-- ================================================== -->
<div class="maintenance-box ajust fondslann">
    <h2>🦎 De la passion au métier</h2>

<p>
    Au fil des années, j'ai eu l'occasion de peindre de nombreuses armées et factions. Tout a commencé avec mes
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/seraphon/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Séraphons</strong></a>,
    puis sont venus les
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/grand-alliance-destruction/sons-of-behemat/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Sons of Behemat</strong></a>,
    les
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/daughters-of-khaine/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Daughters of Khaine</strong></a>,
    puis trois armées
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/la-grand-alliance-order/idoneth-deepkin/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Idoneth Deepkin</strong></a>,
    avec lesquelles j'ai participé à de nombreux tournois. J'ai ensuite peint des
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-de-limperium/adeptus-custodes/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Adeptus Custodes</strong></a>,
    des
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-du-chaos/chaos-knights/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Chaos Knights</strong></a>,
    de la
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/armees-du-chaos/death-guard/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Death Guard</strong></a>,
    ainsi que de nombreuses autres armées de
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-age-of-sigmar/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Age of Sigmar</strong></a>
    et
    <a href="https://maxireves.fr/selection-jeux/games-workshop/warhammer-40-000/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Warhammer 40,000</strong></a>.
</p>

<p>
    Pendant la période du Covid, je disposais de beaucoup de temps libre. J'ai alors imprimé intégralement en 3D puis peint une armée complète de <strong>2&nbsp;000 points de Nurgle</strong> en seulement une semaine. En avançant jour après jour, sans vraiment m'en rendre compte, j'ai réalisé à quel point j'avais progressé et tout ce qu'il était possible d'accomplir avec de la motivation et une organisation efficace. C'est à cette période que l'idée de créer un véritable studio de peinture professionnel a commencé à faire son chemin.
</p>



<p>
    C'est à cette époque que mon ami <strong>Jérémy</strong> m'a lancé une phrase que je n'ai jamais oubliée : <em>« Tu finiras par en faire ton métier mon pote. »</em> Sur le moment, cela me semblait presque irréaliste. Pourtant, cette idée a commencé à faire son chemin et le projet de créer un véritable studio de peinture est progressivement né.
</p>

<p>
    Quelques mois plus tard, après un accident du travail suivi d'un licenciement, et grace au soutien de mon épouse <strong>Gaëlle</strong>, j'ai décidé de transformer cette idée en réalité. C'est ainsi qu'est né <strong>Studio PF</strong>, avec une ambition simple : proposer un service de peinture professionnel capable de donner vie à chaque figurine, qu'elle soit destinée au jeu, à la collection ou à la compétition.
</p>
<div class="exemples-photos">
     <img src="img/covid.jpg" alt="Une des unités imprimé et peinte pendant le Covid...">
    </div>


<a href="peinturecommission.html"
   onclick="loadPage('peinturecommission.html'); return false;"
   class="button">
    ⚔️ Et si votre armée devenait unique ?
</a>

</div>



    <!-- ================================================== -->
    <!-- FORMATION & COMMUNAUTÉ -->
    <!-- ================================================== -->
  <div class="maintenance-box ajust fondnurgle">
    <h2>📚 Transmission et communauté</h2>

 <p>
    En créant <strong>Studio PF</strong>, je ne voulais pas seulement peindre des figurines. J'avais aussi envie de transmettre tout ce que j'aurais aimé apprendre lorsque j'ai commencé. Mes propres difficultés m'ont appris l'importance d'une méthode claire : éviter les erreurs classiques, comprendre les bons gestes, maîtriser l'aérographe et progresser avec confiance. Aujourd'hui, c'est cette expérience que je partage à travers mes formations et mes contenus.
</p>

    <p>
        Afin d'aller encore plus loin, j'ai choisi de me former auprès de
        <a href="https://mohand-art.com/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Mohand Art</strong></a>,
        peintre professionnel plusieurs fois récompensé au  <a href="https://thegoldendemoncompendium.com/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Golden Demon</strong>. Cette formation m'a permis de perfectionner mes techniques, de structurer ma méthode de travail et d'adopter une approche encore plus professionnelle de la peinture sur figurines. Aujourd'hui, j'ai à cœur de transmettre à mon tour cette expérience à travers mes cours, mes démonstrations et mes contenus pédagogiques.
    </p>

    <p>
        Studio PF, c'est également une communauté de passionnés que je retrouve régulièrement lors de
        <a href="https://www.twitch.tv/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>lives sur Twitch</strong></a>,
        où je peins en direct, partage mes projets, réponds aux questions et échange avec les spectateurs. Vous pouvez également retrouver des démonstrations, tutoriels, guides et vidéos sur ma chaîne
        <a href="https://www.youtube.com/@studiopf-fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a>,
        ainsi que des contenus exclusifs et un accompagnement plus approfondi sur
        <a href="https://www.patreon.com/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Patreon</strong></a>.
    </p>

    <ul>
        <li>🎥 Lives interactifs sur <a href="https://www.twitch.tv/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Twitch</strong></a> et tutoriels détaillés sur <a href="https://www.youtube.com/@studiopf-fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a>.</li>

        <li>📱 Astuces, réalisations et coulisses de l'atelier sur <a href="https://www.instagram.com/studiopf.fr/" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Instagram</strong></a> et <a href="https://www.tiktok.com/@studiopf.fr" class="surligne" target="_blank" rel="noopener noreferrer"><strong>TikTok</strong></a>.</li>

        <li>💬 Échanges avec la communauté sur <a href="https://discord.com/invite/Jpa4yvfQVN" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Discord</strong></a> et contenus exclusifs, conseils personnalisés et suivi sur <a href="https://www.patreon.com/studiopf" class="surligne" target="_blank" rel="noopener noreferrer"><strong>Patreon</strong></a>.</li>
    </ul>

    <a href="formation.html" onclick="loadPage('formation.html'); return false;" class="button">
        Découvrir les forfaits de formation 📚
    </a>
</div>

    <!-- ================================================== -->
    <!-- AUJOURD’HUI & ENGAGEMENTS -->
    <!-- ================================================== -->
  <div class="maintenance-box ajust fondknigt">
    <h2>🚀 Studio PF aujourd’hui</h2>

    <p>
        En parallèle de mon activité de peintre professionnel, je suis président de l'association de jeux de figurines
        <a href="https://grognards.fr/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Les Grognards</strong>
        </a>
        à <strong>Riorges</strong>. Nous réunissons des passionnés autour de parties, d'initiations, de démonstrations et d'événements afin de faire découvrir le hobby et de développer la communauté locale dans une ambiance conviviale.
    </p>

    <p>
        Je participe également à de nombreuses conventions et concours de peinture, notamment lors d'
        <a href="https://www.octogones.org/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>OctoGônes</strong>
        </a>.
        Mon prochain grand objectif est de présenter une pièce au prestigieux
        <a href="https://thegoldendemoncompendium.com/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Golden Demon</strong>
        </a>,
        l'un des concours de peinture sur figurines les plus réputés au monde.
    </p>

    <p>
        Je m'investis également dans des événements caritatifs comme le
        <a href="https://sam.collectemuco.org/"
           class="surligne"
           target="_blank"
           rel="noopener noreferrer">
            <strong>Stream Against Muco</strong>
        </a>,
        qui mobilise chaque année la communauté du streaming afin de récolter des fonds pour la lutte contre la mucoviscidose.
    </p>

    <p>
        Aujourd'hui, je consacre l'essentiel de mon temps aux projets de peinture haut de gamme, aux pièces de concours, aux formations et au partage de mon expérience avec la communauté, aussi bien en ligne que lors des salons, conventions et événements.
    </p>

    <p>
        <strong>
            « Si mon parcours peut aider ne serait-ce qu'une personne à oser prendre ses pinceaux, alors tout cela aura valu la peine. » ✨
        </strong>
    </p>

    <a href="galerie.html"
       onclick="loadPage('galerie.html'); return false;"
       class="button">
        Découvrir les créations Studio PF 🎨
    </a>
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
        html = `

<h1>🎨 Commission Miniature Painting</h1>

<div class="maintenance-box ajust fondmort">

    <h2>⚔️ TableTop Armies</h2>

    <p>
        Studio PF offers two painting levels: <strong>Gold</strong> and <strong>Diamond</strong>, designed to suit your needs, your budget, and the importance of each miniature.
    </p>
<!-- Illustrations -->
<div class="exemples-photos3">
<div class="exemples-photos">
    <img src="img/armee1.jpg" alt="Example of a painted army"></div>
    <div class="exemples-photos">
    <img src="img/armee2.jpg" alt="Example of a painted tabletop army"></div>
    <div class="exemples-photos">
    <img src="img/armee3.jpg" alt="Example of a painted wargaming army"></div>
</div>

</div>

<div class="maintenance-box ajust fonddg">
        <h2>⭐ Gold — Premium TableTop Finish</h2>
        <p>
            <strong>Ideal for :</strong> Warhammer armies, units and large quantities of figurines.
        </p>
        <p>
            A clean, efficient and uniform finish to obtain an army
            with an excellent tabletop look while keeping an affordable price.
        </p>
        <p>
            <strong>🎨 Techniques used :</strong><br>
            Base colors, simple shading, simple highlighting,
            essential details and clean finish.
        </p>
        <p>
            <strong>💵 Indicative price : €10 to €20 per figurine</strong>
        </p>
        <p>
            ⏱️ <strong>Indicative painting time :</strong><br><br>
            <strong>Troop figurine 20-25mm base :</strong><br>
            Less than one hour → <strong>€10</strong><br><br>
            <strong>Troop figurine 28-32mm base :</strong><br>
            About 1h+ → <strong>€20</strong>
        </p>
     <!-- Illustrations -->
<div class="exemples-photos3">
<div class="exemples-photos">
    <img src="img/gold1.jpg" alt="Example of Gold level painted figurine"></div>
    <div class="exemples-photos">
    <img src="img/gold2.jpg" alt="Example of Gold level painted unit"></div>
    <div class="exemples-photos">
     <img src="img/gold3.jpg" alt="Example of Gold level painted unit"></div>
</div>
    <a href="simulateur_devis" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>

    </div>

    <div class="maintenance-box ajust fondnurgle">
        <h2>👑 Diamond — Superior TableTop Finish</h2>
        <p>
            <strong>Ideal for :</strong> Characters, heroes, monsters,
            vehicles and important figurines from your collection.
        </p>
        <p>
            A more advanced painting with greater contrast,
            depth and enhanced detail work.
        </p>
        <p>
            <strong>🎨 Techniques used :</strong><br>
            Advanced highlighting, light work,
            gradients, oil effects, decals,
            weathering and additional effects.
        </p>
        <p>
            <strong>💵 Indicative price : €20 to €40 per figurine</strong>
        </p>
        <p>
            ⏱️ <strong>Indicative painting time :</strong><br><br>
            <strong>Troop figurine 20-25mm base :</strong><br>
            About 1 hour → <strong>€20</strong><br><br>
            <strong>Troop figurine 28-32mm base :</strong><br>
            About 2h+ → <strong>€40</strong>
        </p>
      <!-- Exemples -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/diamant1.jpg" alt="Example of Diamond level painting"></div>
        <div class="exemples-photos">
        <img src="img/diamant2.jpg" alt="Example of Diamond level painted figurine"></div>
        <div class="exemples-photos">
         <img src="img/diamant3.jpg" alt="Example of Diamond level painted figurine"></div>
    </div>

         <a href="simulateur_devis" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>

    </div>

<div class="maintenance-box ajust fondpirate">

    <h2>🛠️ Miniature Conversion & Custom Creations</h2>

    <p>
        <strong>Ideal for:</strong> Custom characters, unique heroes,
        army leaders, display pieces, or miniatures that do not exist
        in an official version.
    </p>

    <p>
        Studio PF can create a unique miniature from an existing model by
        modifying its pose, equipment, appearance, or other parts of the sculpt.
    </p>

    <p>
        Conversions can be created by combining different elements:
        <strong>multiple miniatures, spare bits, accessories,
        3D-printed parts, or components from other miniature ranges.</strong>
    </p>

    <p>
        It is also possible to merge parts from two or more miniatures to create
        a fully customized character that perfectly matches your army,
        your setting, or the story behind your collection.
    </p>

    <p>
        <strong>🔧 Available conversion work:</strong><br>
        Pose modifications, weapon or head swaps, additional accessories,
        limb replacements, custom equipment, combining multiple kits,
        integrating 3D-printed parts, gap filling, and seamless finishing.
    </p>

    <p>
        <strong>📋 Quote only:</strong><br>
        Every conversion project is individually assessed according to its
        complexity, the required parts, the requested modifications,
        and the preparation time involved.
    </p>

    <!-- Examples -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/conversion1.jpg"
             alt="Example of a converted miniature using bits"></div>
             <div class="exemples-photos">

        <img src="img/conversion2.jpg"
             alt="Example of a custom miniature created from multiple kits"></div>
             <div class="exemples-photos">

        <img src="img/conversion3.jpg"
             alt="Example of a conversion using 3D-printed parts"></div>
    </div>

        <a href="mailto:studiopeinturefigurine@gmail.com?subject=Miniature%20Conversion%20Project%20Studio%20PF&body=Hello%20Studio%20PF,%0A%0AI%20would%20like%20to%20present%20a%20miniature%20conversion%20project.%0A%0ABase%20miniature:%0A%0ARequested%20modifications:%0A%0AAvailable%20bits,%20parts%20or%20accessories:%0A%0A3D-printed%20parts%20to%20include:%0A%0APhotos,%20links%20or%20references:%0A%0AAdditional%20information:%0A"
           class="button">
            Present my conversion project 💬
        </a>


</div>


    <div class="maintenance-box">
    <div class="card-container3">
        <div class="card">
       <h2>Preparation 🛠️</h2>
<ul>
    <li>Cleaning</li>
    <li>Assembly</li>
    <li>Optimal preparation before painting</li>
</ul>
</div>

       <div class="card">
    <h2>Painting 🎨</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> clean and efficient result</li>
        <li><strong>👑 Diamond :</strong> careful details, enhanced contrasts and worked focal points</li>
    </ul>
</div>

       <div class="card">
    <h2>Basing 🌿</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> worked and harmonious base</li>
        <li><strong>👑 Diamond :</strong> scenic base with atmosphere</li>
    </ul>
</div>
</div>
</div>

<!-- Comparison Table -->
<div class="maintenance-box">
    <table class="tableborder1">
        <thead>
            <tr>
                <th></th>
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
                <td>Clean,<br>simple and efficient</td>
                <td>Highly detailed,<br>contrasted with focal points</td>
            </tr>
            <tr>
                <td>Techniques</td>
                <td>Base colors,<br>simple shading,<br>clean finish</td>
                <td>Highlighting,<br>lighting,<br>gradients,<br>oil,<br>decals,<br>MNM,<br>weathering</td>
            </tr>
            <tr>
                <td>Base</td>
                <td>Worked and coherent</td>
                <td>Scenic and immersive</td>
            </tr>
        </tbody>
    </table>
</div>
   <div class="maintenance-box">
    <h2 data-i18n="TarifLangLabels">Tarif 2026-2027</h2>
<table class="tableborder1">
<thead>

<tr>
   <th></th>
    <th>Gold</th>
    <th>Diamant</th>
</tr>
</thead>

<tbody id="tarifTableBody">

</tbody>
</table>
        <div>
         <a href="simulateur_devis" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Request a quote 💬</a>
    </div>
  </div>

`;
    } else if (currentLanguage === "spanish") {
        html = `

<h1>🎨 Pintura de Miniaturas por Encargo</h1>

<div class="maintenance-box ajust fondmort">

    <h2>⚔️ Ejércitos TableTop</h2>

    <p>
        Studio PF ofrece dos niveles de pintura: <strong>Gold</strong> y <strong>Diamante</strong>, para adaptarse a tus necesidades, a tu presupuesto y a la importancia de cada miniatura.
    </p>

<!-- Ilustraciones -->
<div class="exemples-photos3">
<div class="exemples-photos">
    <img src="img/armee1.jpg" alt="Ejemplo de ejército pintado"></div>
    <div class="exemples-photos">
    <img src="img/armee2.jpg" alt="Ejemplo de ejército TableTop pintado"></div>
    <div class="exemples-photos">
    <img src="img/armee3.jpg" alt="Ejemplo de ejército para juegos de miniaturas pintado"></div>
</div>
</div>

<div class="maintenance-box ajust fonddg">
        <h2>⭐ Gold — Acabado TableTop Premium</h2>
        <p>
            <strong>Ideal para :</strong> Ejércitos Warhammer, unidades y grandes cantidades de figurillas.
        </p>
        <p>
            Un acabado limpio, eficiente y homogéneo para obtener un ejército
            con un excelente aspecto en mesa manteniendo un precio accesible.
        </p>
        <p>
            <strong>🎨 Técnicas utilizadas :</strong><br>
            Colores base, sombreados simples, iluminaciones simples,
            detalles esenciales y acabado limpio.
        </p>
        <p>
            <strong>💵 Precio orientativo : 10€ a 20€ por figurilla</strong>
        </p>
        <p>
            ⏱️ <strong>Tiempo de pintura orientativo :</strong><br><br>
            <strong>Figurilla de tropa base 20-25mm :</strong><br>
            Menos de una hora → <strong>10€</strong><br><br>
            <strong>Figurilla de tropa base 28-32mm :</strong><br>
            Aproximadamente 1h+ → <strong>20€</strong>
        </p>
     <!-- Illustrations -->
<div class="exemples-photos3">
<div class="exemples-photos">
    <img src="img/gold1.jpg" alt="Ejemplo de figurilla pintada nivel Gold"></div>
    <div class="exemples-photos">
    <img src="img/gold2.jpg" alt="Ejemplo de unidad pintada nivel Gold"></div>
    <div class="exemples-photos">
    <img src="img/gold3.jpg" alt="Ejemplo de unidad pintada nivel Gold"></div>
</div>
         <a href="simulateur_devis" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar presupuesto 💬</a>

    </div>

    <div class="maintenance-box ajust fondnurgle">
        <h2>👑 Diamante — Acabado TableTop Superior</h2>
        <p>
            <strong>Ideal para :</strong> Personajes, héroes, monstruos,
            vehículos y figurillas importantes de tu colección.
        </p>
        <p>
            Una pintura más elaborada con mayor contraste,
            profundidad y un trabajo reforzado en los detalles.
        </p>
        <p>
            <strong>🎨 Técnicas utilizadas :</strong><br>
            Iluminaciones avanzadas, trabajo de luces,
            degradados, efectos al óleo, calcas,
            weathering y efectos adicionales.
        </p>
        <p>
            <strong>💵 Precio orientativo : 20€ a 40€ por figurilla</strong>
        </p>
        <p>
            ⏱️ <strong>Tiempo de pintura orientativo :</strong><br><br>
            <strong>Figurilla de tropa base 20-25mm :</strong><br>
            Aproximadamente 1 hora → <strong>20€</strong><br><br>
            <strong>Figurilla de tropa base 28-32mm :</strong><br>
            Aproximadamente 2h+ → <strong>40€</strong>
        </p>
      <!-- Exemples -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/diamant1.jpg" alt="Ejemplo de pintura nivel Diamante"></div>
        <div class="exemples-photos">
        <img src="img/diamant2.jpg" alt="Ejemplo de figurilla pintada nivel Diamante"></div>
        <div class="exemples-photos">
        <img src="img/diamant3.jpg" alt="Ejemplo de figurilla pintada nivel Diamante"></div>
    </div>
         <a href="simulateur_devis" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar presupuesto 💬</a>

    </div>

<div class="maintenance-box ajust fondpirate">

    <h2>🛠️ Conversión y creación de miniaturas únicas</h2>

    <p>
        <strong>Ideal para:</strong> Personajes personalizados, héroes únicos,
        líderes de ejército, piezas de colección o miniaturas que no existen
        en su versión oficial.
    </p>

    <p>
        Studio PF puede crear una miniatura original a partir de un modelo existente,
        modificando su pose, su equipamiento, su apariencia o determinados elementos
        de su silueta.
    </p>

    <p>
        La conversión puede realizarse combinando diferentes elementos:
        <strong>miniaturas distintas, piezas sobrantes (bits), accesorios,
        componentes impresos en 3D o piezas procedentes de otras gamas.</strong>
    </p>

    <p>
        También es posible fusionar elementos de dos miniaturas diferentes para crear
        un personaje completamente personalizado, coherente con tu ejército,
        tu universo o la historia de tu colección.
    </p>

    <p>
        <strong>🔧 Trabajos que pueden realizarse:</strong><br>
        Modificación de poses, sustitución de cabezas o armas, incorporación de accesorios,
        cambio de extremidades, creación de equipamiento, ensamblaje de varias miniaturas,
        adaptación de piezas impresas en 3D, relleno de uniones y armonización del conjunto.
    </p>

    <p>
        <strong>📋 Servicio únicamente bajo presupuesto:</strong><br>
        Cada conversión se estudia de forma individual según la complejidad del proyecto,
        las piezas necesarias, las modificaciones solicitadas y el tiempo de preparación.
    </p>

    <!-- Ejemplos -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/conversion1.jpg"
             alt="Ejemplo de miniatura convertida con bits"></div>
             <div class="exemples-photos">

        <img src="img/conversion2.jpg"
             alt="Ejemplo de miniatura creada combinando varios modelos"></div>
             <div class="exemples-photos">

        <img src="img/conversion3.jpg"
             alt="Ejemplo de conversión con piezas impresas en 3D"></div>
    </div>

        <a href="mailto:studiopeinturefigurine@gmail.com?subject=Proyecto%20de%20conversi%C3%B3n%20de%20miniatura%20Studio%20PF&body=Hola%20Studio%20PF,%0A%0AMe%20gustar%C3%ADa%20presentar%20un%20proyecto%20de%20conversi%C3%B3n.%0A%0AMiniatura%20base%20:%0A%0AModificaciones%20deseadas%20:%0A%0APiezas,%20bits%20o%20accesorios%20disponibles%20:%0A%0APiezas%20impresas%20en%203D%20a%20integrar%20:%0A%0AFotos,%20enlaces%20o%20referencias%20:%0A%0AInformaci%C3%B3n%20adicional%20:%0A"
           class="button">
            Presentar mi proyecto de conversión 💬
        </a>


</div>
    <div class="maintenance-box">
    <div class="card-container3">
        <div class="card">
       <h2>Preparación 🛠️</h2>
<ul>
    <li>Limpieza</li>
    <li>Ensamblaje</li>
    <li>Preparación óptima antes de pintar</li>
</ul>
</div>

 <div class="card">
    <h2>Pintura 🎨</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> acabado limpio y eficiente</li>
        <li><strong>👑 Diamante :</strong> detalles cuidados, contrastes reforzados y puntos focales trabajados</li>
    </ul>
</div>

 <div class="card">
    <h2>Ensocado 🌿</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> base trabajada y armoniosa</li>
        <li><strong>👑 Diamante :</strong> base escénica con ambientación</li>
    </ul>
</div>
</div>
</div>

<!-- Tableau comparaison -->
<div class="maintenance-box">
    <table class="tableborder1">
        <thead>
            <tr>
                <th></th>
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
                <td>Limpio,<br>simple y eficiente</td>
                <td>Muy detallado,<br>contrastado con puntos focales</td>
            </tr>
            <tr>
                <td>Técnicas</td>
                <td>Colores base,<br>sombreados simples,<br>acabado limpio</td>
                <td>Iluminaciones,<br>luces,<br>degradados,<br>óleo,<br>calcas,<br>MNM,<br>weathering</td>
            </tr>
            <tr>
                <td>Base</td>
                <td>Trabajada y coherente</td>
                <td>Escénica e inmersiva</td>
            </tr>
        </tbody>
    </table>
</div>
   <div class="maintenance-box">
    <h2 data-i18n="TarifLangLabels">Tarif 2026-2027</h2>
<table class="tableborder1">
<thead>

<tr>
   <th></th>
    <th>Gold</th>
    <th>Diamant</th>
</tr>
</thead>

<tbody id="tarifTableBody">

</tbody>
</table>
        <div>
         <a href="simulateur_devis" class="button" onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Solicitar presupuesto 💬</a>
    </div>
  </div>

`;
    } else {
        html = `   <h1>🎨 Peinture de Figurines sur Commission</h1>

<div class="maintenance-box ajust fondmort">

    <h2>⚔️ Armées TableTop</h2>

    <p>
        Studio PF propose deux niveaux de peintre : <strong> Gold</strong> et <strong> Diamant</strong>, afin de s'adapter à vos besoins, votre budget et à l'importance de chaque figurine.
    </p>

<!-- Illustrations -->
<div class="exemples-photos3">
<div class="exemples-photos">
    <img src="img/armee1.jpg" alt="Exemple d'armée peinte"></div>
    <div class="exemples-photos">
    <img src="img/armee2.jpg" alt="Exemple d'armée TableTop peinte"></div>
    <div class="exemples-photos">
    <img src="img/armee3.jpg" alt="Exemple d'armée Warhammer peinte"></div>
</div>

  <a href="simulateur_devis" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
</div>

<div class="maintenance-box ajust fonddg">


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
     <!-- Illustrations -->
<div class="exemples-photos3">
<div class="exemples-photos">
    <img src="img/gold1.jpg" alt="Exemple de figurine peinte niveau Gold"></div>
    <div class="exemples-photos">
    <img src="img/gold2.jpg" alt="Exemple d'unité peinte niveau Gold"></div>
    <div class="exemples-photos">
      <img src="img/gold3.jpg" alt="Exemple d'unité peinte niveau Gold"></div>
</div>


         <a href="simulateur_devis" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>


    </div>



    <div class="maintenance-box ajust fondnurgle">

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
      <!-- Exemples -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/diamant1.jpg" alt="Exemple de peinture niveau Diamant"></div>
        <div class="exemples-photos">
        <img src="img/diamant2.jpg" alt="Exemple de figurine peinte niveau Diamant"></div>
        <div class="exemples-photos">
        <img src="img/diamant3.jpg" alt="Exemple de figurine peinte niveau Diamant"></div>
    </div>

         <a href="simulateur_devis" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>

    </div>

<div class="maintenance-box ajust fondpirate">

    <h2>🛠️ Conversion & Création de figurines uniques</h2>

    <p>
        <strong>Idéal pour :</strong> Personnages personnalisés, héros uniques,
        chefs d'armée, pièces de collection ou figurines qui n'existent pas
        sous leur forme officielle.
    </p>

    <p>
        Studio PF peut créer une figurine originale à partir d'un modèle existant,
        en modifiant sa pose, son équipement, son apparence ou certains éléments
        de sa silhouette.
    </p>

    <p>
        La conversion peut être réalisée en combinant plusieurs sources :
        <strong>figurines différentes, rabiots, pièces détachées, accessoires,
        éléments imprimés en 3D ou bits provenant d'autres gammes.</strong>
    </p>

    <p>
        Il est également possible de fusionner des éléments issus de deux figurines
        afin de créer un personnage entièrement personnalisé, cohérent avec votre armée,
        votre univers ou l'histoire de votre collection.
    </p>

    <p>
        <strong>🔧 Travail pouvant être réalisé :</strong><br>
        Modification de pose, remplacement de tête ou d'armes, ajout d'accessoires,
        changement de membres, création d'équipement, assemblage de plusieurs modèles,
        adaptation de pièces 3D, rebouchage des jointures et harmonisation de l'ensemble.
    </p>

    <p>
        <strong>📋 Prestation uniquement sur devis :</strong><br>
        Chaque conversion est étudiée individuellement selon la complexité du projet,
        les pièces nécessaires, les modifications demandées et le temps de préparation.
    </p>

    <!-- Exemples -->
    <div class="exemples-photos3">
    <div class="exemples-photos">
        <img src="img/conversion1.jpg"
             alt="Exemple de figurine convertie avec des rabiots"></div>
             <div class="exemples-photos">

        <img src="img/conversion2.jpg"
             alt="Exemple de figurine créée avec plusieurs modèles"></div>
             <div class="exemples-photos">

        <img src="img/conversion3.jpg"
             alt="Exemple de conversion avec des pièces imprimées en 3D"></div>
    </div>

        <a href="mailto:studiopeinturefigurine@gmail.com?subject=Projet%20de%20conversion%20de%20figurine%20Studio%20PF&body=Bonjour%20Studio%20PF,%0A%0AJe%20souhaite%20vous%20présenter%20un%20projet%20de%20conversion.%0A%0AFigurine%20de%20base%20:%0A%0AModifications%20souhaitées%20:%0A%0APièces,%20bits%20ou%20rabiots%20disponibles%20:%0A%0APièces%203D%20à%20intégrer%20:%0A%0APhotos,%20liens%20ou%20références%20:%0A%0AInformations%20complémentaires%20:%0A"
           class="button">
            Présenter mon projet de conversion 💬
        </a>


</div>

    <div class="maintenance-box ajust">
<div class="card-container3">
 <div class="card">
       <h2>Préparation 🛠️</h2>
<ul>
    <li>Nettoyage</li>
    <li>Assemblage</li>
    <li>Préparation optimale avant peinture</li>
</ul>
</div>


        <div class="card">
    <h2>Peinture 🎨</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> rendu propre et efficace</li>
        <li><strong>👑 Diamant :</strong> détails soignés, contrastes renforcés et points focaux travaillés</li>
    </ul>
</div>

 <div class="card">
    <h2>Soclage 🌿</h2>
    <ul>
        <li><strong>⭐ Gold :</strong> socle travaillé et harmonieux</li>
        <li><strong>👑 Diamant :</strong> socle scénique avec mise en ambiance</li>
    </ul>
</div>
</div>
</div>

<!-- Tableau comparaison -->
<div class="maintenance-box ajust">
    <table class="tableborder1">
        <thead>
            <tr>
                <th></th>
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
                <td>Nette,<br>simple et efficace</td>
                <td>Très détaillée,<br>contrastée avec points focaux</td>
            </tr>
            <tr>
                <td>Techniques</td>
                <td>Couleurs de base,<br>ombrages simples,<br>finition propre</td>
                <td>Éclaircissements,<br>lumières,<br>dégradés,<br>huile,<br>décalcos,<br>MNM,<br>weathering</td>
            </tr>
            <tr>
                <td>Socle</td>
                <td>Travaillé et cohérent</td>
                <td>Scénique et immersif</td>
            </tr>
        </tbody>
    </table>
</div>


    <div class="maintenance-box ajust">
    <h2 data-i18n="TarifLangLabels">Tarif 2026-2027</h2>
<table class="tableborder1">
<thead>

<tr>
   <th></th>
    <th>Gold</th>
    <th>Diamant</th>
</tr>
</thead>

<tbody id="tarifTableBody">

</tbody>
</table>
        <div>
         <a href="simulateur_devis" class="button"  onclick="loadPage('simulateur_devis.html'); scrollToTop(); return false;">Demander un devis 💬</a>
    </div>
  </div>


         `;
    }

    main.innerHTML = html;
}

function changelanguemenu() {
    const menu = document.getElementById("pf-mobile-nav");
    if (!menu) return;

    let html = "";

    if (currentLanguage === "english") {
        html = `<div class="language-selector">
    <button onclick="setLanguage(id); updateMeta(id); return false;" id="french">
        <img src="img/Flag_of_France.png" alt="Français - Euro">
    </button>

    <button onclick="setLanguage(id); updateMeta(id); return false;" id="english">
        <img src="img/Flag_of_the_United_States.png" alt="English - USD">
    </button>

    <button onclick="setLanguage(id); updateMeta(id); return false;" id="spanish">
        <img src="img/Flag_of_Spain.png" alt="Español - Euro">
    </button>
</div>

<ul class="pf-nav-list">

    <li><a href="index.html" onclick="loadPage('index.html'); return false;">
        🏠 Home
    </a></li>

    <li><a href="quisuisje.html" onclick="loadPage('quisuisje.html'); scrollToTop(); return false;">
        👋 About Me
    </a></li>

    <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">
        ⚔️ Armies & TableTop+
    </a></li>

    <li><a href="peinturecollection.html" onclick="loadPage('peinturecollection.html'); return false;">
        🏆 Collection & Competition
    </a></li>

<!--
    <li><a href="formation.html" onclick="loadPage('formation.html'); return false;">
        📚 Painting Lessons
    </a></li>
    -->

    <li><a href="galerie.html" onclick="loadPage('galerie.html'); return false;">
        🖼️ Gallery
    </a></li>
            <li><a href="pourquoi.html" onclick="loadPage('pourquoi.html'); return false;">
        ❓ FAQ
    </a></li>

</ul>

  <ul class="contact-list">
    <li>
        <a href="mailto:studiopeinturefigurine@gmail.com">
            
            <span> <i class="fas fa-envelope"></i> studiopeinturefigurine@mgmail.com</span>
        </a>
    </li>

    <li>
        <a href="tel:+33775860837">
         
            <span><i class="fas fa-phone-alt"></i> 07 75 860 837</span>
        </a>
    </li>
</ul>
 <div class="pf-mobile-social">
        <div class="pf-social-container">
            <a href="https://www.facebook.com/studiopf.fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/studiopf.fr/" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="https://x.com/studioPFfr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-x-twitter"></i></a>
            <a href="https://discord.gg/Jpa4yvfQVN" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-discord"></i></a>
          
           <a href="https://www.patreon.com/studiopf" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-patreon"></i></a>
            <a href="https://www.twitch.tv/studiopf" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-twitch"></i></a>
            <a href="https://www.youtube.com/@studiopf-fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@studiopf.fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-tiktok"></i></a>

        </div>
    </div>`;
    } else if (currentLanguage === "spanish") {
        html = `<div class="language-selector">
    <button onclick="setLanguage(id); updateMeta(id); return false;" id="french">
        <img src="img/Flag_of_France.png" alt="Français - Euro">
    </button>

    <button onclick="setLanguage(id); updateMeta(id); return false;" id="english">
        <img src="img/Flag_of_the_United_States.png" alt="English - USD">
    </button>

    <button onclick="setLanguage(id); updateMeta(id); return false;" id="spanish">
        <img src="img/Flag_of_Spain.png" alt="Español - Euro">
    </button>
</div>

<ul class="pf-nav-list">

    <li><a href="index.html" onclick="loadPage('index.html'); return false;">
        🏠 Inicio
    </a></li>

    <li><a href="quisuisje.html" onclick="loadPage('quisuisje.html'); scrollToTop(); return false;">
        👋 ¿Quién soy?
    </a></li>

    <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">
        ⚔️ Ejércitos & TableTop+
    </a></li>

    <li><a href="peinturecollection.html" onclick="loadPage('peinturecollection.html'); return false;">
        🏆 Colección y Concursos
    </a></li>

<!--
    <li><a href="formation.html" onclick="loadPage('formation.html'); return false;">
        📚 Cursos de pintura
    </a></li>
    -->


    <li><a href="galerie.html" onclick="loadPage('galerie.html'); return false;">
        🖼️ Galería
    </a></li>
            <li><a href="pourquoi.html" onclick="loadPage('pourquoi.html'); return false;">
        ❓ FAQ
    </a></li>

</ul>


  <ul class="contact-list">
    <li>
        <a href="mailto:studiopeinturefigurine@gmail.com">
     
            <span> <i class="fas fa-envelope"></i> studiopeinturefigurine@mgmail.com</span>
        </a>
    </li>

    <li>
        <a href="tel:+33775860837">
           
            <span><i class="fas fa-phone-alt"></i> 07 75 860 837</span>
        </a>
    </li>
</ul>

 <div class="pf-mobile-social">
        <div class="pf-social-container">
            <a href="https://www.facebook.com/studiopf.fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/studiopf.fr/" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="https://x.com/studioPFfr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-x-twitter"></i></a>
            <a href="https://discord.gg/Jpa4yvfQVN" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-discord"></i></a>
          
           <a href="https://www.patreon.com/studiopf" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-patreon"></i></a>
            <a href="https://www.twitch.tv/studiopf" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-twitch"></i></a>
            <a href="https://www.youtube.com/@studiopf-fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@studiopf.fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-tiktok"></i></a>

        </div>
    </div>`;
    } else {
        html = ` <div class="language-selector">
           <button  onclick="setLanguage(id);  updateMeta(id); return false;" id="french">
        <img src="img/Flag_of_France.png" alt="Français - Euro"></button>
             <button onclick="setLanguage(id); updateMeta(id); return false;" id="english">
    <img src="img/Flag_of_the_United_States.png" alt="English - USD">
</button>
               <button  onclick="setLanguage(id); updateMeta(id); return false;" id="spanish">
        <img src="img/Flag_of_Spain.png" alt="Español - Euro"></button>

    </div>

   <ul class="pf-nav-list">

    <li><a href="index.html" onclick="loadPage('index.html'); return false;">
        🏠 Accueil
    </a></li>

    <li><a href="quisuisje.html" onclick="loadPage('quisuisje.html'); scrollToTop(); return false;">
        👋 Qui suis-je ?
    </a></li>

    <li><a href="peinturecommission.html" onclick="loadPage('peinturecommission.html'); return false;">
        ⚔️ Armées & TableTop+
    </a></li>

    <li><a href="peinturecollection.html" onclick="loadPage('peinturecollection.html'); return false;">
        🏆 Collection & Concours
    </a></li>

    <li><a href="formation.html" onclick="loadPage('formation.html'); return false;">
        📚 Cours de peinture
    </a></li>

    <li><a href="galerie.html" onclick="loadPage('galerie.html'); return false;">
        🖼️ Galerie
    </a></li>
        <li><a href="pourquoi.html" onclick="loadPage('pourquoi.html'); return false;">
        ❓ FAQ
    </a></li>

</ul>


  <ul class="contact-list">
    <li>
        <a href="mailto:studiopeinturefigurine@gmail.com">
           
            <span> <i class="fas fa-envelope"></i> studiopeinturefigurine@mgmail.com</span>
        </a>
    </li>

    <li>
        <a href="tel:+33775860837">
         
            <span><i class="fas fa-phone-alt"></i> 07 75 860 837</span>
        </a>
    </li>
</ul>
    <!-- Réseaux sociaux -->
    <div class="pf-mobile-social">
        <div class="pf-social-container">
            <a href="https://www.facebook.com/studiopf.fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/studiopf.fr/" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="https://x.com/studioPFfr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-x-twitter"></i></a>
            <a href="https://discord.gg/Jpa4yvfQVN" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-discord"></i></a>
          
           <a href="https://www.patreon.com/studiopf" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-patreon"></i></a>
            <a href="https://www.twitch.tv/studiopf" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-twitch"></i></a>
            <a href="https://www.youtube.com/@studiopf-fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@studiopf.fr" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fab fa-tiktok"></i></a>

        </div>
    </div>
`;
    }

    menu.innerHTML = html;
}

function changelanguefoot() {
    const foot = document.getElementById("foot-contenu");
    if (!foot) return;

    let html = "";

   if (currentLanguage === "english") {
    html = `


  <nav class="menu-mobilefoot">
    <ul class="menu">
        <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">Terms & Conditions 📜</a></li>
        <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); return false;">Legal Notice 💼</a></li>
        <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Opening Hours 🕖</a></li>
    </ul>
</nav>

<div class="footer-adresse">
    <p><strong>STUDIO PF</strong><br>
            FRASSE Pierre-François<br>
            17 route de Lare 42510 Saint-Georges-de-Baroille<br><br></p>
    17 Route de Lare, 42510 Saint-Georges-de-Baroille, France<br><br>

    <p>
        Contact 📧 :
        <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
        </p><p>Phone 📞 :
        <a href="tel:+33775860837">+33 7 75 86 08 37</a>
    </p>
</div>

<p>Website created by <strong>Studio PF</strong> - © 2026 All rights reserved.</p>



    `;
}
else if (currentLanguage === "spanish") {
    html = `


    <nav class="menu-mobilefoot">
    <ul class="menu">
        <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">Condiciones generales de venta 📜</a></li>
        <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); return false;">Aviso legal 💼</a></li>
        <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Horario de apertura 🕖</a></li>
    </ul>
</nav>

<div class="footer-adresse">
   <p><strong>STUDIO PF</strong><br>
            FRASSE Pierre-François<br>
            17 route de Lare 42510 Saint-Georges-de-Baroille<br><br></p>

    <p>
        Contacto 📧 :
        <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
         </p><p>Teléfono 📞 :
        <a href="tel:+33775860837">07 75 86 08 37</a>
    </p>
</div>

<p>Sitio web creado por <strong>Studio PF</strong> - © 2026 Todos los derechos reservados.</p>



    `;
    } else {
        html = `

<nav class="menu-mobilefoot">
            <ul class="menu">
                <li><a href="conditions.html" onclick="loadPage('conditions.html'); return false;">Conditions générales de vente 📜</a></li>
                <li><a href="mentionslegales.html" onclick="loadPage('mentionslegales.html'); return false;">Mentions Légales 💼</a></li>
                <li><a href="horaires.html" onclick="loadPage('horaires.html'); return false;">Horaires d'ouverture 🕖</a></li>
            </ul>
        </nav>


        <div class="footer-adresse">
            <p><strong>STUDIO PF</strong><br>
            FRASSE Pierre-François<br>
            17 route de Lare 42510 Saint-Georges-de-Baroille<br><br></p>

            <p>
                Contact 📧 :
                <a href="mailto:studiopeinturefigurine@gmail.com">studiopeinturefigurine@gmail.com</a>
                </p><p>Téléphone 📞 :
                <a href="tel:+33775860837">07 75 86 08 37</a>
            </p>
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
<div class="center">
    <div class="maintenance-boxpartenaire">

        <div class="cardpartenaire2">

            <div class="cardpartenaire">
                <div><a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-totalwar.png" alt="Total Wargames Logo" data-no-lightbox fetchpriority="high">
                </a><div>

                <div><p>
                    Buy second-hand miniatures for less.<br>
                    <strong>5% off</strong> with the code:<br><br>
                    <strong>STUDIOPF</strong>
                </p></div>
            </div>

            <div class="cardpartenaire">
                <div><a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-maxireve.png" alt="Maxi Rêve Logo" data-no-lightbox fetchpriority="high">
                </a></div>

              <div>  <p>
                    Get the miniatures of your dreams at amazing prices!<br>
                    Up to <strong>19% off</strong> with the code:<br><br>
                    <strong>MAXIPF</strong>
                </p></div>
            </div>

        </div>


        <div class="cardpartenaire2">

            <div class="cardpartenaire">
                <div><a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-mezgike.png" alt="Mezgike Logo" data-no-lightbox fetchpriority="high">
                </a></div>

                <div><p>
                    Outstanding pre-supported STL miniatures for your sci-fi and fantasy tabletop games.<br>
                    <strong>10% off</strong> your order with the code:<br><br>
                    <strong>STUDIOPF</strong>
                </p></div>
            </div>

            <div class="cardpartenaire">
               <div><a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-wargamesceneries.png" alt="Wargame Sceneries Logo" data-no-lightbox fetchpriority="high">
                </a></div>

                <div><p>
                    Modular 3D printed terrain for even more immersive tabletop battles.<br>
                    <strong>10% off</strong> all printed models with the code:<br><br>
                    <strong>STUDIOPF10</strong>
                </p></div>
            </div>

        </div>

    </div>
</div>
    `;
}
else if (currentLanguage === "spanish") {
    html = `

<div class="center">
    <div class="maintenance-boxpartenaire">

        <div class="cardpartenaire2">

            <div class="cardpartenaire">
                <div><a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-totalwar.png" alt="Logo Total Wargames" data-no-lightbox fetchpriority="high">
                </a></div>

                <div><p>
                    Compra miniaturas de segunda mano al mejor precio.<br>
                    <strong>5 % de descuento</strong> con el código:<br><br>
                    <strong>STUDIOPF</strong>
                </p></div>
            </div>

            <div class="cardpartenaire">
                <div><a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-maxireve.png" alt="Logo Maxi Rêve" data-no-lightbox fetchpriority="high">
                </a></div>

             <div>   <p>
                    ¡Las miniaturas de tus sueños al mejor precio!<br>
                    Hasta un <strong>19 % de descuento</strong> con el código:<br><br>
                    <strong>MAXIPF</strong>
                </p></div>
            </div>

        </div>


        <div class="cardpartenaire2">

            <div class="cardpartenaire">
                <div><a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-mezgike.png" alt="Logo Mezgike" data-no-lightbox fetchpriority="high">
                </a></div>

              <div>  <p>
                    Magníficas miniaturas STL presoportadas para tus juegos de mesa de ciencia ficción y fantasía.<br>
                    <strong>10 % de descuento</strong> en tu pedido con el código:<br><br>
                    <strong>STUDIOPF</strong>
                </p></div>
            </div>

            <div class="cardpartenaire">
                <div><a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                    <img src="img/logo-wargamesceneries.png" alt="Logo Wargame Sceneries" data-no-lightbox fetchpriority="high">
                </a></div>

               <div> <p>
                    Escenografía modular impresa en 3D para partidas aún más inmersivas.<br>
                    <strong>10 % de descuento</strong> en todos los modelos impresos con el código:<br><br>
                    <strong>STUDIOPF10</strong>
                </p></div>
            </div>

        </div>

    </div>
</div>
    `;
    } else {
        html = `
    <div class="center">
       <div class="maintenance-boxpartenaire">
                 <div class="cardpartenaire2">
        <div class="cardpartenaire">
                    <div><a href="https://www.totalwargame.com/fr/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-totalwar.png" alt="Total Wargames Logo" data-no-lightbox fetchpriority=high>
                    </a></div>

                   <div> <p>Achetez moins cher d'occasion<br>5% de remise :<br><strong>STUDIOPF</strong></p></div>

            </div>

            <div class="cardpartenaire">

                   <div> <a href="https://maxireves.fr/?ref=17962" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-maxireve.png" alt="Maxi Rêve Logo" data-no-lightbox fetchpriority=high>
                    </a></div>

                  <div>  <p>Vos figurines de rêves à Maxi remise !<br>jusqu'à -19% :<br><br><strong>MAXIPF</strong></p></div>

            </div>
                 </div>



         <div class="cardpartenaire2">
        <div class="cardpartenaire">

                   <div> <a href="https://mezgike.com/" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-mezgike.png" alt="Mezgike Logo" data-no-lightbox fetchpriority=high>
                    </a></div>


                   <div> <p>Superbes figurines STL pré-supportées pour vos jeux de bataille de table sci-fi et fantasy.<br>-10% sur votre commande<br>avec le code promo :<br><br><strong>STUDIOPF</strong></p></div>

            </div>

             <div class="cardpartenaire">

                    <div><a href="https://wargamesceneries.com/" class="apartenaire" target="_blank" rel="noopener noreferrer">
                        <img src="img/logo-wargamesceneries.png" alt="Wargame Sceneries Logo" data-no-lightbox fetchpriority=high>
                    </a></div>


                    <div><p>Des décors modulaires en impression 3D pour des parties immersives.<br>-10% tout les modèles imprimés<br>avec le code promo :<br><br><strong>STUDIOPF10</strong></p></div>

            </div>
           </div>


    </div></div>

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



function calculateTotals() {
    const niveauSelect = document.getElementById("niveau");
    if (!niveauSelect) return;

    const niveau = niveauSelect.value || "niveau1";

    let totalGeneral = 0;


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
            body += `Total estimé : ${total.toFixed(2)} ${symboleDevise}\n\n`;

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
    const filenames = appelimg();
    const base = 'img/';
    const gallery = document.getElementById('gallery');
    const filters = document.getElementById('filters');

    /*
    La galerie n'existe pas forcément sur toutes les pages.
    Dans ce cas, on initialise seulement la lightbox globale.
    */
    initializeLightboxGlobal();

    if (!gallery || !filters) {
        console.warn("Éléments de galerie absents sur cette page.");
        return;
    }

    const categorized = {};

    filenames.forEach(file => {
        const [folder] = file.split('/');

        if (!folder) return;

        if (!categorized[folder]) {
            categorized[folder] = [];
        }

        categorized[folder].push(base + file);
    });

    // Catégorie contenant toutes les images
    categorized.Tous = filenames.map(file => base + file);

    // Création des boutons de filtres
    filters.innerHTML = "";

    Object.keys(categorized).sort().forEach(category => {
        const button = document.createElement('button');

        button.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);

        button.className = category.toLowerCase();

        if (category === 'Tous') {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            filters
                .querySelectorAll('button')
                .forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            showImages(category);
        });

        filters.appendChild(button);
    });

    function showImages(category) {
        gallery.innerHTML = "";

        if (!categorized[category]) return;

        const fragment = document.createDocumentFragment();

        categorized[category].forEach(src => {
            const img = document.createElement('img');

            img.src = src;
            img.alt = `Peinture figurine Studio PF – ${category}`;
            img.className = 'gallery-img';
            img.loading = 'lazy';

            /*
            Il n'est plus nécessaire d'ajouter un événement click ici.
            La lightbox globale détectera automatiquement cette image.
            */

            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
    }

    // Affichage initial
    showImages('Tous');
}
function initializeLightboxGlobal() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!lightbox || !lightboxImg) {
        console.warn("Éléments de la lightbox manquants.");
        return;
    }

    /*
    Évite d'installer plusieurs fois les événements
    lorsque initializeGalerie() est rappelée.
    */
    if (document.body.dataset.lightboxInitialized === "true") {
        return;
    }

    document.body.dataset.lightboxInitialized = "true";

    /*
    Ouverture de la lightbox pour toutes les images du site,
    y compris les images ajoutées dynamiquement.
    */
    document.addEventListener('click', event => {
        const img = event.target.closest('img');

        if (!img) return;

        // Ne pas ouvrir la lightbox en cliquant sur son image
        if (img.id === 'lightbox-img') return;

        // Permet d'exclure certaines images
        if (img.hasAttribute('data-no-lightbox')) return;

        // Ignore les images situées dans un bouton
        if (img.closest('button')) return;

        // Ignore les images situées dans un lien externe
        const parentLink = img.closest('a');

        if (
            parentLink &&
            parentLink.getAttribute('href') &&
            !parentLink.hasAttribute('data-lightbox')
        ) {
            return;
        }

        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || "Image agrandie";

        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    });

    // Fermeture en cliquant sur le fond ou l'image agrandie
    lightbox.addEventListener('click', event => {
        if (
            event.target === lightbox ||
            event.target === lightboxImg
        ) {
            closeLightbox();
        }
    });

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', event => {
        if (
            event.key === 'Escape' &&
            lightbox.classList.contains('active')
        ) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');

        /*
        On efface l'image après l'animation de fermeture.
        */
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) {
                lightboxImg.src = "";
                lightboxImg.alt = "";
            }
        }, 300);
    }
}
function changelanguementionslegales() {
     const main = document.getElementById("contenu-principal");
    if (!main) return;
let html = "";
    if (currentLanguage === "english") {
        html = `
       <div class="maintenance-box">
          <h1>✨ Legal Notice ✨</h1>
<p><strong>Website:</strong> studiopf.fr<br> <strong>Last updated:</strong> January 19, 2026</p>
</div>
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
           <div class="maintenance-box">
          <h1>✨ Aviso Legal ✨</h1>
<p><strong>Sitio web:</strong> studiopf.fr<br> <strong>Fecha de actualización:</strong> 19 de enero de 2026</p></div>

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
      <div class="maintenance-box">
          <h1>✨ Mentions Légales ✨</h1>
<p><strong>Site :</strong> studiopf.fr<br> <strong>Date de mise à jour :</strong> 19 janvier 2026</p></div> <div class="maintenance-box">
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
        html = `div class="maintenance-box">
           <h1>✨ Terms and Conditions of Sale ✨</h1>
<p><strong>Website:</strong> studiopf.fr<br>
<strong>Last updated:</strong> March 2026</p>
</div>
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
        html = `div class="maintenance-box">
          <h1>✨ Condiciones Generales de Venta ✨</h1>
<p><strong>Sitio web:</strong> studiopf.fr<br>
<strong>Última actualización:</strong> Marzo 2026</p>
</div>
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
        html = `div class="maintenance-box">
            <h1>✨ Conditions Générales de Vente ✨</h1>
            <p><strong>Site :</strong> studiopf.fr<br>
            <strong>Dernière mise à jour :</strong> Mars 2026</p>
</div>
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

// ==============================
// Bouton "Voir Total"
// ==============================

// Masquer le bouton lorsqu'on clique sur un lien ou un bouton
document.addEventListener("click", function (event) {

    if (event.target.closest("a, button")) {

        const scrollBtn = document.getElementById("scrollTotal");

        if (scrollBtn) {
            scrollBtn.style.display = "none";
        }
    }

});

function scrollTotal(offset = 100) {

    // On masque le bouton
    const scrollBtn = document.getElementById("scrollTotal");

    if (scrollBtn) {
        scrollBtn.style.display = "none";
    }

    // On cherche le titre "Total"
    const totalElement = document.querySelector("h2.total");

    if (totalElement) {

        const elementTop =
            totalElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: elementTop - offset,
            behavior: "smooth"
        });

    }

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
document.addEventListener("DOMContentLoaded", function () {

    const pfButton = document.getElementById("pf-menu-button");
    const pfNav = document.getElementById("pf-mobile-nav");

    if (!pfButton || !pfNav) return;

    function fermerMenu() {
        pfButton.classList.remove("active");
        pfNav.classList.remove("active");
        pfButton.setAttribute("aria-expanded", "false");
    }

    // Ouvrir ou fermer le menu
    pfButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const menuOuvert = pfNav.classList.toggle("active");
        pfButton.classList.toggle("active", menuOuvert);
        pfButton.setAttribute("aria-expanded", menuOuvert);
    });

    // Fermer avant l'exécution de loadPage()
    pfNav.addEventListener("click", function (event) {

        const elementClique = event.target.closest("a, button");

        if (elementClique) {
            fermerMenu();
        }

    }, true);

    // Fermer en cliquant à l'extérieur
    document.addEventListener("click", function (event) {

        if (
            !pfNav.contains(event.target) &&
            !pfButton.contains(event.target)
        ) {
            fermerMenu();
        }

    });

});
