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

      <a class="adBtn" href="https://www.bundesliga.com/" target="_blank">Ver oferta</a>
    </article>
    `,

    news:
      `
      <div class="container_newsLeft">
            <img class="newsLeft__img" src="Images/bundesligaNew.jpg" alt="">
        </div>
        <div class="container_newsRight">
            <h1 class="new__title">Regalos inesperados</h1>
            <p class="new__text">
                En el Augsburg vs Union Berlin (15/01/2026),
                el partido se paró unos 5 minutos porque desde la grada empezaron a lanzar pelotas de juguete (y otros objetos)
                al césped como protesta por jugar en jueves.
                Lo más surrealista: jugadores,
                 suplentes y staff tuvieron que ponerse a recogerlo todo para poder reanudar el partido.
            </p>
        </div>
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

      <a class="adBtn" href="https://ligue1.com/" target="_blank">Ver oferta</a>
    </article>
    `,
    news:
      `
      <div class="container_newsLeft">
            <img class="newsLeft__img" src="Images/Ligue1New.jpg" alt="">
        </div>
        <div class="container_newsRight">
            <h1 class="new__title">Pudieron romper el ayuno del Ramadán.</h1>
            <p class="new__text">
                En un Nantes–Le Havre,
                se viralizó que Lopes se quedó en el suelo para forzar la entrada de asistencias
                y que varios compañeros pudieran beber/comer en la banda al caer el sol
                (en Francia no suele haber pausas oficiales para eso).
            </p>
        </div>
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

      <a class="adBtn" href="https://www.legaseriea.it/" target="_blank">Ver oferta</a>
    </article>
    `,
    news:
      `
      <div class="container_newsLeft">
            <img class="newsLeft__img" src="Images/SerieANew.jpg" alt="">
        </div>
        <div class="container_newsRight">
            <h1 class="new__title">Kalulu tuvo segunda amarilla tras una “simulación”</h1>
            <p class="new__text">
                En un Inter–Juve, Bastoni cayó pidiendo tarjeta,
                Kalulu acabó expulsado por segunda amarilla,
                y luego el responsable arbitral admitió el error (y que hubo “clara simulación”),
                pero explicó que el VAR no podía intervenir por ser una amarilla. Absurdo total.
            </p>
        </div>
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
    `,
    news:
      `
      <div class="container_newsLeft">
            <img class="newsLeft__img" src="Images/PremierNew.jpg" alt="">
        </div>
        <div class="container_newsRight">
            <h1 class="new__title">Acabó expulsado por irse a por el árbitro</h1>
            <p class="new__text">
                Al terminar el partido Farke entró al césped para encarar al árbitro y vio la roja,
                teniendo que separarlo gente de su propio equipo.
                Gracias a esta acción, estara un dia entero expulsado.
            </p>
        </div>
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

/*JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA*/

