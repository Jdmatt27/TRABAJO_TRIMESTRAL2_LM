/**
 * perfil.js - Lógica simplificada
 */

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
            const card = document.createElement('div');
            card.className = 'bet-item';
            card.style.cssText = `background: var(--panel); padding: 1rem; border-radius: 8px; margin-bottom: 0.8rem; border-left: 4px solid ${isRetiro ? '#f59e0b' : (item.estado === 'ganada' ? 'var(--neon2)' : (item.estado === 'perdida' ? 'var(--danger)' : 'var(--muted)'))}; display: flex; justify-content: space-between; align-items: center;`;
            
            card.innerHTML = isRetiro ? `
                <div><div style="font-weight:bold; font-size:1.1rem;">📤 Retiro de Fondos</div><div style="font-size:0.9rem; color:var(--muted);">Enviado a cuenta bancaria</div></div>
                <div style="text-align:right;"><div style="font-weight:bold; color:#f59e0b;">-${item.importe.toFixed(2)}€</div><div style="font-size:0.8rem; opacity:0.7;">${new Date(item.timestamp).toLocaleDateString()}</div></div>
            ` : `
                <div><div style="font-weight:bold; font-size:1.1rem;">⚽ ${item.equipo1} vs ${item.equipo2}</div><div style="font-size:0.9rem; color:var(--muted);">Apuesta: ${item.eleccion} (@${item.cuota})</div></div>
                <div style="text-align:right;"><div style="font-weight:bold; color:${item.estado === 'ganada' ? 'var(--neon2)' : (item.estado === 'perdida' ? 'var(--danger)' : 'var(--muted)')}">
                    ${item.estado === 'ganada' ? '+' + (item.importe * item.cuota).toFixed(2) : (item.estado === 'perdida' ? '-' + item.importe.toFixed(2) : 'PENDIENTE')}
                </div><div style="font-size:0.8rem; opacity:0.7;">${new Date(item.timestamp).toLocaleDateString()}</div></div>
            `;
            list.appendChild(card);
        });
        container.appendChild(list);
    }

    // Escuchar cambios globales de apuestas
    document.addEventListener('betsUpdated', actualizarVista);

    // Retiros
    const btnWithdraw = document.querySelector('.btn-withdraw');
    if (btnWithdraw) {
        btnWithdraw.onclick = () => {
            const saldo = window.obtenerSaldo();
            const cant = parseFloat(prompt(`¿Cuánto deseas retirar? (Disponible: ${saldo.toFixed(2)}€)`));
            if (isNaN(cant) || cant <= 0 || cant > saldo) return alert("Cantidad inválida.");

            if (confirm(`¿Confirmas el retiro de ${cant.toFixed(2)}€?`)) {
                window.actualizarSaldo(saldo - cant);
                const retiros = JSON.parse(localStorage.getItem('furboBet_withdrawals') || '[]');
                retiros.push({ id: Date.now(), importe: cant, timestamp: new Date().toISOString() });
                localStorage.setItem('furboBet_withdrawals', JSON.stringify(retiros));
                actualizarVista();
            }
        };
    }

    actualizarVista();
});
