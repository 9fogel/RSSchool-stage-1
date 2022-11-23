import birdsDataEn from './birdsEn';
import birdsDataRu from './birdsRu';

import { birds, lang, changeLang } from './lang';
import { fillTrackTime } from './player';
import { createElem } from '../../src/index';

let timer;
let audioGallery;
let isPlay3 = false;
let soundGalleryUrl;
let birdsData;
let birdsArrRu = [];
let birdsArrEn = [];
let galleryWrapper = document.querySelector('.gallery-wrapper');
let popupWrapper = document.querySelector('.popup-wrapper');

if (lang === 'ru') {
  birdsData = birdsDataRu;
}

function createBirdsArr() {
  for (let i = 0; i < birdsData.length; i++) {
    birdsArrRu.push(...birdsDataRu[i]);
    birdsArrEn.push(...birdsDataEn[i]);
  }
  birdsArrRu.forEach((bird, index) => {
    bird.id = index;
  });
  birdsArrEn.forEach((bird, index) => {
    bird.id = index;
  });
}

createBirdsArr();

function checkLangGallery() {
  if(localStorage.getItem('9fogelSettings') === 'en') {}
  if(lang === 'ru') {
    birdsData = birdsArrRu;
    } else {
      birdsData = birdsArrEn;
  }
}

showBirdCards();

export function showBirdCards(lang) {
  changeLang();
  checkLangGallery();

  birdsData.forEach((bird, i) => {
    let card = createElem('div', 'card', galleryWrapper);
    let cardImg = createElem('img', 'card-image', card);
    cardImg.src = bird.image;
    cardImg.setAttribute('id', `${bird.id}`);
  });
}

const clickCard = (event) => {
  let card = event.target;
  let birdId;
  if(event.target.classList.contains('card-image')) {
    birdId = event.target.id;
  } else {
    birdId = event.target.firstChild.id;
  }
  generateCard(birdId);
}

galleryWrapper.addEventListener('click', clickCard);

function generateCard(id) {
  birdsData = birdsArrRu;
  if(localStorage.getItem('9fogelSettings') === 'en') {
    birdsData = birdsArrEn;
  }
  if(localStorage.getItem('9fogelSettings') === 'ru') {
    birdsData = birdsArrRu;
  }
  let bird = birdsData[id];
  let cardPopup = createElem('div', 'card-popup', galleryWrapper);
  let cardImg = createElem('div', 'gallery-bird-image', cardPopup);
  cardImg.style.backgroundImage = `url(${bird.image})`;
  let birdName = createElem('p', 'gallery-bird-name', cardPopup, bird.name);
  let birdNameLatin = createElem('p', 'gallery-bird-name-latin', cardPopup, bird.species);
  soundGalleryUrl = bird.audio;
  initPlayerGallery();
  let player = createElem('div', 'player', cardPopup);
  let playerControls = createElem('div', 'player-controls', player);
  let playBtnGallery = createElem('button', 'gallery-play-button', playerControls);
  playBtnGallery.addEventListener('click', playPlayerGallery);
  let playRangeWrap = createElem('div', 'play-range-wrapper', playerControls);
  let playRangeGallery = createElem('input', 'gallery-play-range', playRangeWrap);
  playRangeGallery.classList.add('play-range');
  playRangeGallery.setAttribute('type', 'range');
  playRangeGallery.setAttribute('min', '0');
  playRangeGallery.setAttribute('max', '1000');
  playRangeGallery.setAttribute('value', '0');
  let playerDur = createElem('div', 'player-duration', playRangeWrap);
  let curDurGallery = createElem('span', 'gallery-current-duration', playerDur, '0:00');
  let totalDurGallery = createElem('span', 'gallery-total-duration', playerDur, '0:00');
  let desc = createElem('p', 'gallery-bird-desc', cardPopup, bird.description);
  popupWrapper.classList.add('popup-wrapper-active');
  galleryWrapper.removeEventListener('click', clickCard);
  fillTrackTimeGal(audioGallery, curDurGallery, totalDurGallery, playRangeGallery);
  // document.body.style.overflow = 'hidden';
}

function closeCard() {
  audioGallery.removeEventListener('timeupdate', fillTrackTime);
  document.querySelector('.card-popup').remove();
  popupWrapper.classList.remove('popup-wrapper-active');
  // document.body.style.overflow = 'unset';
  galleryWrapper.addEventListener('click', clickCard);
}

popupWrapper.addEventListener('click', () => {
  pausePlayerGallery();
  clearTimeout(timer);
  closeCard();
});

function initPlayerGallery() {
  audioGallery = new Audio(soundGalleryUrl);
  isPlay3 = false;
  audioGallery.volume = localStorage.getItem('9fogelVolume') || 0.3;
  audioGallery.load();
}


function pausePlayerGallery() {
  let playBtnGallery = document.querySelector('.gallery-play-button');
  if(audioGallery) {
    audioGallery.pause();
    isPlay3 = false;
  }
}

function playPlayerGallery() {
  let playBtnGallery = document.querySelector('.gallery-play-button');
  if(!isPlay3) {
    audioGallery.play();
    showTrackProgressGallery();
    playBtnGallery.classList.add('pause-icon');
    isPlay3 = true;
  } else {
    pausePlayerGallery();
    playBtnGallery.classList.remove('pause-icon');
  }
  audioGallery.addEventListener('ended', () => {//когда доиграет до конца трека
    playBtnGallery.classList.remove('pause-icon');
    isPlay3 = false;
  });
}


function fillTrackTimeGal(audio, curDur, totalDur, playR) {
  let duration = audio.duration;
  let currentTime = audio.currentTime;

  let progress = (currentTime / duration) * playR.max;
  playR.value = progress ? progress : 0;
  let curMin = Math.floor(currentTime / 60) || '0';
  let curSec = Math.floor(currentTime % 60) || '00';
  let durMin = Math.floor(duration / 60) || '0';
  let durSec = Math.floor(duration % 60) || '00';

  curDur.textContent = `${curMin}:${String(curSec).padStart(2, 0)}`;
  totalDur.textContent = `${durMin}:${String(durSec).padStart(2, 0)}`;
}


function showTrackProgressGallery() {

  if(audioGallery) {
    let playRangeGallery = document.querySelector('.gallery-play-range');
    let curDurGallery = document.querySelector('.gallery-current-duration');
    let totalDurGallery = document.querySelector('.gallery-total-duration');
    audioGallery.addEventListener('timeupdate', fillTrackTimeGal(audioGallery, curDurGallery, totalDurGallery, playRangeGallery));

    playRangeGallery.addEventListener('change', () => {
    let progress = playRangeGallery.value;
    audioGallery.currentTime = (progress / 1000) * audioGallery.duration;
    });

    timer = setTimeout(showTrackProgressGallery, 1000);
  }
}
