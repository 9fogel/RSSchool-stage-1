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
let moves = createEl ('div', 'info-moves', 'moves', info, 'Moves: 0');
let time = createEl ('div', 'info-time', 'time', info, 'Time: 00:00');
let playField = createEl ('div', 'play-field', 'play', main);

let allCells = playField.childNodes;
let emptyIndex;

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
    counter = 0;
    moves.textContent = 'Moves: 0';
    timeInSec = 0;
  })
});

function setSize(index) {
  let size = index + 3;
  frameSize.textContent = 'Frame size: ' + `${size} x ${size}`;
  return size;
}

function drawCells(size) {
  let cellsNumber = size * size;
  let randomArr = fillArr(1, cellsNumber, cellsNumber)
  for (let i = 0; i < randomArr.length; i++) {
    let cell = createEl('div', 'cell', `cell${randomArr[i]}`, playField, `${randomArr[i]}` );
    cell.style.width = `${playField.offsetWidth/size - (size - 1)}px`;
    cell.style.height = `${playField.offsetWidth/size - (size - 1)}px`;
    if (window.innerWidth <= 768) {
      cell.style.width = `${playField.offsetWidth/size - size/2}px`;
      cell.style.height = `${playField.offsetWidth/size - size/2}px`;
    }
  }
  let emptyCell = document.querySelector(`.cell${cellsNumber}`);
  console.log('empty cell', emptyCell);
  emptyCell.classList.add('empty-cell');
  // emptyIndex = randomArr.indexOf(+emptyCell.textContent);
  emptyIndex = Array.from(allCells).indexOf(emptyCell);
  emptyCell.innerHTML = '';
  console.log('eI', emptyIndex);
  setClickable();
  clearArr ();
}

//resize window with the same field/game without reload
window.addEventListener('resize', () => {
  let size = whatSize();
  if (window.innerWidth > 768) {
    allCells.forEach((cell) => {
    cell.style.width = `${playField.offsetWidth/size - (size - 1)}px`;
    cell.style.height = `${playField.offsetWidth/size - (size - 1)}px`;
    });
  }
  if (window.innerWidth <= 768) {
    allCells.forEach((cell) => {
      cell.style.width = `${playField.offsetWidth/size - size/2}px`;
      cell.style.height = `${playField.offsetWidth/size - size/2}px`;
    });
  }
});

function clearCells() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.remove();
  })
}

function setClickable() {
  let size = whatSize();
  allCells.forEach((cell, index) => {
    if ((emptyIndex + 1) % size === 0) {
      if(index === emptyIndex - 1 || index === emptyIndex + size || index === emptyIndex - size) {
        cell.classList.add('clickable');
      }
    } else if (emptyIndex % size === 0) {
      if(index === emptyIndex + 1 || index === emptyIndex + size || index === emptyIndex - size) {
        cell.classList.add('clickable');
        }
    } else {
      if(index === emptyIndex - 1 || index === emptyIndex + 1 || index === emptyIndex + size || index === emptyIndex - size) {
      cell.classList.add('clickable');
      }
    }
  });
}

function removeClickable() {
  allCells.forEach((cell, index) => {
    if(cell.classList.contains('clickable')) {
      cell.classList.remove('clickable');
    }
  });
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

function whatSize() {
  let size = 4;
  inputs.forEach((input, index) => {
    if(input.firstChild.checked) {
      size = index + 3;
    }
  });
  return size;
}

buttonShuf.addEventListener('click', () => {
  clearCells();
  let size = whatSize();
  console.log(size);
  drawCells(size);
  counter = 0;
  moves.textContent = 'Moves: 0';
  // clearInterval(timer);
  timeInSec = 0;
});

//moves count
let counter = 0;
function countMoves() {
  counter++;
  moves.textContent = `Moves: ${counter}`
}

//timer
let timer;
let timeInSec = 0;
timer = function startTime() {
  setInterval(() => {
    let min = 0;
    let sec;
    if (timeInSec > 59) {
      min = Math.floor(timeInSec / 60);
      sec = timeInSec % 60;
    } else {
      sec = timeInSec;
    }
    timeInSec++;
    time.textContent = `Time: ${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`
  }, 1000);
}

//move by clicking
const moveCell = (event) => {
  playField.removeEventListener('click', moveCell);
  playField.removeEventListener('click', timer);
  let cell = event.target;
  let cellArr = [];
  allCells.forEach((cell, index) => {
    cellArr.push(+cell.textContent);
  });

  let cellIndex = cellArr.indexOf(+cell.textContent);
  let size = whatSize();

  if (cellIndex === emptyIndex - size) {
    cell.classList.add(`transition-down${size}`);
  }
  if (cellIndex === emptyIndex + size) {
    cell.classList.add(`transition-up${size}`);
  }
  if (cellIndex === emptyIndex + 1) {
    cell.classList.add(`transition-left${size}`);
  }
  if (cellIndex === emptyIndex - 1) {
    cell.classList.add(`transition-right${size}`);
  }
  if(!cell.classList.contains('clickable')) {
    playField.addEventListener('click', moveCell);
  }
}

playField.addEventListener('click', timer);
playField.addEventListener('click', moveCell);

playField.addEventListener('animationend', (animationEvent) => {
  let cell = animationEvent.target;
  let size = whatSize();
  console.log(animationEvent.animationName);
    if (animationEvent.animationName === `move-down${size}`) {
      cell.classList.remove(`transition-down${size}`);
      switchCells(cell);
      emptyIndex = emptyIndex - size;
      console.log('emptyIndex', emptyIndex);
      removeClickable();
      setClickable();
      countMoves();
    }
    if (animationEvent.animationName === `move-up${size}`) {
      cell.classList.remove(`transition-up${size}`);
      switchCells(cell);
      emptyIndex = emptyIndex + size;
      console.log('emptyIndex', emptyIndex);
      removeClickable();
      setClickable();
      countMoves();
    }
    if (animationEvent.animationName === `move-right${size}`) {
      cell.classList.remove(`transition-right${size}`);
      switchCells(cell);
      emptyIndex -= 1;
      console.log('emptyIndex', emptyIndex);
      removeClickable();
      setClickable();
      countMoves();
    }
    if (animationEvent.animationName === `move-left${size}`) {
      cell.classList.remove(`transition-left${size}`);
      switchCells(cell);
      emptyIndex += 1;
      console.log('emptyIndex', emptyIndex);
      removeClickable();
      setClickable();
      countMoves();
    }
    playField.addEventListener('click', moveCell);

    function switchCells(cell) {
      let size = whatSize();
      //тут происходит замена содержимого пустой клетки и той, что подвинули
      let tempCell = cell.innerHTML;
      allCells[emptyIndex].classList.remove('empty-cell');
      allCells[emptyIndex].classList.remove(`cell${size*size}`);
      allCells[emptyIndex].classList.add(`cell${tempCell}`);
      allCells[emptyIndex].innerHTML = tempCell;
      cell.innerHTML = '';
      cell.classList.add('empty-cell');
      cell.classList.add(`cell${size*size}`);
      cell.classList.remove(`cell${tempCell}`);
      cell.classList.remove('clickable');
    }
});