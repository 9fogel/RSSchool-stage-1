import View from '../view/appView';
import GarageController from './garageController';
import WinnersController from './winnersControler';
import State from '../state/state';
import { IController } from './controller-i';
import Pagination from './pagination';

class Controller implements IController {
  private readonly view: View;

  private readonly garage: GarageController;

  private readonly winners: WinnersController;

  private readonly pagination: Pagination;

  constructor() {
    this.view = new View();
    this.garage = new GarageController();
    this.winners = new WinnersController();
    this.pagination = new Pagination();
  }

  public async run(): Promise<void> {
    this.view.render();
    this.listenNav();
    await this.garage.getCars();
    await this.winners.getWinners();
    this.garage.run();
    this.winners.run();
    this.pagination.refreshPagination(State.savedState.page);
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

  private async changeView(event: Event): Promise<void> {
    const garageWrap: HTMLElement | null = document.querySelector('.garage-wrapper');
    const winnersWrap: HTMLElement | null = document.querySelector('.winners-wrapper');
    if (garageWrap && winnersWrap) {
      if (event.target instanceof HTMLLIElement) {
        if (event.target.innerText.toLowerCase() === 'garage') {
          winnersWrap.classList.add('hidden');
          garageWrap.classList.remove('hidden');
          State.savedState.page = 'garage';
          this.garage.run();
          this.pagination.refreshPagination('garage');
        } else {
          await this.winners.getWinners();
          this.winners.rerenderWinners();
          garageWrap.classList.add('hidden');
          winnersWrap.classList.remove('hidden');
          State.savedState.page = 'winners';
          this.pagination.refreshPagination('winners');
        }
      }
    }
  }
}

export default Controller;
