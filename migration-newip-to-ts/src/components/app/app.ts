import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourceRes, IResponse } from '../../types/types';

class App {
  controller: AppController;
  view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sources: HTMLElement | null = document.querySelector('.sources');
    // console.log('app start', data);

    if (sources) {
      sources.addEventListener('click', (e: Event): void =>
        this.controller.getNews(e, (data: IResponse | undefined) => this.view.drawNews(data)),
      );
      this.controller.getSources((data: ISourceRes | undefined) => this.view.drawSources(data));
    }
  }
}

export default App;
