import Taro from '@tarojs/taro';

import qs from 'query-string';

import { navigationType } from './constant';
import { dispatchNavigation } from './pipeline';

import type { Page } from '@/types/taro';
import type { NavigationOptions, NavigationRoute } from './type';

export function getCurrentRoute(): NavigationRoute {
  const instance = Taro.getCurrentInstance();

  let path = (instance.router?.path || '').split('?')[0] || '';
  if (path.indexOf('/') !== 0) {
    path = `/${path}`;
  }

  const query = { ...instance.router?.params };
  delete query.stamp;
  delete query.$taroTimestamp;

  return { path, query };
}

function normalizeRoute(options: NavigationOptions): NavigationRoute {
  const parsed = qs.parseUrl(options.path);
  const path = parsed.url.indexOf('/') === 0 ? parsed.url : `/${parsed.url}`;
  const query = { ...parsed.query, ...options.query };
  return { path, query };
}

function normalizePageRoute(page?: Page): NavigationRoute {
  if (!page) {
    return { path: '', query: {} };
  }
  let path = (page.route || '').split('?')[0] || '';
  if (path.indexOf('/') !== 0) {
    path = `/${path}`;
  }
  const query = page.options || {};
  return { path, query };
}

export const router = {
  push(options: NavigationOptions) {
    return dispatchNavigation(
      {
        type: navigationType.navigateTo,
        from: getCurrentRoute(),
        to: normalizeRoute(options),
      },
      (ctx) => new Promise((resolve, reject) => {
        Taro.navigateTo({
          url: qs.stringifyUrl({ url: ctx.to.path, query: ctx.to.query }),
          success: () => resolve(),
          fail: (error) => reject(error),
        });
      }),
    );
  },

  replace(options: NavigationOptions) {
    return dispatchNavigation(
      {
        type: navigationType.redirectTo,
        from: getCurrentRoute(),
        to: normalizeRoute(options),
      },
      (ctx) => new Promise((resolve, reject) => {
        Taro.redirectTo({
          url: qs.stringifyUrl({ url: ctx.to.path, query: ctx.to.query }),
          success: () => resolve(),
          fail: (error) => reject(error),
        });
      }),
    );
  },

  back(delta = 1, fallback?: NavigationOptions) {
    if (typeof delta !== 'number' || delta < 1) {
      return Promise.reject(new Error('can not execute navigateBack with delta less than 1'));
    }

    const pages = Taro.getCurrentPages();
    if (pages.length - delta < 1) {
      if (fallback) {
        return router.replace(fallback);
      }
      return Promise.reject(new Error(`current page stack size is ${pages.length}, can not back to ${delta}`));
    }

    return dispatchNavigation(
      {
        type: navigationType.navigateBack,
        from: getCurrentRoute(),
        to: normalizePageRoute(pages[pages.length - 1 - delta]),
      },
      () => new Promise((resolve, reject) => {
        Taro.navigateBack({
          delta,
          success: () => resolve(),
          fail: (error) => reject(error),
        });
      }),
    );
  },

  switchTab(options: Omit<NavigationOptions, 'query'>) {
    return dispatchNavigation(
      {
        type: navigationType.switchTab,
        from: getCurrentRoute(),
        to: { path: options.path.split('?')[0] || '', query: {} },
      },
      (ctx) => new Promise((resolve, reject) => {
        Taro.switchTab({
          url: ctx.to!.path,
          success: () => resolve(),
          fail: (error) => reject(error),
        });
      }),
    );
  },

  reLaunch(options: NavigationOptions) {
    return dispatchNavigation(
      {
        type: navigationType.reLaunch,
        from: getCurrentRoute(),
        to: normalizeRoute(options),
      },
      (ctx) => new Promise((resolve, reject) => {
        Taro.reLaunch({
          url: qs.stringifyUrl({ url: ctx.to.path, query: ctx.to.query }),
          success: () => resolve(),
          fail: (error) => reject(error),
        });
      }),
    );
  },
};

export type Router = typeof router;
