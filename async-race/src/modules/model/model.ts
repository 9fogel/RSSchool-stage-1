import { ISwitch, IModel } from './model-i';
import { Path, ICar, IWinner } from '../types.ts/types';

class Model implements IModel {
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
  ): Promise<ICar> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
      method,
      body,
      headers,
    });
    const result: ICar = await response.json();

    return result;
  }

  public async updateCar(
    baseUrl: string,
    path: Path,
    id: string,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ): Promise<ICar> {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
      body,
      headers,
    });
    const result: ICar = await response.json();

    return result;
  }

  public async deleteCar(baseUrl: string, path: Path, id: string, method: string): Promise<object> {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
    });
    const result: object = await response.json();

    return result;
  }

  public async startStopCar(
    baseUrl: string,
    path: Path,
    id: string,
    status: string,
    method: string,
  ): Promise<{ velocity: number; distance: number }> {
    const response: Response = await fetch(`${baseUrl}${path}?id=${+id}&status=${status}&speed=0`, {
      method,
    });
    const result: { [key: string]: number } = await response.json();
    const { velocity, distance }: { [key: string]: number } = result;

    return { velocity, distance };
  }

  public async switchEngine(
    baseUrl: string,
    path: Path,
    id: string,
    status: string,
    method: string,
    signal: AbortSignal,
  ): Promise<ISwitch> {
    const response: Response = await fetch(`${baseUrl}${path}?id=${id}&status=${status}`, {
      method,
      signal,
    });
    if (!response.ok && response.status !== 500) {
      console.log('Error', response);
    }

    if (response.status === 500) {
      const result: ISwitch = { success: false };
      return result;
    }
    const result: ISwitch = await response.json();
    return result;
  }

  public async getWinners(
    baseUrl: string,
    path: Path,
    page?: number,
    limit?: number,
  ): Promise<{ winners: Promise<IWinner[]>; total: string | null }> {
    const response: Response = await fetch(`${baseUrl}${path}?_page=${page}&_limit=${limit}`);
    const winners: Promise<IWinner[]> = await response.json();
    const total: string | null = response.headers.get('X-Total-Count');

    return { winners, total };
  }

  public async getWinner(
    baseUrl: string,
    path: Path,
    method: string,
    id: string,
  ): Promise<IWinner> {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
    });
    const result: IWinner = await response.json();

    return result;
  }

  public async createWinner(
    baseUrl: string,
    path: Path,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ): Promise<IWinner> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
      method,
      body,
      headers,
    });
    const result: IWinner = await response.json();

    return result;
  }

  public async updateWinner(
    baseUrl: string,
    path: Path,
    method: string,
    body: string,
    headers: { [key: string]: string },
    id: string,
  ): Promise<IWinner> {
    const response: Response = await fetch(`${baseUrl}${path}/${id}`, {
      method,
      body,
      headers,
    });
    const result: IWinner = await response.json();

    return result;
  }
}

export default Model;
