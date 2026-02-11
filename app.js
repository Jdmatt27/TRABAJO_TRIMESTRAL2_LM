const menu = document.getElementById("leaguesMenu");
const panelLeft = document.getElementById("panelLeft");
const panelRight = document.getElementById("panelRight");

const contenido = {
  Liga: {
    left: 
    `
      <h3>Liga</h3>
      <p>Anuncio izquierda Liga</p>
    `,
    right: 
    `
      <h3>Liga</h3>
      <p>Anuncio derecha Liga</p>
    `
  },
  Supercopa: {
    left: 
    `
      <h3>Supercopa</h3>
      <p>Anuncio izquierda Supercopa</p>
    `,
    right: 
    `
      <h3>Supercopa</h3>
      <p>Anuncio derecha Supercopa</p>
    `
  },
  EuropaLeague: {
    left: 
    `
      <h3>Europa League</h3>
      <p>Anuncio izquierda Europa</p>
    `,
    right: 
    `
      <h3>Europa League</h3>
      <p>Anuncio derecha Europa</p>
    `
  },
  Mundialito: {
    left: 
    `
    <h3>Mundialito</h3>
      <p>Anuncio izquierda Mundialito</p>
    `,
    right: 
    `
      <h3>Mundialito</h3>
      <p>Anuncio derecha Mundialito</p>
    `
  },
  CopaRey: {
    left: 
    `
      <h3>Copa del Rey</h3>
      <p>Anuncio izquierda Copa</p>
    `,
    right: 
    `
      <h3>Copa del Rey</h3>
      <p>Anuncio derecha Copa</p>
    `
  },
  ChampionsLeague: {
    left: 
    `
      <h3>Champions</h3>
      <p>Anuncio izquierda Champions</p>
    `,
    right: 
    `
      <h3>Champions</h3>
      <p>Anuncio derecha Champions</p>
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
});
