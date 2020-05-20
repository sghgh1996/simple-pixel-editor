const selectedColorBox = document.querySelector('.selected-color-box');
const sizeInputs = document.querySelectorAll('.input-box .input input');
var sliderColor = '#000';

const rgbSlider = require('./modules/rgb-slider');
const paintingGrid = require('./modules/painting-grid');

const { updatePaintingGridSize, updatePaintingGridColor } = paintingGrid(document);
const { sliderRange, fixSlider } = rgbSlider(document);

handleSliderChange();
sliderRange.oninput = function() {
  handleSliderChange();
}
function handleSliderChange() {
  sliderColor = fixSlider();
  selectedColorBox.style.backgroundColor = sliderColor;
  selectedColorBox.innerHTML = sliderColor;

  updatePaintingGridColor(sliderColor);
}

updatePaintingGridSize(sizeInputs[0].value);

sizeInputs[0].oninput = function(e) {
  sizeInputs[1].value = e.target.value;
  updatePaintingGridSize(sizeInputs[0].value);
}

sizeInputs[1].oninput = function(e) {
  sizeInputs[0].value = e.target.value;
  updatePaintingGridSize(sizeInputs[0].value);
}
