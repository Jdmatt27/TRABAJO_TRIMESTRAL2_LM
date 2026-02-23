// Inicializar saldo si no existe
if (localStorage.getItem('saldo') === null) {
    localStorage.setItem('saldo', '0');
}

// Función global para obtener el saldo
window.obtenerSaldo = function() {
    return parseFloat(localStorage.getItem('saldo') || '0');
};

// Función global para actualizar el saldo
window.actualizarSaldo = function(nuevoSaldo) {
    localStorage.setItem('saldo', String(nuevoSaldo));
    // Actualiza todos los elementos que deban mostrar el saldo
    document.querySelectorAll('.nav__link--saldo-usuario, .saldo-usuario').forEach(el => {
        el.textContent = Number(nuevoSaldo).toFixed(2) + ' €';
    });
};

// Al cargar, inicializar todo
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const headerRight = document.querySelector('.header__right');
    const navLinks = document.querySelector('.nav');

    // Detectar si estamos en una subcarpeta (html/)
    const isSubFolder = window.location.pathname.includes('/html/');
    const prefix = isSubFolder ? '' : 'html/';
    const rootPrefix = isSubFolder ? '../' : '';

    if (isLoggedIn === 'true') {
        // Usuario ha iniciado sesión

        // 1. Cambiar "Login" por "Cerrar Sesión"
        if (headerRight) {
            headerRight.innerHTML = '<button class="btn" id="logoutBtn">Cerrar Sesión</button>';
        }
        
        // 2. Añadir enlace a "Mi Cuenta"
        if (navLinks) {
            const miCuentaLink = `<a class="nav__link" href="${prefix}perfilApuesta.html">Mi Cuenta</a>`;
            navLinks.insertAdjacentHTML('beforeend', miCuentaLink);

            const saldoActual = `<a class="nav__link--saldo-usuario" href="${prefix}añadirSaldoApuesta.html">0,00€</a>`;
            navLinks.insertAdjacentHTML('beforeend', saldoActual);
        }

        // 3. Funcionalidad del botón "Cerrar Sesión"
        const logoutBtn = document.getElementById('logoutBtn');
        const logout = () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = `${rootPrefix}index.html`;
        };

        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        // También para el link de Cerrar Sesión en el perfil si existe
        const profileLogoutLink = document.querySelector('.menu-item.text-danger');
        if (profileLogoutLink) {
            profileLogoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    }

    // Actualiza los saldos visibles DESPUÉS de haber añadido el elemento si era necesario
    window.actualizarSaldo(window.obtenerSaldo());

    // Mostrar el email si estamos en la página de perfil
    const emailDisplay = document.getElementById('uEmail');
    const savedEmail = localStorage.getItem('userEmail');
    if (emailDisplay && savedEmail) {
        emailDisplay.textContent = savedEmail;
    }
});