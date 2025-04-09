let continentColors = {};
let continents = ["Africa", "America", "Asia", "Europe", "Oceania"];
let data = [];

let countries = [];
let years = [];
let includedCountries = [
    "Sweden", "Norway", "Finland", "Iceland", "Estonia", "Germany", "France",
  "Netherlands", "Switzerland", "Austria", "Ireland", "Portugal", "Spain", "Poland",
  "Hungary", "Czechia", "Greece", "Italy",

  "South Africa", "Ghana", "Namibia", "Senegal", "Botswana", "Cape Verde", "Tunisia",
  "Liberia", "Kenya", "Malawi", "Nigeria", "Sierra Leone", "Zambia", "Ethiopia",
  "Morocco", "Uganda", "Algeria", "Sudan", "Zimbabwe", "Rwanda",

  "Japan", "South Korea", "Taiwan", "India", "Philippines", "Indonesia", "Malaysia",
  "Mongolia", "Thailand", "Nepal", "Bangladesh", "Sri Lanka", "Kazakhstan", "Uzbekistan",
  "Vietnam", "Myanmar", "Pakistan", "Afghanistan", "Iran", "China",

  "Australia", "New Zealand", "Fiji", "Papua New Guinea", "Solomon Islands",
 "Vanuatu",
  "New Caledonia", "Timor",

  "Canada", "United States", "Mexico", "Cuba", "Haiti", "Dominican Republic", "Jamaica",
  "Colombia", "Venezuela", "Brazil", "Argentina", "Chile", "Peru", "Ecuador",
  "Bolivia", "Paraguay", "Uruguay", "Nicaragua", "El Salvador", "Honduras"
];
let groupedByContinent = {};


function preload() {
  table = loadTable('data/BLIBLA.csv', 'csv', 'header');
    console.log("Columns: ", table.columns);
    console.log("Rows: ", table.rows.length);    
  }


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let row of table.rows) {
    console.log(row.get("Country"), row.get("Continent"), row.get("FreedomScore"), row.get("Year"));
  }

  console.log("Columns: ", table.columns);
  console.log("Rows: ", table.getRowCount());

  console.log("Filtered data:", data);
  textFont("Arial", 10);
  noStroke();
  colorMode(RGB);
  // 配置颜色
  let palette = [
    color(255, 61, 64),   // Africa
    color(255, 229, 0),   // America
    color(0, 255, 153),   // Asia
    color(255, 106, 226), // Europe
    color(37, 53, 255)    // Oceania
  ];
  for (let i = 0; i < continents.length; i++) {
    continentColors[continents[i]] = palette[i];
    groupedByContinent[continents[i]] = [];
  }


  // 读取数据并分类
  
  for (let row of table.rows) {
    let country = row.get("Country");
    let continent = row.get("Continent");
    let score = float(row.get("FreedomScore"));
    let year = int(row.get("Year"));
    if (continents.includes(continent) && includedCountries.includes(country)) {
      let entry = { country, continent, score, year };
      groupedByContinent[continent].push(entry);
      if (year === 1900) {
        data.push(entry);
      }
    }
  }
  
  noLoop();
}

function draw() {
  background(0);

  let xLeft = 120;
  let xRight = width - 120;
  let barWidth = 5;
  let topMargin = 60;
  let continentYMap = {};
  let gap = 4;

  // --- 绘制左侧 continent bars ---
  let totalHeight = height - 2 * topMargin;
  let continentBarHeight = totalHeight / continents.length;

  for (let i = 0; i < continents.length; i++) {
    let continent = continents[i];
    let entries = groupedByContinent[continent];
    let yTop = topMargin + i * (continentBarHeight+ gap);

    // 绘制 Bar
    fill(continentColors[continent]);
    rect(xLeft, yTop, barWidth, continentBarHeight);

    // 白色文字标签
    fill(255);
    textAlign(RIGHT, CENTER);
    textSize(14);
    text(continent, xLeft - 10, yTop + continentBarHeight / 2);

    // 生成每条线的 y 坐标
    let spacing = continentBarHeight / (entries.length + 1);
    continentYMap[continent] = entries.map((_, idx) => yTop + (idx + 1) * spacing);
  }

  // --- 绘制右侧 score  bars ---
    fill(255, 255, 255);
    rect(xRight - barWidth, topMargin, barWidth, totalHeight);
    // 白色文字标签
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(14);
  

  // --- 绘制连接线 ---
    for (let continent of continents) {
      let continentEntries = data.filter(d => d.continent === continent);
      let yPositions = continentYMap[continent];
      let spacing = (yPositions[yPositions.length - 1] - yPositions[0]) / (continentEntries.length + 1);
      
      for (let i = 0; i < continentEntries.length; i++) {
        let d = continentEntries[i];
        let score = d.score;
  
        let y1 = yPositions[0] + (i + 1) * spacing;
  
        let y2 = map(score, 0, 1, height - topMargin, topMargin);        
        
        let x1 = xLeft + barWidth;
        let x2 = xRight - barWidth;
  
        let lineColor = continentColors[continent];
        stroke(lineColor);
        strokeWeight(1);
        noFill();
        bezier(x1, y1, (x1 + x2) / 2, y1, (x1 + x2) / 2, y2, x2, y2);
      }
    }
  
}

