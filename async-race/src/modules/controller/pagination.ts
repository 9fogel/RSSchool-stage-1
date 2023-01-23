import State from '../state/state';
import View from '../view/appView';
import GarageController from './garageController';
import WinnersController from './winnersControler';
import { TElements, IPagination } from './controller-i';

class Pagination implements IPagination {
  private readonly view: View;

  private readonly garage: GarageController;

  private readonly winners: WinnersController;

  constructor() {
    this.view = new View();
    this.garage = new GarageController();
    this.winners = new WinnersController();
  }

  public refreshPagination(page: string): void {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pagination.innerHTML = '';
      pagination.innerHTML = this.view.renderPagination(page);
    }
    this.handlePagination(page);
  }

  private async handlePagination(page: string): Promise<void> {
    await this.garage.getCars();
    // await this.winners.getWinners();
    const pagination: TElements = {
      previousBtn: document.querySelector('.previous-btn'),
      curPage: document.querySelector('.current-page'),
      nextBtn: document.querySelector('.next-btn'),
    };
    if (pagination.curPage) {
      if (page === 'garage') {
        pagination.curPage.textContent = State.savedState.pageNumGarage.toString();
      } else {
        pagination.curPage.textContent = State.savedState.pageNumWinners.toString();
      }
      if (State.savedState.pageNumGarage > 1) {
        pagination.previousBtn?.removeAttribute('disabled');
      } else {
        pagination.previousBtn?.setAttribute('disabled', 'disabled');
      }
      if (State.savedState.pageNumWinners > 1) {
        pagination.previousBtn?.removeAttribute('disabled');
      } else {
        pagination.previousBtn?.setAttribute('disabled', 'disabled');
      }
      if (State.isLastPage(page)) {
        pagination.nextBtn?.setAttribute('disabled', 'disabled');
      } else {
        pagination.nextBtn?.removeAttribute('disabled');
      }
    }

    pagination.nextBtn?.addEventListener('click', () => {
      this.switchToNextPage(page);
    });
    pagination.previousBtn?.addEventListener('click', () => {
      this.switchToPreviousPage(page);
    });
  }

  private async switchToNextPage(page: string): Promise<void> {
    if (page === 'garage') {
      State.savedState.pageNumGarage += 1;
      await this.garage.run();
      this.refreshPagination(page);
    } else {
      State.savedState.pageNumWinners += 1;
      await this.winners.run();
      this.refreshPagination(page);
    }
  }

  private async switchToPreviousPage(page: string): Promise<void> {
    if (page === 'garage') {
      State.savedState.pageNumGarage -= 1;
      await this.garage.run();
      this.refreshPagination(page);
    } else {
      State.savedState.pageNumWinners -= 1;
      await this.winners.run();
      this.refreshPagination(page);
    }
  }
}

export default Pagination;
