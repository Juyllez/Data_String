let sliderX, sliderY, sliderWidth, sliderHeight;
let knobX;
let dragging = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderWidth = 1500;
  sliderHeight = 8;
  sliderX = (windowWidth - sliderWidth) / 2; // Zentriere horizontal
  sliderY = windowHeight / 1.1; // Positioniere den Slider weiter unten
  knobX = sliderX; // Startposition links
}

function draw() {
  background(0);

  // Zeichne die Hintergrundlinie (grau)
  noStroke();
  fill(50); // Grau
  rect(
    sliderX,
    sliderY - sliderHeight / 2,
    sliderWidth,
    sliderHeight,
    sliderHeight
  );

  // Zeichne den Fortschrittsbalken (weiß)
  fill(255); // Weiß
  let progressWidth = knobX - sliderX;
  rect(
    sliderX,
    sliderY - sliderHeight / 2,
    progressWidth,
    sliderHeight,
    sliderHeight,
    0,
    0,
    sliderHeight
  );

  // Zeichne den Schiebeknopf (rot)
  fill(255); // Rot
  circle(knobX, sliderY, sliderHeight * 1); // Größerer Kreis

  // Zeige die aktuelle Jahreszahl mit weißem Rahmen unter dem Knopf
  let currentYear = getCurrentYear(knobX);
  let labelWidth = 60;
  let labelHeight = 30;
  let labelX = knobX - labelWidth / 2;
  let labelY = sliderY + 20;

  // Rechteckiger Rahmen (weißer Rand, kein Füllbereich)
  stroke(255); // Weiß
  strokeWeight(1);
  noFill();
  rect(labelX, labelY, labelWidth, labelHeight, 3); // Abgerundete Ecken

  // Text in der Mitte des Rechtecks
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(currentYear, knobX, labelY + labelHeight / 2);
}

function getCurrentYear(knobX) {
  // Berechne das Jahr basierend auf der Position des Knopfs
  return floor(map(knobX, sliderX, sliderX + sliderWidth, 1900, 2024));
}

function mousePressed() {
  // Überprüfe, ob die Maus innerhalb des Schiebeknopfes ist
  if (dist(mouseX, mouseY, knobX, sliderY) < sliderHeight * 1.5) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    knobX = constrain(mouseX, sliderX, sliderX + sliderWidth);
  }
}

function mouseReleased() {
  dragging = false;
}
