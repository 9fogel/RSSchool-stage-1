import { ISourceRes, IOptions } from '../../types/types';

enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

class Loader {
  baseLink: string;
  options: IOptions;
  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: Endpoint; options?: IOptions },
    callback = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint, callback, options);
    // console.log('endpoint', endpoint); //'sources', после клика 'everything'
    // console.log('options', options); // {}, после клика {sources: 'abc-news'}
  }

  errorHandler(res: Response): Response | never {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    // console.log('res', res); //Response {type, url, redirected, status, ok, ...}

    return res;
  }

  makeUrl(options: IOptions, endpoint: Endpoint): string {
    const urlOptions: { [x: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: Endpoint, callback: (data: ISourceRes) => void, options: IOptions = {}): void {
    // console.log('method', method); //'GET' (string)
    // console.log('callback', callback); //(data) => this.view.drawSources(data)
    //какая тут data? drawSources(data: ISourceRes | undefined)
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: ISourceRes) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
