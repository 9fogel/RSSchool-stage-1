// import { score } from './quiz';

const contentEn = {
  nav: {
    about: 'About',
    quiz: 'Quiz',
    gallery: 'Gallery',
    results: 'Results',
  },
  aboutPage: {
    title: 'Do you love birds?',
    text1: 'Ready to guess them by chirping?',
    text2: 'Press start to open the quiz',
    startBtn: 'Start',
  },
  quizPage: {
    score: 'Score: ',
    level1: 'Warm-up',
    level2: 'Passerines',
    level3: 'Forest birds',
    level4: 'Songbirds',
    level5: 'Predator birds',
    level6: 'Sea ​​birds',
    playerDesc: '<p>Listen to the player.</p><p>Choose a bird from the list.</p></br><p>You will receive 6 points for correct answer on the first try.</p><p>Each subsequent attempt will bring less points (minus 1 point for each attempt).</p>',
    nextBtn: 'Next Level',
    showResultsBtn: 'Show Results',
  },
  resultsPage: {
    congrats: 'Congrats!',
    resultsText: 'You passed the game and got ${score} points out of 30',
    // resultsText: `You passed the game and got ${score} points out of 30`,
    resultsBtn: 'Restart',
  },
}

export default contentEn;