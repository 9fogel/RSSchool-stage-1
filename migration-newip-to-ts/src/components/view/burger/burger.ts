import './burger.css';

class BurgerMenu {
  public manageBurger(): void {
    const burgerMenu: HTMLElement | null = document.querySelector('.burger');
    const sources: HTMLElement | null = document.querySelector('.sources');
    const news: HTMLElement | null = document.querySelector('.news');

    if (burgerMenu && sources && news) {
      if (!news.classList.contains('news-visible') && sources.classList.contains('sources-hidden')) {
        burgerMenu.classList.add('burger-active');
      }
      burgerMenu.addEventListener('click', (): void => {
        sources.classList.remove('sources-hidden');
        news.classList.add('news-hidden');
      });
    }

    if (sources && news && burgerMenu) {
      sources.addEventListener('click', (): void => {
        sources.classList.add('sources-hidden');
        news.classList.remove('news-hidden');
        burgerMenu.classList.add('burger-active');
      });
    }
  }
}

export default BurgerMenu;
