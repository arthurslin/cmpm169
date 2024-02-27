// Author: Arthur Lin
let img;

function preload() {
  img = loadImage('rainbow.jpg');
}

function setup() {
  createCanvas(img.width * 2, img.height);
  image(img, 0, 0);
  img.loadPixels();
  sortPixels();
}

function sortPixels() {
  let sortedPixels = [];

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let index = (j + i * img.width) * 4;
      let pixelColor = [
        img.pixels[index],
        img.pixels[index + 1],
        img.pixels[index + 2],
        img.pixels[index + 3]
      ];
      let sortableValue = pixelColor[0] * 1000000 + pixelColor[1] * 1000 + pixelColor[2];
      sortedPixels.push({ color: pixelColor, sortableValue: sortableValue });
    }
  }

  sortedPixels.sort((a, b) => a.sortableValue - b.sortableValue);

  for (let i = 0; i < sortedPixels.length; i++) {
    let x = i % img.width;
    let y = floor(i / img.width);
    let index = (x + y * img.width) * 4;
    let c = sortedPixels[i].color;
    stroke(c[0], c[1], c[2]);
    point(x + img.width, y);
  }
}
