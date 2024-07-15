import Taro from '@tarojs/taro';

import { HttpError, RequestError, normalizeUrl } from './common';

import type { RequestResult } from './common';

export interface UploadOption {
  prefixUrl?: string;
  headers?: Record<string, string | undefined>;
  name: string;
  filePath: string;
  fileName?: string;
  extraParams?: Record<string, string | number | boolean | undefined | null>;
}

export interface UploadContext {
  url: string;
  reallyUrl: string;
  headers: NonNullable<UploadOption['headers']>;
  payload: Pick<UploadOption, 'name' | 'filePath' | 'fileName' | 'extraParams'>;
  option: UploadOption;
}

export type UploadResult<T = any> = RequestResult<T>;

export function upload<T = any>(url: string, option: UploadOption) {
  const context: UploadContext = {
    url,
    reallyUrl: normalizeUrl(url, option.prefixUrl),
    headers: option.headers || {},
    payload: {
      name: option.name,
      filePath: option.filePath,
      fileName: option.fileName,
      extraParams: option.extraParams,
    },
    option,
  };

  return Taro.uploadFile({
    url: context.reallyUrl,
    header: context.headers,
    withCredentials: false,
    name: context.payload.name,
    filePath: context.payload.filePath,
    fileName: context.payload.fileName,
    formData: context.payload.extraParams,
  })
    .then((resp) => {
      const response: RequestResult<T> = {
        ok: resp.statusCode >= 200 && resp.statusCode <= 299,
        status: resp.statusCode,
        headers: resp.header as Record<string, string>,
        body: resp.data as T,
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
