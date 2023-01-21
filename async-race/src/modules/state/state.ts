import { ISavedState } from './state-i';

class State {
  static savedState: ISavedState = {
    pageNumGarage: 1,
    pageLimitGarage: 7,
    cars: [],
    totalCars: 0,
    page: 'garage',
    id: '',
    animation: {},
    race: false,
    winnerFound: false,
    controller: {},
    pageNumWinners: 1,
    pageLimitWinners: 10,
    winners: [],
    totalWinners: 0,
  };
}

export default State;
