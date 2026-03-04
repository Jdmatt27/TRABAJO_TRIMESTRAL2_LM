/*OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR OMAR*/

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  if (params.get("view") === "seleccion") {
    document.getElementById("vista-seleccion")?.classList.remove("oculto");
    document.getElementById("vista-panel")?.classList.add("oculto");
    document.getElementById("vista-equipo")?.classList.add("oculto");
    document.getElementById("vista-global")?.classList.add("oculto");
    history.replaceState({}, "", "frontera.html");
    return;
  }
});
(function () {
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

  const teamPlayers = {
    'Man. City': ['Haaland', 'De Bruyne', 'Foden', 'Rodri', 'B. Silva', 'Ederson'],
    'Arsenal': ['Saka', 'Odegaard', 'Rice', 'Martinelli', 'Jesus', 'Raya'],
    'Liverpool': ['Salah', 'Van Dijk', 'Alisson', 'Trent AA', 'Nunez', 'Szoboszlai'],
    'Aston Villa': ['Watkins', 'Bailey', 'Douglas Luiz', 'McGinn', 'Martinez'],
    'Tottenham': ['Son', 'Maddison', 'Richarlison', 'Kulusevski', 'Vicario'],
    'Man. Utd': ['Fernandes', 'Rashford', 'Hojlund', 'Garnacho', 'Onana'],
    'Newcastle': ['Isak', 'Gordon', 'Guimaraes', 'Trippier', 'Pope'],
    'Chelsea': ['Palmer', 'Jackson', 'Sterling', 'Gallagher', 'Petrovic'],
    'West Ham': ['Bowen', 'Kudus', 'Paqueta', 'Ward-Prowse', 'Areola'],
    'Brighton': ['Pedro', 'Mitoma', 'Gross', 'Adingra', 'Verbruggen'],
    'Real Madrid': ['Vinicius Jr', 'Bellingham', 'Rodrygo', 'Valverde', 'Courtois'],
    'FC Barcelona': ['Lewandowski', 'Yamal', 'Gundogan', 'Pedri', 'Ter Stegen'],
    'Atlético Madrid': ['Griezmann', 'Morata', 'De Paul', 'Koke', 'Oblak'],
    'Real Sociedad': ['Oyarzabal', 'Kubo', 'Merino', 'Zubimendi', 'Remiro'],
    'Athletic Club': ['I. Williams', 'N. Williams', 'Sancet', 'Simon'],
    'Girona FC': ['Dovbyk', 'Savio', 'Tsygankov', 'Gazzaniga'],
    'Real Betis': ['Isco', 'Fekir', 'Willian Jose', 'Rui Silva'],
    'Valencia CF': ['Duro', 'Pepelu', 'Guerra', 'Mamardashvili'],
    'Villarreal CF': ['Sorloth', 'G. Moreno', 'Baena', 'Jorgensen'],
    'Sevilla FC': ['En-Nesyri', 'Ocampos', 'Ramos', 'Nyland'],
    'Inter': ['L. Martinez', 'Thuram', 'Calhanoglu', 'Sommer'],
    'Juventus': ['Vlahovic', 'Chiesa', 'Rabiot', 'Szczesny'],
    'AC Milan': ['Leao', 'Giroud', 'Pulisic', 'Maignan'],
    'Atalanta': ['Scamacca', 'Koopmeiners', 'Lookman', 'Carnesecchi'],
    'AS Roma': ['Dybala', 'Lukaku', 'Pellegrini', 'Svilar'],
    'Napoli': ['Osimhen', 'Kvaratskhelia', 'Politano', 'Meret'],
    'Lazio': ['Immobile', 'Luis Alberto', 'Anderson', 'Provedel'],
    'Fiorentina': ['Gonzalez', 'Bonaventura', 'Beltran', 'Terracciano'],
    'Bayern Munich': ['Kane', 'Musiala', 'Sane', 'Neuer'],
    'Bayer Leverkusen': ['Wirtz', 'Boniface', 'Grimaldo', 'Hradecky'],
    'RB Leipzig': ['Openda', 'Simons', 'Olmo', 'Gulacsi'],
    'Borussia Dortmund': ['Fullkrug', 'Brandt', 'Sancho', 'Kobel'],
    'VfB Stuttgart': ['Guirassy', 'Undav', 'Fuhrich', 'Nubel'],
    'Eintracht Frankfurt': ['Marmoush', 'Chaibi', 'Gotze', 'Trapp'],
    'PSG': ['Mbappe', 'Dembele', 'Hakimi', 'Donnarumma'],
    'OGC Nice': ['Moffi', 'Laborde', 'Boga', 'Bulka'],
    'AS Monaco': ['Ben Yedder', 'Minamino', 'Golovin', 'Kohn'],
    'Lille OSC': ['David', 'Zhegrova', 'Gomes', 'Chevalier'],
    'Stade Brestois': ['Del Castillo', 'Lees-Melou', 'Bizot'],
    'Olympique Lyon': ['Lacazette', 'Cherki', 'Tolisso', 'Lopes']
  };

  const selView = document.getElementById('vista-seleccion');
  const dashView = document.getElementById('vista-panel');
  const teamView = document.getElementById('vista-equipo');
  const globalView = document.getElementById('vista-global');
  const leagueTitle = document.getElementById('league-title');
  const tbody = document.getElementById('table-body');
  const carouselSection = document.getElementById('carousel-section');

  let current = null;
  let table = [];
  let fixtures = [];
  let simulatedMatches = [];
  let matchHistory = [];
  let matchesInProgress = [];

  function generateFixtures() {
    fixtures = [];
    const n = table.length;
    const teams = [...Array(n).keys()];

    for (let round = 0; round < n - 1; round++) {
      const jornada = [];
      for (let i = 0; i < Math.floor(n / 2); i++) {
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
    for (let r = 0; r < idaCount; r++) {
      const jornada = fixtures[r].map(m => ({ homeIdx: m.awayIdx, awayIdx: m.homeIdx }));
      fixtures.push(jornada);
    }
  }

  function seasonFinished() {
    if (!fixtures || !fixtures.length) return false;
    return currentWeek >= fixtures.length;
  }

  function updateSimButtons() {
    const btn1 = document.getElementById('simulate-match-btn');
    const btn2 = document.getElementById('simulate-league-btn');
    if (!btn1 || !btn2) return;
    const finished = seasonFinished();
    btn1.disabled = finished;
    btn2.disabled = finished;
  }

  function showSelection() {
    if (selView) selView.classList.remove('oculto');
    if (dashView) dashView.classList.add('oculto');
    if (teamView) teamView.classList.add('oculto');
    if (globalView) globalView.classList.add('oculto');
    if (typeof updateCarousel === 'function') setTimeout(updateCarousel, 50);
  }

  function showDashboard() {
    if (selView) selView.classList.add('oculto');
    if (dashView) dashView.classList.remove('oculto');
    if (teamView) teamView.classList.add('oculto');
    if (globalView) globalView.classList.add('oculto');
  }

  function showTeamView() {
    if (selView) selView.classList.add('oculto');
    if (dashView) dashView.classList.add('oculto');
    if (teamView) teamView.classList.remove('oculto');
    if (globalView) globalView.classList.add('oculto');
  }

  function load(leagueKey, el) {
    if (!leagues[leagueKey]) return showToast('Liga no encontrada', 'error');

    document.querySelectorAll('.item_liga.is__selected').forEach(x => x.classList.remove('is__selected'));
    if (el && el.classList) el.classList.add('is__selected');

    current = leagueKey;
    localStorage.setItem('frontera_active_league', leagueKey);
    if (leagueTitle) leagueTitle.textContent = leagues[leagueKey].name;

    const hero = document.querySelector('.portada_hero');
    if (hero) {
      const isSubFolder = window.location.pathname.includes('/html/');
      const imgPrefix = isSubFolder ? '../Images/' : 'Images/';
      const images = {
        premier: imgPrefix + 'Premier.jpeg',
        laliga: imgPrefix + 'laLiga.jpg',
        seriea: imgPrefix + 'Serie_A.png',
        bundesliga: imgPrefix + 'bundesliga.webp',
        ligue1: imgPrefix + 'League_1.png',
      };
      if (images[leagueKey]) hero.style.backgroundImage = `url('${images[leagueKey]}')`;
    }

    loadData();
    generateFixtures();

    currentWeek = 0;
    for (let i = 0; i < fixtures.length; i++) {
      const allSimulated = fixtures[i].every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`));
      if (allSimulated) currentWeek = i + 1;
      else break;
    }

    populateTeamSelector();
    render();
    showDashboard();

    if (dashView) {
      dashView.classList.add('is__appearing');
      setTimeout(() => dashView.classList.remove('is__appearing'), 420);
    }

    updateSimButtons();
  }

  function storageKey() {
    return `frontera_${current}`;
  }

  function buildDefaultTable(leagueKey) {
    return leagues[leagueKey].teams.map((name, i) => ({
      id: i,
      name,
      pj: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
      rating: teamRatings[name] || 70
    }));
  }

  function loadData() {
    const raw = localStorage.getItem(storageKey());

    if (raw) {
      try {
        table = JSON.parse(raw);
        if (!Array.isArray(table) || table.length === 0) throw new Error('Tabla inválida');
      } catch (e) {
        console.error(e);
        table = buildDefaultTable(current);
      }
    } else {
      table = buildDefaultTable(current);
    }

    const simKey = storageKey() + '_simulados';
    const simRaw = localStorage.getItem(simKey);
    try {
      simulatedMatches = simRaw ? JSON.parse(simRaw) : [];
      if (!Array.isArray(simulatedMatches)) simulatedMatches = [];
    } catch (e) {
      console.error(e);
      simulatedMatches = [];
    }

    const histKey = storageKey() + '_historial';
    const histRaw = localStorage.getItem(histKey);
    try {
      matchHistory = histRaw ? JSON.parse(histRaw) : [];
      if (!Array.isArray(matchHistory)) matchHistory = [];
    } catch (e) {
      console.error(e);
      matchHistory = [];
    }
  }

  function saveData() {
    try { localStorage.setItem(storageKey(), JSON.stringify(table)); } catch (e) { console.error(e); }
    try { localStorage.setItem(storageKey() + '_simulados', JSON.stringify(simulatedMatches)); } catch (e) { console.error(e); }
    try { localStorage.setItem(storageKey() + '_historial', JSON.stringify(matchHistory)); } catch (e) { console.error(e); }
  }

  function processResult(homeIdx, awayIdx, homeG, awayG) {
    const home = table[homeIdx];
    const away = table[awayIdx];
    if (!home || !away) return;

    home.pj++; away.pj++;
    home.gf += homeG; home.ga += awayG; home.gd = home.gf - home.ga;
    away.gf += awayG; away.ga += homeG; away.gd = away.gf - away.ga;

    if (homeG > awayG) { home.w++; home.pts += 3; away.l++; }
    else if (homeG === awayG) { home.d++; away.d++; home.pts++; away.pts++; }
    else { away.w++; away.pts += 3; home.l++; }
  }

  function render() {
    if (!tbody) return;
    tbody.innerHTML = '';

    const sorted = [...table].sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    sorted.forEach((t, i) => {
      let rowClass = '';
      if (i < 4) rowClass = 'row__champions';
      else if (i >= sorted.length - 3) rowClass = 'row__relegation';

      const tr = document.createElement('tr');
      if (rowClass) tr.className = rowClass;
      tr.innerHTML = `<td style="font-weight:700">${i + 1}</td><td class="team__col">${t.name}</td><td style="text-align:center">${t.pj}</td><td style="text-align:center;color:#10b981">${t.w}</td><td style="text-align:center">${t.d}</td><td style="text-align:center;color:#ef4444">${t.l}</td><td style="text-align:center">${t.gf}</td><td style="text-align:center">${t.ga}</td><td style="text-align:center;font-weight:700">${t.gd}</td><td class="points__cell">${t.pts}</td>`;
      tbody.appendChild(tr);
    });
  }

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!current) return showToast('No hay liga seleccionada', 'error');
      if (!confirm('¿Borrar datos de la liga?')) return;

      localStorage.removeItem(storageKey());
      localStorage.removeItem(storageKey() + '_simulados');
      localStorage.removeItem(storageKey() + '_historial');
      simulatedMatches = [];
      matchHistory = [];
      currentWeek = 0;
      load(current);
    });
  }

  const teamSel = document.getElementById('team-selector');
  const viewTeamBtn = document.getElementById('view-team-btn');
  const matchSel = document.getElementById('match-selector');
  const viewMatchDetailBtn = document.getElementById('view-match-detail-btn');
  const simulateMatchDetailBtn = document.getElementById('simulate-match-detail-btn');

  function populateTeamSelector() {
    if (!teamSel) return;
    teamSel.innerHTML = '<option value="">Selecciona equipo</option>';
    table.forEach((t, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = t.name;
      teamSel.appendChild(opt);
    });
  }

  function getTeamMatches(teamIdx) {
    const team = table[teamIdx];
    if (!team) return [];

    const matches = [];
    const jornada = fixtures[currentWeek] || [];
    jornada.forEach((match) => {
      if (match.homeIdx === teamIdx || match.awayIdx === teamIdx) {
        matches.push({
          homeIdx: match.homeIdx,
          awayIdx: match.awayIdx,
          homeName: table[match.homeIdx].name,
          awayName: table[match.awayIdx].name
        });
      }
    });
    return matches;
  }

  function showTeamMatchesList() {
    const teamIdx = parseInt(teamSel?.value, 10);
    if (isNaN(teamIdx)) return showToast('Selecciona un equipo primero', 'info');

    const matches = getTeamMatches(teamIdx);
    const teamName = table[teamIdx].name;

    const teamTitle = document.getElementById('team-name-title');
    const detailView = document.getElementById('match-detail-view');
    if (teamTitle) teamTitle.textContent = teamName;
    if (detailView) detailView.style.display = 'none';

    if (!matchSel) return;
    matchSel.innerHTML = '<option value="">Selecciona partido</option>';
    matches.forEach((m) => {
      const opt = document.createElement('option');
      opt.value = JSON.stringify(m);
      opt.textContent = `${m.homeName} vs ${m.awayName}`;
      matchSel.appendChild(opt);
    });

    showTeamView();
  }

  if (viewTeamBtn) viewTeamBtn.addEventListener('click', showTeamMatchesList);

  function getPlayerName(teamName, position) {
    const players = teamPlayers[teamName];
    if (!players || players.length === 0) return 'Jugador ' + getRandomInt(1, 11);
    if (position === 'gk') return players[players.length - 1];
    const limit = players.length > 1 ? players.length - 1 : 1;
    return players[Math.floor(Math.random() * limit)];
  }

  function generateMatchEvent(homeTeam, awayTeam, minute) {
    const homeRating = homeTeam.rating || 70;
    const awayRating = awayTeam.rating || 70;
    const ratingDiff = homeRating - awayRating;
    const eventChance = Math.random();

    if (eventChance < 0.035) {
      let homeGoalProb = 0.5 + (ratingDiff * 0.01);
      homeGoalProb = Math.max(0.1, Math.min(0.9, homeGoalProb));
      const scorer = Math.random() < homeGoalProb ? homeTeam : awayTeam;
      const player = getPlayerName(scorer.name, 'field');
      return { type: 'gol', team: scorer.name, player, minute };
    }

    if (eventChance < 0.075) {
      const team = Math.random() < 0.5 ? homeTeam : awayTeam;
      const subType = Math.random() < 0.6 ? 'parada' : 'poste';
      const position = subType === 'parada' ? 'gk' : 'field';
      const player = getPlayerName(team.name, position);
      return { type: subType, team: team.name, player, minute };
    }

    if (eventChance < 0.115) {
      const team = Math.random() < 0.5 ? homeTeam : awayTeam;
      const isRed = Math.random() < 0.05;
      const player = getPlayerName(team.name, 'field');
      return { type: isRed ? 'tarjeta_roja' : 'tarjeta_amarilla', team: team.name, player, minute };
    }

    if (minute > 55 && eventChance > 0.98) {
      const team = Math.random() < 0.5 ? homeTeam : awayTeam;
      return { type: 'cambio', team: team.name, minute };
    }

    return null;
  }

  function displayEvent(event, container) {
    if (!container) return;

    const icons = {
      gol: 'GOL',
      tarjeta_amarilla: 'AMA',
      tarjeta_roja: 'ROJ',
      cambio: 'CAM',
      parada: 'PAR',
      poste: 'PAL'
    };

    const colors = {
      gol: '#10b981',
      tarjeta_amarilla: '#f59e0b',
      tarjeta_roja: '#ef4444',
      parada: '#38bdf8',
      poste: '#e5e7eb'
    };

    const el = document.createElement('div');
    el.className = 'event__item';
    el.style.borderLeft = `3px solid ${colors[event.type] || '#9ca3af'}`;

    const text = event.type === 'gol' ? `Gol: ${event.team} (${event.player})` :
      event.type === 'tarjeta_amarilla' ? `Tarjeta Amarilla: ${event.team} (${event.player})` :
      event.type === 'tarjeta_roja' ? `Tarjeta Roja: ${event.team} (${event.player})` :
      event.type === 'parada' ? `¡Paradón de ${event.player} (${event.team})!` :
      event.type === 'poste' ? `¡Al palo! Ocasión de ${event.player} (${event.team})` :
      `Cambio: ${event.team}`;

    el.innerHTML = `<span style="font-size:16px;">${icons[event.type]}</span><div style="flex:1;"><span class="event__time">${event.minute}'</span> ${text}</div>`;
    container.prepend(el);
  }

  if (viewMatchDetailBtn) {
    viewMatchDetailBtn.addEventListener('click', () => {
      if (!matchSel || !matchSel.value) return showToast('Selecciona un partido', 'info');

      let match;
      try {
        match = JSON.parse(matchSel.value);
      } catch (e) {
        return showToast('Partido inválido', 'error');
      }

      const homeTeam = table[match.homeIdx];
      const awayTeam = table[match.awayIdx];
      if (!homeTeam || !awayTeam) return showToast('Partido inválido', 'error');

      const matchHome = document.getElementById('match-home');
      const matchAway = document.getElementById('match-away');
      const homeScoreEl = document.getElementById('match-home-score');
      const awayScoreEl = document.getElementById('match-away-score');
      const minuteEl = document.getElementById('current-minute');
      const progressEl = document.getElementById('minute-progress');
      const eventsEl = document.getElementById('events-container');
      const detailView = document.getElementById('match-detail-view');

      if (matchHome) matchHome.textContent = homeTeam.name;
      if (matchAway) matchAway.textContent = awayTeam.name;

      const matchKey = `${match.homeIdx}-${match.awayIdx}`;
      if (simulatedMatches.includes(matchKey) || matchesInProgress.includes(matchKey)) {
        if (simulateMatchDetailBtn) {
          simulateMatchDetailBtn.disabled = true;
          simulateMatchDetailBtn.textContent = 'Partido Finalizado';
        }

        const hist = matchHistory.find(h => h.homeIdx === match.homeIdx && h.awayIdx === match.awayIdx);
        if (homeScoreEl) homeScoreEl.textContent = hist ? hist.homeG : 0;
        if (awayScoreEl) awayScoreEl.textContent = hist ? hist.awayG : 0;
        if (minuteEl) minuteEl.textContent = '90';
        if (progressEl) progressEl.style.width = '100%';

        if (eventsEl) {
          if (matchesInProgress.includes(matchKey)) {
            if (simulateMatchDetailBtn) simulateMatchDetailBtn.textContent = 'Simulando...';
            eventsEl.innerHTML = '<p class="texto_tenue_pequeno texto_centrado padding__box">Partido en curso en segundo plano...</p>';
          } else {
            eventsEl.innerHTML = '<p class="texto_tenue_pequeno texto_centrado padding__box">Este partido ya se ha jugado.</p>';
          }
        }
      } else {
        if (simulateMatchDetailBtn) {
          simulateMatchDetailBtn.disabled = false;
          simulateMatchDetailBtn.textContent = 'Iniciar Partido';
        }
        if (homeScoreEl) homeScoreEl.textContent = '0';
        if (awayScoreEl) awayScoreEl.textContent = '0';
        if (minuteEl) minuteEl.textContent = '0';
        if (progressEl) progressEl.style.width = '0%';
        if (eventsEl) eventsEl.innerHTML = '<p class="texto_tenue_pequeno">Haz click en "Simular Partido" para ver eventos</p>';
      }

      if (detailView) detailView.style.display = 'block';
      window.currentMatch = match;
    });
  }

  if (simulateMatchDetailBtn) {
    simulateMatchDetailBtn.addEventListener('click', () => {
      if (!window.currentMatch) return showToast('Selecciona un partido primero', 'error');
      if (simulateMatchDetailBtn.disabled && simulateMatchDetailBtn.textContent === 'Partido Simulado') return showToast('Este partido ya ha sido simulado', 'info');
      if (simulatedMatches.includes(`${window.currentMatch.homeIdx}-${window.currentMatch.awayIdx}`)) return showToast('Este partido ya se ha jugado', 'error');

      const match = window.currentMatch;
      const homeTeam = table[match.homeIdx];
      const awayTeam = table[match.awayIdx];
      if (!homeTeam || !awayTeam) return showToast('Partido inválido', 'error');

      const eventsContainer = document.getElementById('events-container');
      if (eventsContainer) eventsContainer.innerHTML = '';

      const btn = simulateMatchDetailBtn;
      btn.disabled = true;
      btn.textContent = 'Simulando...';

      const matchKey = `${match.homeIdx}-${match.awayIdx}`;
      matchesInProgress.push(matchKey);

      let homeScore = 0, awayScore = 0;
      let minute = 1;
      const playerYellows = {};

      function simulateMinute() {
        if (minute > 90) {
          btn.disabled = true;
          btn.textContent = 'Partido Simulado';

          processResult(match.homeIdx, match.awayIdx, homeScore, awayScore);
          matchesInProgress = matchesInProgress.filter(k => k !== matchKey);

          if (!simulatedMatches.includes(matchKey)) simulatedMatches.push(matchKey);

          const alreadyInHistory = matchHistory.some(h =>
            h.week === currentWeek + 1 &&
            h.homeIdx === match.homeIdx &&
            h.awayIdx === match.awayIdx
          );

          if (!alreadyInHistory) {
            matchHistory.push({
              week: currentWeek + 1,
              homeIdx: match.homeIdx,
              awayIdx: match.awayIdx,
              homeG: homeScore,
              awayG: awayScore
            });
          }

          saveData();
          render();
          showToast(`Final: ${homeTeam.name} ${homeScore} - ${awayScore} ${awayTeam.name}`, 'success');
          triggerFullTimeAnimation(homeTeam.name, homeScore, awayScore, awayTeam.name);
          triggerConfetti();
          return;
        }

        let delay = 100;
        const event = generateMatchEvent(homeTeam, awayTeam, minute);

        if (event) {
          if (event.type === 'tarjeta_amarilla') {
            const key = event.team + event.player;
            playerYellows[key] = (playerYellows[key] || 0) + 1;
            if (playerYellows[key] === 2) {
              event.type = 'tarjeta_roja';
            }
            triggerCardAnimation(event.type, event.player, event.team);
            delay = 2000;
          } else if (event.type === 'tarjeta_roja') {
            triggerCardAnimation(event.type, event.player, event.team);
            delay = 2000;
          }

          if (event.type === 'gol') {
            if (event.team === homeTeam.name) homeScore++;
            else awayScore++;
            triggerGoalAnimation(event.team);
            delay = 2600;
          }

          if (event.type === 'parada') {
            triggerSaveAnimation(event.player, event.team);
            delay = 2000;
          }

          displayEvent(event, eventsContainer);
        }

        const currentMinuteEl = document.getElementById('current-minute');
        const minuteProgressEl = document.getElementById('minute-progress');
        const homeScoreEl = document.getElementById('match-home-score');
        const awayScoreEl = document.getElementById('match-away-score');

        if (currentMinuteEl) currentMinuteEl.textContent = minute;
        if (minuteProgressEl) minuteProgressEl.style.width = (minute / 90 * 100) + '%';
        if (homeScoreEl) homeScoreEl.textContent = homeScore;
        if (awayScoreEl) awayScoreEl.textContent = awayScore;

        minute++;
        setTimeout(simulateMinute, delay);
      }

      simulateMinute();
    });
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function poisson(lambda) {
    const limit = Math.exp(-lambda);
    let prod = Math.random();
    let n = 0;
    while (prod > limit) {
      n++;
      prod *= Math.random();
    }
    return n;
  }

  function calculateGoals(homeTeam, awayTeam) {
    const homeForm = 0.9 + Math.random() * 0.2;
    const awayForm = 0.9 + Math.random() * 0.2;

    const homeRating = (homeTeam.rating || 70) * homeForm;
    const awayRating = (awayTeam.rating || 70) * awayForm;
    const diff = homeRating - awayRating;

    let homeLambda = 1.35 + 0.35 + (diff * 0.025);
    let awayLambda = 1.15 - (diff * 0.025);

    homeLambda = Math.max(0.1, homeLambda);
    awayLambda = Math.max(0.1, awayLambda);

    return {
      homeGoals: poisson(homeLambda),
      awayGoals: poisson(awayLambda)
    };
  }

  const matchesContainer = document.getElementById('matches-container');
  let currentWeek = 0;

  function displayMatch(homeTeam, awayTeam, homeG, awayG, container = matchesContainer) {
    if (!container) return;

    const result = homeG > awayG ? 'V' : homeG === awayG ? 'E' : 'D';
    const resultColor = result === 'V' ? '#10b981' : result === 'D' ? '#ef4444' : '#9ca3af';

    const matchEl = document.createElement('div');
    matchEl.className = 'match__card';
    matchEl.innerHTML = `
      <div class="match__team" style="text-align:right">${homeTeam}</div>
      <div class="match__score">${homeG} - ${awayG}</div>
      <div class="match__team" style="text-align:left">${awayTeam}</div>
      <div class="result__bar" style="background:${resultColor}"></div>
    `;
    container.prepend(matchEl);
  }

  function simulateRound() {
    if (!current) return showToast('No hay liga seleccionada', 'error');
    if (seasonFinished()) { updateSimButtons(); return showToast('Temporada finalizada', 'info'); }
    if (currentWeek >= fixtures.length) return showToast('No hay más semanas en el calendario', 'info');

    if (matchesContainer) matchesContainer.innerHTML = '';

    const jornada = fixtures[currentWeek] || [];
    let simulatedCount = 0;

    jornada.forEach((match) => {
      const homeTeam = table[match.homeIdx];
      const awayTeam = table[match.awayIdx];
      const matchKey = `${match.homeIdx}-${match.awayIdx}`;
      if (simulatedMatches.includes(matchKey)) return;

      const { homeGoals, awayGoals } = calculateGoals(homeTeam, awayTeam);
      processResult(match.homeIdx, match.awayIdx, homeGoals, awayGoals);
      simulatedMatches.push(matchKey);
      matchHistory.push({ week: currentWeek + 1, homeIdx: match.homeIdx, awayIdx: match.awayIdx, homeG: homeGoals, awayG: awayGoals });
      displayMatch(homeTeam.name, awayTeam.name, homeGoals, awayGoals);
      simulatedCount++;
    });

    if (simulatedCount === 0) {
      const allDone = jornada.every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`));
      if (allDone) {
        currentWeek++;
        saveData();
        render();
        updateSimButtons();
        showToast(`Semana ${currentWeek} completada (ya estaba simulada)`, 'info');
        return;
      }
      return showToast('No hay partidos válidos para simular', 'info');
    }

    if (matchesContainer) {
      const header = document.createElement('div');
      header.style.cssText = "padding:10px;background:#22c55e;color:#0b1220;border-radius:8px;font-weight:800;text-align:center;margin-bottom:8px;";
      header.textContent = `Semana ${currentWeek + 1}`;
      matchesContainer.prepend(header);
    }

    currentWeek++;
    saveData();
    render();
    updateSimButtons();
    showToast(`Semana ${currentWeek} simulada`, 'success');
  }

  function simulateFullLeague() {
    if (!current) return showToast('No hay liga seleccionada', 'error');
    if (seasonFinished()) return showToast('Temporada finalizada', 'info');
    if (!confirm('¿Simular toda la liga? (ida y vuelta)')) return;

    if (matchesContainer) matchesContainer.innerHTML = '';

    let totalMatches = 0;
    for (let w = 0; w < fixtures.length; w++) {
      const jornada = fixtures[w] || [];
      for (let m = 0; m < jornada.length; m++) {
        const match = jornada[m];
        const homeTeam = table[match.homeIdx];
        const awayTeam = table[match.awayIdx];
        const matchKey = `${match.homeIdx}-${match.awayIdx}`;
        if (simulatedMatches.includes(matchKey)) continue;

        const { homeGoals, awayGoals } = calculateGoals(homeTeam, awayTeam);
        processResult(match.homeIdx, match.awayIdx, homeGoals, awayGoals);
        simulatedMatches.push(matchKey);
        matchHistory.push({ week: w + 1, homeIdx: match.homeIdx, awayIdx: match.awayIdx, homeG: homeGoals, awayG: awayGoals });
        totalMatches++;
      }
    }

    if (matchesContainer) {
      const header = document.createElement('div');
      header.style.cssText = "padding:10px;background:#38bdf8;color:#0b1220;border-radius:8px;font-weight:800;text-align:center;margin-bottom:8px;";
      header.textContent = "Liga Simulada";
      matchesContainer.prepend(header);

      const info = document.createElement('p');
      info.style.cssText = "text-align:center;color:#9ca3af;font-size:13px;";
      info.textContent = "Consulta el historial para ver los resultados.";
      matchesContainer.appendChild(info);
    }

    currentWeek = fixtures.length;
    saveData();
    render();
    updateSimButtons();
    showToast(`Liga completa simulada: ${totalMatches} partidos`, 'success');
    triggerConfetti();
  }

  const btnGlobalView = document.getElementById('btn-global-view');
  const btnGlobalStart = document.getElementById('global-start-btn');
  const btnGlobalSim = document.getElementById('global-sim-btn');
  const btnGlobalSimOne = document.getElementById('global-sim-one-btn');
  const btnGlobalReset = document.getElementById('global-reset-btn');
  const btnGlobalStandings = document.getElementById('global-standings-btn');
  const btnGlobalHistory = document.getElementById('global-history-btn');
  const globalContainer = document.getElementById('global-matches-container');
  let globalPendingMatches = [];

  if (btnGlobalView) {
    btnGlobalView.addEventListener('click', () => {
      if (selView) selView.classList.add('oculto');
      if (dashView) dashView.classList.add('oculto');
      if (teamView) teamView.classList.add('oculto');
      if (globalView) globalView.classList.remove('oculto');

      if (globalContainer) globalContainer.innerHTML = '<p class="texto_centrado padding__box texto_tenue_pequeno">Pulsa "Iniciar Semana" para ver los enfrentamientos.</p>';
      if (btnGlobalStart) btnGlobalStart.style.display = 'inline-block';
      if (btnGlobalSim) btnGlobalSim.style.display = 'none';
      if (btnGlobalSimOne) btnGlobalSimOne.style.display = 'none';
    });
  }

  if (btnGlobalStart) {
    btnGlobalStart.addEventListener('click', () => {
      if (!globalContainer) return;

      globalContainer.innerHTML = '';
      globalPendingMatches = [];

      Object.keys(leagues).forEach(key => {
        const kStorage = `frontera_${key}`;
        let lTable = [];
        const raw = localStorage.getItem(kStorage);

        if (raw) {
          try {
            lTable = JSON.parse(raw);
            if (!Array.isArray(lTable) || lTable.length === 0) throw new Error('Tabla liga global inválida');
          } catch (e) {
            console.error(e);
            lTable = buildDefaultTable(key);
          }
        } else {
          lTable = buildDefaultTable(key);
        }

        const simKey = kStorage + '_simulados';
        const simRaw = localStorage.getItem(simKey);
        let lSimulated = [];
        try {
          lSimulated = simRaw ? JSON.parse(simRaw) : [];
          if (!Array.isArray(lSimulated)) lSimulated = [];
        } catch (e) {
          console.error(e);
          lSimulated = [];
        }

        let lFixtures = [];
        const n = lTable.length;
        const teams = [...Array(n).keys()];

        for (let round = 0; round < n - 1; round++) {
          const jornada = [];
          for (let i = 0; i < Math.floor(n / 2); i++) {
            let homeIdx = teams[i];
            let awayIdx = teams[n - 1 - i];
            if (i === 0 && round % 2 === 1) [homeIdx, awayIdx] = [awayIdx, homeIdx];
            jornada.push({ homeIdx, awayIdx });
          }
          lFixtures.push(jornada);
          teams.splice(1, 0, teams.pop());
        }

        const idaCount = lFixtures.length;
        for (let r = 0; r < idaCount; r++) {
          lFixtures.push(lFixtures[r].map(m => ({ homeIdx: m.awayIdx, awayIdx: m.homeIdx })));
        }

        let lWeek = 0;
        for (let i = 0; i < lFixtures.length; i++) {
          const allSimulated = lFixtures[i].every(m => lSimulated.includes(`${m.homeIdx}-${m.awayIdx}`));
          if (allSimulated) lWeek = i + 1;
          else break;
        }

        if (lWeek >= lFixtures.length) return;

        const jornada = lFixtures[lWeek];
        const leagueCard = document.createElement('div');
        leagueCard.className = 'tarjeta';
        leagueCard.style.padding = '10px';
        leagueCard.innerHTML = `<h4 style="margin:0 0 10px 0;color:#22c55e;text-align:center">${leagues[key].name} - Semana ${lWeek + 1}</h4>`;

        const list = document.createElement('div');
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '6px';

        jornada.forEach(m => {
          const home = lTable[m.homeIdx];
          const away = lTable[m.awayIdx];
          const matchId = `global-${key}-${m.homeIdx}-${m.awayIdx}`;
          const matchKey = `${m.homeIdx}-${m.awayIdx}`;
          const isPlayed = lSimulated.includes(matchKey);

          if (!isPlayed) {
            globalPendingMatches.push({
              leagueKey: key,
              matchId,
              homeIdx: m.homeIdx,
              awayIdx: m.awayIdx,
              homeTeam: home,
              awayTeam: away,
              storageKey: kStorage,
              simKey,
              weekNum: lWeek + 1
            });
          }

          const row = document.createElement('div');
          row.id = matchId;
          row.style.background = '#111c33';
          row.style.padding = '8px';
          row.style.borderRadius = '6px';
          row.style.display = 'flex';
          row.style.justifyContent = 'space-between';
          row.style.fontSize = '0.9rem';

          if (isPlayed) {
            row.innerHTML = `<span>${home.name}</span> <span class="global__result" style="color:#10b981;font-size:0.8rem">JUGADO</span> <span>${away.name}</span>`;
          } else {
            row.innerHTML = `<span>${home.name}</span> <span class="global__result" style="font-weight:bold;color:#9ca3af">vs</span> <span>${away.name}</span>`;
          }

          list.appendChild(row);
        });

        leagueCard.appendChild(list);
        globalContainer.appendChild(leagueCard);
      });

      if (globalPendingMatches.length > 0) {
        btnGlobalStart.style.display = 'none';
        if (btnGlobalSim) btnGlobalSim.style.display = 'inline-block';
        if (btnGlobalSimOne) btnGlobalSimOne.style.display = 'inline-block';
      } else {
        globalContainer.innerHTML = '<p class="texto_centrado padding__box texto_tenue_pequeno">Todas las ligas han finalizado.</p>';
      }
    });
  }

  function simulateGlobalMatch(p) {
    const { homeGoals, awayGoals } = calculateGoals(p.homeTeam, p.awayTeam);
    const el = document.getElementById(p.matchId);
    
    const finish = () => {
      if (el) {
        const resultEl = el.querySelector('.global__result');
        if (resultEl) {
          resultEl.textContent = `${homeGoals} - ${awayGoals}`;
          resultEl.style.color = '#22c55e';
        }
        if (homeGoals > awayGoals) el.style.borderLeft = '3px solid #10b981';
        else if (awayGoals > homeGoals) el.style.borderRight = '3px solid #10b981';
        else el.style.borderBottom = '2px solid #9ca3af';
      }

      const raw = localStorage.getItem(p.storageKey);
      let lTable;

      if (raw) {
        try {
          lTable = JSON.parse(raw);
          if (!Array.isArray(lTable) || lTable.length === 0) throw new Error('Tabla global inválida');
        } catch (e) {
          console.error(e);
          lTable = buildDefaultTable(p.leagueKey);
        }
      } else {
        lTable = buildDefaultTable(p.leagueKey);
      }

      const home = lTable[p.homeIdx];
      const away = lTable[p.awayIdx];
      if (!home || !away) return;

      home.pj++; away.pj++;
      home.gf += homeGoals; home.ga += awayGoals; home.gd = home.gf - home.ga;
      away.gf += awayGoals; away.ga += homeGoals; away.gd = away.gf - away.ga;

      if (homeGoals > awayGoals) { home.w++; home.pts += 3; away.l++; }
      else if (homeGoals === awayGoals) { home.d++; away.d++; home.pts++; away.pts++; }
      else { away.w++; away.pts += 3; home.l++; }

      localStorage.setItem(p.storageKey, JSON.stringify(lTable));

      const simRaw = localStorage.getItem(p.simKey);
      let simulated = [];
      try {
        simulated = simRaw ? JSON.parse(simRaw) : [];
        if (!Array.isArray(simulated)) simulated = [];
      } catch (e) {
        console.error(e);
        simulated = [];
      }

      const matchKey = `${p.homeIdx}-${p.awayIdx}`;
      if (!simulated.includes(matchKey)) simulated.push(matchKey);
      localStorage.setItem(p.simKey, JSON.stringify(simulated));

      const histKey = p.storageKey + '_historial';
      const histRaw = localStorage.getItem(histKey);
      let history = [];
      try {
        history = histRaw ? JSON.parse(histRaw) : [];
        if (!Array.isArray(history)) history = [];
      } catch (e) {
        console.error(e);
        history = [];
      }

      history.push({ week: p.weekNum, homeIdx: p.homeIdx, awayIdx: p.awayIdx, homeG: homeGoals, awayG: awayGoals });
      localStorage.setItem(histKey, JSON.stringify(history));
    };

    if (el) {
      let h = 0, a = 0;
      const resultEl = el.querySelector('.global__result');
      if (resultEl) {
        resultEl.style.color = '#e5e7eb';
        resultEl.textContent = '0 - 0';
      }

      const sequence = [];
      for (let i = 0; i < homeGoals; i++) sequence.push('h');
      for (let i = 0; i < awayGoals; i++) sequence.push('a');

      for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
      }

      let step = 0;
      const totalSteps = sequence.length;
      const duration = 1500 + Math.random() * 1500;
      const intervalTime = totalSteps > 0 ? duration / totalSteps : 1000;

      if (totalSteps === 0) {
        setTimeout(finish, 1000);
      } else {
        const timer = setInterval(() => {
          if (step < totalSteps) {
            if (sequence[step] === 'h') h++; else a++;
            if (resultEl) resultEl.textContent = `${h} - ${a}`;
            step++;
          } else {
            clearInterval(timer);
            finish();
          }
        }, intervalTime);
      }
    } else {
      finish();
    }
  }

  if (btnGlobalSim) {
    btnGlobalSim.addEventListener('click', () => {
      globalPendingMatches.forEach(p => simulateGlobalMatch(p));
      globalPendingMatches = [];

      triggerConfetti();
      showToast('¡Jornada global completada!', 'success');
      btnGlobalSim.style.display = 'none';
      if (btnGlobalSimOne) btnGlobalSimOne.style.display = 'none';
      if (btnGlobalStart) {
        btnGlobalStart.style.display = 'inline-block';
        btnGlobalStart.textContent = 'Siguiente Semana';
      }
    });
  }

  if (btnGlobalSimOne) {
    btnGlobalSimOne.addEventListener('click', () => {
      if (globalPendingMatches.length === 0) return;
      const p = globalPendingMatches.shift();
      simulateGlobalMatch(p);

      if (globalPendingMatches.length === 0) {
        triggerConfetti();
        showToast('¡Jornada global completada!', 'success');
        if (btnGlobalSim) btnGlobalSim.style.display = 'none';
        btnGlobalSimOne.style.display = 'none';
        if (btnGlobalStart) {
          btnGlobalStart.style.display = 'inline-block';
          btnGlobalStart.textContent = 'Siguiente Semana';
        }
      }
    });
  }

  if (btnGlobalStandings) {
    btnGlobalStandings.addEventListener('click', () => {
      if (!globalContainer) return;

      globalContainer.innerHTML = '';
      if (btnGlobalSim) btnGlobalSim.style.display = 'none';
      if (btnGlobalSimOne) btnGlobalSimOne.style.display = 'none';
      if (btnGlobalStart) btnGlobalStart.style.display = 'inline-block';

      Object.keys(leagues).forEach(key => {
        const kStorage = `frontera_${key}`;
        let lTable = [];
        const raw = localStorage.getItem(kStorage);

        if (raw) {
          try {
            lTable = JSON.parse(raw);
            if (!Array.isArray(lTable) || lTable.length === 0) throw new Error('Tabla inválida');
          } catch (e) {
            console.error(e);
            lTable = buildDefaultTable(key);
          }
        } else {
          lTable = buildDefaultTable(key);
        }

        lTable.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);

        const card = document.createElement('div');
        card.className = 'tarjeta';
        card.style.padding = '10px';
        card.innerHTML = `<h4 style="margin:0 0 10px 0;color:#22c55e;text-align:center">${leagues[key].name}</h4>`;

        const tableEl = document.createElement('table');
        tableEl.style.fontSize = '0.85rem';
        tableEl.innerHTML = `
          <thead><tr><th style="padding:4px">#</th><th style="padding:4px;text-align:left">Equipo</th><th style="padding:4px">PJ</th><th style="padding:4px">Pts</th></tr></thead>
          <tbody>
            ${lTable.map((t, i) => `
              <tr style="${i < 4 ? 'background:rgba(34,197,94,0.1)' : ''}">
                <td style="padding:4px;text-align:center">${i + 1}</td>
                <td style="padding:4px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px;">${t.name}</td>
                <td style="padding:4px;text-align:center">${t.pj}</td>
                <td style="padding:4px;text-align:center;font-weight:bold;color:#22c55e">${t.pts}</td>
              </tr>
            `).join('')}
          </tbody>
        `;
        card.appendChild(tableEl);
        globalContainer.appendChild(card);
      });
    });
  }

  if (btnGlobalHistory) {
    btnGlobalHistory.addEventListener('click', () => {
      if (!globalContainer) return;

      globalContainer.innerHTML = '';
      if (btnGlobalSim) btnGlobalSim.style.display = 'none';
      if (btnGlobalSimOne) btnGlobalSimOne.style.display = 'none';
      if (btnGlobalStart) btnGlobalStart.style.display = 'inline-block';

      const weeksSet = new Set();
      Object.keys(leagues).forEach(key => {
        const histKey = `frontera_${key}_historial`;
        const raw = localStorage.getItem(histKey);
        if (!raw) return;
        try {
          const hist = JSON.parse(raw);
          if (Array.isArray(hist)) hist.forEach(m => weeksSet.add(m.week));
        } catch (e) {
          console.error(e);
        }
      });

      const sortedWeeks = Array.from(weeksSet).sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') return a - b;
        return 0;
      });

      if (sortedWeeks.length === 0) {
        globalContainer.innerHTML = '<p class="texto_centrado padding__box texto_tenue_pequeno">No hay historial disponible.</p>';
        return;
      }

      const listContainer = document.createElement('div');
      listContainer.style.gridColumn = "1 / -1";
      listContainer.style.display = "flex";
      listContainer.style.flexWrap = "wrap";
      listContainer.style.gap = "10px";
      listContainer.style.justifyContent = "center";

      sortedWeeks.forEach(week => {
        const btn = document.createElement('button');
        btn.className = 'boton_pequeno';
        btn.style.fontSize = '14px';
        btn.style.padding = '12px 20px';
        btn.textContent = `Semana ${week}`;
        btn.onclick = () => {
          if (!globalContainer) return;
          globalContainer.innerHTML = '';

          const header = document.createElement('div');
          header.style.gridColumn = "1 / -1";
          header.style.textAlign = "center";
          header.style.marginBottom = "10px";
          header.innerHTML = `<h3 style="margin:0">Resultados Semana ${week}</h3><button class="boton_pequeno" onclick="document.getElementById('global-history-btn').click()" style="margin-top:10px">Volver</button>`;
          globalContainer.appendChild(header);

          Object.keys(leagues).forEach(key => {
            let hist = [];
            let lTable = [];

            try {
              const histRaw = localStorage.getItem(`frontera_${key}_historial`) || '[]';
              hist = JSON.parse(histRaw);
              if (!Array.isArray(hist)) hist = [];
            } catch (e) {
              console.error(e);
              hist = [];
            }

            try {
              const tableRaw = localStorage.getItem(`frontera_${key}`);
              if (tableRaw) {
                lTable = JSON.parse(tableRaw);
                if (!Array.isArray(lTable)) lTable = [];
              }
            } catch (e) {
              console.error(e);
              lTable = [];
            }

            const weekMatches = hist.filter(m => m.week === week);
            if (weekMatches.length === 0) return;

            const card = document.createElement('div');
            card.className = 'tarjeta';
            card.style.padding = '10px';
            card.innerHTML = `<h4 style="margin:0 0 10px 0;color:#22c55e;text-align:center">${leagues[key].name}</h4>`;

            const list = document.createElement('div');
            list.style.display = 'flex';
            list.style.flexDirection = 'column';
            list.style.gap = '6px';

            weekMatches.forEach(m => {
              const row = document.createElement('div');
              row.style.background = '#111c33';
              row.style.padding = '8px';
              row.style.borderRadius = '6px';
              row.style.display = 'flex';
              row.style.justifyContent = 'space-between';
              row.style.fontSize = '0.9rem';
              row.innerHTML = `<span>${lTable[m.homeIdx]?.name || 'Local'}</span> <span style="font-weight:bold">${m.homeG} - ${m.awayG}</span> <span>${lTable[m.awayIdx]?.name || 'Visitante'}</span>`;
              list.appendChild(row);
            });

            card.appendChild(list);
            globalContainer.appendChild(card);
          });
        };
        listContainer.appendChild(btn);
      });

      globalContainer.appendChild(listContainer);
    });
  }

  if (btnGlobalReset) {
    btnGlobalReset.addEventListener('click', () => {
      if (!confirm('¿Estás seguro de que quieres REINICIAR TODAS las ligas? Se perderá todo el progreso.')) return;

      Object.keys(leagues).forEach(key => {
        const k = `frontera_${key}`;
        localStorage.removeItem(k);
        localStorage.removeItem(k + '_simulados');
        localStorage.removeItem(k + '_historial');
        localStorage.removeItem(k + '_bets');
      });
      localStorage.removeItem('frontera_wallet');

      showToast('Todas las ligas han sido reiniciadas', 'success');

      if (globalContainer) globalContainer.innerHTML = '';
      if (btnGlobalSim) btnGlobalSim.style.display = 'none';
      if (btnGlobalSimOne) btnGlobalSimOne.style.display = 'none';
      if (btnGlobalStart) {
        btnGlobalStart.style.display = 'inline-block';
        btnGlobalStart.textContent = 'Iniciar Semana';
      }
    });
  }

  const simulateMatchBtn = document.getElementById('simulate-match-btn');
  const simulateLeagueBtn = document.getElementById('simulate-league-btn');
  if (simulateMatchBtn) simulateMatchBtn.addEventListener('click', simulateRound);
  if (simulateLeagueBtn) simulateLeagueBtn.addEventListener('click', simulateFullLeague);

  const historyBtn = document.getElementById('view-history-btn');
  const historyModal = document.getElementById('history-modal');
  const closeHistoryBtn = document.getElementById('close-history-btn');
  const historyContent = document.getElementById('history-content');

  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      if (!matchHistory.length) return showToast('No hay historial disponible', 'info');
      if (!historyContent) return;

      historyContent.innerHTML = '';

      const weeks = {};
      matchHistory.forEach(m => {
        if (!weeks[m.week]) weeks[m.week] = [];
        weeks[m.week].push(m);
      });

      Object.keys(weeks).sort((a, b) => b - a).forEach(weekNum => {
        const weekHeader = document.createElement('div');
        weekHeader.style.cssText = "padding:8px;background:#111c33;color:#22c55e;border-radius:8px;font-weight:800;text-align:center;margin:15px 0 8px 0;border:1px solid rgba(255,255,255,0.10)";
        weekHeader.textContent = `Semana ${weekNum}`;
        historyContent.appendChild(weekHeader);

        weeks[weekNum].forEach(m => {
          const homeName = table[m.homeIdx]?.name || 'Local';
          const awayName = table[m.awayIdx]?.name || 'Visitante';
          displayMatch(homeName, awayName, m.homeG, m.awayG, historyContent);
        });
      });

      if (historyModal) historyModal.classList.add('is__open');
    });
  }

  if (closeHistoryBtn && historyModal) {
    closeHistoryBtn.addEventListener('click', () => {
      historyModal.classList.remove('is__open');
    });
  }

  if (historyModal) {
    historyModal.addEventListener('click', (e) => {
      if (e.target === historyModal) historyModal.classList.remove('is__open');
    });
  }

  window.goBackToSelection = function () { showSelection(); };
  window.goBackToDashboard = function () { showDashboard(); };

  const track = document.querySelector('.pista_carrusel');
  const container = document.querySelector('.visor_carrusel');
  const items = track ? Array.from(track.querySelectorAll('.item_liga')) : [];

  let slideIndex = 2;

  function updateCarousel() {
    if (!track || !container || !items.length) return;

    const slideWidth = items[0].getBoundingClientRect().width;
    const gap = 24;
    const totalSlideWidth = slideWidth + gap;
    const containerWidth = container.offsetWidth;

    const centerOffset = (containerWidth / 2) - (slideWidth / 2);
    const translateX = centerOffset - (slideIndex * totalSlideWidth);

    track.style.transform = `translateX(${translateX}px)`;

    items.forEach((item, i) => {
      if (i === slideIndex) item.classList.add('is__active');
      else item.classList.remove('is__active');
    });
  }

  function goToSlide(i) {
    const maxSlide = Math.max(0, items.length - 1);
    slideIndex = Math.max(0, Math.min(i, maxSlide));
    updateCarousel();
  }

  function nextSlide() { goToSlide(slideIndex + 1); }
  function prevSlide() { goToSlide(slideIndex - 1); }

  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });

  window.addEventListener('resize', updateCarousel);
  setTimeout(updateCarousel, 50);

  const allLeagueItems = document.querySelectorAll('.item_liga[data-key]');
  allLeagueItems.forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.key;
      if (key) load(key, el);
    });
  });

  if (carouselSection) {
    carouselSection.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const activeItem = document.querySelector('.item_liga.is__active');
        if (activeItem) {
          const key = activeItem.dataset.key;
          if (key) load(key, activeItem);
        }
      }
    });
    carouselSection.setAttribute('tabindex', '0');
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast__item ${type === 'success' ? 'is__success' : type === 'error' ? 'is__error' : 'is__info'}`;

    let icon = 'i';
    if (type === 'success') icon = 'OK';
    if (type === 'error') icon = '!';

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => toast.remove(), 150);
    }, 3000);
  }

  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#22c55e', '#38bdf8', '#ef4444', '#f59e0b', '#ffffff'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < canvas.height) active = true;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      if (active) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate();
  }

  function triggerGoalAnimation(teamName) {
    const container = document.body;
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay__goal';
    overlay.innerHTML = `
      <div class="text__goal">¡GOL!</div>
      <div class="subtext__goal">${teamName}</div>
      <div class="hands__goal"></div>
    `;
    container.appendChild(overlay);

    triggerConfetti();
    setTimeout(() => overlay.remove(), 2500);
  }

  function triggerCardAnimation(type, player, team) {
    const container = document.body;
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay__event';
    const color = type === 'tarjeta_amarilla' ? '#f59e0b' : '#ef4444';
    const title = type === 'tarjeta_amarilla' ? 'TARJETA AMARILLA' : 'TARJETA ROJA';

    overlay.innerHTML = `
      <div class="event__title" style="color:${color}">${title}</div>
      <div class="event__card" style="background:${color}"></div>
      <div class="event__subtitle">${player}</div>
      <div class="event__detail">${team}</div>
    `;
    container.appendChild(overlay);
    setTimeout(() => overlay.remove(), 2000);
  }

  function triggerSaveAnimation(player, team) {
    const container = document.body;
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay__event';
    overlay.innerHTML = `
      <div class="event__title" style="color:#38bdf8">¡PARADÓN!</div>
      <div class="event__glove">🧤</div>
      <div class="event__subtitle">${player}</div>
      <div class="event__detail">${team}</div>
    `;
    container.appendChild(overlay);
    setTimeout(() => overlay.remove(), 2000);
  }

  function triggerFullTimeAnimation(home, homeScore, awayScore, away) {
    const container = document.body;
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay__event';
    overlay.innerHTML = `
      <div class="event__title" style="color:#fff">FINAL DEL PARTIDO</div>
      <div class="event__score">
        <div>${home}</div>
        <div class="score__text">${homeScore} - ${awayScore}</div>
        <div>${away}</div>
      </div>
    `;
    container.appendChild(overlay);
    setTimeout(() => overlay.remove(), 3500);
  }

    function openFromUrlOrLastLeague() {
    const params = new URLSearchParams(window.location.search);

    const leagueKey =
      params.get("league") ||
      localStorage.getItem("frontera_active_league");

    if (leagueKey && leagues[leagueKey]) {
      const item = document.querySelector(`.item_liga[data-key="${leagueKey}"]`);
      load(leagueKey, item);

      const goto = params.get("goto");
      if (goto === "clasificacion") {
        setTimeout(() => {
          document.getElementById("vista-panel")?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    } else {
      showSelection();
    }
  }

  openFromUrlOrLastLeague();
})();


