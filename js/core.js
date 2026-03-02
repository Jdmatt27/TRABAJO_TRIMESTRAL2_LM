/**
 * core.js - El "Cerebro" Global de FurboBet
 */

window.CONFIG = { equipos: {}, ligas: {} };

// Fallbacks de imágenes por defecto
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
        
        // Una vez cargada la config, validamos apuestas automáticamente
        validarApuestasGlobal();
        
        document.dispatchEvent(new CustomEvent('configReady'));
    } catch (error) {
        console.error("Error cargando configuración:", error);
    }
}

// --- VALIDACIÓN GLOBAL DE APUESTAS ---
function validarApuestasGlobal() {
    const apuestas = JSON.parse(localStorage.getItem('furboBet_bets') || '[]');
    let procesadas = 0, premioTotal = 0;

    apuestas.forEach(a => {
        if (a.estado === 'pendiente') {
            // Intentamos buscar el resultado en el historial de Omar
            const histRaw = localStorage.getItem(`frontera_${a.leagueKey}_historial`);
            if (histRaw) {
                const historial = JSON.parse(histRaw);
                const res = historial.find(h => 
                    (h.homeIdx === a.matchKey.split('-')[0]*1 && h.awayIdx === a.matchKey.split('-')[1]*1) ||
                    (h.equipoLocal === a.equipo1 && h.equipoVisitante === a.equipo2)
                );

                if (res) {
                    procesadas++;
                    const ganador = res.homeG > res.awayG ? a.equipo1 : (res.awayG > res.homeG ? a.equipo2 : 'Empate');
                    if (a.eleccion === ganador) {
                        a.estado = 'ganada';
                        premioTotal += (a.importe * a.cuota);
                    } else {
                        a.estado = 'perdida';
                    }
                }
            }
        }
    });

    if (procesadas > 0) {
        localStorage.setItem('furboBet_bets', JSON.stringify(apuestas));
        if (premioTotal > 0) {
            window.actualizarSaldo(window.obtenerSaldo() + premioTotal);
            console.log(`[FurboBet] ¡Has ganado ${premioTotal.toFixed(2)}€ en apuestas recientes!`);
        }
        // Notificar a otras páginas (como perfil) que los datos han cambiado
        document.dispatchEvent(new CustomEvent('betsUpdated'));
    }
}

// --- MANEJO DE IMÁGENES (FALLBACKS) ---
window.imgError = (el) => {
    el.onerror = null; // Evitar bucle infinito
    el.src = DEFAULT_LOGO;
};

window.getEquipoData = (nombre) => window.CONFIG.equipos[nombre] || window.CONFIG.equipos['Default'];

// --- GESTIÓN DE TEMA ---
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

// --- GESTIÓN DE SALDO ---
window.obtenerSaldo = () => parseFloat(localStorage.getItem('saldo') || '0');
window.actualizarSaldo = (nuevoSaldo) => {
    localStorage.setItem('saldo', String(nuevoSaldo));
    document.querySelectorAll('.nav__link--saldo-usuario, .saldo-usuario').forEach(el => {
        el.textContent = Number(nuevoSaldo).toFixed(2) + ' €';
    });
};

// --- GESTIÓN DE SESIÓN ---
function initSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const headerRight = document.querySelector('.header__right');
    const navLinks = document.querySelector('.nav');
    const isSubFolder = window.location.pathname.includes('/html/');
    const prefix = isSubFolder ? '' : 'html/';
    const rootPrefix = isSubFolder ? '../' : '';

    if (isLoggedIn) {
        if (headerRight) {
            headerRight.innerHTML = '<button class="btn" id="logoutBtn">Cerrar Sesión</button>';
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                window.location.href = `${rootPrefix}index.html`;
            });
        }
        if (navLinks && !navLinks.querySelector(`[href*="perfilApuesta.html"]`)) {
            navLinks.insertAdjacentHTML('beforeend', `<a class="nav__link" href="${prefix}perfilApuesta.html">Mi Cuenta</a>`);
            navLinks.insertAdjacentHTML('beforeend', `<a class="nav__link--saldo-usuario" href="${prefix}añadirSaldoApuesta.html">0,00€</a>`);
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
