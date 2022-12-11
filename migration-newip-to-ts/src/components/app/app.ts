import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourceRes, IResponse } from '../../types/types';
import BurgerMenu from '../view/burger/burger';

class App {
  private controller: AppController;
  private view: AppView;
  private burger: BurgerMenu;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.burger = new BurgerMenu();
  }

  public start(): void {
    const sources: HTMLElement | null = document.querySelector('.sources');
    const searchForm: HTMLFormElement | null = document.querySelector('.search-form');
    // console.log('app start', data);

    if (sources) {
      sources.addEventListener('click', (e: Event): void =>
        this.controller.getNews(e, (data: IResponse | undefined) => this.view.drawNews(data)),
      );
      this.controller.getSources((data: ISourceRes | undefined) => this.view.drawSources(data));
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e: Event): void => {
        // console.log(searchForm.search.value);
        e.preventDefault();
        this.controller.getNews(e, (data: IResponse | undefined) => this.view.drawNews(data));
      });
    }

    if (window.innerWidth <= 800) {
      this.burger.manageBurger();
    }

    window.addEventListener('resize', (): void => {
      if (window.innerWidth <= 800) {
        this.burger.manageBurger();
      }
    });
  }
}

export default App;
