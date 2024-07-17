import type { getNavigationBoundingClientRect, getSafeAreaInsetsSync } from '@/libs/taro/system';

export type NavigationBoundingClientRect = ReturnType<typeof getNavigationBoundingClientRect>;

export type SafeAreaInsets = ReturnType<typeof getSafeAreaInsetsSync>;

export interface SystemStoreState {
  navigation: NavigationBoundingClientRect;
  safeAreaInsets: SafeAreaInsets;
}
