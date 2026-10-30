const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve));
}

// Función recursiva para solicitar las calificaciones
async function solicitarCalificaciones(cantidad, contador, suma) {

    if (contador === cantidad) {
        return suma;
    }

    const entrada = await preguntar(`Ingrese la calificación ${contador + 1}: `);
    const nota = parseFloat(entrada);

    if (entrada.trim() === '' || isNaN(nota) || nota < 0 || nota > 10) {
        console.log('Error: la calificación debe estar entre 0 y 10.');
        return solicitarCalificaciones(cantidad, contador, suma);
    }

    suma += nota;

    return solicitarCalificaciones(cantidad, contador + 1, suma);
}

// Programa principal
async function principal() {

    const entrada = await preguntar('Ingrese la cantidad de evaluaciones: ');
    const cantidad = Number(entrada);

    if (entrada.trim() === '' || !Number.isInteger(cantidad) || cantidad <= 0) {
        console.log('Error: ingrese una cantidad válida mayor a 0.');
        rl.close();
        return;
    }

    const sumaTotal = await solicitarCalificaciones(cantidad, 0, 0);

    const promedio = sumaTotal / cantidad;

    console.log('\n===== RESULTADO ACADÉMICO =====');
    console.log(`Suma de calificaciones: ${sumaTotal.toFixed(2)}`);
    console.log(`Promedio final: ${promedio.toFixed(2)}`);

    if (promedio >= 6.0) {
        console.log('Estado: APROBADO');
    } else {
        console.log('Estado: REPROBADO');
    }

    console.log('================================');

    rl.close();
}

principal();
