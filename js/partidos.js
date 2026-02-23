// Datos de ligas y equipos (Copiados de Página Web Omar/js/frontera.js para sincronización)
const teamRatings = {
    'Man. City': 95, 'Arsenal': 92, 'Liverpool': 90, 'Man. Utd': 85, 'Tottenham': 83, 'Aston Villa': 80, 'Newcastle': 78, 'Chelsea': 76, 'West Ham': 72, 'Brighton': 70,
    'Real Madrid': 96, 'FC Barcelona': 93, 'Atlético Madrid': 88, 'Real Sociedad': 80, 'Athletic Club': 78, 'Girona FC': 75, 'Real Betis': 72, 'Valencia CF': 70, 'Villarreal CF': 68, 'Sevilla FC': 65,
    'Inter': 92, 'Juventus': 90, 'AC Milan': 88, 'Atalanta': 85, 'AS Roma': 82, 'Napoli': 80, 'Lazio': 78, 'Fiorentina': 75,
    'Bayern Munich': 97, 'Bayer Leverkusen': 90, 'RB Leipzig': 85, 'Borussia Dortmund': 82, 'VfB Stuttgart': 78, 'Eintracht Frankfurt': 72,
    'PSG': 94, 'OGC Nice': 80, 'AS Monaco': 78, 'Lille OSC': 75, 'Stade Brestois': 72, 'Olympique Lyon': 70
};

const leagues = {
    premier: { name: 'Premier League', teams: ['Man. City','Arsenal','Liverpool','Aston Villa','Tottenham','Man. Utd','Newcastle','Chelsea','West Ham','Brighton'] },
    laliga: { name: 'LaLiga', teams: ['Real Madrid','FC Barcelona','Atlético Madrid','Real Sociedad','Athletic Club','Girona FC','Real Betis','Valencia CF','Villarreal CF','Sevilla FC'] },
    seriea: { name: 'Serie A', teams: ['Inter','Juventus','AC Milan','Atalanta','AS Roma','Napoli','Lazio','Fiorentina'] },
    bundesliga: { name: 'Bundesliga', teams: ['Bayer Leverkusen','Bayern Munich','VfB Stuttgart','RB Leipzig','Borussia Dortmund','Eintracht Frankfurt'] },
    ligue1: { name: 'Ligue 1', teams: ['PSG','OGC Nice','AS Monaco','Lille OSC','Stade Brestois','Olympique Lyon'] }
};

// Logos de los equipos (Para que se vea bonito)
const teamLogos = {
    'Man. City': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
    'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
    'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
    'Man. Utd': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
    'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
    'FC Barcelona': 'https://upload.wikimedia.org/wikipedia/sco/thumb/4/47/FC_Barcelona_%28crest%29.svg/1280px-FC_Barcelona_%28crest%29.svg.png',
    'Atlético Madrid': 'https://upload.wikimedia.org/wikipedia/an/thumb/f/f4/Atletico_Madrid_2017_logo.svg/330px-Atletico_Madrid_2017_logo.svg.png',
    'Sevilla FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png',
    'PSG': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
    'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
    'Inter': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png',
    'Juventus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png'
};

const placeholderLogo = "https://via.placeholder.com/150?text=FC";

// Fondos de estadios
const stadiumBackgrounds = [
    "https://platform.barcablaugranes.com/wp-content/uploads/sites/21/chorus/uploads/chorus_asset/file/25914626/2205436063.jpg?quality=90&strip=all&crop=0%2C0%2C100%2C95.177240225164&w=2400",
    "https://img.asmedia.epimg.net/resizer/v2/LALIGA_EA_SPORTS_MADRID_-_SEVILLA_G9V7P4_3.jpg?auth=96b72944b7d14e0f6c2c628e930f9a2e6e14d115e8e8e3d6e3e3e3e3e3e3e3e&width=1200&height=675&smart=true",
    "https://i.guim.co.uk/img/media/e14197e4293f946e3e78f9f06f9d479103e67c0c/0_148_4434_2661/master/4434.jpg?width=1200&height=675&quality=85&auto=format&fit=crop&s=4e4e9f7e3c9e8d4e4e4e4e4e4e4e4e4e"
];

function generateFixtures(teamsCount){
    let fixtures = [];
    const n = teamsCount;
    const teams = [...Array(n).keys()];
    
    for (let round = 0; round < n - 1; round++){
      const jornada = [];
      for (let i = 0; i < Math.floor(n / 2); i++){
        let homeIdx = teams[i];
        let awayIdx = teams[n - 1 - i];
        
        if (i === 0 && round % 2 === 1) {
          [homeIdx, awayIdx] = [awayIdx, homeIdx];
        }
        
        jornada.push({ homeIdx, awayIdx });
      }
      fixtures.push(jornada);
      teams.splice(1, 0, teams.pop());
    }
    
    const idaCount = fixtures.length;
    for (let r = 0; r < idaCount; r++){
      const jornada = fixtures[r].map(m => ({ homeIdx: m.awayIdx, awayIdx: m.homeIdx }));
      fixtures.push(jornada);
    }
    return fixtures;
}

function generarCuotasParaPartido(team1, team2) {
    const r1 = teamRatings[team1] || 70;
    const r2 = teamRatings[team2] || 70;
    
    // Probabilidad basada en ratings
    const total = r1 + r2;
    const prob1 = r1 / total;
    const prob2 = r2 / total;
    
    // Cuota = 1 / probabilidad (con margen para la casa)
    const margin = 0.9;
    let c1 = (1 / prob1) * margin;
    let c2 = (1 / prob2) * margin;
    let ce = 3.20 + (Math.abs(r1 - r2) / 10); // Empate más probable si son iguales
    
    return {
        cuota1: Math.max(1.1, c1).toFixed(2),
        cuotaEmpate: ce.toFixed(2),
        cuota2: Math.max(1.1, c2).toFixed(2)
    };
}

function obtenerPartidosDeOmar() {
    let allMatches = [];
    
    Object.keys(leagues).forEach(leagueKey => {
        const league = leagues[leagueKey];
        const storageKey = `frontera_${leagueKey}`;
        const rawTable = localStorage.getItem(storageKey);
        
        if (rawTable) {
            // Esta liga tiene datos en Omar
            const table = JSON.parse(rawTable);
            const simKey = `${storageKey}_simulados`;
            const simRaw = localStorage.getItem(simKey);
            const simulatedMatches = simRaw ? JSON.parse(simRaw) : [];
            
            const fixtures = generateFixtures(league.teams.length);
            
            // Buscar la semana actual (la primera no completada)
            let currentWeek = 0;
            for(let i=0; i<fixtures.length; i++){
                const allDone = fixtures[i].every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`));
                if(allDone) currentWeek = i + 1;
                else break;
            }
            
            if (currentWeek < fixtures.length) {
                const jornada = fixtures[currentWeek];
                jornada.forEach((match, idx) => {
                    const matchKey = `${match.homeIdx}-${match.awayIdx}`;
                    if (!simulatedMatches.includes(matchKey)) {
                        const homeTeam = league.teams[match.homeIdx];
                        const awayTeam = league.teams[match.awayIdx];
                        const cuotas = generarCuotasParaPartido(homeTeam, awayTeam);
                        
                        allMatches.push({
                            id: `omar_${leagueKey}_w${currentWeek}_${idx}`,
                            leagueKey: leagueKey,
                            week: currentWeek,
                            matchKey: matchKey,
                            deporte: "Fútbol",
                            liga: league.name,
                            estado: "Próximamente",
                            equipo1: homeTeam,
                            equipo2: awayTeam,
                            logo1: teamLogos[homeTeam] || placeholderLogo,
                            logo2: teamLogos[awayTeam] || placeholderLogo,
                            hora: "20:00",
                            fecha: `Semana ${currentWeek + 1}`,
                            fondo: stadiumBackgrounds[idx % stadiumBackgrounds.length],
                            ...cuotas
                        });
                    }
                });
            }
        }
    });
    
    return allMatches;
}

function renderizarPartidos() {
    const grid = document.querySelector('.matches__grid');
    const heroSection = document.querySelector('.hero');
    
    let partidosData = obtenerPartidosDeOmar();
    
    // Si no hay partidos de Omar, mostrar algunos de ejemplo o un mensaje
    if (partidosData.length === 0) {
        console.log("No se detectaron ligas activas en Omar. Usando datos de ejemplo.");
        partidosData = [
            {
                id: 1,
                deporte: "Fútbol",
                liga: "La Liga (Demo)",
                estado: "Próximamente",
                equipo1: "Real Madrid",
                equipo2: "FC Barcelona",
                logo1: teamLogos['Real Madrid'],
                logo2: teamLogos['FC Barcelona'],
                hora: "21:00",
                fecha: "24 Feb",
                fondo: stadiumBackgrounds[1],
                cuota1: "2.10", cuotaEmpate: "3.40", cuota2: "2.80"
            }
        ];
    }

    if (grid) {
        grid.innerHTML = '';
        partidosData.forEach(partido => {
            const card = document.createElement('article');
            card.className = 'match__card';
            card.innerHTML = `
                <div class="match__header" style="background-image: url('${partido.fondo}');">
                    <div class="match__overlay"></div>
                    <div class="match__top">
                        <span class="badge">🏆 ${partido.liga}</span>
                        <span class="pill">${partido.estado}</span>
                    </div>

                    <div class="match__teams">
                        <div class="team">
                            <img src="${partido.logo1}" alt="${partido.equipo1}" class="team__logo">
                            <span class="team__name">${partido.equipo1}</span>
                        </div>

                        <div class="match__time">
                            <span class="time__big">${partido.hora}</span>
                            <span class="date__small">${partido.fecha}</span>
                        </div>

                        <div class="team">
                            <img src="${partido.logo2}" alt="${partido.equipo2}" class="team__logo">
                            <span class="team__name">${partido.equipo2}</span>
                        </div>
                    </div>
                </div>

                <div class="match__markets">
                    <button class="market__btn" style="--percent: 33%;">
                        <span class="market__name">${partido.equipo1}</span>
                        <span class="market__odds">${partido.cuota1}</span>
                    </button>

                    <button class="market__btn" style="--percent: 33%;">
                        <span class="market__name">Empate</span>
                        <span class="market__odds">${partido.cuotaEmpate}</span>
                    </button>

                    <button class="market__btn" style="--percent: 33%;">
                        <span class="market__name">${partido.equipo2}</span>
                        <span class="market__odds">${partido.cuota2}</span>
                    </button>
                </div>
            `;

            card.addEventListener('click', () => {
                sessionStorage.setItem('partidoSeleccionado', JSON.stringify(partido));
                window.location.href = 'html/páginaCuotasApuesta.html';
            });

            grid.appendChild(card);
        });
    }

    // Actualizar el Hero con el primer partido si existe
    if (heroSection && partidosData.length > 0) {
        const p = partidosData[0];
        const title = heroSection.querySelector('.hero__title');
        const text = heroSection.querySelector('.hero__text');
        if (title) title.textContent = `${p.equipo1} vs ${p.equipo2}`;
        if (text) text.textContent = `Apuesta ahora en el gran duelo de la ${p.liga}. ¡Las cuotas están que arden!`;
        
        // Configurar apuesta rápida del hero
        const heroCard = heroSection.querySelector('.hero__card');
        if (heroCard) {
            const btnYes = heroCard.querySelector('.outcome-btn--yes');
            const btnNo = heroCard.querySelector('.outcome-btn--no');
            const btnApostar = heroCard.querySelector('.trade-btn');
            const inputCantidad = heroCard.querySelector('.amount-input');
            const quickBtns = heroCard.querySelectorAll('.q-btn');
            let seleccionRapida = null;

            if (btnYes) {
                btnYes.querySelector('.outcome-label').textContent = `Gana ${p.equipo1}`;
                btnYes.querySelector('.outcome-price').textContent = p.cuota1;
                btnYes.onclick = (e) => {
                    e.stopPropagation();
                    btnYes.style.background = "#22c55e";
                    if (btnNo) btnNo.style.background = "var(--panel2)";
                    seleccionRapida = { nombre: p.equipo1, cuota: p.cuota1 };
                };
            }
            if (btnNo) {
                btnNo.querySelector('.outcome-label').textContent = `Gana ${p.equipo2}`;
                btnNo.querySelector('.outcome-price').textContent = p.cuota2;
                btnNo.onclick = (e) => {
                    e.stopPropagation();
                    btnNo.style.background = "#22c55e";
                    if (btnYes) btnYes.style.background = "var(--panel2)";
                    seleccionRapida = { nombre: p.equipo2, cuota: p.cuota2 };
                };
            }

            quickBtns.forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    let currentVal = parseFloat(inputCantidad.value) || 0;
                    const text = btn.textContent.trim();
                    if (text === '+$1') inputCantidad.value = currentVal + 1;
                    else if (text === '+$20') inputCantidad.value = currentVal + 20;
                    else if (text === '+$100') inputCantidad.value = currentVal + 100;
                    else if (text === 'Max') inputCantidad.value = window.obtenerSaldo();
                };
            });

            if (btnApostar) {
                btnApostar.onclick = (e) => {
                    e.stopPropagation();
                    if (!seleccionRapida) return alert('Selecciona un ganador.');
                    const cantidad = parseFloat(inputCantidad.value);
                    const saldoActual = window.obtenerSaldo();
                    if (isNaN(cantidad) || cantidad <= 0 || cantidad > saldoActual) return alert('Error en saldo o cantidad.');
                    if (localStorage.getItem('isLoggedIn') !== 'true') {
                        alert('Inicia sesión para apostar.');
                        window.location.href = 'html/loginApuesta.html';
                        return;
                    }

                    // Guardar apuesta pendiente (igual que en cuotas.js)
                    window.actualizarSaldo(saldoActual - cantidad);
                    const nuevaApuesta = {
                        id: Date.now(),
                        matchId: p.id,
                        leagueKey: p.leagueKey,
                        week: p.week,
                        matchKey: p.matchKey,
                        equipo1: p.equipo1,
                        equipo2: p.equipo2,
                        eleccion: seleccionRapida.nombre,
                        cuota: seleccionRapida.cuota,
                        importe: cantidad,
                        estado: 'pendiente',
                        timestamp: new Date().toISOString()
                    };
                    const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
                    apuestas.push(nuevaApuesta);
                    localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));

                    btnApostar.disabled = true;
                    btnApostar.textContent = "¡Registrada!";
                    setTimeout(() => {
                        alert(`¡Apuesta registrada! Simula el partido en Omar para ver el resultado.`);
                        btnApostar.disabled = false;
                        btnApostar.textContent = "Apostar";
                        inputCantidad.value = "";
                    }, 1000);
                };
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', renderizarPartidos);
