export enum Path {
  Garage = '/garage',
  Winners = '/winners',
}

export type Tbuttons = { [key: string]: HTMLButtonElement | null };

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ISavedState {
  pageNum: number;
  cars: Array<ICar | undefined>;
  totalCars: number;
  page: string;
}
