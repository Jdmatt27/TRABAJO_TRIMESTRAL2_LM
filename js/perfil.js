document.addEventListener('DOMContentLoaded', () => {
    const sectionDesc = document.querySelector('.section__desc');
    const container = document.querySelector('.section');
    const saldoDisplay = document.querySelector('.wallet-balance.saldo-usuario');
    
    // Elementos de Estadísticas
    const statApuestasTotales = document.querySelectorAll('.stat-value')[0];
    const statWinRate = document.querySelectorAll('.stat-value')[1];
    const statBeneficioNeto = document.querySelectorAll('.stat-value')[2];

    function actualizarEstadisticas() {
        const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
        const retiros = JSON.parse(localStorage.getItem('furboBet_withdrawals') || '[]');
        
        const totales = apuestas.length;
        const ganadas = apuestas.filter(a => a.estado === 'ganada').length;
        const perdidas = apuestas.filter(a => a.estado === 'perdida').length;
        
        // Calcular Win Rate
        const winRate = totales > 0 ? ((ganadas / (ganadas + perdidas || 1)) * 100).toFixed(1) : 0;
        
        // Calcular Beneficio Neto (Premios ganados - Importes apostados)
        let beneficio = 0;
        apuestas.forEach(a => {
            if (a.estado === 'ganada') beneficio += (a.importe * a.cuota) - a.importe;
            if (a.estado === 'perdida') beneficio -= a.importe;
        });

        // Actualizar el DOM
        if (statApuestasTotales) statApuestasTotales.textContent = totales;
        if (statWinRate) {
            statWinRate.textContent = winRate + '%';
            statWinRate.className = beneficio >= 0 ? 'stat-value text-green' : 'stat-value text-danger';
        }
        if (statBeneficioNeto) {
            statBeneficioNeto.textContent = (beneficio >= 0 ? '+' : '') + beneficio.toFixed(2) + '€';
            statBeneficioNeto.className = beneficio >= 0 ? 'stat-value text-green' : 'stat-value text-danger';
        }
    }

    function renderHistorial() {
        const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
        const retiros = JSON.parse(localStorage.getItem('furboBet_withdrawals') || '[]');
        
        // Combinar y ordenar por fecha
        const historialCompleto = [
            ...apuestas.map(a => ({ ...a, tipo: 'apuesta' })),
            ...retiros.map(r => ({ ...r, tipo: 'retiro' }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (historialCompleto.length === 0) {
            if (sectionDesc) sectionDesc.style.display = 'block';
            return;
        }

        if (sectionDesc) sectionDesc.style.display = 'none';
        const oldList = document.querySelector('.bets-list');
        if (oldList) oldList.remove();

        const list = document.createElement('div');
        list.className = 'bets-list';
        list.style.marginTop = '1rem';

        historialCompleto.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bet-item';
            card.style.cssText = "background: var(--panel); padding: 1rem; border-radius: 8px; margin-bottom: 0.8rem; border-left: 4px solid var(--muted); display: flex; justify-content: space-between; align-items: center;";
            
            if (item.tipo === 'retiro') {
                card.style.borderLeftColor = '#f59e0b'; // Naranja para retiros
                card.innerHTML = `
                    <div>
                        <div style="font-weight: bold; font-size: 1.1rem;">📤 Retiro de Fondos</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Enviado a tu cuenta bancaria</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: bold; color: #f59e0b;">-${item.importe.toFixed(2)}€</div>
                        <div style="font-size: 0.8rem; opacity: 0.7;">${new Date(item.timestamp).toLocaleDateString()}</div>
                    </div>
                `;
            } else {
                // Es una apuesta
                if (item.estado === 'ganada') card.style.borderLeftColor = 'var(--neon2)';
                if (item.estado === 'perdida') card.style.borderLeftColor = 'var(--danger)';

                // Buscar resultado en el historial para mostrar el marcador
                let marcadorHTML = '';
                const histRaw = localStorage.getItem(`frontera_${item.leagueKey}_historial`);
                if (histRaw) {
                    const historial = JSON.parse(histRaw);
                    const res = historial.find(h => h.homeIdx === item.matchKey.split('-')[0]*1 && h.awayIdx === item.matchKey.split('-')[1]*1);
                    if (res) {
                        marcadorHTML = `<span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; margin-left: 8px; font-family: monospace;">${res.homeG} - ${res.awayG}</span>`;
                    }
                }

                card.innerHTML = `
                    <div>
                        <div style="font-weight: bold; font-size: 1.1rem;">⚽ ${item.equipo1} vs ${item.equipo2} ${marcadorHTML}</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Apuesta: ${item.eleccion} (@${item.cuota})</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: bold; color: ${item.estado === 'ganada' ? 'var(--neon2)' : (item.estado === 'perdida' ? 'var(--danger)' : 'var(--muted)')}">
                            ${item.estado === 'ganada' ? '+' + (item.importe * item.cuota).toFixed(2) : (item.estado === 'perdida' ? '-' + item.importe.toFixed(2) : 'PENDIENTE')}
                        </div>
                        <div style="font-size: 0.8rem; opacity: 0.7;">${new Date(item.timestamp).toLocaleDateString()}</div>
                    </div>
                `;
            }
            list.appendChild(card);
        });

        container.appendChild(list);
    }

    // Lógica de Retiro
    const btnWithdraw = document.querySelector('.btn-withdraw');
    if (btnWithdraw) {
        btnWithdraw.onclick = function() {
            const saldoActual = window.obtenerSaldo();
            if (saldoActual <= 0) return alert("No tienes saldo suficiente para retirar.");
            
            const cantidadStr = prompt(`¿Cuánto deseas retirar? (Saldo disponible: ${saldoActual.toFixed(2)}€)`);
            const cantidad = parseFloat(cantidadStr);

            if (isNaN(cantidad) || cantidad <= 0 || cantidad > saldoActual) {
                return alert("Cantidad inválida o superior a tu saldo.");
            }

            if (confirm(`¿Confirmas el retiro de ${cantidad.toFixed(2)}€?`)) {
                // Restar saldo
                window.actualizarSaldo(saldoActual - cantidad);
                
                // Registrar retiro
                const retiros = JSON.parse(localStorage.getItem('furboBet_withdrawals') || '[]');
                retiros.push({
                    id: Date.now(),
                    importe: cantidad,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('furboBet_withdrawals', JSON.stringify(retiros));
                
                alert("Retiro procesado con éxito. El dinero llegará a tu cuenta en 24-48h.");
                actualizarEstadisticas();
                renderHistorial();
            }
        };
    }

    function validarApuestasAutomaticamente() {
        const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
        let countChecked = 0, totalPrize = 0;

        apuestas.forEach(apuesta => {
            if (apuesta.estado === 'pendiente') {
                const histRaw = localStorage.getItem(`frontera_${apuesta.leagueKey}_historial`);
                if (histRaw) {
                    const historial = JSON.parse(histRaw);
                    const res = historial.find(h => h.homeIdx === apuesta.matchKey.split('-')[0]*1 && h.awayIdx === apuesta.matchKey.split('-')[1]*1);
                    if (res) {
                        countChecked++;
                        let winner = (res.homeG > res.awayG) ? apuesta.equipo1 : (res.awayG > res.homeG ? apuesta.equipo2 : 'Empate');
                        if (apuesta.eleccion === winner) {
                            apuesta.estado = 'ganada';
                            totalPrize += (apuesta.importe * apuesta.cuota);
                        } else apuesta.estado = 'perdida';
                    }
                }
            }
        });

        if (countChecked > 0) {
            localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));
            if (totalPrize > 0) window.actualizarSaldo(window.obtenerSaldo() + totalPrize);
            // No alertamos en el automático para no molestar, solo actualizamos vista
            actualizarEstadisticas();
            renderHistorial();
        }
    }

    // Botón para validar (mantener funcionalidad anterior)
    const validateBtn = document.createElement('button');
    validateBtn.className = 'btn';
    validateBtn.textContent = 'Validar Apuestas Pendientes';
    validateBtn.style.marginTop = '1rem';
    validateBtn.onclick = function() {
        const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
        let countChecked = 0, totalPrize = 0;

        apuestas.forEach(apuesta => {
            if (apuesta.estado === 'pendiente') {
                const histRaw = localStorage.getItem(`frontera_${apuesta.leagueKey}_historial`);
                if (histRaw) {
                    const historial = JSON.parse(histRaw);
                    const res = historial.find(h => h.homeIdx === apuesta.matchKey.split('-')[0]*1 && h.awayIdx === apuesta.matchKey.split('-')[1]*1);
                    if (res) {
                        countChecked++;
                        let winner = (res.homeG > res.awayG) ? apuesta.equipo1 : (res.awayG > res.homeG ? apuesta.equipo2 : 'Empate');
                        if (apuesta.eleccion === winner) {
                            apuesta.estado = 'ganada';
                            totalPrize += (apuesta.importe * apuesta.cuota);
                        } else apuesta.estado = 'perdida';
                    }
                }
            }
        });

        if (countChecked > 0) {
            localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));
            if (totalPrize > 0) window.actualizarSaldo(window.obtenerSaldo() + totalPrize);
            alert(`Sincronización completa: ${countChecked} apuestas procesadas.`);
            actualizarEstadisticas();
            renderHistorial();
        } else alert("No hay nuevos resultados en Omar.");
    };

    if (container) {
        const head = container.querySelector('.section__head');
        if (head) head.appendChild(validateBtn);
    }

    // Inicializar página
    validarApuestasAutomaticamente();
    actualizarEstadisticas();
    renderHistorial();
});
