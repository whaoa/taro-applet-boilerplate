import { create } from 'zustand';

import {
  getNavigationBoundingClientRect,
  getSafeAreaInsetsSync,
  getSystemInfoSync,
} from '@/libs/taro/system';

import type { SystemStoreState } from './type';

export const useSystemStore = create<SystemStoreState>(() => {
  const si = getSystemInfoSync();

  return {
    navigation: getNavigationBoundingClientRect(si),
    safeAreaInsets: getSafeAreaInsetsSync(si),
  };
});
