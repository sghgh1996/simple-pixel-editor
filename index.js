console.log('hi');

var slider = document.getElementsByClassName('rgb-range-slider')[0];
var sliderArrowContainer = document.getElementsByClassName('slider-arrow-container')[0];
var sliderArrowRight = document.getElementsByClassName('slider-arrow-right')[0];
var sliderArrowLeft = document.getElementsByClassName('slider-arrow-left')[0];
var selectedColorBox = document.getElementsByClassName('selected-color-box')[0];

const sizeInputs = document.querySelectorAll('.input-box .input input');

var paintingCanvas = document.querySelector('.painting-canvas');
var paintingCanvasCtx = paintingCanvas.getContext('2d');

paintingCanvas.addEventListener('mousedown', function(e) {
  paintingCanvasMouseDown(paintingCanvas, slider.value, e);
});

updatePaintingBoard();

fixSlider(slider.value);

slider.oninput = function() {
  fixSlider(this.value)
}

function fixSlider (sliderValue) {
  sliderArrowContainer.style.top = `${(1 - sliderValue/360) * 400 - 8}px`;
  
  const sliderColor = `hsl(${sliderValue}, 100%, 50%)`;

  sliderArrowRight.style.borderRightColor = sliderColor;
  sliderArrowLeft.style.borderLeftColor = sliderColor;
  
  selectedColorBox.style.backgroundColor = sliderColor;
  selectedColorBox.innerHTML = HSLToHex(sliderValue, 100, 50);
}


function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h <= 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

sizeInputs[0].oninput = function(e) {
  sizeInputs[1].value = e.target.value;
  updatePaintingBoard();
}

sizeInputs[1].oninput = function(e) {
  sizeInputs[0].value = e.target.value;
  updatePaintingBoard();
}

function updatePaintingBoard () {
  paintingCanvasCtx.clearRect(0, 0, paintingCanvas.width, paintingCanvas.height);

  paintingCanvasCtx.beginPath();
  paintingCanvasCtx.strokeStyle = '#d7d7d7';
  const paintCellNumbers = parseInt(sizeInputs[0].value);
  const paintCellSize = 400 / paintCellNumbers;

  for (let i = 0; i < paintCellNumbers; i++) {
    
    for (let j = 0; j < paintCellNumbers; j++) {
      paintingCanvasCtx.rect(i * paintCellSize, j * paintCellSize, paintCellSize, paintCellSize);
    }
  }
  paintingCanvasCtx.stroke();
}


function getMousePosition(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function paintingCanvasMouseDown(canvas, colorValue, e) {
  const paintCellNumbers = parseInt(sizeInputs[0].value);
  const paintCellSize = 400 / paintCellNumbers;

  const mousePosition = getMousePosition(canvas, e);
  const rowIndex = Math.ceil(mousePosition.x / paintCellSize);
  const columnIndex = Math.ceil(mousePosition.y / paintCellSize);
  
  paintingCanvasCtx.fillStyle = HSLToHex(colorValue, 100, 50);
  paintingCanvasCtx.fillRect((rowIndex - 1) * paintCellSize, (columnIndex - 1) * paintCellSize, paintCellSize, paintCellSize);
}