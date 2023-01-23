import State from '../state/state';
import { ICar } from '../types.ts/types';

class Match {
  public static createCarWinnerMatch(): void {
    const { cars } = State.savedState;
    const { winners } = State.savedState;

    winners.forEach((winner) => {
      if (winner?.id) {
        const carArr: Array<ICar | undefined> = cars.filter((car) => car?.id === winner?.id);
        const car: ICar | undefined = carArr[0];
        if (car) {
          State.savedState.winnersFullDetails[winner.id] = [
            car.name,
            car.color,
            winner.wins,
            winner.time,
          ];
        }
      }
    });
  }
}

export default Match;
