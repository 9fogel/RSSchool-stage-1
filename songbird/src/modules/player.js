import { soundMainUrl, soundInfoUrl } from './quiz';

const playBtns = document.querySelectorAll('.play-button');
const infoPlayBtns = document.querySelectorAll('.info-play-button');

const soundMuteBtn = document.querySelector('.sound-mute');
const soundRangeInput = document.querySelector('.sound-range');

export let isPlay = false;

let audioMain;
let audioInfo;

export function initPlayer() {
  // console.log('audioMainURL', soundMainUrl);
  audioMain = new Audio(soundMainUrl);
  console.log('audioMain', audioMain);

  audioMain.volume = localStorage.getItem('volume') || 0.3;
  soundRangeInput.value = audioMain.volume * 100;

  function loadPlayer() {
    audioMain.load();
    console.log(`is Play ${isPlay}`, 'load player1');
  }

  const nextBtn = document.querySelector('.next-button');
  nextBtn.addEventListener('click', loadPlayer);

//sound level (mute)
  soundRangeInput.addEventListener('input', () => {
    let soundValue = soundRangeInput.value;
    audioMain.volume = soundValue / 100;
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
  //TODO: иконки не работают

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

// //перенести внутрь инит?
// soundMuteBtn.addEventListener('click', () => {
//   console.log(audioMain.volume);
//   audioInfo.volume = audioMain.volume;
//   if (audioMain.volume) {//если у аудио есть громкость
//     // localStorage.setItem('volume', audioMain.volume);
//     audioMain.volume = 0;
//     audioInfo.volume = 0;
//     soundMuteBtn.classList.remove('sound-on');
//     soundMuteBtn.classList.add('sound-off');
//     soundRangeInput.value = 0;
//   } else {

//   }
// });