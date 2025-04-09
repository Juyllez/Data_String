// let sliderX, sliderY, sliderWidth, sliderHeight;
// let knobX;
// let dragging = false;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   sliderWidth = 1500;
//   sliderHeight = 8;
//   sliderX = (windowWidth - sliderWidth) / 2; // Zentriere horizontal
//   sliderY = windowHeight / 1.1; // Positioniere den Slider weiter unten
//   knobX = sliderX; // Startposition links
// }

// function draw() {
//   background(0);

//   // Zeichne die Hintergrundlinie (grau)
//   noStroke();
//   fill(50); // Grau
//   rect(
//     sliderX,
//     sliderY - sliderHeight / 2,
//     sliderWidth,
//     sliderHeight,
//     sliderHeight
//   );

//   // Zeichne den Fortschrittsbalken (weiß)
//   fill(255); // Weiß
//   let progressWidth = knobX - sliderX;
//   rect(
//     sliderX,
//     sliderY - sliderHeight / 2,
//     progressWidth,
//     sliderHeight,
//     sliderHeight,
//     0,
//     0,
//     sliderHeight
//   );

//   // Zeichne den Schiebeknopf (rot)
//   fill(255); // Rot
//   circle(knobX, sliderY, sliderHeight * 1); // Größerer Kreis

//   // Zeige die aktuelle Jahreszahl mit weißem Rahmen unter dem Knopf
//   let currentYear = getCurrentYear(knobX);
//   let labelWidth = 60;
//   let labelHeight = 30;
//   let labelX = knobX - labelWidth / 2;
//   let labelY = sliderY + 20;

//   // Rechteckiger Rahmen (weißer Rand, kein Füllbereich)
//   stroke(255); // Weiß
//   strokeWeight(1);
//   noFill();
//   rect(labelX, labelY, labelWidth, labelHeight, 3); // Abgerundete Ecken

//   // Text in der Mitte des Rechtecks
//   noStroke();
//   fill(255);
//   textAlign(CENTER, CENTER);
//   textSize(16);
//   text(currentYear, knobX, labelY + labelHeight / 2);
// }

// function getCurrentYear(knobX) {
//   // Berechne das Jahr basierend auf der Position des Knopfs
//   return floor(map(knobX, sliderX, sliderX + sliderWidth, 1900, 2024));
// }

// function mousePressed() {
//   // Überprüfe, ob die Maus innerhalb des Schiebeknopfes ist
//   if (dist(mouseX, mouseY, knobX, sliderY) < sliderHeight * 1.5) {
//     dragging = true;
//   }
// }

// function mouseDragged() {
//   if (dragging) {
//     knobX = constrain(mouseX, sliderX, sliderX + sliderWidth);
//   }
// }

// function mouseReleased() {
//   dragging = false;
// }


const Slider = {
  sliderX: 0,
  sliderY: 0,
  sliderWidth: 1350,
  sliderHeight: 8,
  knobX: 0,
  dragging: false,

  setup() {
    this.sliderX = (windowWidth - this.sliderWidth) / 2; // 水平居中
    this.sliderY = windowHeight - 30; // 滑块位置靠下
    this.knobX = this.sliderX; // 滑块初始位置
  },

  draw() {
    // 绘制 slider 背景
    noStroke();
    fill(50); // 灰色
    rect(
      this.sliderX,
      this.sliderY - this.sliderHeight / 2,
      this.sliderWidth,
      this.sliderHeight,
      this.sliderHeight
    );

    // 绘制 slider 进度条
    fill(255); // 白色
    let progressWidth = this.knobX - this.sliderX;
    rect(
      this.sliderX,
      this.sliderY - this.sliderHeight / 2,
      progressWidth,
      this.sliderHeight,
      this.sliderHeight,
      0,
      0,
      this.sliderHeight
    );

    // 绘制滑块
    fill(255); // 红色
    circle(this.knobX, this.sliderY, this.sliderHeight * 1);

    // 显示当前年份
    let currentYear = this.getCurrentYear();
    let labelWidth = 60;
    let labelHeight = 30;
    let labelX = this.knobX - labelWidth / 2;
    let labelY = this.sliderY + 20;

    // 绘制年份框
    stroke(255); // 白色
    strokeWeight(1);
    noFill();
    rect(labelX, labelY, labelWidth, labelHeight, 3);

    // 绘制年份文本
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(currentYear, this.knobX, labelY + labelHeight / 2);
  },

  getCurrentYear() {
    // 根据滑块位置计算年份
    return floor(map(this.knobX, this.sliderX, this.sliderX + this.sliderWidth, 1900, 2024));
  },

  mousePressed() {
    // 检查鼠标是否在滑块上
    if (dist(mouseX, mouseY, this.knobX, this.sliderY) < this.sliderHeight * 1.5) {
      this.dragging = true;
    }
  },

  mouseDragged() {
    if (this.dragging) {
      this.knobX = constrain(mouseX, this.sliderX, this.sliderX + this.sliderWidth);
    }
  },

  mouseReleased() {
    this.dragging = false;
  }
};