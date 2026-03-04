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

/**
 * app.js - Lógica de la Página Principal
 */

// --- 1. GENERACIÓN DE PARTIDOS Y CUOTAS ---
function generateFixtures(teamsCount) {
    let fixtures = [];
    const teams = [...Array(teamsCount).keys()];
    for (let round = 0; round < teamsCount - 1; round++) {
        const jornada = [];
        for (let i = 0; i < Math.floor(teamsCount / 2); i++) {
            let homeIdx = teams[i], awayIdx = teams[teamsCount - 1 - i];
            if (i === 0 && round % 2 === 1) [homeIdx, awayIdx] = [awayIdx, homeIdx];
            jornada.push({ homeIdx, awayIdx });
        }
        fixtures.push(jornada);
        teams.splice(1, 0, teams.pop());
    }
    const idaCount = fixtures.length;
    for (let r = 0; r < idaCount; r++) fixtures.push(fixtures[r].map(m => ({ homeIdx: m.awayIdx, awayIdx: m.homeIdx })));
    return fixtures;
}

function generarCuotas(team1, team2, leagueKey) {
    const table = JSON.parse(localStorage.getItem(`frontera_${leagueKey}`) || 'null');
    const getRating = (name) => {
        const base = window.getEquipoData(name).rating;
        if (!table) return base;
        const stats = table.find(t => t.nombre === name);
        if (!stats || stats.partidosJugados === 0) return base;
        const perf = 50 + ((stats.puntos / stats.partidosJugados) * 15) + ((stats.golesFavor - stats.golesContra) * 0.2);
        return (base * 0.6) + (perf * 0.4);
    };

    const r1 = getRating(team1), r2 = getRating(team2);
    const prob1 = r1 / (r1 + r2), margin = 0.92;
    return {
        cuota1: Math.max(1.05, (1 / prob1) * margin).toFixed(2),
        cuotaEmpate: (3.10 + (Math.abs(r1 - r2) / 15)).toFixed(2),
        cuota2: Math.max(1.05, (1 / (r2 / (r1 + r2))) * margin).toFixed(2),
        ratingTotal: r1 + r2
    };
}

function generarDescripcionAleatoria(p) {
    const desc = [
        `El duelo entre ${p.equipo1} y ${p.equipo2} promete ser un choque táctico sin precedentes.`,
        `Rivalidad histórica: el ${p.equipo1} busca dominar al ${p.equipo2} en un encuentro vital.`,
        `Duelo de titanes en la ${p.liga}. Las estadísticas favorecen al local, pero el fútbol es impredecible.`,
        `Todo listo para el pitido inicial. Se espera un partido de ida y vuelta con muchas ocasiones.`
    ];
    return desc[Math.floor(Math.random() * desc.length)];
}

function obtenerPartidos() {
    let allMatches = [];
    if (!window.LIGAS_CONFIG) return [];
    Object.keys(window.LIGAS_CONFIG).forEach(key => {
        const league = window.LIGAS_CONFIG[key];
        const historial = JSON.parse(localStorage.getItem(`frontera_${key}_historial`) || '[]');
        const fixtures = generateFixtures(league.teams.length);
        const currentWeek = Math.floor(historial.length / Math.floor(league.teams.length / 2));

        if (currentWeek < fixtures.length) {
            fixtures[currentWeek].forEach((m, idx) => {
                const hName = league.teams[m.homeIdx], aName = league.teams[m.awayIdx];
                const hData = window.getEquipoData(hName), aData = window.getEquipoData(aName);
                allMatches.push({
                    id: `match_${key}_w${currentWeek}_${idx}`,
                    leagueKey: key, week: currentWeek, matchKey: `${m.homeIdx}-${m.awayIdx}`,
                    liga: league.name, ligaLogo: league.logo, equipo1: hName, equipo2: aName,
                    logo1: hData.logo, logo2: aData.logo, fondo: hData.stadium, deporte: "Fútbol",
                    hora: ["14:00", "16:15", "18:30", "21:00"][idx % 4] || "21:00",
                    fecha: `Jornada ${currentWeek + 1}`, estado: "Próximamente",
                    ...generarCuotas(hName, aName, key)
                });
            });
        }
    });
    return allMatches.sort((a, b) => b.ratingTotal - a.ratingTotal);
}

// --- 2. RENDERIZADO ---
function createMatchCard(p, isBig = false) {
    const card = document.createElement('article');
    card.className = isBig ? 'match__card--cuotas' : 'match__card';
    card.innerHTML = `
        <div class="match__header" style="background-image: url('${p.fondo}');">
            <div class="match__overlay"></div>
            <div class="match__top">
                <span class="badge"><img src="${p.ligaLogo}" onerror="window.imgError(this)" style="width:16px;height:16px;"> ${p.liga}</span>
                <span class="pill">${p.estado}</span>
            </div>
            <div class="match__teams">
                <div class="team"><img src="${p.logo1}" onerror="window.imgError(this)" class="team__logo"><span class="team__name">${p.equipo1}</span></div>
                <div class="match__time"><span class="time__big">${p.hora}</span><span class="date__small">${p.fecha}</span></div>
                <div class="team"><img src="${p.logo2}" onerror="window.imgError(this)" class="team__logo"><span class="team__name">${p.equipo2}</span></div>
            </div>
        </div>
        <div class="${isBig ? 'match__markets--big' : 'match__markets'}">
            <button class="market__btn"><span class="market__name">${p.equipo1}</span><span class="market__odds">${p.cuota1}</span></button>
            <button class="market__btn"><span class="market__name">Empate</span><span class="market__odds">${p.cuotaEmpate}</span></button>
            <button class="market__btn"><span class="market__name">${p.equipo2}</span><span class="market__odds">${p.cuota2}</span></button>
        </div>
    `;
    card.onclick = (e) => {
        if (e.target.closest('.market__btn')) return; // No redirigir si clickea el botón de cuota directamente
        sessionStorage.setItem('partidoSeleccionado', JSON.stringify(p));
        const isSub = window.location.pathname.includes('/html/');
        window.location.href = isSub ? 'páginaCuotasApuesta.html' : 'html/páginaCuotasApuesta.html';
    };
    return card;
}

function initDashboard() {
    const grid = document.querySelector('.matches__grid');
    const page = document.querySelector('.page');
    if (!grid) return;

    const partidos = obtenerPartidos();
    if (partidos.length === 0) return;

    const top = partidos.shift();
    updateHero(top);

    grid.innerHTML = '';
    document.querySelectorAll('.page > .match__card--cuotas, .page > .matches__grid').forEach(el => el !== grid && el.remove());

    let currentGrid = grid;
    while (partidos.length > 0) {
        for (let i = 0; i < 3 && partidos.length > 0; i++) currentGrid.appendChild(createMatchCard(partidos.shift()));
        if (partidos.length > 0) {
            const big = createMatchCard(partidos.shift(), true);
            page.appendChild(big);
            const nextGrid = document.createElement('section');
            nextGrid.className = 'matches__grid';
            page.appendChild(nextGrid);
            currentGrid = nextGrid;
        }
    }
}

// --- 3. LÓGICA DEL HERO ---
let heroSelection = null;

function updateHero(p) {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.querySelector('.hero__title').textContent = `${p.equipo1} vs ${p.equipo2}`;
    hero.querySelector('.hero__text').textContent = generarDescripcionAleatoria(p);
    
    // REDIRECCIÓN: Si pulsas la tarjeta (pero no los botones), vas a cuotas
    hero.style.cursor = 'pointer';
    hero.onclick = (e) => {
        if (e.target.closest('.hero__actions') || e.target.closest('.hero__card')) return;
        sessionStorage.setItem('partidoSeleccionado', JSON.stringify(p));
        window.location.href = 'html/páginaCuotasApuesta.html';
    };

    const teams = hero.querySelectorAll('.hero__team');
    if (teams.length === 2) {
        teams[0].querySelector('.hero__team-logo').src = p.logo1;
        teams[0].querySelector('.hero__team-logo').onerror = function() { window.imgError(this); };
        
        teams[1].querySelector('.hero__team-logo').src = p.logo2;
        teams[1].querySelector('.hero__team-logo').onerror = function() { window.imgError(this); };
    }

    const btns = hero.querySelectorAll('.outcome-btn');
    const setupBtn = (btn, name, cuota) => {
        btn.querySelector('.outcome-label').textContent = `Gana ${name}`;
        btn.querySelector('.outcome-price').textContent = cuota;
        btn.onclick = (e) => {
            e.stopPropagation();
            const wasActive = btn.classList.contains('active');
            btns.forEach(b => b.classList.remove('active'));
            
            if (wasActive) {
                heroSelection = null;
            } else {
                btn.classList.add('active');
                heroSelection = { name, cuota, match: p };
            }
        };
    };
    setupBtn(btns[0], p.equipo1, p.cuota1);
    setupBtn(btns[1], p.equipo2, p.cuota2);
}

window.apostarHero = () => {
    if (!heroSelection) return window.showToast('Selecciona un equipo primero.');
    const amount = parseFloat(document.getElementById('heroAmount').value);
    const saldo = window.obtenerSaldo();

    if (isNaN(amount) || amount <= 0) return window.showToast('Cantidad inválida.');
    if (amount > saldo) return window.showToast('Saldo insuficiente.');
    if (localStorage.getItem('isLoggedIn') !== 'true') return window.location.href = 'html/loginApuesta.html';

    window.actualizarSaldo(saldo - amount);
    const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
    apuestas.push({
        id: Date.now(), matchId: heroSelection.match.id, leagueKey: heroSelection.match.leagueKey,
        matchKey: heroSelection.match.matchKey, equipo1: heroSelection.match.equipo1, 
        equipo2: heroSelection.match.equipo2, eleccion: heroSelection.name,
        cuota: heroSelection.cuota, importe: amount, estado: 'pendiente', timestamp: new Date().toISOString()
    });
    localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));
    window.showToast('¡Apuesta realizada con éxito!', 'success');
    document.getElementById('heroAmount').value = '';
    document.querySelectorAll('.outcome-btn').forEach(b => b.classList.remove('active'));
    heroSelection = null;
};

document.addEventListener('configReady', initDashboard);
