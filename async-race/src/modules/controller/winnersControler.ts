import Winners from '../view/winners';
import Model from '../model/model';
import { IWinnersController } from './controller-i';
import { IWinner, Path } from '../types.ts/types';
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

    let { wins, time } = await this.hasWonBefore(id);

    if (wins) {
      console.log('existing winner');
      wins += 1;
      time = time < timeSec ? time : timeSec;
      this.updateWinner(id, wins, time);
    } else {
      console.log('first win');
      wins = 1;
      const bodyData = { id: carId, wins, time: timeSec };

      const baseUrl = 'http://127.0.0.1:3000';
      const path = Path.Winners;
      const body = JSON.stringify(bodyData);
      const method = 'POST';
      const headers = { 'Content-Type': 'application/json' };

      await this.model.createWinner(baseUrl, path, method, body, headers);
      console.log('winner created');
    }

    State.savedState.winnersFullDetails[id] = [name, color, wins, timeSec];
  };

  public deleteWinner = async (id: string): Promise<void> => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Winners;
    const method = 'DELETE';
    await this.model.deleteWinner(baseUrl, path, id, method);
    delete State.savedState.winnersFullDetails[id];
    console.log('deleted from winners as well');
  };

  private hasWonBefore = async (id: string): Promise<IWinner> => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Winners;
    const method = 'GET';
    const result = await this.model.getWinner(baseUrl, path, method, id);

    return result;
  };

  private updateWinner = async (
    carId: string,
    winsCount: number,
    timeSec: number,
  ): Promise<void> => {
    const bodyData = { wins: winsCount, time: timeSec };

    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Winners;
    const body = JSON.stringify(bodyData);
    const method = 'PUT';
    const headers = { 'Content-Type': 'application/json' };
    const id = carId;

    await this.model.updateWinner(baseUrl, path, method, body, headers, id);
    console.log('winner updated');
  };
}

export default WinnersController;
