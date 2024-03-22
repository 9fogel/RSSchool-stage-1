import { Path, ICar } from '../types.ts/types';

export type ISwitch = { [key: string]: boolean };

export interface IModel {
  getGarage(
    baseUrl: string,
    path: Path,
    page?: number,
    limit?: number,
  ): Promise<{ cars: Promise<ICar[]>; total: string | null }>;
  createCar(
    baseUrl: string,
    path: Path,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ): Promise<ICar>;
  updateCar(
    baseUrl: string,
    path: Path,
    id: string,
    method: string,
    body: string,
    headers: { [key: string]: string },
  ): Promise<ICar>;
  deleteCar(baseUrl: string, path: Path, id: string, method: string): Promise<object>;
  startStopCar(
    baseUrl: string,
    path: Path,
    id: string,
    status: string,
    method: string,
  ): Promise<{ velocity: number; distance: number }>;
  switchEngine(
    baseUrl: string,
    path: Path,
    id: string,
    status: string,
    method: string,
    signal: AbortSignal,
  ): Promise<ISwitch>;
}
