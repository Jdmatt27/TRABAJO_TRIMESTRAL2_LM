let seleccionesActivas = [];

document.addEventListener('configReady', () => {
    const partidoJson = sessionStorage.getItem('partidoSeleccionado');
    if (!partidoJson) {
        window.location.href = 'indexApuesta.html';
        return;
    }

    const partido = JSON.parse(partidoJson);
    renderizarDetallesPartido(partido);

    // Aplicar pre-selección si existe
    const preSeleccion = sessionStorage.getItem('preSeleccion');
    if (preSeleccion) {
        const index = preSeleccion === '1' ? 0 : preSeleccion === 'X' ? 1 : 2;
        const mainMarketBtns = document.querySelectorAll('.match__markets--big .market__btn');
        if (mainMarketBtns[index]) {
            mainMarketBtns[index].click();
        }
        sessionStorage.removeItem('preSeleccion');
    }
});

function renderizarDetallesPartido(partido) {
    const card = document.querySelector('.match__card--cuotas');
    const extraContainer = document.getElementById('extraMarketsContainer');
    if (!card) return;

    const ratingSum = (window.getEquipoData(partido.equipo1).rating || 70) + (window.getEquipoData(partido.equipo2).rating || 70);
    const probOver = 0.45 + (ratingSum - 140) * 0.002;
    const cuotaOver = Math.max(1.40, (1 / Math.min(0.70, probOver)) * 0.90).toFixed(2);
    const cuotaUnder = (1 / (1 - (0.90 / cuotaOver))).toFixed(2);

    const ratingDiff = Math.abs((window.getEquipoData(partido.equipo1).rating || 70) - (window.getEquipoData(partido.equipo2).rating || 70));
    const probBTTS = 0.60 - (ratingDiff * 0.01);
    const cuotaBTTS_Si = Math.max(1.50, (1 / Math.min(0.65, probBTTS)) * 0.92).toFixed(2);
    const cuotaBTTS_No = (1 / (1 - (0.92 / cuotaBTTS_Si))).toFixed(2);

    card.innerHTML = `
        <div class="match__header" style="background-image: url('${partido.fondo}');">
            <div class="match__overlay"></div>
            <div class="match__top">
                <span class="badge"><img src="${partido.ligaLogo}" onerror="window.imgError(this)" style="width:16px;height:16px;"> ${partido.liga}</span>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <a href="frontera.html?league=${partido.leagueKey}&match=${partido.matchKey}" class="pill" style="background: #001933; color: white; border: 1px solid #00a9e0; text-decoration: none; font-weight: bold; cursor: pointer; z-index: 10; display: flex; align-items: center; gap: 6px; padding: 4px 12px;">
                        <img src="../Fuentes/movistar.svg" style="width: 16px; height: 16px; object-fit: contain;"> Ver Partido
                    </a>
                    <span class="pill">${partido.estado}</span>
                </div>
            </div>
            <div class="match__teams">
                <div class="team"><img src="${partido.logo1}" onerror="window.imgError(this)" class="team__logo"><span class="team__name">${partido.equipo1}</span></div>
                <div class="match__time"><span class="time__big">${partido.hora}</span><span class="date__small">${partido.fecha}</span></div>
                <div class="team"><img src="${partido.logo2}" onerror="window.imgError(this)" class="team__logo"><span class="team__name">${partido.equipo2}</span></div>
            </div>
        </div>
        <div class="match__markets--big">
            <button class="market__btn" data-id="1" data-cuota="${partido.cuota1}" data-nombre="Gana ${partido.equipo1}">
                <span class="market__name">${partido.equipo1}</span><span class="market__odds">${partido.cuota1}</span>
            </button>
            <button class="market__btn" data-id="X" data-cuota="${partido.cuotaEmpate}" data-nombre="Empate">
                <span class="market__name">Empate</span><span class="market__odds">${partido.cuotaEmpate}</span>
            </button>
            <button class="market__btn" data-id="2" data-cuota="${partido.cuota2}" data-nombre="Gana ${partido.equipo2}">
                <span class="market__name">${partido.equipo2}</span><span class="market__odds">${partido.cuota2}</span>
            </button>
        </div>
    `;

    if (extraContainer) {
        extraContainer.innerHTML = `
            <div class="match__markets--details">
                <div class="market-section">
                    <h3 class="market-title">Total de Goles (2.5)</h3>
                    <div class="market-grid">
                        <button class="market__btn" data-id="over" data-cuota="${cuotaOver}" data-nombre="Más de 2.5 Goles">
                            <span class="market__name">Más 2.5</span><span class="market__odds">${cuotaOver}</span>
                        </button>
                        <button class="market__btn" data-id="under" data-cuota="${cuotaUnder}" data-nombre="Menos de 2.5 Goles">
                            <span class="market__name">Menos 2.5</span><span class="market__odds">${cuotaUnder}</span>
                        </button>
                    </div>
                </div>
                <div class="market-section">
                    <h3 class="market-title">¿Ambos Equipos Marcarán?</h3>
                    <div class="market-grid">
                        <button class="market__btn" data-id="btts_si" data-cuota="${cuotaBTTS_Si}" data-nombre="Ambos Marcan: SÍ">
                            <span class="market__name">SÍ</span><span class="market__odds">${cuotaBTTS_Si}</span>
                        </button>
                        <button class="market__btn" data-id="btts_no" data-cuota="${cuotaBTTS_No}" data-nombre="Ambos Marcan: NO">
                            <span class="market__name">NO</span><span class="market__odds">${cuotaBTTS_No}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    configurarEventosBoleto(partido);
    const hTitle = document.querySelector('.hero__title');
    if (hTitle) hTitle.textContent = `${partido.equipo1} vs ${partido.equipo2}`;
}

function configurarEventosBoleto(partido) {
    const btns = document.querySelectorAll('.market__btn');
    const inputAmount = document.getElementById('bet-amount');
    const btnPlace = document.getElementById('btn-place-bet');

    btns.forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            const existingIdx = seleccionesActivas.findIndex(s => s.id === id);

            if (existingIdx > -1) {
                seleccionesActivas.splice(existingIdx, 1);
                btn.classList.remove('active');
            } else {
                const group = getGroup(id);
                const sameGroupIdx = seleccionesActivas.findIndex(s => getGroup(s.id) === group);
                if (sameGroupIdx > -1) {
                    const oldId = seleccionesActivas[sameGroupIdx].id;
                    document.querySelector(`[data-id="${oldId}"]`)?.classList.remove('active');
                    seleccionesActivas.splice(sameGroupIdx, 1);
                }
                seleccionesActivas.push({
                    id,
                    nombre: btn.dataset.nombre,
                    cuota: parseFloat(btn.dataset.cuota),
                    matchName: `${partido.equipo1} vs ${partido.equipo2}`
                });
                btn.classList.add('active');
            }
            actualizarBoletoUI();
        };
    });

    if (inputAmount) inputAmount.oninput = actualizarWinnings;

    document.querySelectorAll('.q-btn').forEach(qb => {
        qb.onclick = () => {
            const val = qb.dataset.val;
            let current = parseFloat(inputAmount.value) || 0;
            if (val === 'max') inputAmount.value = window.obtenerSaldo();
            else inputAmount.value = current + parseFloat(val);
            actualizarWinnings();
        };
    });

    if (btnPlace) {
        btnPlace.onclick = () => {
            const amount = parseFloat(inputAmount.value);
            const saldo = window.obtenerSaldo();
            if (seleccionesActivas.length === 0) return window.showToast('Selecciona alguna cuota.');
            if (isNaN(amount) || amount <= 0) return window.showToast('Importe no válido.');
            if (amount > saldo) return window.showToast('Saldo insuficiente.');
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                window.showToast('Inicia sesión para apostar.');
                setTimeout(() => window.location.href = 'loginApuesta.html', 1500);
                return;
            }

            const totalOdds = seleccionesActivas.reduce((acc, s) => acc * s.cuota, 1);
            const nuevaApuesta = {
                id: Date.now(),
                matchId: partido.id,
                leagueKey: partido.leagueKey,
                matchKey: partido.matchKey,
                equipo1: partido.equipo1,
                equipo2: partido.equipo2,
                tipo: 'combinada',
                selecciones: JSON.parse(JSON.stringify(seleccionesActivas)),
                cuotaTotal: totalOdds.toFixed(2),
                importe: amount,
                estado: 'pendiente',
                timestamp: new Date().toISOString()
            };

            window.actualizarSaldo(saldo - amount);
            const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
            apuestas.push(nuevaApuesta);
            localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));

            window.showToast('¡Apuesta realizada!', 'success');
            seleccionesActivas = [];
            document.querySelectorAll('.market__btn').forEach(b => b.classList.remove('active'));
            inputAmount.value = '';
            actualizarBoletoUI();
        };
    }
}

function getGroup(id) {
    if (['1', 'X', '2'].includes(id)) return 'ganador';
    if (['over', 'under'].includes(id)) return 'goles';
    if (['btts_si', 'btts_no'].includes(id)) return 'btts';
    return 'otro';
}

function actualizarBoletoUI() {
    const list = document.getElementById('selections-list');
    const footer = document.getElementById('bet-slip-footer');
    const count = document.getElementById('bet-count');
    const oddsEl = document.getElementById('total-odds');
    if (!list) return;

    count.textContent = `${seleccionesActivas.length} Selecciones`;
    if (seleccionesActivas.length === 0) {
        list.innerHTML = '<p class="bet-slip__empty">Selecciona una cuota para empezar</p>';
        footer.style.display = 'none';
        return;
    }

    footer.style.display = 'block';
    list.innerHTML = seleccionesActivas.map(s => `
        <div class="selection-item">
            <div class="selection-item__top">
                <span class="selection-item__name">${s.nombre}</span>
                <span class="selection-item__odds">${s.cuota.toFixed(2)}</span>
            </div>
            <div class="selection-item__match">${s.matchName}</div>
            <button class="selection-item__remove" onclick="removerSeleccion('${s.id}')">×</button>
        </div>
    `).join('');

    const totalOdds = seleccionesActivas.reduce((acc, s) => acc * s.cuota, 1);
    oddsEl.textContent = totalOdds.toFixed(2);
    actualizarWinnings();
}

function actualizarWinnings() {
    const amount = parseFloat(document.getElementById('bet-amount')?.value) || 0;
    const totalOdds = seleccionesActivas.reduce((acc, s) => acc * s.cuota, 1);
    const winEl = document.getElementById('potential-win');
    if (winEl) winEl.textContent = (amount * totalOdds).toFixed(2) + '€';
}

window.removerSeleccion = (id) => {
    const idx = seleccionesActivas.findIndex(s => s.id === id);
    if (idx > -1) {
        seleccionesActivas.splice(idx, 1);
        document.querySelector(`[data-id="${id}"]`)?.classList.remove('active');
        actualizarBoletoUI();
    }
};