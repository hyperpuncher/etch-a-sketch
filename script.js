const container = document.querySelector('.container'); 
const canvas = document.querySelector('.canvas'); 
const btn = document.querySelector('button');
let gridWidth = 20;
let mouseDown = false;

createCanvas();

btn.addEventListener('click', () => {
  gridWidth = parseInt(prompt('Input grid size'));
  createCanvas();
})

canvas.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);


function createCanvas() {
  canvas.innerHTML = "";
  let gridSize = Math.pow(gridWidth, 2);
  let pixelSize = 960 / gridWidth - 2;
  
  for (let i = 0; i < gridSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', () => {
      if (mouseDown) {
        square.classList.add('painted');
      }
    })
    square.style.height = `${pixelSize}px`;
    canvas.appendChild(square);
  }
  canvas.style.gridTemplateColumns = `repeat(${gridWidth}, 0fr)`
  canvas.addEventListener('dragstart', (e) => e.preventDefault());
}