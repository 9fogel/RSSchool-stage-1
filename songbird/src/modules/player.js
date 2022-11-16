import { soundMainUrl, soundInfoUrl } from './quiz';

const playBtn = document.querySelector('.play-button');
const playBtnInfo = document.querySelector('.info-play-button');

const soundMuteBtn = document.querySelector('.sound-mute');
const soundRangeInput = document.querySelector('.sound-range');

const currentDuration = document.querySelector('.current-duration');
const totalDuration = document.querySelector('.total-duration');
const currentDurationInfo = document.querySelector('.info-current-duration');
const totalDurationInfo = document.querySelector('.info-total-duration');
const playRange = document.querySelector('.play-range');
const playRangeInfo = document.querySelector('.info-play-range');

export let isPlay = false;
let isPlay1 = false;
let isPlay2 = false;

let audioMain;
let audioInfo;


export function initPlayer() {
  console.log('init P1', 'isPlay1', isPlay1, 'isPlay2', isPlay2);
  audioMain = new Audio(soundMainUrl);
  console.log('audioMain', audioMain);
  isPlay = false;
  isPlay1 = false;
  playBtn.classList.add('play-icon');
  playBtn.classList.remove('pause-icon');

  audioMain.volume = localStorage.getItem('volume') || 0.3;
  soundRangeInput.value = audioMain.volume * 100;

  function loadPlayer() {
    audioMain.load();
  }

  const nextBtn = document.querySelector('.next-button');
  nextBtn.addEventListener('click', loadPlayer);
  nextBtn.addEventListener('click', setDefaultTime);

  //TODO: когда кнопка посмотреть результаты
  // if () {
  //   nextBtn.removeEventListener('click', loadPlayer);
  // }

//sound level (mute)
  soundRangeInput.addEventListener('input', () => {
    if (localStorage.getItem('volume')) {
      audioMain.value = localStorage.getItem('volume');
    } else {
      let soundValue = soundRangeInput.value;
      audioMain.volume = soundValue / 100;
    }
  });

  soundMuteBtn.addEventListener('click', () => {
    if (audioMain.volume) {//если у аудио есть громкость
      localStorage.setItem('volume', audioMain.volume);
      audioMain.volume = 0;
      if(audioInfo) {
        audioInfo.volume = 0;
      }
      soundMuteBtn.classList.remove('sound-on');
      soundMuteBtn.classList.add('sound-off');//убрать ховер как с answeritems
      soundRangeInput.value = 0;
    } else {
      audioMain.volume = localStorage.getItem('volume');
      if(audioInfo) {
        audioInfo.volume = audioMain.volume;
      }
      soundMuteBtn.classList.remove('sound-off');
      soundMuteBtn.classList.add('sound-on');//TODO: убрать ховер как с answer-items или другой ховер?
      soundRangeInput.value = audioMain.volume * 100;
    }
  });
}


export function playPlayer() {
  function play() {
    showTrackProgress();
    if(!isPlay) {
      audioMain.play();
      playBtn.classList.toggle('play-icon');
      playBtn.classList.toggle('pause-icon');
      isPlay = true;
      isPlay1 = true;
      console.log('isPlay1', isPlay1, 'isPlay2', isPlay2);
    } else {
      if(isPlay1) {
        audioMain.pause();
        playBtn.classList.toggle('play-icon');
        playBtn.classList.toggle('pause-icon');
        isPlay = false;
        isPlay1 = false;
        console.log('isPlay1', isPlay1);
      } else if(isPlay2) {
        audioInfo.pause();
        playBtnInfo.classList.toggle('play-icon');
        playBtnInfo.classList.toggle('pause-icon');
        isPlay2 = false;
        audioMain.play();
        playBtn.classList.toggle('play-icon');
        playBtn.classList.toggle('pause-icon');
        isPlay = true;
        isPlay1 = true;
        console.log('isPlay1', isPlay1);
      }
    }
  }

  playBtn.addEventListener('click', play);
}

export function pausePlayer() {
  console.log(`is Play ${isPlay}`, 'пауза');
  audioMain.pause();
  playBtn.classList.toggle('play-icon');
  playBtn.classList.toggle('pause-icon');
  isPlay = false;
  isPlay1 = false;
  if(audioInfo) {
    audioInfo.pause();
    playBtnInfo.classList.toggle('play-icon');
    playBtnInfo.classList.toggle('pause-icon');
    isPlay2 = false;
  }
}

//player2
export function initPlayerInfo() {
  console.log('init P1', 'isPlay1', isPlay1, 'isPlay2', isPlay2);
  audioInfo = new Audio(soundInfoUrl);
  console.log('audioInfo', audioInfo);
  isPlay = false;
  isPlay2 = false;
  playBtnInfo.classList.add('play-icon');
  playBtnInfo.classList.remove('pause-icon');

  function loadPlayerInfo() {
    audioInfo.load();
  }

  const answerList = document.querySelector('.answer-list');
  answerList.addEventListener('click', loadPlayerInfo);
}

export function playPlayerInfo() {
  function playInfo() {

    // fillTrackTime(audioInfo, currentDurationInfo, totalDurationInfo, playRangeInfo);
    if(!isPlay) {//ничего не играет
      audioInfo.play();
      playBtnInfo.classList.toggle('play-icon');
      playBtnInfo.classList.toggle('pause-icon');
      isPlay = true;
      isPlay2 = true;
    } else {
      if(isPlay1) {
        console.log('играет плеер1 - выключить!!');
        audioMain.pause();
        playBtn.classList.toggle('play-icon');
        playBtn.classList.toggle('pause-icon');
        isPlay1 = false;
        audioInfo.play();
        playBtnInfo.classList.toggle('play-icon');
        playBtnInfo.classList.toggle('pause-icon');
        isPlay = true;
        isPlay2 = true;
        console.log('isPlay2', isPlay2);
      } else if(isPlay2) {
        console.log('выключить 1, включить плеер2');
        audioInfo.pause();
        playBtnInfo.classList.toggle('play-icon');
        playBtnInfo.classList.toggle('pause-icon');
        isPlay = false;
        isPlay2 = false;
        console.log('isPlay2', isPlay2);
      }
    }
  }

  playBtnInfo.addEventListener('click', playInfo);
}


function fillTrackTime(audio, curDur, totalDur, playR) {

  let duration = audio.duration;
  let currentTime = audio.currentTime;
  // console.log('duration', duration);
  // console.log('currentTime', currentTime);

  let progress = (currentTime / duration) * playR.max;
  playR.value = progress ? progress : 0;
  let curMin = Math.floor(currentTime / 60) || '0';
  let curSec = Math.floor(currentTime % 60) || '00';
  let durMin = Math.floor(duration / 60) || '0';
  let durSec = Math.floor(duration % 60) || '00';

  curDur.textContent = `${curMin}:${String(curSec).padStart(2, 0)}`;
  totalDur.textContent = `${durMin}:${String(durSec).padStart(2, 0)}`;
}

function showTrackProgress() {
    audioMain.addEventListener('timeupdate', fillTrackTime(audioMain, currentDuration, totalDuration, playRange));
  playRange.addEventListener('change', () => {
    let progress = playRange.value;
    audioMain.currentTime = (progress / 1000) * audioMain.duration;
    console.log(progress);
  });
  setTimeout(showTrackProgress, 1000);
}

function setDefaultTime() {
  playRange.value = 0;
  audioMain.currentTime = 0;
  currentDuration.textContent = '00:00'
  totalDuration.textContent = '00:00'
}