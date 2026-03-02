document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.section');
    
    function actualizarVista() {
        const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
        const stats = document.querySelectorAll('.stat-value');
        if (stats.length < 3) return;

        const ganadas = apuestas.filter(a => a.estado === 'ganada').length;
        const perdidas = apuestas.filter(a => a.estado === 'perdida').length;
        const winRate = apuestas.length > 0 ? ((ganadas / (ganadas + perdidas || 1)) * 100).toFixed(1) : 0;
        
        let beneficio = 0;
        apuestas.forEach(a => {
            if (a.estado === 'ganada') beneficio += (a.importe * a.cuota) - a.importe;
            if (a.estado === 'perdida') beneficio -= a.importe;
        });

        stats[0].textContent = apuestas.length;
        stats[1].textContent = winRate + '%';
        stats[2].textContent = (beneficio >= 0 ? '+' : '') + beneficio.toFixed(2) + '€';
        
        [stats[1], stats[2]].forEach(el => el.className = beneficio >= 0 ? 'stat-value text-green' : 'stat-value text-danger');
        renderHistorial(apuestas);
    }

    function renderHistorial(apuestas) {
        const retiros = JSON.parse(localStorage.getItem('furboBet_withdrawals') || '[]');
        const historial = [...apuestas.map(a => ({...a, tipo: 'apuesta'})), ...retiros.map(r => ({...r, tipo: 'retiro'}))]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const sectionDesc = document.querySelector('.section__desc');
        if (historial.length === 0) return;
        if (sectionDesc) sectionDesc.style.display = 'none';

        const oldList = document.querySelector('.bets-list');
        if (oldList) oldList.remove();

        const list = document.createElement('div');
        list.className = 'bets-list';
        list.style.marginTop = '1rem';

        historial.forEach(item => {
            const isRetiro = item.tipo === 'retiro';
            let marcadorHTML = '';
            
            // Buscar resultado real en el historial de la liga
            if (!isRetiro && item.estado !== 'pendiente') {
                const histRaw = localStorage.getItem(`frontera_${item.leagueKey}_historial`);
                if (histRaw) {
                    const hist = JSON.parse(histRaw);
                    const res = hist.find(h => 
                        (h.homeIdx === item.matchKey.split('-')[0]*1 && h.awayIdx === item.matchKey.split('-')[1]*1) ||
                        (h.equipoLocal === item.equipo1 && h.equipoVisitante === item.equipo2)
                    );
                    if (res) {
                        marcadorHTML = `
                            <div class="score-box" style="background: var(--bg); border: 1px solid var(--line); border-radius: 8px; min-width: 70px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; color: var(--text); box-shadow: inset 0 0 10px rgba(0,0,0,0.2);">
                                ${res.homeG} - ${res.awayG}
                            </div>
                        `;
                    }
                }
            }

            const card = document.createElement('div');
            card.className = 'bet-item';
            card.style.cssText = `background: var(--panel); padding: 1rem; border-radius: 12px; margin-bottom: 1rem; border-left: 5px solid ${isRetiro ? '#f59e0b' : (item.estado === 'ganada' ? 'var(--neon2)' : (item.estado === 'perdida' ? 'var(--danger)' : 'var(--muted)'))}; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem;`;
            
            card.innerHTML = isRetiro ? `
                <div style="flex: 1;"><div style="font-weight:bold; font-size:1.1rem;">📤 Retiro de Fondos</div><div style="font-size:0.9rem; color:var(--muted);">Enviado a cuenta bancaria</div></div>
                <div style="text-align:right;"><div style="font-weight:bold; color:#f59e0b; font-size:1.1rem;">-${item.importe.toFixed(2)}€</div><div style="font-size:0.8rem; opacity:0.7;">${new Date(item.timestamp).toLocaleDateString()}</div></div>
            ` : `
                <div style="display: flex; align-items: center; gap: 1.5rem; flex: 1;">
                    <div style="flex: 1;">
                        <div style="font-weight:bold; font-size:1.1rem; color: var(--text);">⚽ ${item.equipo1} vs ${item.equipo2}</div>
                        <div style="font-size:0.85rem; color:var(--muted); margin-top: 2px;">Tu apuesta: <span style="color: var(--text); font-weight: 600;">${item.eleccion}</span> (@${item.cuota})</div>
                    </div>
                    ${marcadorHTML}
                </div>
                <div style="text-align:right; min-width: 100px;">
                    <div style="font-weight:bold; font-size:1.1rem; color:${item.estado === 'ganada' ? 'var(--neon2)' : (item.estado === 'perdida' ? 'var(--danger)' : 'var(--muted)')}">
                        ${item.estado === 'ganada' ? '+' + (item.importe * item.cuota).toFixed(2) : (item.estado === 'perdida' ? '-' + item.importe.toFixed(2) : 'PENDIENTE')}
                    </div>
                    <div style="font-size:0.8rem; opacity:0.7;">${new Date(item.timestamp).toLocaleDateString()}</div>
                </div>
            `;
            list.appendChild(card);
        });
        container.appendChild(list);
    }

    document.addEventListener('betsUpdated', actualizarVista);

    // Retiros
    const btnWithdraw = document.querySelector('.btn-withdraw');
    if (btnWithdraw) {
        btnWithdraw.onclick = () => {
            const saldo = window.obtenerSaldo();
            const inputVal = prompt(`¿Cuánto deseas retirar? (Disponible: ${saldo.toFixed(2)}€)`);
            if (inputVal === null) return;
            
            const cant = parseFloat(inputVal);
            if (isNaN(cant) || cant <= 0 || cant > saldo) return window.showToast("Cantidad inválida o saldo insuficiente.");

            if (confirm(`¿Confirmas el retiro de ${cant.toFixed(2)}€?`)) {
                window.actualizarSaldo(saldo - cant);
                const retiros = JSON.parse(localStorage.getItem('furboBet_withdrawals') || '[]');
                retiros.push({ id: Date.now(), importe: cant, timestamp: new Date().toISOString() });
                localStorage.setItem('furboBet_withdrawals', JSON.stringify(retiros));
                window.showToast('Retiro procesado con éxito.', 'success');
                actualizarVista();
            }
        };
    }

    actualizarVista();
});