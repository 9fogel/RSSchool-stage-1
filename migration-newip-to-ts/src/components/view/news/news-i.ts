import { IArticle } from '../../../types/types';

export interface INews {
  draw(data: Array<IArticle>): void;
  drawNewsItem(fragment: DocumentFragment, newsItemTemp: HTMLTemplateElement, item: IArticle, idx: number): void;
}
