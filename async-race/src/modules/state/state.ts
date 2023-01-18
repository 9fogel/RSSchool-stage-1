import { TState } from '../types.ts/types';

class State {
  static savedState: TState = {
    pageNum: 1,
    cars: [],
    totalCars: 0,
    page: 'garage',
  };
}

export default State;
