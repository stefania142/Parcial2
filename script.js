/**
 * Universidad Militar Nueva Granada - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Stefania Triana Rodriguez
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function plotPixel(ctx, x, y, color = "#1a1a1a") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// prueba mínima
plotPixel(ctx, 400, 300, "red");
plotPixel(ctx, 401, 300, "red");
plotPixel(ctx, 400, 301, "red");

function midpointCircle(cx, cy, r, color = "#1a1a11") {
    let x = 0;
    let y = r;
    let p = 1 - r;

    function draw(x, y) {
        plotPixel(ctx, cx + x, cy + y, color);
        plotPixel(ctx, cx - x, cy + y, color);
        plotPixel(ctx, cx + x, cy - y, color);
        plotPixel(ctx, cx - x, cy - y, color);
        plotPixel(ctx, cx + y, cy + x, color);
        plotPixel(ctx, cx - y, cy + x, color);
        plotPixel(ctx, cx + y, cy - x, color);
        plotPixel(ctx, cx - y, cy - x, color);
    }

    while (x <= y) {
        draw(x, y);
        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}

// prueba
midpointCircle(400, 300, 150);