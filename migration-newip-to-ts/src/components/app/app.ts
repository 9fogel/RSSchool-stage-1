import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourceRes, IResponse } from '../../types/types';
import { IApp } from './app-i';
import BurgerMenu from '../view/burger/burger';

class App implements IApp {
  private readonly controller: AppController;
  private readonly view: AppView;
  private readonly burger: BurgerMenu;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.burger = new BurgerMenu();
  }

  public start(): void {
    const sources: HTMLElement | null = document.querySelector('.sources');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-input');

    if (sources) {
      sources.addEventListener('click', (e: Event): void =>
        this.controller.getNews(e, (data: IResponse | undefined) => this.view.drawNews(data)),
      );
      this.controller.getSources((data: ISourceRes | undefined) => this.view.drawSources(data));
    }

    if (searchInput) {
      searchInput.addEventListener('change', (e: Event): void => {
        this.controller.getNews(e, (data: IResponse | undefined) => this.view.drawNews(data));
      });
    }

    this.burger.manageBurger();
  }
}

export default App;
