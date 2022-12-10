import './sources.css';
import { ISourcesData } from '../../../types/types';

class Sources {
  public draw(data: Array<ISourcesData>): void {
    // console.log('sources data', data);
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp) {
      data.forEach((item: ISourcesData): void => {
        const sourceClone: HTMLTemplateElement | Node = sourceItemTemp.content.cloneNode(true);

        if (sourceClone instanceof DocumentFragment && sourceClone) {
          const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
          if (sourceItemName) {
            sourceItemName.textContent = item.name;
          }

          const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
          if (sourceItem) {
            sourceItem.setAttribute('data-source-id', item.id);
          }

          fragment.append(sourceClone);
        }
      });
    }

    const sources: HTMLElement | null = document.querySelector('.sources');
    if (sources) {
      sources.append(fragment);
    }
  }
}

export default Sources;
