const Slider = {
  sliderX: 0,
  sliderY: 0,
  sliderWidth: 1465,
  sliderHeight: 5,
  knobX: 0,
  dragging: false,

  setup() {
    this.sliderX = (windowWidth - this.sliderWidth) / 2; // 水平居中
    this.sliderY = windowHeight - 180; // 滑块位置靠下
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
    circle(this.knobX, this.sliderY, this.sliderHeight * 2);

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