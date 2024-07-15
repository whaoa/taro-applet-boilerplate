function isHttpUrl(url: string) {
  return /^https?:\/\//.test(url);
};

export function normalizeUrl(url: string, prefixUrl?: string) {
  if (isHttpUrl(url) || typeof prefixUrl !== 'string' || !isHttpUrl(prefixUrl)) {
    return url;
  }
  return `${prefixUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export interface RequestResult<T = any> {
  ok: boolean;
  status: number;
  headers: Record<string, string>;
  body: T;
}

export class RequestError<Req, Resp> extends Error {
  request: Req;

  response: Resp;

  constructor(req: Req, resp: Resp, reason: string = 'Request failed with unknown error') {
    super(reason);
    this.request = req;
    this.response = resp;
  }
}

export class HttpError<Req, Resp> extends RequestError<Req, Resp> {
  constructor(req: Req, resp: Resp, status: number) {
    super(req, resp, `Request failed with statusCode: ${status}`);
  }
}
