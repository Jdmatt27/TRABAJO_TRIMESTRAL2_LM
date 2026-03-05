
window.CONFIG = { equipos: {}, ligas: {} };

// IMÁGENES POR DEFECTO EN CASO QUE NO SE ENCUENTREN LAS ACTUALES
const DEFAULT_LOGO = 'https://crests.football-data.org/65.png'; // Logo genérico
const DEFAULT_STADIUM = 'https://www.thesportsdb.com/images/media/team/stadium/1v67tu1550917228.jpg';

async function loadConfig() {
    try {
        const isSubFolder = window.location.pathname.includes('/html/');
        const path = isSubFolder ? '../js/data.json' : 'js/data.json';
        const response = await fetch(path);
        const data = await response.json();
        window.CONFIG = data;
        window.LIGAS_CONFIG = data.ligas;

        validarApuestasGlobal();
        
        document.dispatchEvent(new CustomEvent('configReady'));
    } catch (error) {
        console.error("Error cargando configuración:", error);
    }
}

// --- SISTEMA DE NOTIFICACIONES (TOAST) ---
window.showToast = (content, type = 'error', isHTML = false) => {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    if (isHTML) {
        toast.innerHTML = content;
    } else {
        toast.textContent = content;
    }

    toast.className = `toast ${type === 'success' ? 'toast--success' : ''} show`;

    // Auto-ocultar después de un tiempo
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
};

// --- VALIDACIÓN GLOBAL DE APUESTAS ---
function validarApuestasGlobal() {
    const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
    let procesadas = 0, premioTotal = 0;
    let resultadosDetallados = [];

    apuestas.forEach(a => {
        if (a.estado === 'pendiente') {
            const histRaw = localStorage.getItem(`frontera_${a.leagueKey}_historial`);
            if (histRaw) {
                const historial = JSON.parse(histRaw);
                const res = historial.find(h => 
                    (String(h.homeIdx) === String(a.matchKey.split('-')[0]) && String(h.awayIdx) === String(a.matchKey.split('-')[1])) ||
                    (h.equipoLocal === a.equipo1 && h.equipoVisitante === a.equipo2)
                );

                if (res) {
                    procesadas++;
                    let ganador = 'Empate';
                    if (res.homeG > res.awayG) ganador = a.equipo1;
                    else if (res.awayG > res.homeG) ganador = a.equipo2;
                    
                    const gano = a.eleccion === ganador;

                    if (gano) {
                        a.estado = 'ganada';
                        const premio = (a.importe * a.cuota);
                        premioTotal += premio;
                        resultadosDetallados.push({ ...a, res, gano: true, premio });
                    } else {
                        a.estado = 'perdida';
                        resultadosDetallados.push({ ...a, res, gano: false });
                    }
                }
            }
        }
    });

    if (procesadas > 0) {
        localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));
        if (premioTotal > 0) window.actualizarSaldo(window.obtenerSaldo() + premioTotal);

        // Mostrar un Toast rico para cada resultado (o el más importante)
        resultadosDetallados.forEach((rd, index) => {
            setTimeout(() => {
                const hData = window.getEquipoData(rd.equipo1);
                const aData = window.getEquipoData(rd.equipo2);

                const toastHTML = `
                    <div class="toast__header">
                        <span>Resultado Final</span>
                        <span style="color:${rd.gano ? '#22c55e' : '#fb7185'}">${rd.gano ? '¡GANASTE!' : 'PERDIDA'}</span>
                    </div>
                    <div class="toast__match">
                        <div class="toast__team">
                            <img src="${hData.logo}" class="toast__logo">
                            <span class="toast__name">${rd.equipo1}</span>
                        </div>
                        <div class="toast__score">${rd.res.homeG} - ${rd.res.awayG}</div>
                        <div class="toast__team">
                            <img src="${aData.logo}" class="toast__logo">
                            <span class="toast__name">${rd.equipo2}</span>
                        </div>
                    </div>
                    <div class="toast__footer" style="color:${rd.gano ? '#22c55e' : 'inherit'}">
                        ${rd.gano ? `+${rd.premio.toFixed(2)}€ acreditados` : `Apuesta a ${rd.eleccion} fallida`}
                    </div>
                `;
                window.showToast(toastHTML, rd.gano ? 'success' : 'error', true);
            }, index * 5000); // Espaciar los toasts si hay varios
        });

        document.dispatchEvent(new CustomEvent('betsUpdated'));
    }
}
// 
window.imgError = (el) => {
    el.onerror = null; // Evitar bucle infinito
    el.src = DEFAULT_LOGO;
};

window.getEquipoData = (nombre) => window.CONFIG.equipos[nombre] || window.CONFIG.equipos['Default'];

// GESTIÓN DEL TEMA CLARO Y OSCURRO
function initTheme() {
    const body = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// GESTIÓN DE SALDO
window.obtenerSaldo = () => parseFloat(localStorage.getItem('saldo') || '0');
window.actualizarSaldo = (nuevoSaldo) => {
    localStorage.setItem('saldo', String(nuevoSaldo));
    document.querySelectorAll('.nav__link--saldo-usuario, .saldo-usuario').forEach(el => {
        el.textContent = Number(nuevoSaldo).toFixed(2) + ' €';
    });
};

// GESTIÓN DE SESIÓN
function initSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const headerRight = document.querySelector('.header__right');
    const navLinks = document.querySelector('.nav');
    
    // Detectar si estamos en la raíz o en /html/
    const isSubFolder = window.location.pathname.includes('/html/');
    const prefix = isSubFolder ? '' : 'html/';
    const rootPrefix = isSubFolder ? '../' : '';

    if (isLoggedIn) {
        if (headerRight) {
            headerRight.innerHTML = '<button class="btn" id="logoutBtn">Cerrar Sesión</button>';
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userEmail');
                    window.location.href = `${rootPrefix}index.html`;
                });
            }
        }
        
        // Inyectar Mi Cuenta siempre, pero el Saldo en las páginas de apuestas
        if (navLinks) {
            const hasProfile = navLinks.querySelector(`[href*="perfilApuesta.html"]`);
            if (!hasProfile) {
                navLinks.insertAdjacentHTML('beforeend', `<a class="nav__link" href="${prefix}perfilApuesta.html">Mi Cuenta</a>`);
            }
            
            const hasSaldo = navLinks.querySelector('.nav__link--saldo-usuario');
            if (!hasSaldo) {
                // Decodificamos el path para evitar problemas con la 'á' de páginaCuotasApuesta
                const decodedPath = decodeURIComponent(window.location.pathname);
                const isApuestaPage = decodedPath.includes('indexApuesta.html') || 
                                    decodedPath.includes('páginaCuotasApuesta.html');
                if (isApuestaPage) {
                    navLinks.insertAdjacentHTML('beforeend', `<a class="nav__link--saldo-usuario" href="${prefix}añadirSaldoApuesta.html">0,00 €</a>`);
                }
            }
        }
        
        const emailDisplay = document.getElementById('uEmail');
        if (emailDisplay) emailDisplay.textContent = localStorage.getItem('userEmail');
    }
    window.actualizarSaldo(window.obtenerSaldo());
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSession();
    loadConfig();
});
