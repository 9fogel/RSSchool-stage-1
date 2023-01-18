import Garage from './garage';
import Winners from './winners';

class View {
  public readonly garage: Garage;

  public readonly winners: Winners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  public render(): void {
    this.renderHeader();
    this.renderMain();
    this.garage.render();
    // this.winners.render();
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
