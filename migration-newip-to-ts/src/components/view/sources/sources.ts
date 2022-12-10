import './sources.css';
import { ISourcesData } from '../../../types/types';

class Sources {
  draw(data: Array<ISourcesData>) {
    console.log('sources data', data);
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);

      sourceClone.querySelector('.source__item-name').textContent = item.name;
      sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources').append(fragment);
  }
}

export default Sources;
