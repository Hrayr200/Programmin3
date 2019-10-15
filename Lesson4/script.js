function setup(){
    createCanvas(800,800);
    background('grey');

}

let value = 0;
function draw() {
  color("blue");
  fill(value);
 
}
function mouseDragged() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}

function mouseDragged() {
  ellipse(mouseX, mouseY, 20, 20);
  // prevent default
  return false;
}



