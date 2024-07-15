import Taro from '@tarojs/taro';

import { CACHE_NAME_PREFIX } from '@/constants/option';

export function createStorage(scope = '') {
  const k = (key: string) => `${CACHE_NAME_PREFIX}/${scope}/${key}`;

  const getItem = <T = any>(key: string) => Taro.getStorageSync<T>(k(key)) || null;
  const setItem = (key: string, value: any) => Taro.setStorageSync(k(key), value);
  const removeItem = (key: string) => Taro.removeStorageSync(k(key));

  return {
    getItem,
    setItem,
    removeItem,
  };
}

export const storage = createStorage('cache');
