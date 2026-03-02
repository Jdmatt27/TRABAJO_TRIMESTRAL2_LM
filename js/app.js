/*JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA*/
const menu = document.getElementById("leaguesMenu");
const panelLeft = document.getElementById("panelLeft");
const panelRight = document.getElementById("panelRight");
const news = document.getElementById("news");

const contenido = {
  Liga: {
    left: `
    <article >
        <div class="adMedia">
          <video class="adVideo" autoplay muted loop playsinline preload="metadata">
            <source src="Videos/LigaLeft.mp4" type="video/mp4">
          </video>
          <button class="adMute" type="button" aria-label="Silenciar/Activar sonido">🔇</button>
        </div>
    </article>
`,

    right: `
    <article>
      <span >Patrocinado</span>
      <h3>Entradas oficiales</h3>
      <p>Compra entradas para los próximos partidos y vive el estadio.</p>

      <a class="adBtn" href="https://www.laliga.com/" target="_blank">Ver oferta</a>
    </article>

    `

  ,

    news:
      `
      <div class="container_newsLeft">
            <img class="newsLeft__img" src="Images/Madrid_Fuera.png" alt="">
        </div>
        <div class="container_newsRight">
            <h1 class="new__title">El Real Madrid queda expulsado de la liga</h1>
            <p class="new__text">
                El Real Madrid ha sido expulsado de la Liga en la proxima temporada por no respetar las normas de conducta deportiva.
                Debido al jugador Vinicius Jr. el Real Madrid no podrá participar en la Liga durante el próximo año. Ya que el jugador a seguido realizando sus burlas de forma continua sin haber sido sancionado por su equipo.
                Y debido a este comportamiento, la Liga ha decidido expulsar al equipo durante un año completo.
            </p>
        </div>
        `
  },

  BundesLiga: {
    left: `
      <article >
        <div class="adMedia">
          <video class="adVideo" autoplay muted loop playsinline preload="metadata">
            <source src="Videos/Supercopa.mp4" type="video/mp4">
          </video>
          <button class="adMute" type="button" aria-label="Silenciar/Activar sonido">🔇</button>
        </div>
      </article>
    `,
    right: `
    <article class="adCard">
      <span >Patrocinado</span>
      <h3>Entradas oficiales</h3>
      <p>Compra entradas para los próximos partidos y vive el estadio.</p>

      <a class="adBtn" href="https://es.uefa.com/uefasupercup/" target="_blank">Ver oferta</a>
    </article>
    `

  },

  Ligue1: {
    left: `
      <article >
        <div class="adMedia">
          <video class="adVideo" autoplay muted loop playsinline preload="metadata">
            <source src="Videos/EuropaLeague.mp4" type="video/mp4">
          </video>
          <button class="adMute" type="button" aria-label="Silenciar/Activar sonido">🔇</button>
        </div>
      </article>
    `,
    right: `
    <article class="adCard">
      <span >Patrocinado</span>
      <h3>Entradas oficiales</h3>
      <p>Compra entradas para los próximos partidos y vive el estadio.</p>

      <a class="adBtn" href="https://es.uefa.com/uefaeuropaleague/" target="_blank">Ver oferta</a>
    </article>
    `
  },

  SerieA: {
    left: `
      <article >
        <div class="adMedia">
          <video class="adVideo" autoplay muted loop playsinline preload="metadata">
            <source src="Videos/Mundialito.mp4" type="video/mp4">
          </video>
          <button class="adMute" type="button" aria-label="Silenciar/Activar sonido">🔇</button>
        </div>
      </article>
    `,
    right: `
    <article class="adCard">
      <span >Patrocinado</span>
      <h3>Entradas oficiales</h3>
      <p>Compra entradas para los próximos partidos y vive el estadio.</p>

      <a class="adBtn" href="https://www.fifa.com/es/tournaments/mens/club-world-cup/usa-2025" target="_blank">Ver oferta</a>
    </article>
    `
  },

  PremierLeague: {
    left: `
      <article >
        <div class="adMedia">
          <video class="adVideo" autoplay muted loop playsinline preload="metadata">
            <source src="Videos/CopaRey.mp4" type="video/mp4">
          </video>
          <button class="adMute" type="button" aria-label="Silenciar/Activar sonido">🔇</button>
        </div>
      </article>
    `,
    right: `
    <article class="adCard">
      <span >Patrocinado</span>
      <h3>Entradas oficiales</h3>
      <p>Compra entradas para los próximos partidos y vive el estadio.</p>

      <a class="adBtn" href="https://www.laliga.com/otras-competiciones/copa-del-rey" target="_blank">Ver oferta</a>
    </article>
    `
  },

};

function render(id) {
  panelLeft.innerHTML = contenido[id].left;
  panelRight.innerHTML = contenido[id].right;
  news.innerHTML = contenido[id].news;
}

render("Liga");

const mapBtnToLeagueKey = {
  Liga: "laliga",
  BundesLiga: "bundesliga",
  Ligue1: "ligue1",
  SerieA: "seriea",
  PremierLeague: "premier",
};

menu.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  render(btn.id);

  const leagueKey = mapBtnToLeagueKey[btn.id];
  if (leagueKey) {
    localStorage.setItem("frontera_active_league", leagueKey);
    updateProximosLink();
  }

  return true;
});

document.addEventListener("click", (e) => {
  const muteBtn = e.target.closest(".adMute");
  if (!muteBtn) return;

  const video = muteBtn.closest(".adMedia")?.querySelector("video");
  if (!video) return;

  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
});

document.addEventListener("click", () => {
  document.querySelectorAll("video").forEach(v => v.muted = false);
  document.querySelectorAll(".adMute").forEach(btn => btn.textContent = "🔊");
  
}, { once: true });

const linkProximos = document.getElementById("link-proximos");
const linkProximosMobile = document.getElementById("link-proximos-mobile");

function updateProximosLink() {

  const leagueKey = localStorage.getItem("frontera_active_league") || "laliga";

  const url = `frontera.html?league=${leagueKey}&goto=clasificacion`;

  if (linkProximos) linkProximos.href = url;
  if (linkProximosMobile) linkProximosMobile.href = url;
}

updateProximosLink();

window.addEventListener("focus", updateProximosLink);

window.addEventListener("storage", (e) => {
  if (e.key === "frontera_active_league") updateProximosLink();
});

/*JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA*/

