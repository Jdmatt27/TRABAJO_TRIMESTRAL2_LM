(function() {
  // Mismos datos que en frontera.js para consistencia
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

  let currentLeagueKey = localStorage.getItem('frontera_active_league');
  let table = [];
  let fixtures = [];
  let simulatedMatches = [];
  let activeBets = [];
  let wallet = 1000;
  let currentWeek = 0;

  const walletDisplay = document.getElementById('wallet-display');
  const matchesList = document.getElementById('matches-list');
  const leagueBadge = document.getElementById('league-badge');
  const weekNumSpan = document.getElementById('current-week-num');

  function init() {
    if ((!currentLeagueKey || !leagues[currentLeagueKey]) && document.getElementById('no-league-msg')) {
      if(document.getElementById('no-league-msg')) document.getElementById('no-league-msg').style.display = 'block';
      if(document.getElementById('betting-content')) document.getElementById('betting-content').style.display = 'none';
      return;
    }

    if(leagueBadge) leagueBadge.textContent = leagues[currentLeagueKey].name;
    loadData();
    generateFixtures();
    calculateCurrentWeek();
    renderMatches();
    updateWalletUI();
  }

  function storageKey() { return `frontera_${currentLeagueKey}`; }

  function loadData() {
    const raw = localStorage.getItem(storageKey());
    if (raw) table = JSON.parse(raw);
    else table = leagues[currentLeagueKey].teams.map((name, i) => ({ id: i, name, rating: teamRatings[name] || 70 }));

    const simRaw = localStorage.getItem(storageKey() + '_simulados');
    simulatedMatches = simRaw ? JSON.parse(simRaw) : [];

    const walletRaw = localStorage.getItem('frontera_wallet');
    wallet = walletRaw ? parseFloat(walletRaw) : 1000;
    activeBets = JSON.parse(localStorage.getItem(storageKey() + '_bets')) || [];
  }

  function generateFixtures() {
    fixtures = [];
    const n = table.length;
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
    for (let r = 0; r < idaCount; r++){
      fixtures.push(fixtures[r].map(m => ({ homeIdx: m.awayIdx, awayIdx: m.homeIdx })));
    }
  }

  function calculateCurrentWeek() {
    currentWeek = 0;
    for(let i=0; i<fixtures.length; i++){
      const allSimulated = fixtures[i].every(m => simulatedMatches.includes(`${m.homeIdx}-${m.awayIdx}`));
      if(allSimulated) currentWeek = i + 1;
      else break;
    }
    if(weekNumSpan) weekNumSpan.textContent = (currentWeek + 1).toString();
  }

  function calculateOdds(home, away) {
    const diff = (home.rating || 70) - (away.rating || 70);
    let probHome = 0.45 + (diff * 0.015);
    let probAway = 0.30 - (diff * 0.015);
    let probDraw = 0.25;
    const total = probHome + probAway + probDraw;
    const margin = 0.95;
    return {
      '1': (1 / (probHome/total) * margin).toFixed(2),
      'X': (1 / (probDraw/total) * margin).toFixed(2),
      '2': (1 / (probAway/total) * margin).toFixed(2)
    };
  }

  function renderMatches() {
    if (!matchesList) return;
    matchesList.innerHTML = '';
    if (currentWeek >= fixtures.length) {
      matchesList.innerHTML = '<div style="text-align:center;padding:20px;">Temporada finalizada.</div>';
      return;
    }
    const jornada = fixtures[currentWeek];
    jornada.forEach(match => {
      const home = table[match.homeIdx];
      const away = table[match.awayIdx];
      const matchKey = `${match.homeIdx}-${match.awayIdx}`;
      const odds = calculateOdds(home, away);
      const existingBet = activeBets.find(b => b.matchKey === matchKey);
      
      const card = document.createElement('div');
      card.className = 'bet_card';
      let html = `<div class="match_header"><span>${home.name}</span><span style="color:var(--muted);font-size:0.9rem">vs</span><span>${away.name}</span></div>`;

      if (existingBet) {
        html += `<div style="text-align:center;padding:10px;background:rgba(34,197,94,0.1);border-radius:8px;border:1px solid #22c55e;">Apuesta Activa: <b>${existingBet.amount}€</b> al <b>${existingBet.type}</b></div>`;
      } else {
        html += `<div class="odds_container">
            <div class="odd_btn" onclick="selectOdd(this, '${matchKey}', '1', ${odds['1']})"><span class="odd_label">LOCAL</span><span class="odd_val">${odds['1']}</span></div>
            <div class="odd_btn" onclick="selectOdd(this, '${matchKey}', 'X', ${odds['X']})"><span class="odd_label">EMPATE</span><span class="odd_val">${odds['X']}</span></div>
            <div class="odd_btn" onclick="selectOdd(this, '${matchKey}', '2', ${odds['2']})"><span class="odd_label">VISITA</span><span class="odd_val">${odds['2']}</span></div>
          </div>
          <div class="bet_actions" id="actions-${matchKey}" style="display:none;">
            <input type="number" class="bet_input" id="input-${matchKey}" placeholder="€" min="1">
            <button class="btn_small" onclick="placeBet('${matchKey}')" style="background:#10b981;color:white;flex:1;">Apostar</button>
          </div>`;
      }
      card.innerHTML = html;
      matchesList.appendChild(card);
    });
  }

  let currentSelection = {};
  window.selectOdd = function(el, matchKey, type, odds) {
    el.parentElement.querySelectorAll('.odd_btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.querySelectorAll('.bet_actions').forEach(a => a.style.display = 'none');
    document.getElementById(`actions-${matchKey}`).style.display = 'flex';
    currentSelection = { matchKey, type, odds };
  };

  window.placeBet = function(matchKey) {
    const input = document.getElementById(`input-${matchKey}`);
    const amount = parseFloat(input.value);
    if (!amount || amount <= 0 || amount > wallet) return alert('Cantidad inválida o saldo insuficiente');
    
    wallet -= amount;
    activeBets.push({ matchKey, type: currentSelection.type, amount, odds: currentSelection.odds });
    
    localStorage.setItem('frontera_wallet', wallet.toString());
    localStorage.setItem(storageKey() + '_bets', JSON.stringify(activeBets));
    updateWalletUI();
    renderMatches();
  };

  function updateWalletUI() { if(walletDisplay) walletDisplay.textContent = `${wallet.toFixed(0)}€`; }

  // --- MODO OSCURO ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('frontera_theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  } else {
    // Por defecto es modo oscuro, mostramos el sol para cambiar a claro
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('frontera_theme', newTheme);
      themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  init();
})();