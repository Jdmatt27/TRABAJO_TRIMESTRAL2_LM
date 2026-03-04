document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleccionamos los elementos de tu HTML
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const toast = document.getElementById('toast');

    // 2. Función para mostrar la alerta roja flotante
    function showToast(message) {
        toast.textContent = message; 
        toast.classList.add('show'); // Añade la clase que lo hace visible
        
        // Quita la alerta automáticamente a los 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 3. Escuchamos cuando pulsas el botón "Iniciar sesión"
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // IMPORTANTE: Evita que la página se recargue en blanco

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Guardamos el texto original del botón y ponemos modo "Cargando"
        const originalText = loginBtn.textContent;
        const initialWidth = loginBtn.offsetWidth; // Get current width
        loginBtn.style.minWidth = `${initialWidth}px`; // Set as min-width
        loginBtn.classList.add('btn--loading');
        loginBtn.textContent = 'Verificando...';

        // 4. Simulamos que el sistema piensa (espera 1.5 segundos)
        setTimeout(() => {
            
            // --- AQUÍ COMPROBAMOS EL USUARIO Y CONTRASEÑA ---
            if (email === 'admin@furbo.com' && password === '1234') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);

                loginBtn.textContent = '¡Entrando!';
                loginBtn.style.background = '#22c55e';
                showToast('¡Bienvenido de nuevo!', 'success');
                
                setTimeout(() => {
                    window.location.href = '../indexApuesta.html'; 
                }, 1000);

            } else {
                window.showToast('❌ Correo o contraseña incorrectos');
                loginBtn.classList.remove('btn--loading');
                loginBtn.textContent = originalText;
            }
        }, 1500);
    });
});