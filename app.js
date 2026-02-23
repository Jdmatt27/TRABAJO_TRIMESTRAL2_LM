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

  Supercopa: {
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

  EuropaLeague: {
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

  Mundialito: {
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

  CopaRey: {
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

  ChampionsLeague: {
    left: `
      <article >
        <div class="adMedia">
          <video class="adVideo" autoplay muted loop playsinline preload="metadata">
            <source src="Videos/Champions.mp4" type="video/mp4">
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

      <a class="adBtn" href="https://www.uefa.com/uefachampionsleague/fixtures-results/#/d/2026-02-17" target="_blank">Ver oferta</a>
    </article>
    `,
     news:
      `
      <div class="container_newsLeft">
            <img class="newsLeft__img" src="Images/Barça_Fuera.png" alt="">
        </div>
        <div class="container_newsRight">
            <h1 class="new__title">Ahora si que el Barça no ganara la 6ª</h1>
            <p class="new__text">
                Debido a la corrupcion del vicepresidente del comite de arbitros Negreira. El Barcelona no podra jugar en la competicion mas prestigiosa a nivel europeo,
                la Uefa Champions leauge, durante un año completo. Esto se debe a que el Barcelona ha sido acusado de sobornar a los arbitros para que le favorezcan en los partidos importantes.
                Y debido a este comportamiento, la Uefa ha decidido expulsar al equipo durante un año completo.
            </p>
        </div>
        `
  }
};

function render(id) {
  panelLeft.innerHTML = contenido[id].left;
  panelRight.innerHTML = contenido[id].right;
  news.innerHTML = contenido[id].news;
}

render("Liga");

menu.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  render(btn.id);
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

