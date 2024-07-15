import Taro from '@tarojs/taro';

import { HttpError, RequestError, normalizeUrl } from './common';

import type { RequestResult } from './common';

export interface RequestOption {
  prefixUrl?: string;
  timeout?: number;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  headers?: Record<string, string | undefined>;
  searchParams?: Record<string, string | number | boolean | undefined | null>;
  json?: Record<string, any>;
}

export interface RequestContext {
  url: string;
  reallyUrl: string;
  method: NonNullable<RequestOption['method']>;
  headers: NonNullable<RequestOption['headers']>;
  payload: RequestOption['searchParams'] | RequestOption['json'];
  option: RequestOption;
}

export function request<T = any>(url: string, option?: RequestOption) {
  const method = option?.method || 'GET';

  const context: RequestContext = {
    url,
    reallyUrl: normalizeUrl(url, option?.prefixUrl),
    method,
    headers: { ...option?.headers },
    payload: method === 'GET' ? option?.searchParams : option?.json,
    option: option || {},
  };

  if (method !== 'GET' && option?.json) {
    context.headers['content-type'] = 'application/json';
  }

  Object.keys(context.headers).forEach((key) => {
    if (typeof context.headers[key] === 'undefined') {
      delete context.headers[key];
    }
  });

  return Taro.request<T>({
    url: context.reallyUrl,
    method,
    header: context.headers,
    data: context.payload,
    timeout: option?.timeout,
  })
    .then((resp) => {
      const response: RequestResult<T> = {
        ok: resp.statusCode >= 200 && resp.statusCode <= 299,
        status: resp.statusCode,
        headers: resp.header,
        body: resp.data,
      };
      if (!response.ok) {
        return Promise.reject(new HttpError(context, response, response.status));
      }
      return { request: context, response };
    })
    .catch((error) => {
      if (error instanceof RequestError) {
        return Promise.reject(error);
      }
      return Promise.reject(new RequestError(context, error));
    });
}

export type { RequestResult };
