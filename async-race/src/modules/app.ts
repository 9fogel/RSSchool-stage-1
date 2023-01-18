import Controller from './controller/controller';

class App {
  private readonly controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  start() {
    this.controller.run();
  }
}

export default App;
