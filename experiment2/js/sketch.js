// class to store cube information
class Cube {
    constructor(rotationSpeed, cubeColor) {
      this.size = 100; // size of the cube
      this.rotationAngles = createVector(0, 0, 0); // angle of the cube object's rotation
      this.color = cubeColor 
      this.vector = createVector(rotationSpeed, rotationSpeed, rotationSpeed) // 3d vector to change the speed of the rotation
    }
  
    update() {
      this.rotationAngles.add(this.vector); // add the rotational vector to the rotation angle
      push();
      fill(this.color);
      stroke(50,50,50);
      rotateX(this.rotationAngles.x);
      rotateY(this.rotationAngles.y);
      rotateZ(this.rotationAngles.z);
      // https://p5js.org/reference/#/p5/box
      box(this.size);
      pop();
    }
  }
  
  let cubes = [];
  
  function setup() {
    createCanvas(400, 400, WEBGL); // WebGL build for 3d models
    
    // push in 10 cube objects into array
    for (let i = 1; i < 10; i++) {
      let cubeColor = color(random(255), random(255), random(255)); // random color for each cube
      cubes.push(new Cube(i * 0.0005, cubeColor));
    }
  }
  
  function draw() {
    background(50,50,50);
  
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    cubes.forEach((element => element.update()));
  }
  
  