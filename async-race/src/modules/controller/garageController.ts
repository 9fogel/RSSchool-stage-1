import Model from '../model/model';
import Garage from '../view/garage';
import State from '../state/state';
import { Path, Tbuttons } from '../types.ts/types';

class GarageController {
  private readonly garage: Garage;

  private readonly model: Model;

  constructor() {
    this.garage = new Garage();
    this.model = new Model();
  }

  public async run(): Promise<void> {
    await this.getCars();
    this.garage.render();
  }

  public listenButtons(): void {
    const buttons: Tbuttons = {
      createBtn: document.querySelector('.create-btn'),
      updateBtn: document.querySelector('.update-btn'),
      raceBtn: document.querySelector('.race-btn'),
      resetBtn: document.querySelector('.reset-btn'),
      generateBtn: document.querySelector('.generate-btn'),
    };

    buttons.createBtn?.addEventListener('click', this.model.createCar);
  }

  public getCars = async () => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Garage;

    const limit = 7;
    let currentPage = 1;
    const page: HTMLSpanElement | null = document.querySelector('.current-page');
    if (HTMLSpanElement && page?.textContent) {
      currentPage = +page.textContent;
    }

    const { cars, total } = await this.model.getGarage(baseUrl, path, currentPage, limit);

    const carsArr = [...(await cars)];
    State.savedState.cars = carsArr;
    if (total) {
      State.savedState.totalCars = +total;
    }
  };

  public createCar = () => {
    this.model.createCar();
  };

  public updateCar = () => {
    this.model.updateCar();
  };
}

export default GarageController;
