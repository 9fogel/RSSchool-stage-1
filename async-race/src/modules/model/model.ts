import { Path, ICar } from '../types.ts/types';

class Model {
  public async getGarage(
    baseUrl: string,
    path: Path,
    page?: number,
    limit?: number,
  ): Promise<{ cars: Promise<ICar[]>; total: string | null }> {
    const response: Response = await fetch(`${baseUrl}${path}?_page=${page}&_limit=${limit}`);
    const cars: Promise<ICar[]> = await response.json();
    const total: string | null = response.headers.get('X-Total-Count');

    return { cars, total };
  }

  public async createCar(
    baseUrl: string,
    path: Path,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ): Promise<void> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
      method,
      body,
      headers,
    });
    const result = await response.json();

    return result;
  }

  public async updateCar(
    baseUrl: string,
    path: Path,
    id: string,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ) {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
      body,
      headers,
    });
    const result = await response.json();

    return result;
  }
}

//   getCarById() {}

//   deleteCar() {}

export default Model;
