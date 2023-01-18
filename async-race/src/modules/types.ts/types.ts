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

export type TState = { [key: string]: number | string | Array<ICar> };
