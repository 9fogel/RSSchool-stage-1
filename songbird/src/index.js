// import "@babel/polyfill";//added to entry point instead
import './index.html';//watch changes in index.html
import './index.scss';

import birdsDataEn from './modules/birdsEn';
import birdsDataRu from './modules/birdsRu';

import { changePage, startGame } from './modules/nav';
import { loadGame, handleClick, score } from './modules/quiz';

import code from './img/code.png';
// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

export function createElem (tag, class1, parent, content = '') {
  const elem = document.createElement(`${tag}`);
  elem.classList.add(`${class1}`);
  elem.textContent = content;
  parent.append(elem);
  return elem;
}

changePage();
startGame();
loadGame(score);
handleClick();

console.log(birdsDataEn);
console.log(birdsDataRu);

// let birdNames = document.querySelectorAll('.bird-name');
// birdNames.forEach((birdName) => {
//   birdName.innerHTML = birdsDataRu[0][1].name;
// });
