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

export interface ISourceRes {
  status: string;
  sources: Array<ISourcesData>;
}

export interface ISourcesData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface IOptions {
  apiKey?: string;
  sources?: string;
}
//TODO: переделать IOptions в type c Partial<Type>?
