import { useEffect, useMemo } from 'react';

import { IS_WEB_PLATFORM } from '@/constants/taro';
import { getNavigationBoundingClientRect, getSafeAreaInsetsSync } from '@/libs/taro/system';

let navigationLayoutCache: ReturnType<typeof getNavigationBoundingClientRect> | null = null;

export function useNavigationLayout() {
  const navigation = useMemo(() => {
    if (IS_WEB_PLATFORM && navigationLayoutCache) {
      return navigationLayoutCache;
    }
    return getNavigationBoundingClientRect();
  }, []);

  useEffect(() => {
    navigationLayoutCache = navigation;
  }, [navigation]);

  return navigation;
}

let safeAreaInsetsCache: ReturnType<typeof getSafeAreaInsetsSync> | null = null;

export function useSafeAreaInsets() {
  const insets = useMemo(() => (safeAreaInsetsCache || getSafeAreaInsetsSync()), []);

  useEffect(() => {
    safeAreaInsetsCache = insets;
  }, [insets]);

  return insets;
}
