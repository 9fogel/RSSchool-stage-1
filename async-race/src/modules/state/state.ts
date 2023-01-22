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

  static isLastPage(page: string): boolean {
    let curPage;
    let pageLimit;
    let totalItems;
    if (page === 'garage') {
      curPage = State.savedState.pageNumGarage;
      pageLimit = State.savedState.pageLimitGarage;
      totalItems = State.savedState.totalCars;
    } else {
      curPage = State.savedState.pageNumWinners;
      pageLimit = State.savedState.pageLimitWinners;
      totalItems = State.savedState.totalWinners;
    }
    if (curPage * pageLimit < totalItems) {
      return false;
    }
    return true;
  }
}

export default State;
