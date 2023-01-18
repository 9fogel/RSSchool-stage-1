// import Controller from '../controller/controller';
import Garage from './garage';
import Winners from './winners';

class View {
  private readonly garage: Garage;

  private readonly winners: Winners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  render() {
    this.garage.render();
    this.winners.render();
  }
}

export default View;
