import './sources.css';
import { ISourcesData } from '../../../types/types';

class Sources {
  draw(data: Array<ISourcesData>): void {
    console.log('sources data', data);
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item: ISourcesData): void => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    (document.querySelector('.sources') as HTMLElement).append(fragment);
  }
}

export default Sources;
