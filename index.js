console.log('hi');

const rgbSlider = require('./modules/rgb-slider');
const selectedColorBox = document.querySelector('.selected-color-box');


const {
  sliderRange, fixSlider
} = rgbSlider(document);

handleSliderChange();

sliderRange.oninput = function() {
  handleSliderChange();
}

function handleSliderChange() {
  const sliderColor = fixSlider();
  selectedColorBox.style.backgroundColor = sliderColor;
  selectedColorBox.innerHTML = sliderColor;
}


const sizeInputs = document.querySelectorAll('.input-box .input input');

var paintingCanvas = document.querySelector('.painting-canvas');
var paintingCanvasCtx = paintingCanvas.getContext('2d');

paintingCanvas.addEventListener('mousedown', function(e) {
  paintingCanvasMouseDown(paintingCanvas, sliderRange.value, e);
});

updatePaintingBoard();


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
  
  // paintingCanvasCtx.fillStyle = HSLToHex(colorValue, 100, 50);
  paintingCanvasCtx.fillRect((rowIndex - 1) * paintCellSize, (columnIndex - 1) * paintCellSize, paintCellSize, paintCellSize);
}