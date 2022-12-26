import AppLoader from './appLoader';
import { ISourceRes, IResponse } from '../../types/types';
import { IAppController, Endpoint } from './controller-i';

class AppController extends AppLoader implements IAppController {
  public getSources(callback: (data?: ISourceRes) => void): void {
    super.getResp(
      {
        endpoint: Endpoint.Sources,
      },
      callback,
    );
  }

  public getNews(e: Event, callback: (data?: IResponse) => void): void {
    let target: EventTarget | null = e.target;
    const newsContainer: EventTarget | null = e.currentTarget;

    while (target !== newsContainer) {
      if (target instanceof HTMLElement && target) {
        if (target.classList.contains('source__item')) {
          const sourceId: string | null = target.getAttribute('data-source-id');
          const searchInput: HTMLInputElement | null = document.querySelector('.search-input');

          if (newsContainer instanceof HTMLElement && sourceId && searchInput) {
            const searchValue = String(searchInput.value);
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: Endpoint.Everything,
                options: {
                  sources: sourceId,
                  q: searchValue,
                },
              },
              callback,
            );
          }

          return;
        }
        target = target.parentNode;
      }
    }
  }
}

export default AppController;
