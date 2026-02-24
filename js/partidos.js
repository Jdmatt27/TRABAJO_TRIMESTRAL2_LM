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

function getRatingFromStats(teamName, table) {
    const baseData = window.getEquipoData(teamName);
    if (!table || !Array.isArray(table)) return baseData.rating;
    
    const teamStats = table.find(t => t.nombre === teamName);
    if (!teamStats) return baseData.rating;

    // Cálculo de rating dinámico basado en puntos y diferencia de goles
    const puntos = teamStats.puntos || 0;
    const gf = teamStats.golesFavor || 0;
    const gc = teamStats.golesContra || 0;
    const pj = teamStats.partidosJugados || 0;
    const dg = gf - gc;

    if (pj === 0) return baseData.rating;

    const ppg = puntos / pj; // Puntos por partido (0 a 3)
    
    // El rating actual se basa en el rendimiento: 
    // 50 (base) + (puntos por partido * 15) + (diferencia de goles * 0.2)
    const performanceRating = 50 + (ppg * 15) + (dg * 0.2);
    
    // Mezclamos el rating histórico (EQUIPOS_CONFIG) con el rendimiento actual (60/40)
    const finalRating = (baseData.rating * 0.6) + (performanceRating * 0.4);
    
    return Math.min(98, Math.max(45, finalRating));
}

function generarCuotasParaPartido(team1, team2, table = null) {
    const rating1 = getRatingFromStats(team1, table);
    const rating2 = getRatingFromStats(team2, table);
    
    const total = rating1 + rating2;
    const prob1 = rating1 / total;
    const prob2 = rating2 / total;
    const margin = 0.92; // Margen de la casa (8%)

    // Cálculo de cuotas basado en probabilidades
    let c1 = (1 / prob1) * margin;
    let c2 = (1 / prob2) * margin;
    
    // Cuota de empate basada en la cercanía de los ratings
    const diff = Math.abs(rating1 - rating2);
    let cEmpate = 3.10 + (diff / 15);

    return {
        cuota1: Math.max(1.05, c1).toFixed(2),
        cuotaEmpate: Math.max(2.50, cEmpate).toFixed(2),
        cuota2: Math.max(1.05, c2).toFixed(2)
    };
}

function obtenerPartidosDeOmar() {
    let allMatches = [];
    if (typeof LIGAS_CONFIG === 'undefined') return [];

    Object.keys(LIGAS_CONFIG).forEach(leagueKey => {
        const league = LIGAS_CONFIG[leagueKey];
        // Intentamos obtener la tabla por ID o por Nombre (por si Omar usa el nombre)
        let rawTable = localStorage.getItem(`frontera_${leagueKey}`);
        if (!rawTable) rawTable = localStorage.getItem(`frontera_${league.name}`);
        
        // Si no hay tabla, pero es la primera vez que entramos, podríamos querer ver los partidos
        // No obstante, si Omar no ha inicializado la liga, no sabemos qué equipos están.
        // Asumimos que si existe la config, la liga es válida.
        
        const table = rawTable ? JSON.parse(rawTable) : null;
        const histRaw = localStorage.getItem(`frontera_${leagueKey}_historial`) || localStorage.getItem(`frontera_${league.name}_historial`);
        const historial = histRaw ? JSON.parse(histRaw) : [];
        
        const teamsCount = league.teams.length;
        const fixtures = generateFixtures(teamsCount);
        const matchesPerJornada = Math.floor(teamsCount / 2);
        
        // Calculamos la jornada actual de forma más robusta:
        // Total de partidos jugados / partidos por jornada
        let currentWeek = Math.floor(historial.length / matchesPerJornada);

        if (currentWeek < fixtures.length) {
            fixtures[currentWeek].forEach((match, idx) => {
                // Solo mostramos si no está en el historial (por si se juegan jornadas parciales)
                const yaJugado = historial.some(h => 
                    (h.homeIdx === match.homeIdx && h.awayIdx === match.awayIdx) ||
                    (h.equipoLocal === league.teams[match.homeIdx] && h.equipoVisitante === league.teams[match.awayIdx])
                );
                
                if (!yaJugado) {
                    const homeTeam = league.teams[match.homeIdx];
                    const awayTeam = league.teams[match.awayIdx];
                    const homeData = window.getEquipoData(homeTeam);
                    const awayData = window.getEquipoData(awayTeam);
                    
                    // Horarios realistas basados en el orden (índice del partido en la jornada)
                    const horariosBase = ["14:00", "16:15", "18:30", "21:00", "21:00"];
                    const horaAsignada = horariosBase[idx % horariosBase.length];

                    allMatches.push({
                        id: `omar_${leagueKey}_w${currentWeek}_${idx}`,
                        leagueKey, 
                        week: currentWeek, 
                        matchKey: `${match.homeIdx}-${match.awayIdx}`,
                        deporte: "Fútbol", 
                        liga: league.name,
                        ligaLogo: league.logo,
                        estado: "Próximamente",
                        equipo1: homeTeam, 
                        equipo2: awayTeam,
                        logo1: homeData.logo, 
                        logo2: awayData.logo,
                        hora: horaAsignada, 
                        fecha: `Jornada ${currentWeek + 1}`,
                        fondo: homeData.stadium,
                        ratingTotal: homeData.rating + awayData.rating,
                        ...generarCuotasParaPartido(homeTeam, awayTeam, table)
                    });
                }
            });
        }
    });
    return allMatches;
}

function createMatchCard(p, isBig = false) {
    const card = document.createElement('article');
    card.className = isBig ? 'match__card--cuotas' : 'match__card';
    card.style.cursor = 'pointer';
    if (isBig) {
        card.style.width = '100%';
    }

    card.innerHTML = `
        <div class="match__header" style="background-image: url('${p.fondo}');">
            <div class="match__overlay"></div>
            <div class="match__top">
                <span class="badge" style="display: flex; align-items: center; gap: 6px;">
                    <img src="${p.ligaLogo}" style="width: 16px; height: 16px; object-fit: contain;">
                    ${p.liga}
                </span>
                <span class="pill">${p.estado}</span>
            </div>
            <div class="match__teams">
                <div class="team"><img src="${p.logo1}" class="team__logo"><span class="team__name">${p.equipo1}</span></div>
                <div class="match__time"><span class="time__big">${p.hora}</span><span class="date__small">${p.fecha}</span></div>
                <div class="team"><img src="${p.logo2}" class="team__logo"><span class="team__name">${p.equipo2}</span></div>
            </div>
        </div>
        <div class="${isBig ? 'match__markets--big' : 'match__markets'}">
            <button class="market__btn"><span class="market__name">${p.equipo1}</span><span class="market__odds">${p.cuota1}</span></button>
            <button class="market__btn"><span class="market__name">Empate</span><span class="market__odds">${p.cuotaEmpate}</span></button>
            <button class="market__btn"><span class="market__name">${p.equipo2}</span><span class="market__odds">${p.cuota2}</span></button>
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
        // Actualizar Título y Texto
        heroSection.querySelector('.hero__title').textContent = `${topHero.equipo1} vs ${topHero.equipo2}`;
        
        // Actualizar Logos y Nombres en el display
        const matchDisplay = heroSection.querySelector('.hero__match-display');
        if (matchDisplay) {
            const teams = matchDisplay.querySelectorAll('.hero__team');
            if (teams.length === 2) {
                // Equipo 1
                teams[0].querySelector('.hero__team-logo').src = topHero.logo1;
                teams[0].querySelector('.hero__team-logo').alt = topHero.equipo1;
                teams[0].querySelector('.hero__team-name').textContent = topHero.equipo1;
                
                // Equipo 2
                teams[1].querySelector('.hero__team-logo').src = topHero.logo2;
                teams[1].querySelector('.hero__team-logo').alt = topHero.equipo2;
                teams[1].querySelector('.hero__team-name').textContent = topHero.equipo2;
            }
        }

        // Actualizar Botones de Apuesta
        const outcomeBtns = heroSection.querySelectorAll('.outcome-btn');
        if (outcomeBtns.length === 2) {
            // Botón 1 (Gana Local)
            outcomeBtns[0].setAttribute('onclick', `seleccionarMercadoHero('${topHero.equipo1}', ${topHero.cuota1})`);
            outcomeBtns[0].querySelector('.outcome-label').textContent = `Gana ${topHero.equipo1}`;
            outcomeBtns[0].querySelector('.outcome-price').textContent = topHero.cuota1;
            
            // Botón 2 (Gana Visitante)
            outcomeBtns[1].setAttribute('onclick', `seleccionarMercadoHero('${topHero.equipo2}', ${topHero.cuota2})`);
            outcomeBtns[1].querySelector('.outcome-label').textContent = `Gana ${topHero.equipo2}`;
            outcomeBtns[1].querySelector('.outcome-price').textContent = topHero.cuota2;
        }
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
