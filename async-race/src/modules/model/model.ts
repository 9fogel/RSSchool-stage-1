import { Path, ICar } from '../types.ts/types';

class Model {
  public async getGarage(
    baseUrl: string,
    path: Path,
    page?: number,
    limit?: number,
  ): Promise<{ cars: Promise<ICar>; total: string | null }> {
    const response: Response = await fetch(`${baseUrl}${path}?_page=${page}&_limit=${limit}`);
    const cars: Promise<ICar> = await response.json();
    const total: string | null = response.headers.get('X-Total-Count');

    return { cars, total };
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
