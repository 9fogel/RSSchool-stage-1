export interface IView {
  render(): void;
  renderPagination(pageSelected: string): string;
}

export interface IGarage {
  render(): void;
  clearGaragePage(): void;
  setCarInitialPosition(id: string): void;
}

export interface IWinners {
  render(): void;
}
