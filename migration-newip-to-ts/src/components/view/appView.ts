import News from './news/news';
import Sources from './sources/sources';
import { IArticle, IResponse, ISourceRes, ISourcesData } from '../../types/types';

export class AppView {
  news: News;
  sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IResponse | undefined): void {
    // console.log('appView data', data);
    const values: Array<IArticle> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: ISourceRes | undefined) {
    // console.log('appView Sources', data);
    const values: Array<ISourcesData> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
