import Winners from '../view/winners';
import Model from '../model/model';
import { IWinnersController } from './controller-i';
// import { IWinner, Path } from '../types.ts/types';
import { Path } from '../types.ts/types';
import State from '../state/state';

class WinnersController implements IWinnersController {
  private readonly winners: Winners;

  private readonly model: Model;

  constructor() {
    this.winners = new Winners();
    this.model = new Model();
  }

  public run(): void {
    this.getWinners();
    this.winners.render();
  }

  public getWinners = async (): Promise<void> => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Winners;

    const limit = State.savedState.pageLimitWinners;
    const currentPage = State.savedState.pageNumWinners;
    // console.log(await this.model.getWinners(baseUrl, path, currentPage, limit));

    const { winners, total } = await this.model.getWinners(baseUrl, path, currentPage, limit);

    const winnersArr = [...(await winners)];
    State.savedState.winners = winnersArr;
    if (total) {
      State.savedState.totalWinners = +total;
    }
  };
}

export default WinnersController;
