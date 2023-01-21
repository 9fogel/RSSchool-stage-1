export enum Path {
  Garage = '/garage',
  Engine = '/engine',
  Winners = '/winners',
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}
