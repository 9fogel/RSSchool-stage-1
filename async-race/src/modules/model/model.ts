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
  ): Promise<Response> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
      method,
      body,
      headers,
    });
    const result: Response = await response.json();

    return result;
  }

  public async updateCar(
    baseUrl: string,
    path: Path,
    id: string,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ): Promise<Response> {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
      body,
      headers,
    });
    const result: Response = await response.json();

    return result;
  }

  // eslint-disable-next-line max-len
  public async deleteCar(baseUrl: string, path: Path, id: string, method: string): Promise<Response> {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
    });

    const result: Response = await response.json();

    return result;
  }

  public async startStopCar(
    baseUrl: string,
    path: Path,
    id: string,
    status: string,
    method: string,
  ): Promise<{ velocity: number; distance: number }> {
    const response: Response = await fetch(`${baseUrl}${path}?id=${id}&status=${status}`, {
      method,
    });

    const result = await response.json();

    const { velocity, distance }: { [key: string]: number } = result;

    return { velocity, distance };
  }

  // eslint-disable-next-line max-len
  public async switchEngine(baseUrl: string, path: Path, id: string, status: string, method: string) {
    const response: Response = await fetch(`${baseUrl}${path}?id=${id}&status=${status}`, {
      method,
    });

    const result = await response.json();
    console.log(result);

    return result;
  }

  // public async stopCar(baseUrl: string, path: Path, id: string, status: string, method: string) {
  //   const response: Response = await fetch(`${baseUrl}${path}?id=${id}&status=${status}`, {
  //     method,
  //   });

  //   const result = await response.json();
  //   console.log(result);

  //   // const { velocity, distance }: { [key: string]: number } = result;

  //   // return { velocity, distance };
  // }
}

export default Model;
