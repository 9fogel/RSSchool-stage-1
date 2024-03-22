import News from './news/news';
import Sources from './sources/sources';
import { IArticle, IResponse, ISourceRes, ISourcesData } from '../../types/types';
import { IAppView } from './appView-i';

export class AppView implements IAppView {
  private readonly news: News;
  private readonly sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: IResponse | undefined): void {
    const values: Array<IArticle> = data?.articles ?? [];
    this.news.draw(values);
  }

  public drawSources(data: ISourceRes | undefined): void {
    const values: Array<ISourcesData> = data?.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;
