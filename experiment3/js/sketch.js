function setup() {
    createCanvas(800, 800);
  }
  
  function draw() {
    // code from chatgpt
    let bgColor = color(255, 255, 255);
    let colorIndex = frameCount % 200;
    if (colorIndex < 67) {
      bgColor = color(0, 160, 255);
    } else if (colorIndex < 134) {
      bgColor = color(0, 0, 255);
    } else {
      bgColor = color(0, 90, 255);
    }
    
    background(bgColor);
  
    translate(width / 2, height / 2);
  
    beginShape();
    for (let i = 0; i < frameCount; i++) {
      let angle = map(i, 0, 360, 0, TWO_PI);
      let radius = noise(i) * 100 + i/20;
  
      let x = radius * cos(angle);
      let y = radius * sin(angle);
  
  // code from chatgpt
      let colorIndex = frameCount % 200;
      if (colorIndex < 67) {
        fill(255, 0, 0);
      } else if (colorIndex < 134) {
        fill(255, 165, 0);
      } else {
        fill(255, 255, 0);
      }
  // code from chatgpt
      if (colorIndex < 67) {
        stroke(255, 255, 0);
      } else if (colorIndex < 134) {
        stroke(255, 0, 0);
      } else {
        stroke(255, 165, 0); 
      }
      vertex(x, y);
    }
    endShape();
  }
  