import { ICar, IWinner } from '../types.ts/types';

export interface ISavedState {
  pageNumGarage: number;
  pageLimitGarage: number;
  cars: Array<ICar | undefined>;
  totalCars: number;
  page: string;
  id: string;
  animation: { [key: string]: number };
  race: boolean;
  winnerFound: boolean;
  controller: { [key: string]: AbortController };
  duration: { [key: string]: number };
  pageNumWinners: number;
  pageLimitWinners: 10;
  winners: Array<IWinner | undefined>;
  totalWinners: number;
}
