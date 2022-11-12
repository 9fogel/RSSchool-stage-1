// import "@babel/polyfill";//added to entry point instead
import './index.html';//watch changes in index.html
import './index.scss';
import { changePage, startGame } from './modules/nav';
import code from './img/code.png';

// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);


changePage();
startGame();