let img;
let dotRadius = 2;
let currentPattern = 0;
let patterns = [];
let zoomFactor = 1;
let uploadedImage; // Variable to store dynamically loaded image

function preload() {
  img = loadImage("moo.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  document.addEventListener("keydown", handleKeyPress);

  patterns.push(drawCircle);
  patterns.push(drawTriangle);
  patterns.push(drawSquare);
  patterns.push(drawHeart);
}

function draw() {
  drawMosaic(dotRadius, color(30, 30, 30));
}

function drawMosaic(dotRadius, backgroundColor) {
  background(backgroundColor);

  for (let i = 0; i < numberOfColumns(dotRadius); i++) {
    let offsetX = i * columnWidth(dotRadius);
    drawColumnDots(dotRadius, offsetX);
  }
}

const columnWidth = (dotRadius) => dotRadius * 3;

const numberOfColumns = (dotRadius) =>
  Math.ceil(width / columnWidth(dotRadius));

function drawColumnDots(dotRadius, offsetX) {
  let dotDiameter = 2 * dotRadius * zoomFactor;
  let dotHeightWithPadding = dotDiameter + 2;
  let numDotsInColumn = Math.floor(height / dotHeightWithPadding);
  let topY = Math.floor(random(10));

  for (let i = 0; i < numDotsInColumn; i++) {
    let centerX = Math.floor(
      random(offsetX + dotRadius, offsetX + columnWidth(dotRadius) - dotRadius)
    );
    let centerY = topY + i * dotHeightWithPadding + dotRadius;

    patterns[currentPattern](dotRadius, centerX, centerY, dotDiameter);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function handleKeyPress(event) {
  if (event.key === "ArrowUp") {
    dotRadius += 1;
  } else if (event.key === "ArrowDown" && dotRadius > 1) {
    dotRadius -= 1;
  } else if (event.key === "p") {
    currentPattern = (currentPattern + 1) % patterns.length;
  } else if (event.key === "z") {
    zoomFactor *= 1.2;
  } else if (event.key === "x") {
    zoomFactor /= 1.2;
  } else if (event.key === "s") {
    // Save the canvas as an image when 'S' key is pressed
    saveCanvas("mosaic", "png");
  } else if (event.key === "l") {
    // Load a new image when 'L' key is pressed
    loadNewImage();
  }

  redraw();
}

function drawCircle(dotRadius, centerX, centerY, dotDiameter) {
  let dotColor = getCurrentColor(centerX, centerY);
  noStroke();
  fill(dotColor);
  ellipse(centerX, centerY, dotDiameter, dotDiameter);
}

function drawTriangle(dotRadius, centerX, centerY, dotDiameter) {
  let dotColor = getCurrentColor(centerX, centerY);
  noStroke();
  fill(dotColor);
  drawTriangleShape(centerX, centerY, dotDiameter / 2);
}

function drawSquare(dotRadius, centerX, centerY, dotDiameter) {
  let dotColor = getCurrentColor(centerX, centerY);
  noStroke();
  fill(dotColor);
  rectMode(CENTER);
  rect(centerX, centerY, dotDiameter, dotDiameter);
}

function drawHeart(dotRadius, centerX, centerY, dotDiameter) {
  let dotColor = getCurrentColor(centerX, centerY);
  noStroke();
  fill(dotColor);
  drawHeartShape(centerX, centerY, dotDiameter / 2);
}

function drawTriangleShape(x, y, size) {
  beginShape();
  vertex(x, y - size);
  vertex(x + (size * sqrt(3)) / 2, y + size / 2);
  vertex(x - (size * sqrt(3)) / 2, y + size / 2);
  endShape(CLOSE);
}

function drawHeartShape(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size, y - size, x - 2 * size, y + size / 2, x, y + 2 * size);
  bezierVertex(x + 2 * size, y + size / 2, x + size, y - size, x, y);
  endShape(CLOSE);
}

function getCurrentColor(x, y) {
  return uploadedImage ? uploadedImage.get(x, y) : img.get(x, y);
}

function loadNewImage() {
  // Function to load a new image dynamically
  let fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);
  fileInput.elt.click(); // Simulate a click on the file input to open the file selection dialog
}

function handleFile(file) {
  // Callback function to handle the selected file
  if (file.type === "image") {
    uploadedImage = loadImage(file.data, redraw);
  } else {
    alert("Please select a valid image file.");
  }
}
