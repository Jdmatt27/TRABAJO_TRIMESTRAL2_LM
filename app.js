const menu = document.getElementById("leaguesMenu");
const panelLeft = document.getElementById("panelLeft");
const panelRight = document.getElementById("panelRight");

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
    <article class="adCard">
      <span >Patrocinado</span>
      <h3>Entradas oficiales</h3>
      <p>Compra entradas para los próximos partidos y vive el estadio.</p>

      <a class="adBtn" href="https://www.laliga.com/" target="_blank">Ver oferta</a>
    </article>

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
    `
  }
};

function render(id) {
  panelLeft.innerHTML = contenido[id].left;
  panelRight.innerHTML = contenido[id].right;
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

