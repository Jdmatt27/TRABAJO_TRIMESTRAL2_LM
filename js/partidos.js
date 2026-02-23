// js/partidos.js

function generateFixtures(teamsCount){
    let fixtures = [];
    const n = teamsCount;
    const teams = [...Array(n).keys()];
    for (let round = 0; round < n - 1; round++){
      const jornada = [];
      for (let i = 0; i < Math.floor(n / 2); i++){
        let homeIdx = teams[i];
        let awayIdx = teams[n - 1 - i];
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

function generarCuotasParaPartido(team1, team2) {
    const data1 = window.getEquipoData(team1);
    const data2 = window.getEquipoData(team2);
    const total = data1.rating + data2.rating;
    const prob1 = data1.rating / total;
    const prob2 = data2.rating / total;
    const margin = 0.9;
    return {
        cuota1: Math.max(1.1, (1 / prob1) * margin).toFixed(2),
        cuotaEmpate: (3.20 + (Math.abs(data1.rating - data2.rating) / 10)).toFixed(2),
        cuota2: Math.max(1.1, (1 / prob2) * margin).toFixed(2)
    };
}

function obtenerPartidosDeOmar() {
    let allMatches = [];
    if (typeof LIGAS_CONFIG === 'undefined') return [];

    Object.keys(LIGAS_CONFIG).forEach(leagueKey => {
        const league = LIGAS_CONFIG[leagueKey];
        const rawTable = localStorage.getItem(`frontera_${leagueKey}`);
        if (rawTable) {
            const simulatedMatches = JSON.parse(localStorage.getItem(`frontera_${leagueKey}_simulados`) || '[]');
            const fixtures = generateFixtures(league.teams.length);
            let currentWeek = 0;
            for(let i=0; i<fixtures.length; i++){
                if(fixtures[i].every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`))) currentWeek = i + 1;
                else break;
            }
            if (currentWeek < fixtures.length) {
                fixtures[currentWeek].forEach((match, idx) => {
                    const matchKey = `${match.homeIdx}-${match.awayIdx}`;
                    if (!simulatedMatches.includes(matchKey)) {
                        const homeTeam = league.teams[match.homeIdx];
                        const awayTeam = league.teams[match.awayIdx];
                        const homeData = window.getEquipoData(homeTeam);
                        const awayData = window.getEquipoData(awayTeam);
                        
                        allMatches.push({
                            id: `omar_${leagueKey}_w${currentWeek}_${idx}`,
                            leagueKey, week: currentWeek, matchKey,
                            deporte: "Fútbol", liga: league.name, estado: "Próximamente",
                            equipo1: homeTeam, equipo2: awayTeam,
                            logo1: homeData.logo, logo2: awayData.logo,
                            hora: "20:00", fecha: `Semana ${currentWeek + 1}`,
                            fondo: homeData.stadium,
                            ratingTotal: homeData.rating + awayData.rating,
                            ...generarCuotasParaPartido(homeTeam, awayTeam)
                        });
                    }
                });
            }
        }
    });
    return allMatches;
}

function createMatchCard(p, isBig = false) {
    const card = document.createElement('article');
    card.className = isBig ? 'match__card--cuotas' : 'match__card';
    card.style.cursor = 'pointer';
    if (isBig) {
        card.style.margin = '2rem 0';
        card.style.width = '100%';
    }

    card.innerHTML = `
        <div class="match__header" style="background-image: url('${p.fondo}'); ${isBig ? 'height: 280px;' : ''}">
            <div class="match__overlay"></div>
            <div class="match__top">
                <span class="badge">🏆 ${p.liga}</span>
                <span class="pill">${p.estado}</span>
            </div>
            <div class="match__teams">
                <div class="team"><img src="${p.logo1}" class="team__logo"><span class="team__name">${p.equipo1}</span></div>
                <div class="match__time"><span class="time__big">${p.hora}</span><span class="date__small">${p.fecha}</span></div>
                <div class="team"><img src="${p.logo2}" class="team__logo"><span class="team__name">${p.equipo2}</span></div>
            </div>
        </div>
        <div class="${isBig ? 'match__markets--big' : 'match__markets'}">
            <button class="market__btn" style="--percent: 33%;"><span class="market__name">${p.equipo1}</span><span class="market__odds">${p.cuota1}</span></button>
            <button class="market__btn" style="--percent: 33%;"><span class="market__name">Empate</span><span class="market__odds">${p.cuotaEmpate}</span></button>
            <button class="market__btn" style="--percent: 33%;"><span class="market__name">${p.equipo2}</span><span class="market__odds">${p.cuota2}</span></button>
        </div>
    `;
    card.onclick = () => { sessionStorage.setItem('partidoSeleccionado', JSON.stringify(p)); window.location.href = 'html/páginaCuotasApuesta.html'; };
    return card;
}

function renderizarPartidos() {
    const mainPage = document.querySelector('.page');
    const grid = document.querySelector('.matches__grid');
    const heroSection = document.querySelector('.hero');
    
    if (grid) grid.innerHTML = '';
    document.querySelectorAll('.page > .match__card--cuotas, .page > .matches__grid').forEach(el => {
        if (el !== grid) el.remove();
    });

    let partidosData = obtenerPartidosDeOmar();
    if (partidosData.length === 0) return;

    // 1. Ordenar todos los partidos por nivel (de mejor a peor)
    partidosData.sort((a, b) => b.ratingTotal - a.ratingTotal);

    // 2. Extraer el TOP 1 para el Hero
    const topHero = partidosData.shift();
    if (heroSection) {
        heroSection.querySelector('.hero__title').textContent = `${topHero.equipo1} vs ${topHero.equipo2}`;
        // (Lógica de apuesta rápida del hero omitida por brevedad, se mantiene igual)
    }

    // 3. Organizar los "Seleccionados del Día" (Grandes)
    // Necesitamos 1 grande por cada 3 normales. 
    // Por tanto, 1 de cada 4 partidos será grande.
    const numBigSlots = Math.floor(partidosData.length / 4);
    
    // Los siguientes 'numBigSlots' mejores partidos serán los Grandes
    const bigPool = partidosData.splice(0, numBigSlots);
    const normalPool = partidosData;

    // 4. Intercalado: 3 normales -> 1 grande
    let currentGrid = grid;
    
    while (normalPool.length > 0 || bigPool.length > 0) {
        // Añadir hasta 3 normales
        for (let i = 0; i < 3 && normalPool.length > 0; i++) {
            currentGrid.appendChild(createMatchCard(normalPool.shift(), false));
        }

        // Añadir 1 grande (si hay)
        if (bigPool.length > 0) {
            const bigCard = createMatchCard(bigPool.shift(), true);
            mainPage.appendChild(bigCard);
            
            // Si quedan más partidos, creamos un nuevo grid para los siguientes 3
            if (normalPool.length > 0) {
                const nextGrid = document.createElement('section');
                nextGrid.className = 'matches__grid';
                mainPage.appendChild(nextGrid);
                currentGrid = nextGrid;
            }
        }
    }

    const staticTenis = document.getElementById('matchSeleccionadoDia');
    if (staticTenis) staticTenis.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', renderizarPartidos);
