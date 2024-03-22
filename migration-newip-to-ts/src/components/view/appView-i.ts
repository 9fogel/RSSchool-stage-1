import { IResponse } from '../../types/types';
import { ISourceRes } from '../../types/types';

export interface IAppView {
  drawNews(data: IResponse | undefined): void;
  drawSources(data: ISourceRes | undefined): void;
}
