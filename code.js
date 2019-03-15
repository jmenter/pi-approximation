let POINTS_TO_ADD = 5000;

var diameter, radius, canvas, context, scaledDiameter;
var innerCount = 0;
var totalCount = 0;
var isDrawing = false;

function resetCanvas() {
    var scale = window.devicePixelRatio;
    diameter = parseFloat(document.getElementById("diameter").value);
    scaledDiameter = diameter * scale;
    canvas = document.getElementById("sandbox");
    canvas.style.width = diameter + "px";
    canvas.style.height = diameter + "px";
    canvas.width = scaledDiameter;
    canvas.height = scaledDiameter;
    radius = scaledDiameter / 2;

    context = canvas.getContext("2d");
    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, scaledDiameter, scaledDiameter);
    context.fillStyle = "#777777";
    context.fillRect(0, radius, scaledDiameter, 1 * scale);
    context.fillRect(radius, 0, 1 * scale, scaledDiameter);
}

function goWasClicked() {
    isDrawing = !isDrawing;
    document.getElementById("button").innerText = isDrawing ? "stop" : "begin";
    isDrawing ? draw() : null;
}

function draw() {
    randomPoints(POINTS_TO_ADD).forEach(point => {
        if (pointIsInRadius(point, radius)) {
            context.fillStyle = "#ff0000";
            innerCount++;
        } else {
            context.fillStyle = "#000000";
        }
        context.fillRect(point.x + radius - 0.5, point.y + radius - 0.5, 1, 1);
    });
    totalCount += POINTS_TO_ADD;

    document.getElementById("results").innerText =
        " pi approximation: " + (innerCount / totalCount * 4);
    window.requestAnimationFrame(isDrawing ? draw : null);
}

function randomPoints(count) {
    return new Array(count).fill(0).map(() => randomPoint());
}

function randomPoint() {
    return {
        x: (Math.random() * scaledDiameter) - radius,
        y: (Math.random() * scaledDiameter) - radius
    }
}

function pointIsInRadius(point, radius) {
    return Math.sqrt((point.x * point.x) + (point.y * point.y)) < radius;
}

