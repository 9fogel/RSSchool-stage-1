// import "@babel/polyfill";//added to entry point instead
import './index.html';//watch changes in index.html
import './index.scss';

import { changePage, startGame, openBurgerMenu } from './modules/nav';
import { loadGame, handleClick, score, resizeWindow } from './modules/quiz';

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

