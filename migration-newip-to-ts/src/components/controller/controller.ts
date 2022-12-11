import AppLoader from './appLoader';
import { ISourceRes, IResponse } from '../../types/types';
import { Endpoint } from './loader';

class AppController extends AppLoader {
  public getSources(callback: (data?: ISourceRes) => void): void {
    super.getResp(
      {
        endpoint: Endpoint.Sources,
        // endpoint: 'sources',
      },
      callback,
    );
    // console.log('callback AppController', callback);
  }

  public getNews(e: Event, callback: (data?: IResponse) => void) {
    // console.log('callback getNews', callback);
    let target: EventTarget | null = e.target;
    const newsContainer: EventTarget | null = e.currentTarget;

    while (target !== newsContainer) {
      if (target instanceof HTMLElement && target) {
        if (target.classList.contains('source__item')) {
          const sourceId: string | null = target.getAttribute('data-source-id');
          const searchForm: HTMLFormElement | null = document.querySelector('.search-form');

          if (newsContainer instanceof HTMLElement && newsContainer && sourceId && searchForm) {
            const searchValue = String(searchForm.search.value);
            // console.log('getNews', searchValue);
            if (newsContainer.getAttribute('data-source') !== sourceId) {
              newsContainer.setAttribute('data-source', sourceId);
              super.getResp(
                {
                  endpoint: Endpoint.Everything,
                  // endpoint: 'everything',
                  options: {
                    sources: sourceId,
                    q: searchValue,
                  },
                },
                callback,
              );
            }
          }
          return;
        }
        target = target.parentNode;
      }
    }
  }
}

export default AppController;
