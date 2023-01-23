export type TButtons = { [key: string]: HTMLButtonElement | null };

export type TElements = { [key: string]: HTMLElement | null };

export interface IController {
  run: () => void;
}

export interface IPagination {
  refreshPagination(page: string): void;
}

export interface IGarageController {
  run(): Promise<void>;
  listenButtons(): void;
}

export interface IWinnersController {
  run(): void;
  rerenderWinners(): void;
  getWinners: () => Promise<void>;
  createWinner: (id: string, name: string, color: string) => Promise<void>;
  deleteWinner: (id: string) => Promise<void>;
}
