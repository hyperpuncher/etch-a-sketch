const container = document.querySelector('.container'); 
const canvas = document.querySelector('.canvas'); 
const btnReset = document.querySelector('#btn-reset');
const gridSlider = document.querySelector('#slider');
const gridValue = document.querySelector('#sliderValue')
const radioColor = document.querySelectorAll('input[name="color"]');
const BLACK = 'rgb(0, 0, 0)';
const WHITE = 'rgb(255, 255, 255)';
let paintStyle;
let mouseDown = false;

radioColor.forEach(element => {
  if (element.checked) paintStyle = element.value;
  element.addEventListener('change', (e) => paintStyle = e.target.value);
});

gridValue.textContent = `${gridSlider.value} x ${gridSlider.value}`;
gridSlider.oninput = () => {
  gridValue.textContent = `${gridSlider.value} x ${gridSlider.value}`;
  createCanvas(gridSlider.value);
}

btnReset.addEventListener('click', () => createCanvas(gridSlider.value));

canvas.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);


function getRandomColor() {
  return(`rgb(${Math.floor(Math.random() * 255)},
   ${Math.floor(Math.random() * 255)}, 
   ${Math.floor(Math.random() * 255)})`)
}

function darkerColor(color) {
  let rgb = color.slice(4, -1).split(", ");
  let darkerRGB = [];
  rgb.forEach(color => darkerRGB.push(Math.floor(color - 25.5)));
  return(`rgb(${darkerRGB[0]}, ${darkerRGB[1]}, ${darkerRGB[2]})`)
}

function addPaintStyle(square, e) {
  if (paintStyle === 'rainbow') {
    square.style.backgroundColor = getRandomColor();
  } else if (paintStyle === 'greyscale') {
    square.style.backgroundColor = darkerColor(e.target.style.backgroundColor);
  } else {
    square.style.backgroundColor = BLACK;
  }
}

function createCanvas(gridWidth) {
  canvas.innerHTML = "";
  let gridSize = Math.pow(gridWidth, 2);
  let pixelSize = 960 / gridWidth - 2;
  
  for (let i = 0; i < gridSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mousedown', (e) => {
      addPaintStyle(square, e);
    })
    square.addEventListener('mouseover', (e) => {
      if (mouseDown) {
        addPaintStyle(square, e);
      }
    });
    square.style.height = `${pixelSize}px`;
    square.style.backgroundColor = WHITE;
    canvas.appendChild(square);
  }
  canvas.style.gridTemplateColumns = `repeat(${gridWidth}, 0fr)`
  canvas.addEventListener('dragstart', (e) => e.preventDefault());
}

createCanvas(gridSlider.value);