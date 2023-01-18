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
    this.listenButtons();
  }

  private listenButtons(): void {
    const buttons: Tbuttons = {
      createBtn: document.querySelector('.create-btn'),
      updateBtn: document.querySelector('.update-btn'),
      raceBtn: document.querySelector('.race-btn'),
      resetBtn: document.querySelector('.reset-btn'),
      generateBtn: document.querySelector('.generate-btn'),
    };

    buttons.createBtn?.addEventListener('click', this.createCar);
  }

  private getCars = async (): Promise<void> => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Garage;

    const limit = 7;
    const currentPage = State.savedState.pageNum;
    // const page: HTMLSpanElement | null = document.querySelector('.current-page');
    // if (HTMLSpanElement && page?.textContent) {
    //   currentPage = +page.textContent;
    // }

    const { cars, total } = await this.model.getGarage(baseUrl, path, currentPage, limit);

    const carsArr = [...(await cars)];
    State.savedState.cars = carsArr;
    if (total) {
      State.savedState.totalCars = +total;
    }
  };

  private createCar = async (): Promise<void> => {
    const nameInput: HTMLInputElement | null = document.querySelector('#create-name');
    let carName = '';
    if (nameInput) {
      console.log('set name');
      carName = nameInput.value;
    }

    const colorInput: HTMLInputElement | null = document.querySelector('#create-color');
    let carColor = '#55ff5c';
    if (colorInput) {
      console.log('set color');
      carColor = colorInput.value;
    }

    const bodyData = { name: carName, color: carColor };
    console.log(bodyData);

    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Garage;
    const body = JSON.stringify(bodyData);
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };

    await this.model.createCar(baseUrl, path, method, body, headers);
    this.garage.clearGaragePage();
    this.run();
  };
}

export default GarageController;
