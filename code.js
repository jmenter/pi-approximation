var diameter, radius, canvas, context;
let pointsToAddCount = 5000;
var innerCount = 0;
var totalCount = 0;
var isDrawing = false;

function draw() {
    totalCount += pointsToAddCount;
    randomPoints(pointsToAddCount).forEach(point => {
        if (Math.sqrt((point.x * point.x) + (point.y * point.y)) < radius) {
            context.fillStyle = "#ff0000";
            innerCount++;
        } else {
            context.fillStyle = "#000000";
        }
        context.fillRect(point.x + radius - 0.5, point.y + radius - 0.5, 1, 1);
    });

    document.getElementById("results").innerText =
        " pi approximation: " + (innerCount / totalCount * 4);
    isDrawing ? window.requestAnimationFrame(draw) : null;
}

function randomPoints(count) {
    return new Array(count).fill(0).map(() => {
        return {
            x: (Math.random() * diameter) - radius, y: (Math.random() * diameter) - radius
        };
    });
}

function goClick() {
    isDrawing = !isDrawing;
    document.getElementById("button").innerText = isDrawing ? "stop" : "begin";
    isDrawing ? draw() : null;
}

function resetCanvas() {
    diameter = parseFloat(document.getElementById("diameter").value);
    canvas = document.getElementById("sandbox");
    canvas.width = diameter;
    canvas.height = diameter;
    radius = diameter / 2;

    context = canvas.getContext("2d");
    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, diameter, diameter);
    context.fillStyle = "#777777";
    context.fillRect(0, radius, diameter, 1);
    context.fillRect(radius, 0, 1, diameter);
}