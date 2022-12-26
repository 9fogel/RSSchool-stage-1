import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.up.railway.app/', {
      apiKey: 'b046409c36214d2497ac233ba33b75cf',
    });
  }
}

export default AppLoader;
