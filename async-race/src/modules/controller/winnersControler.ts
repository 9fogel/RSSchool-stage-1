import Winners from '../view/winners';
import Model from '../model/model';
import { IWinnersController } from './controller-i';
import { IWinner, Path } from '../types.ts/types';
// import { Path } from '../types.ts/types';
import State from '../state/state';
import Match from '../utils/matchCarWinner';

class WinnersController implements IWinnersController {
  private readonly winners: Winners;

  private readonly model: Model;

  constructor() {
    this.winners = new Winners();
    this.model = new Model();
  }

  public async run(): Promise<void> {
    this.winners.render();
  }

  public rerenderWinners(): void {
    this.winners.clearWinners();
    this.winners.render();
    const garageWrap: HTMLElement | null = document.querySelector('.garage-wrapper');
    const winnersWrap: HTMLElement | null = document.querySelector('.winners-wrapper');
    if (garageWrap && winnersWrap) {
      garageWrap.classList.add('hidden');
      winnersWrap.classList.remove('hidden');
    }
  }

  public getWinners = async (): Promise<void> => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Winners;

    const limit = State.savedState.pageLimitWinners;
    const currentPage = State.savedState.pageNumWinners;

    const { winners, total } = await this.model.getWinners(baseUrl, path, currentPage, limit);

    const winnersArr = [...(await winners)];
    State.savedState.winners = winnersArr;
    Match.createCarWinnerMatch();
    if (total) {
      State.savedState.totalWinners = +total;
    }
  };

  public createWinner = async (id: string, name: string, color: string): Promise<void> => {
    const carId = +id;
    const timeMs = State.savedState.duration[id];
    const timeSec = timeMs / 1000;

    let winsCount = (await this.hasWonBefore(id)).wins;

    if (winsCount) {
      winsCount += 1;
      // TODO: update existing winner
    } else {
      console.log('first win');
      winsCount = 1;
      const bodyData = { id: carId, wins: winsCount, time: timeSec };

      const baseUrl = 'http://127.0.0.1:3000';
      const path = Path.Winners;
      const body = JSON.stringify(bodyData);
      const method = 'POST';
      const headers = { 'Content-Type': 'application/json' };

      await this.model.createWinner(baseUrl, path, method, body, headers);
      console.log('winner created');
    }

    State.savedState.winnersFullDetails[id] = [name, color, winsCount, timeSec];
    console.log(State.savedState.winnersFullDetails);
    console.log(State.savedState);
  };

  private hasWonBefore = async (id: string): Promise<IWinner> => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Winners;
    const method = 'GET';
    const result = await this.model.getWinner(baseUrl, path, method, id);

    return result;
  };

  // private updateWinner(id: string) {
  //   console.log('update id', id);
  // }
}

export default WinnersController;
