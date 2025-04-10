const Slider = {
  sliderX: 0,
  sliderY: 0,
  sliderWidth: 1465,
  sliderHeight: 5,
  knobX: 0,
  dragging: false,

  setup() {
    this.sliderX = (windowWidth - this.sliderWidth) / 2; // 水平居中
    this.sliderY = windowHeight - 180;
    this.knobX = this.sliderX;   
  },

  draw() {
    //slider 
    noStroke();
    fill(50);
    rect(
      this.sliderX,
      this.sliderY - this.sliderHeight / 2,
      this.sliderWidth,
      this.sliderHeight,
      this.sliderHeight
    );

    // Slider Bar
    fill(255);
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

    // Slider
    fill(255); 
    circle(this.knobX, this.sliderY, this.sliderHeight * 2);

    let currentYear = this.getCurrentYear();
    let labelWidth = 60;
    let labelHeight = 30;
    let labelX = this.knobX - labelWidth / 2;
    let labelY = this.sliderY + 20;

    // Jahr Box
    stroke(255); // 白色
    strokeWeight(1);
    noFill();
    rect(labelX, labelY, labelWidth, labelHeight, 3);

    // Jahr
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(currentYear, this.knobX, labelY + labelHeight / 2);
  },

  getCurrentYear() {
    return floor(map(this.knobX, this.sliderX, this.sliderX + this.sliderWidth, 1900, 2024));
  },

  mousePressed() {
    if (dist(mouseX, mouseY, this.knobX, this.sliderY) < this.sliderHeight * 2) {
      console.log("Pressed on knob");
      this.dragging = true;
    }
  },

  mouseDragged() {
    if (this.dragging) {
      this.knobX = constrain(mouseX, this.sliderX, this.sliderX + this.sliderWidth);
      console.log("Dragging:", this.knobX);
      loop();
    }
  },

  mouseReleased() {
    this.dragging = false;
  }
};