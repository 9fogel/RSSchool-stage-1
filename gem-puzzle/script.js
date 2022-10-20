//create Field
function createEl (tag, class1, class2, parent, content = '',) {
  const elem = document.createElement(`${tag}`);
  elem.classList.add(`${class1}`);
  elem.classList.add(`${class2}`);
  elem.textContent = content;
  parent.append(elem);
  return elem;
}

let header = createEl ('header', 'header', 'container', document.body);
let buttonShuf = createEl ('button', 'button', 'shuffle-btn', header, 'Shuffle and start');
let buttonStop = createEl ('button', 'button', 'stop-btn', header, 'Stop');
let buttonSave = createEl ('button', 'button', 'save-btn', header, 'Save');
let buttonResults = createEl ('button', 'button', 'results-btn', header, 'Results');


let main = createEl ('main', 'main', 'container', document.body);
let info = createEl ('div', 'info-wrapper', 'info', main);
let moves = createEl ('div', 'info-moves', 'moves', info, 'Moves: ');
let time = createEl ('div', 'info-time', 'time', info, 'Time: ');
let playField = createEl ('div', 'play-field', 'play', main);

let footer = createEl ('footer', 'footer', 'container', document.body);
let frameSize = createEl ('div', 'frame-size-wrapper', 'wrapper', footer, 'Frame size:');
let otherframes = createEl ('div', 'other-frames-wrapper', 'wrapper', footer, 'Other sizes:');

//field size controls + default state
for (let i = 0; i < 6; i++) {
  let inputWrapper = createEl ('div', `inputWrapper`, 'inputDiv', otherframes);
  let input = createEl ('input', `size${3+i}`, 'sizeInput', inputWrapper);
  input.type = 'radio';
  input.name = 'size';
  input.value = 3+i;
  input.id = input.name + input.value;
  let label = createEl ('label', `label${3+i}`, 'label', inputWrapper, `${3+i}x${3+i}`);
  label.setAttribute('for', input.name + input.value)
}

function setDefaultSize () {
  let defaultSize = document.querySelector('.size4').value;
  document.querySelector('.size4').setAttribute('checked', 'checked');
  let defaultId = document.querySelector('.size4').id
  let label = document.querySelector(`[for=${defaultId}]`).textContent;
  frameSize.textContent = frameSize.textContent + ' ' + label;
  clearCells();
  drawCells(4);
  return defaultSize;
}

window.addEventListener('load', setDefaultSize);

//change size and draw playField
let inputs = document.querySelectorAll('.inputDiv');
inputs.forEach((input, index) => {
  input.addEventListener('click', () => {
    clearCells();
    let size = setSize(index);
    drawCells(size);
  })
});

function setSize(index) {
  let size = index + 3;
  frameSize.textContent = 'Frame size: ' + `${size} x ${size}`;
  return size;
}

// function drawCells(size) {
//   let cellsNumber = size * size;
//   for (let i = 0; i < cellsNumber; i++) {
//     let cell = createEl('div', 'cell', `cell${i+1}`, playField, `${i+1}` );
//     cell.style.width = `${playField.offsetWidth/size - 5}px`;
//     cell.style.height = `${playField.offsetWidth/size - 5}px`;
//   }
//   let emptyCell = document.querySelectorAll('.cell')[cellsNumber-1]
//   emptyCell.classList.add('empty-cell');
// }

function drawCells(size) {
  let cellsNumber = size * size;
  let randomArr = fillArr(1, cellsNumber, cellsNumber)
  for (let i = 0; i < randomArr.length; i++) {
    let cell = createEl('div', 'cell', `cell${randomArr[i]}`, playField, `${randomArr[i]}` );
    cell.style.width = `${playField.offsetWidth/size - 5}px`;
    cell.style.height = `${playField.offsetWidth/size - 5}px`;
  }
  let emptyCell = document.querySelector(`.cell${cellsNumber}`);
  emptyCell.classList.add('empty-cell');
  clearArr ();
}


function clearCells() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.remove();
  })
}

//random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let randomNumArr = [];
function fillArr (start, end, total) {
  while (randomNumArr.length < total) {
    let randomEl = getRandomIntInclusive(start, end);
    arrElem = randomEl;
    if (!randomNumArr.includes(arrElem)) {
      randomNumArr.push(arrElem);
    }
  }
  return randomNumArr;
}

function clearArr () {
  randomNumArr.length = 0;
}

buttonShuf.addEventListener('click', () => {
  console.log('I want to restart the game!');
});