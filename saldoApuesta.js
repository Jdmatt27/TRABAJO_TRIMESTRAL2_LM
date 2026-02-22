    document.addEventListener('DOMContentLoaded', function() {
        if (window.actualizarSaldo) window.actualizarSaldo(window.obtenerSaldo());
    });
    
    function selectMethod(el) {
            document.querySelectorAll('.payment-option').forEach(d => d.classList.remove('active'));
            el.classList.add('active');
        }
        function addAmount(val) {
            document.getElementById('depositAmount').value = val;
        }

        // Manejar el formulario de depósito
        document.addEventListener('DOMContentLoaded', function() {
            // Mostrar saldo actual
            if (window.actualizarSaldo) window.actualizarSaldo(window.obtenerSaldo());

            const depositForm = document.getElementById('depositForm');
            if (depositForm) {
                depositForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const input = document.getElementById('depositAmount');
                    let cantidad = parseFloat(input.value);
                    if (isNaN(cantidad) || cantidad < 5) {
                        alert('El importe mínimo es 5€');
                        return;
                    }
                    let saldoActual = window.obtenerSaldo();
                    let nuevoSaldo = saldoActual + cantidad;
                    window.actualizarSaldo(nuevoSaldo);
                    input.value = '';
                    alert('Saldo añadido correctamente.');
                });
            }
        });