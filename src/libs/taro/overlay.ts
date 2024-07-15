import Taro from '@tarojs/taro';

import type { ShowLoadingOptions, ShowToastOptions } from '@/types/taro';

let loadings: Array<Pick<ShowLoadingOptions, 'title' | 'mask'>> = [];

export function hideLoading(hideAllLoading = false) {
  if (hideAllLoading) {
    loadings = [];
  }
  if (loadings.length > 0) {
    loadings.pop();
  }
  if (loadings.length > 0) {
    Taro.showLoading(loadings[loadings.length - 1]);
  } else {
    Taro.hideLoading();
  }
}

export function showLoading(title: string, options?: Omit<ShowLoadingOptions, 'title'>) {
  const opt = { title, mask: options?.mask !== false };
  Taro.showLoading({ title, ...options, mask: options?.mask !== false }).then(() => {
    loadings.push(opt);
  });
  return function hide() {
    const index = loadings.indexOf(opt);
    if (index === -1) {
      return;
    }
    if (index === loadings.length - 1) {
      hideLoading();
    } else {
      loadings.splice(index, 1);
    }
  };
}

export function showToast(message: string, options?: Omit<ShowToastOptions & { force?: boolean }, 'title'>) {
  if (loadings.length > 0 && options?.force !== true) {
    console.warn(
      'some loading tasks are showing, showToast is skipped,'
      + ' to turn off all loading and show toast, set `options.force` to true.',
    );
    return;
  }
  Taro.showToast({ icon: 'none', title: message, ...options });
}

export const hideToast = Taro.hideToast;
