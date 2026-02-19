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
    // Actualiza todos los elementos con la clase 'saldo-usuario'
    document.querySelectorAll('.saldo-usuario').forEach(el => {
        el.textContent = Number(nuevoSaldo).toFixed(2) + ' €';
    });
};

// Al cargar, actualiza los saldos visibles
window.addEventListener('DOMContentLoaded', () => {
    window.actualizarSaldo(window.obtenerSaldo());
});
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const headerRight = document.querySelector('.header__right');
    const navLinks = document.querySelector('.nav');

    if (isLoggedIn === 'true') {
        // Usuario ha iniciado sesión

        // 1. Cambiar "Login" por "Cerrar Sesión"
        headerRight.innerHTML = '<button class="btn" id="logoutBtn">Cerrar Sesión</button>';
        
        // 2. Añadir enlace a "Mi Cuenta"
        const miCuentaLink = '<a class="nav__link" href="perfilApuesta.html">Mi Cuenta</a>';
        navLinks.insertAdjacentHTML('beforeend', miCuentaLink); // Lo añade al final de la nav

        const añadirSaldoLink = '<a class="nav__link" href="añadirSaldoApuesta.html">Añadir Saldo</a>';

        navLinks.insertAdjacentHTML('beforeend', añadirSaldoLink); 

        // 3. Funcionalidad del botón "Cerrar Sesión"
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn'); // Quitamos el "pase VIP"
            window.location.reload(); // Recargamos la página para que se actualice
        });

    } else {
        // Usuario NO ha iniciado sesión
        // No hacemos nada, porque el HTML por defecto ya muestra "Login"
    }
});