const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve));
}

// Función recursiva para registrar el consumo
async function registrarConsumo(cantidad, contador, total, elevados) {

    if (contador === cantidad) {
        return { total, elevados };
    }

    const entrada = await preguntar(`Ingrese el consumo del equipo ${contador + 1} (kWh): `);
    const consumo = parseFloat(entrada);

    if (entrada.trim() === '' || isNaN(consumo) || consumo < 0) {
        console.log('Error: ingrese un consumo numérico válido.');
        return registrarConsumo(cantidad, contador, total, elevados);
    }

    total += consumo;

    if (consumo > 15) {
        console.log('¡ALERTA! Este equipo presenta un consumo elevado.');
        elevados++;
    }

    return registrarConsumo(cantidad, contador + 1, total, elevados);
}

// Programa principal
async function principal() {

    const entrada = await preguntar('¿Cuántos equipos desea registrar?: ');
    const cantidad = Number(entrada);

    if (entrada.trim() === '' || !Number.isInteger(cantidad) || cantidad <= 0) {
        console.log('Error: ingrese una cantidad de equipos mayor a 0.');
        rl.close();
        return;
    }

    const resultado = await registrarConsumo(cantidad, 0, 0, 0);

    console.log('\n===== REPORTE DE CONSUMO ELÉCTRICO =====');
    console.log(`Cantidad de equipos registrados: ${cantidad}`);
    console.log(`Consumo total: ${resultado.total.toFixed(2)} kWh`);
    console.log(`Equipos con consumo elevado: ${resultado.elevados}`);
    console.log('========================================');

    rl.close();
}

principal();
