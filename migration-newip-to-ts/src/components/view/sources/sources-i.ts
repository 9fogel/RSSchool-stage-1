import { ISourcesData } from '../../../types/types';

export interface ISources {
  draw(data: Array<ISourcesData>): void;
  drawSourcesItem(fragment: DocumentFragment, sourceItemTemp: HTMLTemplateElement, item: ISourcesData): void;
}
