const menu = document.getElementById("leaguesMenu");
const panel = document.getElementById("panel");

const contenido = {
  Liga: `
    <h3>Liga</h3>
    <p>Anuncios de la Liga...</p>
  `,
  Supercopa: `
    <h3>Supercopa</h3>
    <p>Anuncios de la Supercopa...</p>
  `,
  EuropaLeague: `
    <h3>Europa League</h3>
    <p>Anuncios de Europa League...</p>
  `,
  Mundialito: `
    <h3>Mundialito de clubs</h3>
    <p>Anuncios del Mundialito...</p>
  `,
  CopaRey: `
    <h3>Copa del Rey</h3>
    <p>Anuncios de Copa del Rey...</p>
  `,
  ChampionsLeague: `
    <h3>Champions League</h3>
    <p>Anuncios de Champions...</p>
  `
};

// Lo que se ve al cargar
panel.innerHTML = contenido.Liga;

// Cambia el panel al clicar un botón
menu.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  panel.innerHTML = contenido[btn.id];
});
