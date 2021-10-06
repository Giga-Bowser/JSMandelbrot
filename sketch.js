var xCenter = -0.5
var yCenter = 0
var zoom = 2
var img

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont('consolas');
	fill(255, 255, 255)
	textSize(16);
	noSmooth();
	colorMode(HSB);
	mandelbrot(xCenter, yCenter, zoom)
}

function mandelbrot(xPoint, yPoint, range) {
	img = createImage(windowWidth, windowHeight)
	const max = 250;
	const maxPeriod = Math.round(Math.sqrt(max))
	const black = color(0)
	const aspect = width / height
	const rangex = range * aspect
	img.loadPixels()
	for (py = 0; py < height; py++) {
		for (px = 0; px < width; px++) {
			var x0 = ((px / width) * rangex) + (xPoint - (rangex / 2));
			var y0 = ((py / height) * range) + (yPoint - (range / 2));
			var x = 0
			var y = 0
			var x2 = 0
			var y2 = 0
			var period = 0;
			var xold = 0;
			var yold = 0;
			for (i = 0; i < max && x2 + y2 <= 4; i++) {
				y = (x + x) * y + y0
				x = x2 - y2 + x0
				x2 = x * x
				y2 = y * y

				if (xold == x && yold == y) {
					i = max;
					break;
				}
				period++;
				if (period > maxPeriod) {
					period = 0;
					xold = x;
					yold = y;
				}
			}
			if (i == max) {
				img.set(px, py, black)
			} else {
				img.set(px, py, color(360 * i / max, 100, 100))
			}
		}
	}
	img.updatePixels();
	image(img, 0, 0)
}

function clicked() {
	xCenter = ((mouseX / width) * (zoom * width / height)) + (xCenter - ((zoom * width / height) / 2))
	yCenter = ((mouseY / height) * zoom) + (yCenter - (zoom / 2));
	if (mouseButton == "left") {
		zoom /= 2
	} else if (mouseButton == "right") {
		zoom *= 2
	}
	mandelbrot(xCenter, yCenter, zoom)
}

function keyReleased() {
	if (key == "r") {
		xCenter = -0.5
		yCenter = 0
		zoom = 2
		mandelbrot(xCenter, yCenter, zoom)
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

var wasPressed = false

function draw() {
	if (mouseIsPressed && !wasPressed) {
		clicked();
		wasPressed = true;
	} else {
		wasPressed = false;
	}

	image(img, 0, 0)

	textAlign(RIGHT, TOP)
	var xCoord = ((mouseX / width) * (zoom * width / height)) + (xCenter - ((zoom * width / height) / 2));
	var yCoord = ((mouseY / height) * zoom) + (yCenter - (zoom / 2));
	var xSpace = (Math.sign(xCoord) != -1 ? " " : "")
	var ySpace = (Math.sign(yCoord) != -1 ? " " : "")
	text("X: " + xSpace + Number.parseFloat(xCoord).toFixed(4) + "\nY: " + ySpace + Number.parseFloat(yCoord).toFixed(4) + "\nZoom: " + zoom, width - 8, 4)
}