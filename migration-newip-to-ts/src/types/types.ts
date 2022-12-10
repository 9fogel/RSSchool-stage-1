export interface IResponse {
  status: string;
  totalResults: number;
  articles: Array<IArticle>;
}

export interface IArticle {
  source: SourceT;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type SourceT = { id: string; name: string };
