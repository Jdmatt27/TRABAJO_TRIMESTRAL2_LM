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
        teams[0].querySelector('.hero__team-name').textContent = p.equipo1;
        teams[1].querySelector('.hero__team-logo').src = p.logo2;
        teams[1].querySelector('.hero__team-logo').onerror = function() { window.imgError(this); };
        teams[1].querySelector('.hero__team-name').textContent = p.equipo2;
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
