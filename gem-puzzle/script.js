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
let buttonMute = createEl ('button', 'button', 'mute-btn', header, 'Sound: ON ');

buttonStop.setAttribute('disabled', 'disabled');
buttonSave.setAttribute('disabled', 'disabled');
buttonResults.setAttribute('disabled', 'disabled');

let main = createEl ('main', 'main', 'container', document.body);
let info = createEl ('div', 'info-wrapper', 'info', main);
let moves = createEl ('div', 'info-moves', 'moves', info, 'Moves: 0');
let time = createEl ('div', 'info-time', 'time', info, 'Time: 00:00');

const audio = new Audio('cell-move-sound.mp3');

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
    timeInSec = 1;
  });
});

function setSize(index) {
  let size = index + 3;
  frameSize.textContent = 'Frame size: ' + `${size} x ${size}`;
  return size;
}

function drawCells(size) {
  let cellsNumber = size * size;
  let randomArr = fillArr(1, cellsNumber, cellsNumber)
  //проверка решабельности
  let playArr = [...randomArr];
  let blankRow = Math.floor((playArr.indexOf(cellsNumber)) / size);
  playArr.splice(playArr.indexOf(cellsNumber), 1);
  let inversions = countInversions(playArr);

  while (!canBeSolved(inversions, size, blankRow)) {
    clearArr ();
    cellsNumber = size * size;
    randomArr = fillArr(1, cellsNumber, cellsNumber);
    playArr = [...randomArr];
    blankRow = Math.floor((playArr.indexOf(cellsNumber)) / size);
    playArr.splice(playArr.indexOf(cellsNumber), 1);
    inversions = countInversions(playArr);
    canBeSolved(inversions, size, blankRow);
  }
  //рисуем клетки
  for (let i = 0; i < randomArr.length; i++) {
    let cell = createEl('div', 'cell', `cell${randomArr[i]}`, playField, `${randomArr[i]}` );
    cell.style.width = `${playField.offsetWidth/size - (size - 1)}px`;
    cell.style.height = `${playField.offsetWidth/size - (size - 1)}px`;
    if (window.innerWidth <= 768) {
      cell.style.width = `${playField.offsetWidth/size - size/2}px`;
      cell.style.height = `${playField.offsetWidth/size - size/2}px`;
    }
    cell.ondragstart = drag;
  }
  let emptyCell = document.querySelector(`.cell${cellsNumber}`);
  emptyCell.classList.add('empty-cell');
  emptyIndex = Array.from(allCells).indexOf(emptyCell);
  emptyCell.innerHTML = '';
  emptyCell.ondragover = allowDrop;
  emptyCell.ondrop = drop;
  setClickable();
  clearArr ();
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  let size = whatSize();
  event.dataTransfer.setData('cell', event.target.innerHTML);
}

function drop(event) {
  playField.removeEventListener('mousedown', timer);
  playField.removeEventListener('click', timer);
  let tempCell = event.dataTransfer.getData('cell');
  let tempIndex = Array.from(allCells).map((item) => item.innerHTML).indexOf(tempCell);
  let size = whatSize();
  //превращаем пустую клетку в нормальную
  allCells[emptyIndex].classList.remove('empty-cell');
  allCells[emptyIndex].classList.remove(`cell${size*size}`);
  allCells[emptyIndex].classList.add(`cell${tempCell}`);
  allCells[emptyIndex].innerHTML = tempCell;
  emptyIndex = tempIndex;
  allCells[emptyIndex].innerHTML = '';
  allCells[emptyIndex].classList.add('empty-cell');
  allCells[emptyIndex].classList.add(`cell${size*size}`);
  allCells[emptyIndex].classList.remove(`cell${tempCell}`);
  allCells[emptyIndex].classList.remove('clickable');
  allCells[emptyIndex].ondragover = allowDrop;
  allCells[emptyIndex].ondrop = drop;
  // timer();
  if (!buttonMute.classList.contains('no-sound')) {
    audio.play();
  }
  removeClickable();
  setClickable();
  countMoves();
  isWinning();
}

function countInversions(arr) {
  let invCounter = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let k = i + 1; k < arr.length; k++) {
      if (arr[k] && arr[i] && arr[i] > arr[k])
        invCounter++;
    }
  }
  return invCounter;
}

function canBeSolved(inv, size, blR) {
  if (size % 2 !== 0) {
    if (inv % 2 === 0) {
      // console.log('puzzle can be solved');
      return true;
    } else {
      // console.log('puzzle NOT solved');
      return false;
      }
  } else {
      if ((inv + blR) % 2 !== 0) {
      // console.log('puzzle can be solved');
      return true;
      } else {
        // console.log('puzzle NOT solved');
        return false;
      }
  }
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
        cell.setAttribute('draggable', 'true');
      }
    } else if (emptyIndex % size === 0) {
      if(index === emptyIndex + 1 || index === emptyIndex + size || index === emptyIndex - size) {
        cell.classList.add('clickable');
        cell.setAttribute('draggable', 'true');
        }
    } else {
      if(index === emptyIndex - 1 || index === emptyIndex + 1 || index === emptyIndex + size || index === emptyIndex - size) {
      cell.classList.add('clickable');
      cell.setAttribute('draggable', 'true');
      }
    }
  });
}

function removeClickable() {
  allCells.forEach((cell, index) => {
    if(cell.classList.contains('clickable')) {
      cell.classList.remove('clickable');
    }
    if(cell.hasAttribute('draggable')) {
      cell.removeAttribute('draggable');
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
  drawCells(size);
  counter = 0;
  moves.textContent = 'Moves: 0';
  timeInSec = 0;
});

buttonMute.addEventListener('click', () => {
  if (buttonMute.classList.contains('no-sound')) {
    buttonMute.textContent = 'Sound: ON ';
    buttonMute.classList.remove('no-sound');
  } else {
    buttonMute.textContent = 'Sound: OFF';
    buttonMute.classList.add('no-sound');
    audio.pause();
  }

});

//moves count
let counter = 0;
function countMoves() {
  counter++;
  moves.textContent = `Moves: ${counter}`
}

//timer
let timer;
let newTimer;
let timeInSec = 1;
timer = function startTime() {
  newTimer = setInterval(() => {
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
  playField.removeEventListener('mousedown', timer);
  let cell = event.target;
  let cellArr = [];
  allCells.forEach((cell, index) => {
    cellArr.push(+cell.textContent);
  });

  let cellIndex = cellArr.indexOf(+cell.textContent);
  let size = whatSize();

  if (cellIndex === emptyIndex - size && cell.classList.contains('clickable')) {
    cell.classList.add(`transition-down${size}`);
    if (!buttonMute.classList.contains('no-sound')) {
      audio.play();
    }
  }
  if (cellIndex === emptyIndex + size && cell.classList.contains('clickable')) {
    cell.classList.add(`transition-up${size}`);
    if (!buttonMute.classList.contains('no-sound')) {
      audio.play();
    }
  }
  if (cellIndex === emptyIndex + 1 && cell.classList.contains('clickable')) {
    cell.classList.add(`transition-left${size}`);
    if (!buttonMute.classList.contains('no-sound')) {
      audio.play();
    }
  }
  if (cellIndex === emptyIndex - 1 && cell.classList.contains('clickable')) {
    cell.classList.add(`transition-right${size}`);
    if (!buttonMute.classList.contains('no-sound')) {
      audio.play();
    }
  }
  if(!cell.classList.contains('clickable')) {
    playField.addEventListener('click', moveCell);
  }
}

// playField.addEventListener('click', timer);
playField.addEventListener('mousedown', timer);
playField.addEventListener('click', moveCell);

playField.addEventListener('animationend', (animationEvent) => {
  let cell = animationEvent.target;
  let size = whatSize();
  // console.log(animationEvent.animationName);
    if (animationEvent.animationName === `move-down${size}`) {
      cell.classList.remove(`transition-down${size}`);
      switchCells(cell);
      emptyIndex = emptyIndex - size;
      removeClickable();
      setClickable();
      countMoves();
    }
    if (animationEvent.animationName === `move-up${size}`) {
      cell.classList.remove(`transition-up${size}`);
      switchCells(cell);
      emptyIndex = emptyIndex + size;
      removeClickable();
      setClickable();
      countMoves();
    }
    if (animationEvent.animationName === `move-right${size}`) {
      cell.classList.remove(`transition-right${size}`);
      switchCells(cell);
      emptyIndex -= 1;
      removeClickable();
      setClickable();
      countMoves();
    }
    if (animationEvent.animationName === `move-left${size}`) {
      cell.classList.remove(`transition-left${size}`);
      switchCells(cell);
      emptyIndex += 1;
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
      cell.ondragover = allowDrop;
      cell.ondrop = drop;
    }
    isWinning();
});

function isWinning() {
  let size = whatSize();
  let winArr = [];
  let playArr = Array.from(playField.childNodes);
  playArr = playArr.map((item) => item.textContent);
  for (let i = 0; i < size*size; i++) {
    winArr.push(String(i+1));
  }
  winArr.pop();
  winArr.push('');

  for (let i = 0; i < size*size; i++) {
    if(winArr[i] !== playArr[i]) {
      return false;
    }
  }
  showWinMessage();
  clearInterval(newTimer);
}

function showWinMessage() {
  let winWrapper = createEl ('div', 'win-wrapper', '.win', document.body);
  let winPopup = createEl ('div', 'win-popup', 'popup', document.body, `Hooray! You solved the puzzle in ${time.textContent.slice(6)} and ${counter} moves!`);

  winWrapper.onclick = function () {
    winWrapper.classList.toggle('win-wrapper-hidden');
    winPopup.classList.toggle('win-wrapper-hidden');
    timer();
    clearCells();
    let size = whatSize();
    drawCells(size);
    counter = 0;
    moves.textContent = 'Moves: 0';
    timeInSec = 0;
  }
}

console.log('Привет, играть можно сразу, как загрузилась страница.\nТаймер включается после первого клика/касания по карточкам.\nМожно начать игру заново, нажав Shuffle and start\nПосле нажатия Shuffle and start или изменения размера поля, игра начинается автоматически (в том числе запускается таймер)\nВсе показанные комбинации можно решить(есть проверка на решабельность)\n\nНе выполнен пункт ТЗ про сохранение в localStorage\nВсё остальное сделано\n\nЕсли есть вопросы - мой ник в Дискорде Vera K(@9fogel)')