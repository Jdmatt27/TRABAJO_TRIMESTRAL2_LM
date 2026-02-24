// js/heroBet.js

let heroSelectedTeam = null;
let heroSelectedOdds = null;

function seleccionarMercadoHero(team, odds) {
    heroSelectedTeam = team;
    heroSelectedOdds = odds;
    
    // Visual feedback
    const buttons = document.querySelectorAll('.hero__card .outcome-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find the button that was clicked
    event.currentTarget.classList.add('active');
}

function addAmountHero(amount) {
    const input = document.getElementById('heroAmount');
    const current = parseFloat(input.value) || 0;
    input.value = current + amount;
}

function maxAmountHero() {
    const input = document.getElementById('heroAmount');
    if (window.obtenerSaldo) {
        input.value = window.obtenerSaldo();
    } else {
        input.value = 100; // Fallback
    }
}

function apostarHero() {
    if (!heroSelectedTeam) {
        alert('Por favor, selecciona un equipo para apostar.');
        return;
    }

    const input = document.getElementById('heroAmount');
    const amount = parseFloat(input.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, introduce una cantidad válida.');
        return;
    }

    if (window.obtenerSaldo && amount > window.obtenerSaldo()) {
        alert('Saldo insuficiente.');
        return;
    }

    // Realizar la apuesta
    if (window.actualizarSaldo) {
        const nuevoSaldo = window.obtenerSaldo() - amount;
        window.actualizarSaldo(nuevoSaldo);
        
        // Simular éxito
        alert(`¡Apuesta realizada con éxito!
Equipo: ${heroSelectedTeam}
Cantidad: ${amount}€
Cuota: ${heroSelectedOdds}
Ganancia potencial: ${(amount * heroSelectedOdds).toFixed(2)}€`);
        
        // Limpiar
        input.value = '';
        const buttons = document.querySelectorAll('.hero__card .outcome-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        heroSelectedTeam = null;
    } else {
        alert('Error: No se pudo acceder al sistema de saldo.');
    }
}