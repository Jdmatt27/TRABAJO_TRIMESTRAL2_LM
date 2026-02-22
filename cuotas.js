document.addEventListener('DOMContentLoaded', () => {
    const partidoJson = sessionStorage.getItem('partidoSeleccionado');
    if (!partidoJson) {
        window.location.href = 'indexApuesta.html';
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

    const descripcionesTenis = [
        `Duelo de raquetas en la cumbre. ${partido.equipo1} y ${partido.equipo2} se enfrentan por el pase a la gran final en un partido que se decidirá por pequeños detalles.`,
        `La superficie rápida favorece el potente servicio de ${partido.equipo1}, pero la resistencia física de ${partido.equipo2} será la clave de este emocionante encuentro.`,
        `Dos de las mejores raquetas del mundo frente a frente. La tensión se nota en el ambiente de la pista central mientras las jugadoras calientan.`,
        `Un choque de estilos donde la técnica se impone a la fuerza bruta. ¿Quién logrará dominar el fondo de la pista en este ${partido.liga}?`
    ];

    const lista = partido.deporte === 'Fútbol' ? descripcionesFutbol : descripcionesTenis;
    return lista[Math.floor(Math.random() * lista.length)];
}

function renderizarDetallesPartido(partido) {
    const card = document.querySelector('.match__card--cuotas');
    const isFutbol = partido.deporte === 'Fútbol';

    // Generar mercados dinámicos (Empate solo si es fútbol)
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
                    <span class="badge">🏆 ${partido.liga}</span>
                    <span class="pill">${partido.estado}</span>
                </div>

                <div class="match__teams">
                    <div class="team">
                        ${isFutbol && partido.logo1 ? `<img src="${partido.logo1}" class="team__logo">` : ''}
                        <span class="team__name">${partido.equipo1}</span>
                    </div>

                    <div class="match__time">
                        <span class="time__big">${partido.hora}</span>
                        <span class="date__small">${partido.fecha}</span>
                    </div>

                    <div class="team">
                        ${isFutbol && partido.logo2 ? `<img src="${partido.logo2}" class="team__logo">` : ''}
                        <span class="team__name">${partido.equipo2}</span>
                    </div>
                </div>
            </div>

            <div class="match__markets--big" style="grid-template-columns: repeat(${isFutbol ? 3 : 2}, 1fr);">
                ${marketsHTML}
            </div>
        `;
    }

    // Actualizar el hero y descripción
    const heroTitle = document.querySelector('.hero__title');
    const heroText = document.querySelector('.hero__text');
    if (heroTitle) heroTitle.textContent = `${partido.equipo1} VS ${partido.equipo2}`;
    if (heroText) heroText.textContent = generarDescripcionAleatoria(partido);
}

let seleccionActual = null;

function configurarEventosApuesta(partido) {
    const botonesMercado = document.querySelectorAll('.market__btn');
    const inputCantidad = document.querySelector('.amount-input');
    const btnApostar = document.querySelector('.trade-btn');
    const quickBtns = document.querySelectorAll('.q-btn');

    botonesMercado.forEach(btn => {
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            
            // Primero quitamos el estado activo de todos los botones
            botonesMercado.forEach(b => b.classList.remove('active'));
            
            if (wasActive) {
                // Si ya estaba activo, deseleccionamos todo
                seleccionActual = null;
            } else {
                // Si no estaba activo, lo seleccionamos
                btn.classList.add('active');
                seleccionActual = {
                    nombre: btn.dataset.nombre,
                    cuota: parseFloat(btn.dataset.cuota)
                };
            }
        });
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let currentVal = parseFloat(inputCantidad.value) || 0;
            if (btn.textContent.includes('+1')) inputCantidad.value = currentVal + 1;
            if (btn.textContent.includes('+20')) inputCantidad.value = currentVal + 20;
            if (btn.textContent.includes('+100')) inputCantidad.value = currentVal + 100;
            if (btn.textContent === 'Max') inputCantidad.value = window.obtenerSaldo();
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

        const nuevoSaldo = saldoActual - cantidad;
        window.actualizarSaldo(nuevoSaldo);
        resolverApuesta(seleccionActual, cantidad, partido);
    });
}

function resolverApuesta(seleccion, cantidad, partido) {
    const btnApostar = document.querySelector('.trade-btn');
    btnApostar.disabled = true;
    btnApostar.textContent = 'Procesando...';

    setTimeout(() => {
        const opciones = [partido.equipo1, partido.equipo2];
        if (partido.deporte === 'Fútbol') opciones.push('Empate');
        
        const resultadoGanador = opciones[Math.floor(Math.random() * opciones.length)];
        const gano = seleccion.nombre === resultadoGanador;
        
        if (gano) {
            const premio = cantidad * seleccion.cuota;
            const nuevoSaldo = window.obtenerSaldo() + premio;
            window.actualizarSaldo(nuevoSaldo);
            alert(`¡ENHORABUENA! El resultado fue ${resultadoGanador}. Has ganado ${premio.toFixed(2)}€`);
        } else {
            alert(`Lo sentimos, el resultado fue ${resultadoGanador}. Has perdido tu apuesta de ${cantidad.toFixed(2)}€`);
        }

        btnApostar.disabled = false;
        btnApostar.textContent = 'Apostar';
        document.querySelector('.amount-input').value = '';
    }, 2000);
}
