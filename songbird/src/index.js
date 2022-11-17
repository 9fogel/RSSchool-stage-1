// import "@babel/polyfill";//added to entry point instead
import './index.html';//watch changes in index.html
import './index.scss';

import birdsDataEn from './modules/birdsEn';
import birdsDataRu from './modules/birdsRu';

import { changePage, startGame, openBurgerMenu } from './modules/nav';
import { loadGame, handleClick, score, soundMainUrl, soundInfoUrl, resizeWindow } from './modules/quiz';

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

openBurgerMenu();
resizeWindow();
changePage();
startGame();
loadGame(score);
handleClick();

// console.log(birdsDataEn);
// console.log(birdsDataRu);

