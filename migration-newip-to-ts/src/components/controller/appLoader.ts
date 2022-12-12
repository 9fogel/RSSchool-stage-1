import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.up.railway.app/', {
      // super('https://newsapi.org/v2/', {
      // apiKey: '6fbcbe4526184d7f80bb2de2338d1d84', // получите свой ключ https://newsapi.org/
      apiKey: 'b046409c36214d2497ac233ba33b75cf',
    });
  }
}

export default AppLoader;
