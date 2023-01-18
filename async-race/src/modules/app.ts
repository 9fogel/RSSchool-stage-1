// import Controller from './controller/garageController';
import Controller from './controller/controller';

class App {
  private readonly controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  public start(): void {
    this.controller.run();
    // this.controller.getCars();
  }
}

export default App;
