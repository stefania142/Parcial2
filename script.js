/**
 * Universidad Militar Nueva Granada - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Stefania Triana Rodriguez
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function plotPixel(ctx, x, y, color = "#000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// prueba mínima
plotPixel(ctx, 400, 300, "red");
plotPixel(ctx, 401, 300, "red");
plotPixel(ctx, 400, 301, "red");