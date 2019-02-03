var diameter, radius, canvas, context;
let pointsToAddCount = 5000;
var innerCount = 0;
var totalCount = 0;
var isDrawing = false;

function draw() {
    totalCount += pointsToAddCount;
    randomPoints(pointsToAddCount).forEach(point => {
        let distanceFromCenter = Math.sqrt((point.x * point.x) + (point.y * point.y));
        let isInside = distanceFromCenter < radius;
        if (isInside) {
            innerCount++;
        }
        context.fillStyle = isInside ? "#ff0000" : "#000000";
        context.fillRect(point.x + radius - 0.5, point.y + radius - 0.5, 1, 1);
    });

    document.getElementById("results").innerText =
        " pi approximation: " + (innerCount / totalCount * 4);
    if (isDrawing) {
        window.requestAnimationFrame(draw);
    }
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
    if (isDrawing) {
        draw();
    }
}

function resetCanvas() {
    diameter = parseFloat(document.getElementById("diameter").value);
    radius = diameter / 2;
    canvas = document.getElementById("sandbox");
    canvas.width = diameter;
    canvas.height = diameter;
    context = canvas.getContext("2d");

    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, diameter, diameter);
    context.fillStyle = "#777777";
    context.fillRect(0, radius, diameter, 1);
    context.fillRect(radius, 0, 1, diameter);
}