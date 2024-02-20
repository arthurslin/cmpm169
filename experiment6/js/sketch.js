// Author: Arthur Lin
let lines = [];
let numLines = 300;
let lineHeight = 30;
let wordBank = [
  "hack",
  "security",
  "crypto",
  "password",
  "firewall",
  "cyber",
  "attack",
  "defense",
  "network",
  "hacker",
  "hungry",
  "feisty",
  "evil",
  "",
  "super",
  "belligerent",
  "dongle",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
  for (let i = 0; i < numLines; i++) {
    lines.push(generateLine());
  }
}

function draw() {
  background(0); // Black background
  for (let i = 0; i < lines.length; i++) {
    fill(0, 255, 0); // Green color
    text(lines[i].text, lines[i].x, lines[i].y);
    lines[i].y += lines[i].speed;
    if (lines[i].y > height) {
      lines[i] = generateLine();
    }
  }
}

function generateLine() {
  let textContent = "";
  let numWords = int(random(1, 5));
  let x = random(width);
  let y = random(-height, 0);
  let speed = random(1, 3);
  for (let i = 0; i < numWords; i++) {
    let word = random(wordBank);
    textContent += word + " ";
  }
  return { text: textContent, x: x, y: y, speed: speed };
}
