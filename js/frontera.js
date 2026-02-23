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

  const selView = document.getElementById('view-selection');
  const dashView = document.getElementById('view-dashboard');
  const teamView = document.getElementById('view-team');
  const leagueTitle = document.getElementById('league-title');
  const tbody = document.getElementById('table-body');
  const homeSel = document.getElementById('home-team');
  const awaySel = document.getElementById('away-team');

  let current = null;
  let table = [];
  let fixtures = [];
  let simulatedMatches = [];
  let matchHistory = [];

  function generateFixtures(){
    fixtures = [];
    const n = table.length;
    const isOdd = n % 2 === 1;
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
  }

  function seasonFinished(){
    if (!fixtures || !fixtures.length) return false;
    return currentWeek >= fixtures.length;
  }

  function updateSimButtons(){
    const btn1 = document.getElementById('simulate-match-btn');
    const btn2 = document.getElementById('simulate-league-btn');
    if (!btn1 || !btn2) return;
    const finished = seasonFinished();
    btn1.disabled = finished;
    btn2.disabled = finished;
  }

  function showSelection(){ 
    selView.classList.remove('hidden'); 
    dashView.classList.add('hidden'); 
    teamView.classList.add('hidden');
    if(typeof updateCarousel === 'function') setTimeout(updateCarousel, 50);
  }
  function showDashboard(){ selView.classList.add('hidden'); dashView.classList.remove('hidden'); teamView.classList.add('hidden'); }
  function showTeamView(){ selView.classList.add('hidden'); dashView.classList.add('hidden'); teamView.classList.remove('hidden'); }

  function load(leagueKey, el){
    if (!leagues[leagueKey]) return showToast('Liga no encontrada', 'error');

    document.querySelectorAll('.league-item.selected').forEach(x=>x.classList.remove('selected'));
    if (el && el.classList) el.classList.add('selected');

    current = leagueKey;
    leagueTitle.textContent = leagues[leagueKey].name;
    loadData(); generateFixtures(); 
   
    currentWeek = 0;
    for(let i=0; i<fixtures.length; i++){
      const allSimulated = fixtures[i].every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`));
      if(allSimulated) currentWeek = i + 1;
      else break;
    }

    populateSelects(leagues[leagueKey].teams); populateTeamSelector(); render();
    showDashboard();

    dashView.classList.add('fade-in');
    setTimeout(()=>dashView.classList.remove('fade-in'),420);

    updateSimButtons();
  }

  function storageKey(){ return `frontera_${current}`; }
  function loadData(){
    const raw = localStorage.getItem(storageKey());
    if (raw){ try{ table = JSON.parse(raw); }catch(e){ console.error(e); } }
    else { table = leagues[current].teams.map((name,i)=>({ id: i, name, pj:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0, rating: teamRatings[name] || 70 })); }
    
    const simKey = storageKey() + '_simulados';
    const simRaw = localStorage.getItem(simKey);
    simulatedMatches = simRaw ? JSON.parse(simRaw) : [];

    const histKey = storageKey() + '_historial';
    const histRaw = localStorage.getItem(histKey);
    matchHistory = histRaw ? JSON.parse(histRaw) : [];
  }
  function saveData(){ 
    try{ localStorage.setItem(storageKey(), JSON.stringify(table)); }catch(e){console.error(e);}
    try{ localStorage.setItem(storageKey() + '_simulados', JSON.stringify(simulatedMatches)); }catch(e){console.error(e);}
    try{ localStorage.setItem(storageKey() + '_historial', JSON.stringify(matchHistory)); }catch(e){console.error(e);}
  }

  function populateSelects(list){
    if (!homeSel || !awaySel) return;
    homeSel.innerHTML = '<option value="">Local</option>';
    awaySel.innerHTML = '<option value="">Visitante</option>';
    list.forEach((name,idx)=>{
      const o1 = document.createElement('option'); o1.value = idx; o1.textContent = name; homeSel.appendChild(o1);
      const o2 = document.createElement('option'); o2.value = idx; o2.textContent = name; awaySel.appendChild(o2);
    });
  }

  function processResult(homeIdx, awayIdx, homeG, awayG){
    const home = table[homeIdx]; const away = table[awayIdx];
    if(!home || !away) return;
    home.pj++; away.pj++;
    home.gf += homeG; home.ga += awayG; home.gd = home.gf - home.ga;
    away.gf += awayG; away.ga += homeG; away.gd = away.gf - away.ga;
    if (homeG > awayG){ home.w++; home.pts += 3; away.l++; }
    else if (homeG === awayG){ home.d++; away.d++; home.pts++; away.pts++; }
    else { away.w++; away.pts += 3; home.l++; }
  }

  function render(){
    if(!tbody) return; tbody.innerHTML = '';
    const sorted = [...table].sort((a,b)=> b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    sorted.forEach((t,i)=>{
      let rowClass = '';
      if (i < 4) rowClass = 'row-ucl';
      else if (i >= sorted.length - 3) rowClass = 'row-relegation';

      if(true){
        const tr = document.createElement('tr');
        if(rowClass) tr.className = rowClass;
        tr.innerHTML = `<td style="font-weight:700">${i+1}</td><td style="text-align:left;font-weight:600">${t.name}</td><td style="text-align:center">${t.pj}</td><td style="text-align:center;color:var(--success)">${t.w}</td><td style="text-align:center">${t.d}</td><td style="text-align:center;color:var(--danger)">${t.l}</td><td style="text-align:center">${t.gf}</td><td style="text-align:center">${t.ga}</td><td style="text-align:center;font-weight:700">${t.gd}</td><td class="pts-cell">${t.pts}</td>`;
        tbody.appendChild(tr);
      }
    });
  }

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn){
    resetBtn.addEventListener('click', ()=>{
      if (!current) return showToast('No hay liga seleccionada', 'error');
      if (!confirm('¿Borrar datos de la liga?')) return;
      localStorage.removeItem(storageKey());
      localStorage.removeItem(storageKey() + '_simulados');
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

  function populateTeamSelector(){
    if (!teamSel) return;
    teamSel.innerHTML = '<option value="">Selecciona equipo</option>';
    table.forEach((t, idx)=>{
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = t.name;
      teamSel.appendChild(opt);
    });
  }

  function getTeamMatches(teamIdx){
    const team = table[teamIdx];
    if (!team) return [];
    const matches = [];
    const jornada = fixtures[currentWeek] || [];
    jornada.forEach((match) => {
      if (match.homeIdx === teamIdx || match.awayIdx === teamIdx){
        matches.push({ homeIdx: match.homeIdx, awayIdx: match.awayIdx, homeName: table[match.homeIdx].name, awayName: table[match.awayIdx].name });
      }
    });
    return matches;
  }

  function showTeamMatchesList(){
    const teamIdx = parseInt(teamSel.value, 10);
    if (isNaN(teamIdx)) return showToast('Selecciona un equipo primero', 'info');
    const matches = getTeamMatches(teamIdx);
    const teamName = table[teamIdx].name;
    
    document.getElementById('team-name-title').textContent = teamName;
    document.getElementById('match-detail-view').style.display = 'none';
    
    if (!matchSel) return;
    matchSel.innerHTML = '<option value="">Selecciona partido</option>';
    matches.forEach((m, idx)=>{
      const opt = document.createElement('option');
      opt.value = JSON.stringify(m);
      opt.textContent = `${m.homeName} vs ${m.awayName}`;
      matchSel.appendChild(opt);
    });
    
    showTeamView();
  }

  if (viewTeamBtn) viewTeamBtn.addEventListener('click', showTeamMatchesList);

  const eventTypes = ['gol', 'tarjeta_amarilla', 'tarjeta_roja', 'falta', 'cambio', 'parada', 'poste'];

  function generateMatchEvent(homeTeam, awayTeam, minute){
    const homeRating = homeTeam.rating || 70;
    const awayRating = awayTeam.rating || 70;
    const ratingDiff = homeRating - awayRating;
    
    const eventChance = Math.random();
    
    if (eventChance < 0.035){ 
      let homeGoalProb = 0.5 + (ratingDiff * 0.01);
      homeGoalProb = Math.max(0.1, Math.min(0.9, homeGoalProb));
      
      const scorer = Math.random() < homeGoalProb ? homeTeam : awayTeam;
      return { type: 'gol', team: scorer.name, player: 'Jugador ' + getRandomInt(1, 11), minute };
    }
    
    if (eventChance < 0.075){ 
      const team = Math.random() < 0.5 ? homeTeam : awayTeam;
      const subType = Math.random() < 0.6 ? 'parada' : 'poste';
      return { type: subType, team: team.name, minute };
    }
    
    if (eventChance < 0.115){ 
      const team = Math.random() < 0.5 ? homeTeam : awayTeam;
      const isRed = Math.random() < 0.05;
      return { type: isRed ? 'tarjeta_roja' : 'tarjeta_amarilla', team: team.name, player: 'Jugador ' + getRandomInt(1, 11), minute };
    }
    
    if (minute > 55 && eventChance > 0.98){ 
      const team = Math.random() < 0.5 ? homeTeam : awayTeam;
      return { type: 'cambio', team: team.name, minute };
    }
    return null;
  }

  function displayEvent(event, container){
    if (!container) return;
    const icons = {
      'gol': 'GOL',
      'tarjeta_amarilla': 'AMA',
      'tarjeta_roja': 'ROJ',
      'falta': '',
      'cambio': 'CAM',
      'parada': 'PAR',
      'poste': 'PAL'
    };
    const colors = {
      'gol': 'var(--success)',
      'tarjeta_amarilla': '#f59e0b',
      'tarjeta_roja': 'var(--danger)',
      'parada': 'var(--accent2)',
      'poste': 'var(--text)'
    };
    
    const el = document.createElement('div');
    el.className = 'event-item';
    el.style.borderLeft = `3px solid ${colors[event.type] || 'var(--muted)'}`;
    
    const text = event.type === 'gol' ? `Gol: ${event.team} (${event.player})` : 
                 event.type === 'tarjeta_amarilla' ? `Tarjeta Amarilla: ${event.team} (${event.player})` :
                 event.type === 'tarjeta_roja' ? `Tarjeta Roja: ${event.team} (${event.player})` :
                 event.type === 'parada' ? `¡Paradón del portero de ${event.team}!` :
                 event.type === 'poste' ? `¡Al palo! Ocasión de ${event.team}` :
                 `Cambio: ${event.team}`;
    el.innerHTML = `<span style="font-size:16px;">${icons[event.type]}</span><div style="flex:1;"><span class="event-minute">${event.minute}'</span> ${text}</div>`;
    container.prepend(el);
  }

  if (viewMatchDetailBtn) viewMatchDetailBtn.addEventListener('click', ()=>{
    if (!matchSel.value) return showToast('Selecciona un partido', 'info');
    const match = JSON.parse(matchSel.value);
    const homeTeam = table[match.homeIdx];
    const awayTeam = table[match.awayIdx];
    
    document.getElementById('match-home').textContent = homeTeam.name;
    document.getElementById('match-away').textContent = awayTeam.name;
    document.getElementById('match-home-score').textContent = '0';
    document.getElementById('match-away-score').textContent = '0';
    document.getElementById('current-minute').textContent = '0';
    document.getElementById('minute-progress').style.width = '0%';
    document.getElementById('events-container').innerHTML = '<p style="color:var(--muted);font-size:13px;">Haz click en "Simular Partido" para ver eventos</p>';
    document.getElementById('match-detail-view').style.display = 'block';
    
    window.currentMatch = match;
  });
  if (simulateMatchDetailBtn) simulateMatchDetailBtn.addEventListener('click', ()=>{
    if (!window.currentMatch) return showToast('Selecciona un partido primero', 'error');
    if (simulateMatchDetailBtn.disabled && simulateMatchDetailBtn.textContent === 'Partido Simulado') return showToast('Este partido ya ha sido simulado', 'info');
    const match = window.currentMatch;
    const homeTeam = table[match.homeIdx];
    const awayTeam = table[match.awayIdx];
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';
    const btn = simulateMatchDetailBtn;
    btn.disabled = true;
    btn.textContent = 'Simulando...';
    
    let homeScore = 0, awayScore = 0;
    let minute = 1;
    const playerYellows = {};
    
    function simulateMinute(){
      if (minute > 90){
        btn.disabled = true;
        btn.textContent = 'Partido Simulado';
        processResult(match.homeIdx, match.awayIdx, homeScore, awayScore);
        const matchKey = `${match.homeIdx}-${match.awayIdx}`;
        if (!simulatedMatches.includes(matchKey)) simulatedMatches.push(matchKey);
        matchHistory.push({ week: currentWeek + 1, homeIdx: match.homeIdx, awayIdx: match.awayIdx, homeG: homeScore, awayG: awayScore });
        saveData(); render();
        showToast(`Final: ${homeTeam.name} ${homeScore} - ${awayScore} ${awayTeam.name}`, 'success');
        triggerConfetti();
        return;
      }
      
      let delay = 100;
      const event = generateMatchEvent(homeTeam, awayTeam, minute);
      if (event){
        if (event.type === 'tarjeta_amarilla') {
          const key = event.team + event.player;
          playerYellows[key] = (playerYellows[key] || 0) + 1;
          if (playerYellows[key] === 2) {
            event.type = 'tarjeta_roja';
          }
        }

        if (event.type === 'gol'){
          if (event.team === homeTeam.name) homeScore++;
          else awayScore++;
          triggerGoalAnimation(event.team); 
          delay = 2600; 
        }
        displayEvent(event, eventsContainer);
      }
      
      document.getElementById('current-minute').textContent = minute;
      document.getElementById('minute-progress').style.width = (minute / 90 * 100) + '%';
      document.getElementById('match-home-score').textContent = homeScore;
      document.getElementById('match-away-score').textContent = awayScore;
      
      minute++;
      setTimeout(simulateMinute, delay);
    }
    
    simulateMinute();
  });

  function getRandomInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
  
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

  function calculateGoals(homeTeam, awayTeam){
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

  function displayMatch(homeTeam, awayTeam, homeG, awayG, container = matchesContainer){
    if (!container) return;
    const result = homeG > awayG ? 'V' : homeG === awayG ? 'E' : 'D';
    const resultColor = result === 'V' ? 'var(--success)' : result === 'D' ? 'var(--danger)' : 'var(--muted)';
    const matchEl = document.createElement('div');
    matchEl.className = 'match-card';
    matchEl.innerHTML = `
      <div class="match-team" style="text-align:right">${homeTeam}</div>
      <div class="match-score">${homeG} - ${awayG}</div>
      <div class="match-team" style="text-align:left">${awayTeam}</div>
      <div class="match-result-bar" style="background:${resultColor}"></div>
    `;
    container.prepend(matchEl);
  }

  function simulateRound(){
    if (!current) return showToast('No hay liga seleccionada', 'error');
    if (seasonFinished()) { updateSimButtons(); return showToast('Temporada finalizada', 'info'); }
    if (currentWeek >= fixtures.length) return showToast('No hay más semanas en el calendario', 'info');

    matchesContainer.innerHTML = '';

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

    if (simulatedCount === 0){
      const allDone = jornada.every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`));
      if (allDone) {
        currentWeek++;
        saveData(); render(); updateSimButtons();
        showToast(`Semana ${currentWeek} completada (ya estaba simulada)`, 'info');
        return;
      } else {
        return showToast('No hay partidos válidos para simular', 'info');
      }
    }
    const header = document.createElement('div');
    header.style.cssText = "padding:10px;background:var(--accent);color:#0b1220;border-radius:8px;font-weight:800;text-align:center;margin-bottom:8px;";
    header.textContent = `Semana ${currentWeek + 1}`;
    matchesContainer.prepend(header);

    currentWeek++;
    saveData(); render(); updateSimButtons();
    showToast(`Semana ${currentWeek} simulada`, 'success');
  }

  function simulateFullLeague(){
    if (!current) return showToast('No hay liga seleccionada', 'error');
    if (seasonFinished()) return showToast('Temporada finalizada', 'info');
    if (!confirm('¿Simular toda la liga? (ida y vuelta)')) return;

    matchesContainer.innerHTML = '';

    let totalMatches = 0;
    for (let w = 0; w < fixtures.length; w++){
      const jornada = fixtures[w] || [];
      for (let m = 0; m < jornada.length; m++){
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
    
    const header = document.createElement('div');
    header.style.cssText = "padding:10px;background:var(--accent2);color:#0b1220;border-radius:8px;font-weight:800;text-align:center;margin-bottom:8px;";
    header.textContent = "Liga Simulada";
    matchesContainer.prepend(header);
    
    const info = document.createElement('p');
    info.style.cssText = "text-align:center;color:var(--muted);font-size:13px;";
    info.textContent = "Consulta el historial para ver los resultados.";
    matchesContainer.appendChild(info);

    currentWeek = fixtures.length;
    saveData(); render(); updateSimButtons();
    showToast(`Liga completa simulada: ${totalMatches} partidos`, 'success');
    
    triggerConfetti();
  }

  const simulateMatchBtn = document.getElementById('simulate-match-btn');
  const simulateLeagueBtn = document.getElementById('simulate-league-btn');
  if (simulateMatchBtn) simulateMatchBtn.addEventListener('click', simulateRound);
  if (simulateLeagueBtn) simulateLeagueBtn.addEventListener('click', simulateFullLeague);

  // --- HISTORIAL ---
  const historyBtn = document.getElementById('view-history-btn');
  const historyModal = document.getElementById('history-modal');
  const closeHistoryBtn = document.getElementById('close-history-btn');
  const historyContent = document.getElementById('history-content');

  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      if (!matchHistory.length) return showToast('No hay historial disponible', 'info');
      historyContent.innerHTML = '';
   
      const weeks = {};
      matchHistory.forEach(m => {
        if (!weeks[m.week]) weeks[m.week] = [];
        weeks[m.week].push(m);
      });

      Object.keys(weeks).sort((a,b) => b - a).forEach(weekNum => {
        const weekHeader = document.createElement('div');
        weekHeader.style.cssText = "padding:8px;background:var(--surface2);color:var(--accent);border-radius:8px;font-weight:800;text-align:center;margin:15px 0 8px 0;border:1px solid var(--border)";
        weekHeader.textContent = `Semana ${weekNum}`;
        historyContent.appendChild(weekHeader);

        weeks[weekNum].forEach(m => {
          const homeName = table[m.homeIdx].name;
          const awayName = table[m.awayIdx].name;
          displayMatch(homeName, awayName, m.homeG, m.awayG, historyContent);
        });
      });

      historyModal.classList.add('open');
    });
  }

  if (closeHistoryBtn) {
    closeHistoryBtn.addEventListener('click', () => {
      historyModal.classList.remove('open');
    });
  }
  

  if (historyModal) {
    historyModal.addEventListener('click', (e) => {
      if (e.target === historyModal) historyModal.classList.remove('open');
    });
  }

  window.loadLeagueApp = load;
  window.goBackToSelection = function(){ showSelection(); };
  window.goBackToDashboard = function(){ showDashboard(); };

   const track = document.querySelector('.carousel-track');
   const container = document.querySelector('.carousel-viewport');
   const items = track ? Array.from(track.querySelectorAll('.league-item')) : [];
 
   let slideIndex = 2;
 
   function updateCarousel(){ 
     if (!track || !container || !items.length) return;
     
     const slideWidth = items[0].getBoundingClientRect().width;
     const gap = 24;
     const totalSlideWidth = slideWidth + gap;
     const containerWidth = container.offsetWidth;
     
     const centerOffset = (containerWidth / 2) - (slideWidth / 2);
     const translateX = centerOffset - (slideIndex * totalSlideWidth);
     
     track.style.transform = `translateX(${translateX}px)`;
     
     items.forEach((item, i) => {
       if (i === slideIndex) {
         item.classList.add('active');
       } else {
         item.classList.remove('active');
       }
     });
   }
   
   function goToSlide(i){
     const maxSlide = Math.max(0, items.length - 1);
     slideIndex = Math.max(0, Math.min(i, maxSlide)); 
     updateCarousel();
   }
   
   function nextSlide(){ goToSlide(slideIndex+1); }
   function prevSlide(){ goToSlide(slideIndex-1); }
 
   const nextBtn = document.getElementById('carousel-next');
   const prevBtn = document.getElementById('carousel-prev');
   if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
   if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });

   window.addEventListener('resize', updateCarousel);
   setTimeout(updateCarousel, 50);

  const allLeagueItems = document.querySelectorAll('.league-item[data-key]');
  allLeagueItems.forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.key; 
      if (key) load(key, el);
    });
  });

  carouselSection.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const activeItem = document.querySelector('.league-item.active');
      if (activeItem) {
        const key = activeItem.dataset.key;
        if (key) {
          load(key, activeItem);
        }
      }
    }
  });
  carouselSection.setAttribute('tabindex', '0');

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
 
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
 
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => toast.remove(), 150);
    }, 3000);
  }

  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#22c55e', '#38bdf8', '#ef4444', '#f59e0b', '#ffffff'];
    
    for(let i=0; i<150; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
        vx: Math.random() * 4 - 2, vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 8 + 4
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach(p => { p.x += p.vx; p.y += p.vy; if(p.y < canvas.height) active = true; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size); });
      if(active) requestAnimationFrame(animate); else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    animate();
  }

  function triggerGoalAnimation(teamName) {
    const container = document.body;
    const overlay = document.createElement('div');
    overlay.className = 'goal-overlay';
    overlay.innerHTML = `
      <div class="goal-text">¡GOL!</div>
      <div class="goal-subtext">${teamName}</div>
      <div class="goal-hands">🙌 ⚽ 🙌</div>
    `;
    container.appendChild(overlay);
    
    triggerConfetti();
    
    setTimeout(() => overlay.remove(), 2500);
  }

  showSelection();

})();