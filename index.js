console.log('hi');

var slider = document.getElementById("rangeSlider");
var sliderArrowContainer = document.getElementsByClassName('slider-arrow-container')[0];
var sliderArrowRight = document.getElementsByClassName('slider-arrow-right')[0];
var sliderArrowLeft = document.getElementsByClassName('slider-arrow-left')[0];
var selectedColorBox = document.getElementsByClassName('selected-color-box')[0];

fixSlider(slider.value);

slider.oninput = function() {
  console.log('change');
  console.log(this.value);
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