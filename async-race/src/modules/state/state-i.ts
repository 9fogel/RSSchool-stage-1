import { ICar } from '../types.ts/types';

export interface ISavedState {
  pageNum: number;
  cars: Array<ICar | undefined>;
  totalCars: number;
  page: string;
  id: string;
  animation: { [key: string]: number };
  race: boolean;
  winnerFound: boolean;
  controller: { [key: string]: AbortController };
}
