import View from '../view/appView';
import GarageController from './garageController';
import WinnersController from './winnersControler';

class Controller {
  private readonly view: View;

  private readonly garage: GarageController;

  private readonly winners: WinnersController;

  constructor() {
    this.view = new View();
    this.garage = new GarageController();
    this.winners = new WinnersController();
  }

  public run(): void {
    this.view.render();
    this.listenNav();
    this.garage.run();
    this.winners.run();
    console.log('run controller');
  }

  private listenNav(): void {
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
    // if (event.target instanceof HTMLLIElement) {
    //   // console.log(event.target);
    //   if (event.target.innerText.toLowerCase() === 'garage') {
    //     // this.view.garage.render();
    //     console.log('switch to Garage');
    //   } else {
    //     // this.view.winners.render();
    //     console.log('switch to Winners');
    //   }

    const garageWrap: HTMLElement | null = document.querySelector('.garage-wrapper');
    const winnersWrap: HTMLElement | null = document.querySelector('.winners-wrapper');
    if (garageWrap && winnersWrap) {
      if (event.target instanceof HTMLLIElement) {
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
}

export default Controller;
