// const header = document.createElement('header');
// header.classList.add('header');
// header.classList.add('container');
// document.body.append(header);
// console.log(header);

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

let footer = createEl ('footer', 'footer', 'container', document.body);
let frameSize = createEl ('div', 'frame-size-wrapper', 'wrapper', footer, 'Frame size:');
let otherframes = createEl ('div', 'other-frames-wrapper', 'wrapper', footer, 'Other sizes:');


for (let i = 0; i < 6; i++) {
  let inputWrapper = createEl ('div', `inputWrapper`, 'inputDiv', otherframes);
  let input = createEl ('input', `size${3+i}`, 'sizeInput', inputWrapper);
  input.type = 'radio';
  input.name = 'size';
  input.value = 3+i;
  input.id = input.name + input.value;
  let label = createEl ('label', `label${3+i}`, 'label', inputWrapper, `${3+i}x${3+i}`);
  // label.for = input.name + input.value;
  label.setAttribute('for', input.name + input.value)
}

function setDefaultSize () {
  let defaultSize = document.querySelector('.size4').value;
  document.querySelector('.size4').setAttribute('checked', 'checked');
  let defaultId = document.querySelector('.size4').id
  let label = document.querySelector(`[for=${defaultId}]`).textContent;
  frameSize.textContent = frameSize.textContent + ' ' + label;
  return defaultSize;
}

window.addEventListener('load', setDefaultSize);

let inputs = document.querySelectorAll('.inputDiv');
inputs.forEach((input, index) => {
  input.addEventListener('click', () => {
    changeSize(index);
  })
})

function changeSize(index) {
  console.log(inputs);
  console.log('change size');
  let size = index + 3;
  frameSize.textContent = 'Frame size: ' + `${size} x ${size}`;
}
