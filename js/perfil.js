document.addEventListener('DOMContentLoaded', () => {
    const sectionDesc = document.querySelector('.section__desc');
    const container = document.querySelector('.section');
    
    function renderBets() {
        const apuestasRaw = localStorage.getItem('furboBet_bets');
        if (!apuestasRaw || JSON.parse(apuestasRaw).length === 0) {
            if (sectionDesc) sectionDesc.textContent = "No hay apuestas recientes para mostrar.";
            return;
        }

        const apuestas = JSON.parse(apuestasRaw);
        if (sectionDesc) sectionDesc.style.display = 'none';

        // Eliminar lista anterior si existe
        const oldList = document.querySelector('.bets-list');
        if (oldList) oldList.remove();

        const list = document.createElement('div');
        list.className = 'bets-list';
        list.style.marginTop = '1rem';

        // Ordenar por fecha (más recientes primero)
        apuestas.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        apuestas.forEach(apuesta => {
            const betCard = document.createElement('div');
            betCard.className = 'bet-item';
            betCard.style.cssText = "background: var(--panel); padding: 1rem; border-radius: 8px; margin-bottom: 0.8rem; border-left: 4px solid var(--muted); display: flex; justify-content: space-between; align-items: center;";
            
            if (apuesta.estado === 'ganada') betCard.style.borderLeftColor = 'var(--neon2)';
            if (apuesta.estado === 'perdida') betCard.style.borderLeftColor = 'var(--danger)';

            const info = document.createElement('div');
            info.innerHTML = `
                <div style="font-weight: bold; font-size: 1.1rem;">${apuesta.equipo1} vs ${apuesta.equipo2}</div>
                <div style="font-size: 0.9rem; color: var(--muted);">Tu apuesta: <span style="color: var(--text);">${apuesta.eleccion}</span> (@${apuesta.cuota})</div>
                <div style="font-size: 0.9rem; color: var(--muted);">Importe: ${apuesta.importe.toFixed(2)}€</div>
            `;

            const status = document.createElement('div');
            status.style.textAlign = 'right';
            let statusText = 'Pendiente';
            let statusColor = 'var(--muted)';
            
            if (apuesta.estado === 'ganada') {
                statusText = '¡GANADA!';
                statusColor = 'var(--neon2)';
            } else if (apuesta.estado === 'perdida') {
                statusText = 'PERDIDA';
                statusColor = 'var(--danger)';
            }

            status.innerHTML = `
                <div style="font-weight: bold; color: ${statusColor};">${statusText.toUpperCase()}</div>
                <div style="font-size: 0.8rem; opacity: 0.7;">${new Date(apuesta.timestamp).toLocaleDateString()}</div>
            `;

            betCard.appendChild(info);
            betCard.appendChild(status);
            list.appendChild(betCard);
        });

        container.appendChild(list);
    }

    // Botón para validar apuestas
    const validateBtn = document.createElement('button');
    validateBtn.className = 'btn';
    validateBtn.textContent = 'Validar Apuestas Pendientes';
    validateBtn.style.marginTop = '1rem';
    validateBtn.onclick = function() {
        const apuestasRaw = localStorage.getItem('furboBet_bets');
        if (!apuestasRaw) return alert('No hay apuestas para validar.');
        
        let apuestas = JSON.parse(apuestasRaw);
        let countChecked = 0;
        let countWon = 0;
        let totalPrize = 0;

        apuestas.forEach(apuesta => {
            if (apuesta.estado === 'pendiente') {
                const histKey = `frontera_${apuesta.leagueKey}_historial`;
                const histRaw = localStorage.getItem(histKey);
                
                if (histRaw) {
                    const historial = JSON.parse(histRaw);
                    // Buscar el partido en el historial
                    const resultado = historial.find(h => h.homeIdx === apuesta.matchKey.split('-')[0]*1 && h.awayIdx === apuesta.matchKey.split('-')[1]*1);
                    
                    if (resultado) {
                        countChecked++;
                        let winner = 'Empate';
                        if (resultado.homeG > resultado.awayG) winner = apuesta.equipo1;
                        else if (resultado.awayG > resultado.homeG) winner = apuesta.equipo2;
                        
                        if (apuesta.eleccion === winner) {
                            apuesta.estado = 'ganada';
                            const premio = apuesta.importe * apuesta.cuota;
                            totalPrize += premio;
                            countWon++;
                        } else {
                            apuesta.estado = 'perdida';
                        }
                    }
                }
            }
        });

        if (countChecked > 0) {
            localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));
            if (totalPrize > 0) {
                const nuevoSaldo = window.obtenerSaldo() + totalPrize;
                window.actualizarSaldo(nuevoSaldo);
                alert(`¡Felicidades! Se han validado ${countChecked} apuestas. Has ganado ${countWon} y recibido ${totalPrize.toFixed(2)}€ de premio.`);
            } else {
                alert(`Se han validado ${countChecked} apuestas, pero no has ganado ninguna esta vez. ¡Sigue intentándolo!`);
            }
            renderBets();
        } else {
            alert('No se encontraron nuevos resultados en Omar. Asegúrate de simular los partidos allí primero.');
        }
    };

    if (container) {
        const head = container.querySelector('.section__head');
        if (head) head.appendChild(validateBtn);
    }

    renderBets();
});
