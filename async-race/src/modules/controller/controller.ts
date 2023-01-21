import View from '../view/appView';
import GarageController from './garageController';
import WinnersController from './winnersControler';
import State from '../state/state';
import { TElements } from './controller-i';

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
    this.refreshPagination(State.savedState.page);
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

  private refreshPagination(page: string) {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pagination.innerHTML = '';
      pagination.innerHTML = this.view.renderPagination(page);
    }
    this.handlePagination(page);
  }

  private async handlePagination(page: string) {
    await this.garage.getCars();
    const pagination: TElements = {
      previousBtn: document.querySelector('.previous-btn'),
      curPage: document.querySelector('.current-page'),
      totalPages: document.querySelector('.total-pages'),
      nextBtn: document.querySelector('.next-btn'),
    };

    if (pagination.curPage && pagination.totalPages) {
      let maxItems;
      let totalItems;
      if (page === 'garage') {
        pagination.curPage.textContent = State.savedState.pageNumGarage.toString();
        const totalPages = Math.ceil(State.savedState.totalCars / State.savedState.pageLimitGarage);
        pagination.totalPages.textContent = (totalPages || 1).toString();
        maxItems = State.savedState.pageNumGarage * State.savedState.pageLimitGarage;
        totalItems = State.savedState.totalCars;
      } else {
        pagination.curPage.textContent = State.savedState.pageNumWinners.toString();
        const totalPages = Math.ceil(
          State.savedState.totalWinners / State.savedState.pageLimitWinners,
        );
        pagination.totalPages.textContent = (totalPages || 1).toString();
        maxItems = State.savedState.pageNumWinners * State.savedState.pageLimitWinners;
        totalItems = State.savedState.totalWinners;
      }

      if (+pagination.curPage.textContent > 1) {
        pagination.previousBtn?.removeAttribute('disabled');
      } else {
        pagination.previousBtn?.setAttribute('disabled', 'disabled');
      }
      if (maxItems < totalItems) {
        pagination.nextBtn?.removeAttribute('disabled');
      } else {
        pagination.nextBtn?.setAttribute('disabled', 'disabled');
      }
    }

    pagination.nextBtn?.addEventListener('click', () => {
      this.switchToNextPage(page);
    });
    pagination.previousBtn?.addEventListener('click', () => {
      this.switchToPreviousPage(page);
    });
  }

  private switchToNextPage(page: string) {
    if (page === 'garage') {
      State.savedState.pageNumGarage += 1;
    } else {
      State.savedState.pageNumWinners += 1;
    }
    this.run();
  }

  private switchToPreviousPage(page: string) {
    if (page === 'garage') {
      State.savedState.pageNumGarage -= 1;
    } else {
      State.savedState.pageNumWinners -= 1;
    }
    this.run();
  }

  private changeView(event: Event): void {
    const garageWrap: HTMLElement | null = document.querySelector('.garage-wrapper');
    const winnersWrap: HTMLElement | null = document.querySelector('.winners-wrapper');
    if (garageWrap && winnersWrap) {
      if (event.target instanceof HTMLLIElement) {
        if (event.target.innerText.toLowerCase() === 'garage') {
          winnersWrap.classList.add('hidden');
          garageWrap.classList.remove('hidden');
          State.savedState.page = 'garage';
          this.refreshPagination('garage');
        } else {
          garageWrap.classList.add('hidden');
          winnersWrap.classList.remove('hidden');
          State.savedState.page = 'winners';
          this.refreshPagination('winners');
        }
      }
    }
  }
}

export default Controller;
