const container = document.querySelector('.container');
const btn = document.querySelector('button');
let gridWidth = 10;

createCanvas();


btn.addEventListener('click', () => {
  gridWidth = parseInt(prompt('Input grid size'));
  createCanvas();
})


function createCanvas() {
  container.innerHTML = "";
  let gridSize = Math.pow(gridWidth, 2);
  let pixelSize = 960 / gridWidth;
  
  for (let i = 0; i < gridSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', () => {
      square.classList.add('painted');
    })
    square.style.height = `${pixelSize}px`;
    container.appendChild(square);
  }
  container.style.gridTemplateColumns = `repeat(${gridWidth}, 0fr)`
}