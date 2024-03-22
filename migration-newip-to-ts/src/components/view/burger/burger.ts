import './burger.css';
import { IBurger } from './burger-i';

class BurgerMenu implements IBurger {
  public manageBurger(): void {
    const burgerMenu: HTMLElement | null = document.querySelector('.burger');
    const sources: HTMLElement | null = document.querySelector('.sources');
    const news: HTMLElement | null = document.querySelector('.news');
    const searchForm: HTMLFormElement | null = document.querySelector('.search-form');

    const smallScreen = 800;

    if (burgerMenu && sources && news) {
      burgerMenu.addEventListener('click', (): void => {
        sources.classList.remove('sources-hidden');
        news.classList.add('news-hidden');
        burgerMenu.classList.remove('burger-active');
        if (window.innerWidth <= smallScreen && searchForm) {
          searchForm.classList.remove('form-search-hidden');
        }
      });
    }

    if (sources && news && burgerMenu) {
      sources.addEventListener('click', (): void => {
        sources.classList.add('sources-hidden');
        news.classList.remove('news-hidden');
        burgerMenu.classList.add('burger-active');

        if (window.innerWidth <= smallScreen && searchForm) {
          searchForm.classList.add('form-search-hidden');
        }
      });
    }

    window.addEventListener('resize', (): void => {
      if (window.innerWidth <= smallScreen) {
        if (burgerMenu && sources && news && searchForm && sources.classList.contains('sources-hidden')) {
          burgerMenu.classList.add('burger-active');
          searchForm.classList.add('form-search-hidden');
        }
      }
      if (window.innerWidth > smallScreen && searchForm) {
        searchForm.classList.remove('form-search-hidden');
      }
    });
  }
}

export default BurgerMenu;
