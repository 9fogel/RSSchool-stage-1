import { Path } from '../types.ts/types';

class Model {
  // private readonly baseUrl: string;

  // private readonly path: Path;

  // constructor() {
  //   console.log('model');
  // }

  // constructor(baseUrl: string, path: Path) {
  //   this.baseUrl = baseUrl;
  //   this.path = path;
  // }

  public async getGarage(baseUrl: string, path: Path) {
    console.log('model get garage', baseUrl, path);
    // const data = fetch(`${baseUrl}${path}`);
    // const data = fetch(`${this.baseUrl}${this.path}`);
    // console.log(data);

    const response = await fetch(`${baseUrl}${path}`);
    const data = await response.json();
    console.log(data); // object
    console.log(typeof data);
  }

  public createCar() {
    console.log('create');
  }

  public updateCar() {
    console.log('update');
  }
}

//   getCars() {}

//   getCarById() {}

//   updateCar() {}

//   deleteCar() {}

//   createcar() {}

export default Model;
