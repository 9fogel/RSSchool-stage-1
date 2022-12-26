/**is used in app.ts, controller.ts, appView.ts, appView-i.ts */
export interface IResponse {
  status: string;
  totalResults: number;
  articles: Array<IArticle>;
}

/**is used in appView.ts, news.ts, news-i.ts */
export interface IArticle {
  source: TSource;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

type TSource = { id?: string; name: string };

/**is used in loader.ts, appView.ts, appView-i.ts */
export interface ISourceRes {
  status: string;
  sources: Array<ISourcesData>;
}

/**is used in appView.ts, sources.ts */
export interface ISourcesData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
