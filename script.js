/**
 * Universidad Militar Nueva Granada - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Stefania Triana Rodriguez
 */
//canvas 
document.addEventListener("DOMContentLoaded", () => {
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//funcion para plotear un pixel en el canvas

function plotPixel(ctx, x, y, color = "#1a1a1a") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 3, 3);
}

//funcion para implementar un algorirmo de punto medio para la circunferencia  

function midpointCircle(cx, cy, r, color = "#1a1a1a") {
    let x = 0;
    let y = r;
    let p = 1 - r;

    //dibuja los puntos iniciales
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

//funcion para el algoritmo de Bresenham

function bresenhamLine(x0, y0, x1, y1, color = "#1a1a1a") {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        plotPixel(ctx, x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

/**
 * Retorna los centros donde se ubicarán los polígonos
 * @param {number} cx - Coordenada x del centro de la órbita
 * @param {number} cy - Coordenada y del centro de la órbita
 * @param {number} r - Radio de la órbita
 * @param {number} n - Cantidad de polígonos
 * @returns {Array} [{x, y}, ...]
 */

function getOrbitalPositions(cx, cy, r, n) {
    let positions = [];

    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n;

        positions.push({
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        });
    }

    return positions;
}
// Función para calcular los vértices de un polígono regular dado su centro, radio y cantidad de lados
function getPolygonVertices(cx, cy, radius, sides) {
    let vertices = [];

    for (let i = 0; i < sides; i++) {
        let angle = (2 * Math.PI * i) / sides;

        vertices.push({
            x: Math.round(cx + radius * Math.cos(angle)),
            y: Math.round(cy + radius * Math.sin(angle))
        });
    }

    return vertices;
}
// Función para dibujar un polígono dado sus vértices
function drawPolygon(vertices) {
    for (let i = 0; i < vertices.length; i++) {
        let next = (i + 1) % vertices.length;

        bresenhamLine(
            vertices[i].x,
            vertices[i].y,
            vertices[next].x,
            vertices[next].y
        );
    }
}
// Función principal para ejecutar el programa

function main() {
    const cx = 400;
    const cy = 300;

    const R = Math.floor(Math.random() * 100) + 150;
    const N = Math.floor(Math.random() * 7) + 4;
    const k = Math.floor(Math.random() * 5) + 3;

    midpointCircle(cx, cy, R, "#bbb");

    let centers = getOrbitalPositions(cx, cy, R, N);

    centers.forEach(c => {
        let vertices = getPolygonVertices(c.x, c.y, 30, k);
        drawPolygon(vertices);
    });
}
main();
}); 

//link de ia: https://chatgpt.com/c/69eba767-90e0-83e9-91c9-80867744f71c