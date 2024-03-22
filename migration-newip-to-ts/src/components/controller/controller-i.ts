import { ISourceRes, IResponse } from '../../types/types';

export interface IAppController {
  getSources(callback: (data?: ISourceRes) => void): void;
  getNews(e: Event, callback: (data?: IResponse) => void): void;
}

export interface ILoader {
  getResp({ endpoint, options = {} }: { endpoint: Endpoint; options?: IOptions }, callback: () => void): void;
}

/**is used in controller.ts, loader.ts */
export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

/**is used in loader.ts */
export interface IOptions {
  apiKey?: string;
  /**'@param q is the property for search functionality*/
  q?: string;
  sources?: string;
}
