import './news.css';
import { IArticle } from '../../../types/types';
import { INews } from './news-i';

class News implements INews {
  public drawNewsItem(
    fragment: DocumentFragment,
    newsItemTemp: HTMLTemplateElement,
    item: IArticle,
    idx: number,
  ): void {
    const newsClone: DocumentFragment | Node = newsItemTemp.content.cloneNode(true);

    if (newsClone instanceof DocumentFragment) {
      const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
      if (idx % 2 && newsItem) {
        newsItem.classList.add('alt');
      }

      const newsPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
      if (newsPhoto && item.urlToImage) {
        newsPhoto.style.backgroundImage = `url(${item.urlToImage})`;
      }

      const newsAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
      if (newsAuthor) {
        newsAuthor.textContent = item.author || item.source.name;
      }

      const newsDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
      if (newsDate) {
        newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }

      const newsDescTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
      if (newsDescTitle) {
        newsDescTitle.textContent = item.title;
      }

      const newsDescSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
      if (newsDescSource) {
        newsDescSource.textContent = item.source.name;
      }

      const newsDescContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
      if (newsDescContent) {
        newsDescContent.textContent = item.description;
      }

      const newsReadMoreLink: HTMLElement | null = newsClone.querySelector('.news__read-more a');
      if (newsReadMoreLink) {
        newsReadMoreLink.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    }
  }

  public draw(data: Array<IArticle>): void {
    const newsCount = 10;

    const news: Array<IArticle> =
      data.length >= newsCount ? data.filter((_item: IArticle, idx: number): boolean => idx < newsCount) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

    if (newsItemTemp) {
      news.forEach((item: IArticle, idx: number): void => this.drawNewsItem(fragment, newsItemTemp, item, idx));
    }

    const newsElem: HTMLElement | null = document.querySelector('.news');
    if (newsElem) {
      newsElem.innerHTML = '';
      newsElem.appendChild(fragment);
    }
  }
}

export default News;
