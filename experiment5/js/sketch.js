let angle = 0;
let sunRotationSpeed = 0.1;
let sunRadius = 80;
let numPlanets = 8;
let planetSizes = [16, 12, 10, 8, 6, 4, 4, 2];
let planetDistances = [200, 280, 380, 460, 540, 620, 700, 750];
let planetDepths = [105, 120, 130, 140, 160, 180, 200, 220];
let rotationSpeed = [];
let phaseShifts = [];
let inclinations = [];

let camAngleX = 0;
let camAngleY = 0;

let numStars = 500;
let maxStarDistance = 2000;

let stars = [];

function setup() {
  createCanvas(1600, 800, WEBGL);
  for (let i = 0; i < numPlanets; i++) {
    rotationSpeed.push(random(0.05, 0.2));
    // From the angles 0 to 2pi, shift planets draw point
    phaseShifts.push(random(2*PI));
    // Rotation inclination set between -pi/4 and pi/4 to minimize angular variance
    inclinations.push(random(-PI/4, PI/4));
  }
// push numStars stars into array
  for (let i = 0; i < numStars; i++) {
    let x = random(-maxStarDistance, maxStarDistance);
    let y = random(-maxStarDistance, maxStarDistance);
    let z = random(-maxStarDistance, maxStarDistance);
    stars.push(createVector(x, y, z));
  }
}

function draw() {
  background(0);
  // ChatGPT camera logic
  camAngleX = map(mouseX, 0, width, -PI, PI);
  camAngleY = map(mouseY, 0, height, -PI/2, PI/2);

  rotateX(-camAngleY);
  rotateY(camAngleX);

  drawStars();

  push();
  stroke(255, 165, 0);
  fill(255, 255, 0);
  rotateY(angle * sunRotationSpeed);
  sphere(sunRadius);
  pop();

  for (let i = 0; i < numPlanets; i++) {
    let planetAngle = angle + (rotationSpeed[i] * 0.01) + phaseShifts[i];
    let x = cos(planetAngle) * planetDistances[i];
    let y = 0;
    let z = sin(planetAngle) * planetDepths[i];
    let planetSize = planetSizes[i];
    let inclination = inclinations[i];

    push();
    rotateX(inclination);
    translate(x, y, z);
    let planetStrokeColor = getPlanetColor(i);
    stroke(planetStrokeColor);
    fill(0);
    sphere(planetSize);
    pop();
  }

  angle += 0.01;
}

// star drawing function
function drawStars() {
  noStroke();
  fill(255);
  for (let i = 0; i < numStars; i++) {
    let starSize = random(1, 3);
    let starPos = stars[i];
    push();
    translate(starPos.x, starPos.y, starPos.z);
    sphere(starSize);
    pop();
  }
}

// ChatGPT color function
function getPlanetColor(index) {
  let planetColors = [
    color(255, 69, 0),
    color(255, 165, 0),
    color(255, 215, 0),
    color(165, 42, 42),
    color(255, 255, 0),
    color(255, 255, 224),
    color(173, 216, 230),
    color(0, 191, 255)
  ];

  return planetColors[index % planetColors.length];
}
