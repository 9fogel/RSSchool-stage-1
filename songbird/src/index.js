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


changePage();
startGame();

console.log(birdsDataEn);
console.log(birdsDataRu);

let birdNames = document.querySelectorAll('.bird-name');
birdNames.forEach((birdName) => {
  birdName.innerHTML = birdsDataRu[0][1].name;
});

// let score = 0;
// let points = 6;
loadGame(score);
handleClick();