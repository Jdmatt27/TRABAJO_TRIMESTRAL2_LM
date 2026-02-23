// Datos de ejemplo de partidos
const partidosData = [
    {
        id: 1,
        deporte: "Fútbol",
        liga: "Copa del Rey",
        estado: "En directo",
        equipo1: "Atl. Madrid",
        equipo2: "FC Barcelona",
        logo1: "https://upload.wikimedia.org/wikipedia/an/thumb/f/f4/Atletico_Madrid_2017_logo.svg/330px-Atletico_Madrid_2017_logo.svg.png",
        logo2: "https://upload.wikimedia.org/wikipedia/sco/thumb/4/47/FC_Barcelona_%28crest%29.svg/1280px-FC_Barcelona_%28crest%29.svg.png",
        hora: "21:00",
        fecha: "12 Feb",
        fondo: "https://platform.barcablaugranes.com/wp-content/uploads/sites/21/chorus/uploads/chorus_asset/file/25914626/2205436063.jpg?quality=90&strip=all&crop=0%2C0%2C100%2C95.177240225164&w=2400"
    },
    {
        id: 2,
        deporte: "Fútbol",
        liga: "La Liga",
        estado: "Próximamente",
        equipo1: "Real Madrid",
        equipo2: "Sevilla FC",
        logo1: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
        logo2: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png",
        hora: "18:30",
        fecha: "13 Feb",
        fondo: "https://img.asmedia.epimg.net/resizer/v2/LALIGA_EA_SPORTS_MADRID_-_SEVILLA_G9V7P4_3.jpg?auth=96b72944b7d14e0f6c2c628e930f9a2e6e14d115e8e8e3d6e3e3e3e3e3e3e3e&width=1200&height=675&smart=true"
    },
    {
        id: 3,
        deporte: "Fútbol",
        liga: "Premier League",
        estado: "Próximamente",
        equipo1: "Man. City",
        equipo2: "Arsenal",
        logo1: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
        logo2: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
        hora: "17:00",
        fecha: "14 Feb",
        fondo: "https://i.guim.co.uk/img/media/e14197e4293f946e3e78f9f06f9d479103e67c0c/0_148_4434_2661/master/4434.jpg?width=1200&height=675&quality=85&auto=format&fit=crop&s=4e4e9f7e3c9e8d4e4e4e4e4e4e4e4e4e"
    }
];

function generarCuotaAleatoria() {
    return (Math.random() * (5.00 - 1.10) + 1.10).toFixed(2);
}

function renderizarPartidos() {
    const grid = document.querySelector('.matches__grid');
    const heroCard = document.querySelector('.hero__card');
    const heroSection = document.querySelector('.hero');
    const matchDia = document.querySelector('#matchSeleccionadoDia'); // La tarjeta grande al final
    
    if (grid) {
        grid.innerHTML = '';
        partidosData.forEach(partido => {
            const cuota1 = generarCuotaAleatoria();
            const cuotaEmpate = generarCuotaAleatoria();
            const cuota2 = generarCuotaAleatoria();

            const card = document.createElement('article');
            card.className = 'match__card';
            card.innerHTML = `
                <div class="match__header" style="background-image: url('${partido.fondo}');">
                    <div class="match__overlay"></div>
                    <div class="match__top">
                        <span class="badge">🏆 ${partido.liga}</span>
                        <span class="pill">${partido.estado}</span>
                    </div>

                    <div class="match__teams">
                        <div class="team">
                            <img src="${partido.logo1}" alt="${partido.equipo1}" class="team__logo">
                            <span class="team__name">${partido.equipo1}</span>
                        </div>

                        <div class="match__time">
                            <span class="time__big">${partido.hora}</span>
                            <span class="date__small">${partido.fecha}</span>
                        </div>

                        <div class="team">
                            <img src="${partido.logo2}" alt="${partido.equipo2}" class="team__logo">
                            <span class="team__name">${partido.equipo2}</span>
                        </div>
                    </div>
                </div>

                <div class="match__markets">
                    <button class="market__btn" style="--percent: 33%;">
                        <span class="market__name">${partido.equipo1}</span>
                        <span class="market__odds">${cuota1}</span>
                    </button>

                    <button class="market__btn" style="--percent: 33%;">
                        <span class="market__name">Empate</span>
                        <span class="market__odds">${cuotaEmpate}</span>
                    </button>

                    <button class="market__btn" style="--percent: 33%;">
                        <span class="market__name">${partido.equipo2}</span>
                        <span class="market__odds">${cuota2}</span>
                    </button>
                </div>
            `;

            card.addEventListener('click', () => {
                const partidoSeleccionado = { ...partido, cuota1, cuotaEmpate, cuota2 };
                sessionStorage.setItem('partidoSeleccionado', JSON.stringify(partidoSeleccionado));
                window.location.href = 'páginaCuotasApuesta.html';
            });

            grid.appendChild(card);
        });
    }

    // Tarjeta grande de tenis (abajo)
    if (matchDia) {
        matchDia.style.cursor = 'pointer';
        matchDia.addEventListener('click', () => {
            const partidoSeleccionado = {
                id: 100,
                deporte: "Tenis",
                liga: "WTA",
                estado: "En directo",
                equipo1: "Aryna Sabalenka",
                equipo2: "Iga Swiatek",
                logo1: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aryna_Sabalenka_Logo.png/640px-Aryna_Sabalenka_Logo.png", // Placeholder o logo real si existe
                logo2: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Iga_Swiatek_logo.png/640px-Iga_Swiatek_logo.png",
                fondo: "https://i.guim.co.uk/img/media/2a5a0a94ecf2db5c9975703e0f3a5cff06b44508/0_201_5624_3375/master/5624.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=1b2207265c5445db251467d68a5e8403",
                hora: "21:00",
                fecha: "12 Feb",
                cuota1: "2.75",
                cuota2: "2.20"
            };
            sessionStorage.setItem('partidoSeleccionado', JSON.stringify(partidoSeleccionado));
            window.location.href = 'páginaCuotasApuesta.html';
        });
    }

    if (heroSection) {
        // Redirigir al hacer clic en el hero (excepto si se hace clic en botones de apuesta o inputs)
        heroSection.addEventListener('click', (e) => {
            if (e.target.closest('.hero__card') || e.target.closest('button') || e.target.closest('input')) {
                return;
            }

            const partidoSeleccionado = {
                id: 99,
                deporte: "Fútbol",
                liga: "La Liga",
                estado: "En directo",
                equipo1: "Real Madrid",
                equipo2: "Atlético de Madrid",
                logo1: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
                logo2: "https://upload.wikimedia.org/wikipedia/an/thumb/f/f4/Atletico_Madrid_2017_logo.svg/330px-Atletico_Madrid_2017_logo.svg.png",
                fondo: "https://img.asmedia.epimg.net/resizer/v2/LALIGA_EA_SPORTS_MADRID_-_SEVILLA_G9V7P4_3.jpg?auth=96b72944b7d14e0f6c2c628e930f9a2e6e14d115e8e8e3d6e3e3e3e3e3e3e3e&width=1200&height=675&smart=true",
                hora: "21:00",
                fecha: "Hoy",
                cuota1: "2.25",
                cuotaEmpate: "3.40",
                cuota2: "2.45"
            };
            sessionStorage.setItem('partidoSeleccionado', JSON.stringify(partidoSeleccionado));
            window.location.href = 'páginaCuotasApuesta.html';
        });
    }

    // Apuesta rápida
    if (heroCard && (window.location.pathname.includes('indexApuesta.html') || window.location.pathname.endsWith('/'))) {
        const outcomeBtnYes = heroCard.querySelector('.outcome-btn--yes');
        const outcomeBtnNo = heroCard.querySelector('.outcome-btn--no');
        const btnApostar = heroCard.querySelector('.trade-btn');
        const inputCantidad = heroCard.querySelector('.amount-input');
        const quickBtns = heroCard.querySelectorAll('.q-btn');
        let seleccionRapida = null;

        if (outcomeBtnYes && outcomeBtnNo) {
            outcomeBtnYes.addEventListener('click', (e) => {
                e.stopPropagation();
                outcomeBtnYes.style.background = "#22c55e";
                outcomeBtnNo.style.background = "var(--panel2)";
                seleccionRapida = { nombre: "Gana Atleti", cuota: 2.45 };
            });
            outcomeBtnNo.addEventListener('click', (e) => {
                e.stopPropagation();
                outcomeBtnNo.style.background = "#22c55e";
                outcomeBtnYes.style.background = "var(--panel2)";
                seleccionRapida = { nombre: "Gana Madrid", cuota: 2.25 };
            });
        }

        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let currentVal = parseFloat(inputCantidad.value) || 0;
                if (btn.textContent.includes('+1')) inputCantidad.value = currentVal + 1;
                if (btn.textContent.includes('+20')) inputCantidad.value = currentVal + 20;
                if (btn.textContent.includes('+100')) inputCantidad.value = currentVal + 100;
                if (btn.textContent === 'Max') inputCantidad.value = window.obtenerSaldo();
            });
        });

        if (btnApostar) {
            btnApostar.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!seleccionRapida) return alert('Selecciona un ganador.');
                const cantidad = parseFloat(inputCantidad.value);
                const saldoActual = window.obtenerSaldo();
                if (isNaN(cantidad) || cantidad <= 0 || cantidad > saldoActual) return alert('Error en saldo o cantidad.');
                if (localStorage.getItem('isLoggedIn') !== 'true') return alert('Inicia sesión.');

                window.actualizarSaldo(saldoActual - cantidad);
                btnApostar.disabled = true;
                btnApostar.textContent = "Procesando...";
                setTimeout(() => {
                    const gano = Math.random() > 0.5;
                    if (gano) {
                        const premio = cantidad * seleccionRapida.cuota;
                        window.actualizarSaldo(window.obtenerSaldo() + premio);
                        alert(`¡Ganas ${premio.toFixed(2)}€!`);
                    } else alert(`Has perdido.`);
                    btnApostar.disabled = false;
                    btnApostar.textContent = "Apostar";
                    inputCantidad.value = "";
                }, 1500);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', renderizarPartidos);
