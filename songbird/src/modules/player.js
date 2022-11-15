import { soundMainUrl, soundInfoUrl } from './quiz';

const playBtns = document.querySelectorAll('.play-button');
const infoPlayBtns = document.querySelectorAll('.info-play-button');

export let isPlay = false;

let audioMain;
let audioInfo;

export function initPlayer() {
  // console.log('audioMainURL', soundMainUrl);
  audioMain = new Audio(soundMainUrl);
  console.log('audioMain', audioMain);

  function loadPlayer() {
    audioMain.load();
    console.log(`is Play ${isPlay}`, 'load player1');
  }

  const nextBtn = document.querySelector('.next-button');
  nextBtn.addEventListener('click', loadPlayer);
}

export function playPlayer() {
  console.log(`is Play ${isPlay}`, 'play player')
  function play() {
    if(!isPlay) {
      audioMain.play();
      if(audioInfo) {
        audioInfo.pause();
      }
      isPlay = true;
    } else {
      audioMain.pause();
      isPlay = false;
    }
  }
  //иконки не работают

  playBtns.forEach((playBtn) => {
    playBtn.addEventListener('click', play);
  });
}

// export function playPlayer() {
//   function play() {
//     if(!isPlay) {
//       console.log(`is Play ${isPlay}`, 'включить плеер1');
//       audioMain.play();
//       // audioInfo.pause();
//       playBtns[0].classList.add('hidden');
//       playBtns[1].classList.remove('hidden');

//       isPlay = true;
//     } else {
//       console.log(`is Play ${isPlay}`, 'пауза плеер1');
//       audioMain.pause();
//       playBtns[1].classList.add('hidden');
//       playBtns[0].classList.remove('hidden');

//       isPlay = false;
//     }
//   }
// }

export function pausePlayer() {
  console.log(`is Play ${isPlay}`, 'пауза');
  audioMain.pause();
  playBtns[1].classList.add('hidden');
  playBtns[0].classList.remove('hidden');
  isPlay = false;
}

export function initPlayerInfo() {
  // console.log('audioInfoURL', soundInfoUrl);
  audioInfo = new Audio(soundInfoUrl);
  console.log('audioInfo', audioInfo);

  function loadPlayerInfo() {
    audioInfo.load();
    console.log('load player2');
  }

  const answerList = document.querySelector('.answer-list');
  answerList.addEventListener('click', loadPlayerInfo);

  function playInfoSound() {
      console.log('включить плеер2');
      if(!isPlay) {
        audioInfo.play();
        audioMain.pause();
        // infoPlayBtns[0].classList.add('hidden');
        // infoPlayBtns[1].classList.remove('hidden');
        isPlay = true;
      } else {
        audioInfo.pause();
        // infoPlayBtns[1].classList.add('hidden');
        // infoPlayBtns[0].classList.remove('hidden');
        isPlay = false;
      }
    }

  infoPlayBtns.forEach((playInfoBtn) => {
    playInfoBtn.addEventListener('click', playInfoSound);
  });
}