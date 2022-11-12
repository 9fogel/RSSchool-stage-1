import birdsDataEn from './birdsEn';
import birdsDataRu from './birdsRu';

import { getRandomArr } from './random';

let randomArr = getRandomArr();
let level = 0;
let birds;

let scoreWrap = document.querySelector('.score');
let birdNames = document.querySelectorAll('.bird-name');
let birdNameLatin = document.querySelector('.bird-name-latin');
let players = document.querySelectorAll('.player');
let birdDesc = document.querySelector('.bird-desc');
let birdImgs = document.querySelectorAll('.bird-image');

export function loadQuestion(lang, score) {
  if (lang === 'ru') {
    birds = birdsDataRu;
  } else {
    birds = birdsDataEn;
  }
  console.log(randomArr);
  setDefaultState(score);
  createAnswersList(level);
  setCorrectAnswer();
  // createCorrectBirdCard(level);
}

function createAnswersList(level) {
  let answers = document.querySelectorAll('.answer-text');
  answers.forEach((answer, index) => {
    answer.textContent = birds[level][index].name;
  });
}

function setDefaultState(score) {
  scoreWrap.textContent = `Ваши очки: ${score}`;
  setDefaultBird();
}

function setDefaultBird() {
  birdNames[0].textContent = '**********';
  birdNames[1].style.display = 'none';
  birdNameLatin.style.display = 'none';
  birdDesc.innerHTML = '<p>Послушайте плеер.</p><p>Выберите птицу из списка</p>';
  //TODO: add audio for players[0] - birds[level][randomArr[level]].audio;
  players[1].style.display = 'none';
  birdImgs[1].style.display = 'none';
}

function createCorrectBirdCard(level) {
  birdNames.forEach((birdName) => {
    birdName.textContent = birds[level][randomArr[level]].name;
  });
  birdNameLatin.textContent = birds[level][randomArr[level]].species;
  birdDesc.textContent = birds[level][randomArr[level]].description;
  //TODO: add audio - birds[level][randomArr[level]].audio;
  birdImgs.forEach((img) => {
    img.style.backgroundImage = `url(${birds[level][randomArr[level]].image})`;
  });
  // console.log('level', level);
  // console.log(randomArr[level]);
  birdNames[1].style.display = 'block';
  birdNameLatin.style.display = 'block';
  players[1].style.display = 'block';
  birdImgs[1].style.display = 'block';
}

function setCorrectAnswer() {
  let answers = document.querySelectorAll('.answer-text');
  // let answerIcons = document.querySelectorAll('.answer-circle');
  let correctAnswer = birds[level][randomArr[level]].name;
  console.log('answers', answers);
  console.log('correctAnswer', correctAnswer);

  answers.forEach((answer, index) => {
    if(answer.textContent === correctAnswer) {
      console.log('correct', answer.textContent);
      answer.classList.add('correct');
      // answerIcons[index].classList.add('correct-answer');
    } else {
      answer.classList.add('wrong');
      // answerIcons[index].classList.add('wrong-answer');
    }
  });
}


