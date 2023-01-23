import State from '../state/state';
import { IView } from './view-i';

class View implements IView {
  public render(): void {
    this.renderHeader();
    this.renderMain();
    this.renderFooter(State.savedState.page);
  }

  public renderPagination(pageSelected: string): string {
    let currentPage;
    if (pageSelected === 'garage') {
      currentPage = State.savedState.pageNumGarage;
    }
    if (pageSelected === 'winners') {
      currentPage = State.savedState.pageNumWinners;
    }
    const pagination = `<button class="previous-btn">previous</button>
    <p>Page <span class="current-page">${currentPage}</span></p>
  <button class="next-btn">next</button>`;

    return pagination;
  }

  private renderFooter(pageSelected: string): void {
    const footer = `<footer class="pagination container">
    ${this.renderPagination(pageSelected)}
  </footer>`;

    document.body.innerHTML += footer;
  }

  private renderHeader(): void {
    const headerContent = `<header class="header container">
      <nav class="navigation">
        <ul class="nav-list">
          <li class="nav-item nav-item-active">Garage</li>
          <li class="nav-item">Winners</li>
        </ul>
      </nav>
    </header>`;

    document.body.innerHTML = headerContent;
  }

  private renderMain(): void {
    const mainContent = `<main class="main container">
    <h1 class="hidden">Async race</h1>
    </main>`;
    document.body.innerHTML += mainContent;
  }
}

export default View;
