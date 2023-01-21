import { ISavedState } from './state-i';

class State {
  static savedState: ISavedState = {
    pageNum: 1,
    cars: [],
    totalCars: 0,
    page: 'garage',
    id: '',
    animation: {},
    race: false,
    winnerFound: false,
    controller: {},
  };
}

export default State;
