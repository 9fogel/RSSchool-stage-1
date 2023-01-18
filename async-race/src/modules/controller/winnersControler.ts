import Winners from '../view/winners';
import Model from '../model/model';

class WinnersController {
  private readonly winners: Winners;

  private readonly model: Model;

  constructor() {
    this.winners = new Winners();
    this.model = new Model();
  }

  public run(): void {
    // this.getWinners();
    this.winners.render();
  }

  // getWinners(){}
}

export default WinnersController;
