import { ISourceRes } from '../../types/types';
import { ILoader, Endpoint, IOptions } from './controller-i';

class Loader implements ILoader {
  private readonly baseLink: string;
  private readonly options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: { endpoint: Endpoint; options?: IOptions },
    callback = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler<T extends Response>(res: T): T {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: IOptions, endpoint: Endpoint): string {
    const urlOptions: { [x: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: string, endpoint: Endpoint, callback: (data: ISourceRes) => void, options: IOptions = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: ISourceRes) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
