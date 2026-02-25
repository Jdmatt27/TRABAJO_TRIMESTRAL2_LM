document.addEventListener('DOMContentLoaded', () => {
    const partidoJson = sessionStorage.getItem('partidoSeleccionado');
    if (!partidoJson) {
        window.location.href = '../index.html';
        return;
    }

    const partido = JSON.parse(partidoJson);
    renderizarDetallesPartido(partido);
    configurarEventosApuesta(partido);
});

function generarDescripcionAleatoria(partido) {
    const descripcionesFutbol = [
        `El esperado encuentro entre ${partido.equipo1} y ${partido.equipo2} promete ser un duelo táctico sin precedentes. Ambos equipos llegan en un estado de forma envidiable.`,
        `Rivalidad histórica en el campo. El ${partido.equipo1} busca redimirse ante su afición frente a un ${partido.equipo2} que no regalará ni un centímetro de césped.`,
        `Duelo de titanes en la ${partido.liga}. Las estadísticas favorecen ligeramente al equipo local, pero la magia del fútbol siempre guarda sorpresas bajo la manga.`,
        `Todo listo para el pitido inicial. Con las plantillas al completo, se espera un partido de ida y vuelta con muchas ocasiones de gol para ambos bandos.`
    ];

    const lista = descripcionesFutbol;
    return lista[Math.floor(Math.random() * lista.length)];
}

function renderizarDetallesPartido(partido) {
    const card = document.querySelector('.match__card--cuotas');
    const isFutbol = partido.deporte === 'Fútbol';

    // Generar mercados dinámicos
    let marketsHTML = `
        <button class="market__btn" id="btnCuota1" data-cuota="${partido.cuota1}" data-nombre="${partido.equipo1}">
            <span class="market__name">${partido.equipo1}</span>
            <span class="market__odds">${partido.cuota1}</span>
        </button>
    `;

    if (isFutbol) {
        marketsHTML += `
            <button class="market__btn" id="btnCuotaEmpate" data-cuota="${partido.cuotaEmpate}" data-nombre="Empate">
                <span class="market__name">Empate</span>
                <span class="market__odds">${partido.cuotaEmpate}</span>
            </button>
        `;
    }

    marketsHTML += `
        <button class="market__btn" id="btnCuota2" data-cuota="${partido.cuota2}" data-nombre="${partido.equipo2}">
            <span class="market__name">${partido.equipo2}</span>
            <span class="market__odds">${partido.cuota2}</span>
        </button>
    `;

    if (card) {
        card.innerHTML = `
            <div class="match__header" style="background-image: url('${partido.fondo}');">
                <div class="match__overlay"></div>
                <div class="match__top">
                    <span class="badge" style="display: flex; align-items: center; gap: 6px;">
                        <img src="${partido.ligaLogo}" style="width: 16px; height: 16px; object-fit: contain;">
                        ${partido.liga}
                    </span>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <a href="http://127.0.0.1:5500/Trabajos%20Finales/Segundo%20Trimestre/P%C3%A1gina%20Web%20Omar/frontera.html" class="pill" style="background: #001933; color: white; border: 1px solid #00a9e0; text-decoration: none; font-weight: bold; cursor: pointer; z-index: 10; display: flex; align-items: center; gap: 6px; padding: 4px 12px;">
                            <img src="../Fuentes/movistar.svg" style="width: 16px; height: 16px; object-fit: contain;">
                            Ver Partido
                        </a>
                        <span class="pill">${partido.estado}</span>
                    </div>
                </div>

                <div class="match__teams">
                    <div class="team">
                        ${partido.logo1 ? `<img src="${partido.logo1}" class="team__logo">` : '<div class="team__logo-placeholder"></div>'}
                        <span class="team__name">${partido.equipo1}</span>
                    </div>

                    <div class="match__time">
                        <span class="time__big">${partido.hora}</span>
                        <span class="date__small">${partido.fecha}</span>
                    </div>

                    <div class="team">
                        ${partido.logo2 ? `<img src="${partido.logo2}" class="team__logo">` : '<div class="team__logo-placeholder"></div>'}
                        <span class="team__name">${partido.equipo2}</span>
                    </div>
                </div>
            </div>

            <div class="match__markets--big">
                ${marketsHTML}
            </div>
        `;
    }

    const heroTitle = document.querySelector('.hero__title');
    const heroText = document.querySelector('.hero__text');
    const pill = document.querySelector('.hero .pill');
    
    if (heroTitle) heroTitle.textContent = `${partido.equipo1} VS ${partido.equipo2}`;
    if (heroText) heroText.textContent = generarDescripcionAleatoria(partido);
    if (pill) pill.textContent = `Apuestas ${partido.deporte}`;
}

let seleccionActual = null;

function configurarEventosApuesta(partido) {
    const botonesMercado = document.querySelectorAll('.market__btn');
    const inputCantidad = document.querySelector('.amount-input');
    const btnApostar = document.querySelector('.trade-btn');
    const quickBtns = document.querySelectorAll('.q-btn');
    const amountLabel = document.querySelector('.card__amount-section label');

    let winningsDisplay = document.querySelector('.winnings-display');
    if (!winningsDisplay) {
        winningsDisplay = document.createElement('div');
        winningsDisplay.className = 'winnings-display';
        winningsDisplay.style.marginTop = '0.5rem';
        winningsDisplay.style.fontSize = '0.9rem';
        winningsDisplay.style.color = 'var(--muted)';
        winningsDisplay.innerHTML = 'Ganancias potenciales: <span class="potential-val" style="color:var(--neon2); font-weight:bold;">0.00€</span>';
        document.querySelector('.card__amount-section').appendChild(winningsDisplay);
    }

    const actualizarGanancias = () => {
        const cantidad = parseFloat(inputCantidad.value) || 0;
        const potentialVal = winningsDisplay.querySelector('.potential-val');
        if (seleccionActual && cantidad > 0) {
            const ganancias = cantidad * seleccionActual.cuota;
            potentialVal.textContent = ganancias.toFixed(2) + '€';
        } else {
            potentialVal.textContent = '0.00€';
        }
    };

    botonesMercado.forEach(btn => {
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            botonesMercado.forEach(b => b.classList.remove('active'));
            
            if (wasActive) {
                seleccionActual = null;
                if (amountLabel) amountLabel.textContent = 'Cantidad a apostar';
            } else {
                btn.classList.add('active');
                seleccionActual = {
                    nombre: btn.dataset.nombre,
                    cuota: parseFloat(btn.dataset.cuota)
                };
                if (amountLabel) amountLabel.innerHTML = `Apostar por: <span style="color:var(--neon2)">${seleccionActual.nombre}</span> (x${seleccionActual.cuota})`;
            }
            actualizarGanancias();
        });
    });

    inputCantidad.addEventListener('input', actualizarGanancias);

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let currentVal = parseFloat(inputCantidad.value) || 0;
            const text = btn.textContent.trim();
            if (text === '+$1') inputCantidad.value = currentVal + 1;
            else if (text === '+$20') inputCantidad.value = currentVal + 20;
            else if (text === '+$100') inputCantidad.value = currentVal + 100;
            else if (text === 'Max') inputCantidad.value = window.obtenerSaldo();
            actualizarGanancias();
        });
    });

    btnApostar.addEventListener('click', () => {
        if (!seleccionActual) {
            alert('Por favor, selecciona un resultado para apostar.');
            return;
        }

        const cantidad = parseFloat(inputCantidad.value);
        const saldoActual = window.obtenerSaldo();

        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Introduce una cantidad válida.');
            return;
        }

        if (cantidad > saldoActual) {
            alert('No tienes suficiente saldo.');
            return;
        }

        if (localStorage.getItem('isLoggedIn') !== 'true') {
            alert('Debes iniciar sesión para apostar.');
            window.location.href = 'loginApuesta.html';
            return;
        }

        // GUARDAR APUESTA PENDIENTE
        guardarApuesta(seleccionActual, cantidad, partido);
    });
}

function guardarApuesta(seleccion, cantidad, partido) {
    const btnApostar = document.querySelector('.trade-btn');
    btnApostar.disabled = true;
    btnApostar.textContent = 'Registrando apuesta...';

    // Reducir saldo inmediatamente
    const saldoActual = window.obtenerSaldo();
    window.actualizarSaldo(saldoActual - cantidad);

    const nuevaApuesta = {
        id: Date.now(),
        matchId: partido.id,
        leagueKey: partido.leagueKey,
        week: partido.week,
        matchKey: partido.matchKey,
        equipo1: partido.equipo1,
        equipo2: partido.equipo2,
        eleccion: seleccion.nombre,
        cuota: seleccion.cuota,
        importe: cantidad,
        estado: 'pendiente',
        timestamp: new Date().toISOString()
    };

    const apuestasRaw = localStorage.getItem('furboBet_bets');
    const apuestas = apuestasRaw ? JSON.parse(apuestasRaw) : [];
    apuestas.push(nuevaApuesta);
    localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));

    setTimeout(() => {
        alert(`¡Apuesta registrada con éxito! Deberás simular el partido en Omar para ver el resultado.`);
        window.location.href = '../index.html';
    }, 1000);
}
