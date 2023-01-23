import Winners from '../view/winners';
import Model from '../model/model';
import { IWinnersController } from './controller-i';
import { IWinner, Path } from '../types.ts/types';
// import { Path } from '../types.ts/types';
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

  public createWinner = async (id: string): Promise<void> => {
    const carId = +id;
    const timeMs = State.savedState.duration[id];
    const timeSec = timeMs / 1000;
    let winsCount;

    if (this.hasWonBefore(id)) {
      const array = this.hasWonBefore(id) as Array<IWinner>;
      winsCount = array[0].wins;
      // TODO: вызвать updateWinner?
    } else {
      winsCount = 1;
    }

    if (!this.hasWonBefore(id)) {
      winsCount = 1;

      const bodyData = { id: carId, wins: winsCount, time: timeSec };
      console.log(bodyData);

      const baseUrl = 'http://127.0.0.1:3000';
      const path = Path.Winners;
      const body = JSON.stringify(bodyData);
      const method = 'POST';
      const headers = { 'Content-Type': 'application/json' };

      await this.model.createWinner(baseUrl, path, method, body, headers);
    }
  };

  private hasWonBefore(id: string): false | Array<IWinner | undefined> {
    const winnerArr = State.savedState.winners.filter((winner) => winner?.id === +id);
    if (winnerArr.length === 0) {
      return false;
    }

    return winnerArr;
  }
}

export default WinnersController;
