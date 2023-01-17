import './index.html'; // watch changes in index.html
import './index.scss';
import View from './modules/view/garage';

console.log('Hello World!');

// const app = new App();
// app.start();

const app = new View();
app.render();
