import Model from '../model/model';
import { Path, Tbuttons } from '../types.ts/types';

class Controller {
  // private readonly baseUrl: string;

  // private readonly path: Path;

  private readonly model: Model;

  constructor() {
    // this.baseUrl = 'http://127.0.0.1:3000';
    // this.path = Path.Garage;
    this.model = new Model();
    console.log('constructor', this.model);
  }

  public listenNav(): void {
    const navBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-item');
    navBtns.forEach((link: HTMLElement) => {
      link.addEventListener('click', (event: MouseEvent) => {
        this.changeView(event);
        document.querySelector('.nav-item-active')?.classList.remove('nav-item-active');
        link.classList.add('nav-item-active');
      });
    });
  }

  private changeView(event: Event): void {
    const garageWrap: HTMLElement | null = document.querySelector('.garage-wrapper');
    const winnersWrap: HTMLElement | null = document.querySelector('.winners-wrapper');
    if (garageWrap && winnersWrap) {
      if (event.target instanceof HTMLLIElement) {
        console.log(event.target);
        if (event.target.innerText.toLowerCase() === 'garage') {
          winnersWrap.classList.add('hidden');
          garageWrap.classList.remove('hidden');
        } else {
          garageWrap.classList.add('hidden');
          winnersWrap.classList.remove('hidden');
        }
      }
    }
  }

  public listenButtons() {
    const buttons: Tbuttons = {
      createBtn: document.querySelector('.create-btn'),
      updateBtn: document.querySelector('.update-btn'),
      raceBtn: document.querySelector('.race-btn'),
      resetBtn: document.querySelector('.reset-btn'),
      generateBtn: document.querySelector('.generate-btn'),
    };

    if (buttons.createBtn) {
      buttons.createBtn.addEventListener('click', this.model.createCar);
    }
  }

  // public getCars = async () => {
  public getCars = () => {
    const baseUrl = 'http://127.0.0.1:3000';
    const path = Path.Garage;

    // const response = await fetch(`${baseUrl}${path}`);
    // const data = await response.json();
    // console.log(data);

    // console.log(baseUrl, path);
    // console.log('this', this);
    // console.log('model', this.model);
    this.model.getGarage(baseUrl, path);
  };

  public createCar = () => {
    this.model.createCar();
  };

  public updateCar = () => {
    this.model.updateCar();
  };
}

export default Controller;
