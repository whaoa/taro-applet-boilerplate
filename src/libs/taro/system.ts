import Taro from '@tarojs/taro';

import {
  BASE_DESIGN_WIDTH,
  IS_APPLET_PLATFORM,
  IS_UNSUPPORTED_PLATFORM,
  IS_WEB_PLATFORM,
  PLATFORM,
} from '@/constants/taro';
import { ENABLE_WEB_CUSTOM_NAVIGATION, WEB_NAVIGATION_BAR_HEIGHT } from '@/constants/option';

import type { SystemInfo } from '@/types/taro';

export const getSystemInfoSync = Taro.getSystemInfoSync;

export const toRealSize = Taro.pxTransform;

export function toRealPixel(size: number, si?: Pick<SystemInfo, 'windowWidth'>) {
  const windowWidth = (si || getSystemInfoSync()).windowWidth;
  size = Number(size);
  return size ? (size * windowWidth) / BASE_DESIGN_WIDTH : 0;
};

export function toRelativeSize(pixel: number, si?: Pick<SystemInfo, 'windowWidth'>) {
  const windowWidth = (si || getSystemInfoSync()).windowWidth;
  pixel = Number(pixel);
  return pixel ? windowWidth / BASE_DESIGN_WIDTH * pixel : 0;
}

function isCustomNavigation(si?: SystemInfo) {
  if (IS_WEB_PLATFORM) {
    return ENABLE_WEB_CUSTOM_NAVIGATION;
  }
  if (!si) {
    si = getSystemInfoSync();
  }
  // some applet environments may contain decimals in the windowHeight (such as tt)
  return Math.abs(si.windowHeight - si.screenHeight) < 1;
}

export function getSafeAreaInsetsSync(si?: SystemInfo) {
  const sizes = { top: 0, bottom: 0 };

  // in applet mode, use built-in API
  if (IS_APPLET_PLATFORM) {
    if (!si) {
      si = getSystemInfoSync();
    }
    sizes.top = si.safeArea?.top || 0;
    sizes.bottom = si.safeArea ? si.screenHeight - si.safeArea?.bottom : 0;
  } else if (IS_WEB_PLATFORM) {
    // in web mode, use css environment variables and viewport meta tag (to make it works on iOS)
    const id = '__si-node__';
    let el = document.querySelector<HTMLDivElement>(`#${id}`);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.style.display = 'none';
      el.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
      el.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
      document.body.append(el);
    }
    const top = getComputedStyle(el).getPropertyValue('--safe-area-inset-top');
    const bottom = getComputedStyle(el).getPropertyValue('--safe-area-inset-bottom');
    const toPixel = (v: string) => (/^\d+px$/.test(v) ? Number(v.replace('px', '')) : 0);
    return { top: toPixel(top), bottom: toPixel(bottom) };
  } else {
    // for unsupported platforms, return the default values
    return sizes;
  }

  // if the custom navigation bar is not available, the top safe area inset should be 0
  if (!isCustomNavigation(si)) {
    sizes.top = 0;
  }

  return sizes;
}

export function getNavigationBoundingClientRect(si?: SystemInfo) {
  if (!si) {
    si = getSystemInfoSync();
  }
  const topSafeAreaInset = getSafeAreaInsetsSync(si).top;
  const isCustomMode = isCustomNavigation(si);
  const top = isCustomMode ? topSafeAreaInset : 0;

  let left = 0;
  let right = 0;
  let height = 0;

  if (isCustomMode && !IS_UNSUPPORTED_PLATFORM) {
    if (IS_WEB_PLATFORM) {
      left = 10;
      right = si.windowWidth - left;
      height = toRealPixel(WEB_NAVIGATION_BAR_HEIGHT, si);
    } else {
      if (PLATFORM === 'tt') {
        const { leftIcon, capsule } = tt.getCustomButtonBoundingClientRect();
        left = leftIcon?.right || si.windowWidth - capsule.right;
        right = capsule?.left || 0;
        const el = ((leftIcon?.height || 0) > capsule.height ? leftIcon : capsule) ?? capsule;
        height = (el.top - topSafeAreaInset) * 2 + el.height;
      } else {
        const rect = Taro.getMenuButtonBoundingClientRect();
        left = si.windowWidth - rect.right;
        right = rect.left;
        height = (rect.top - topSafeAreaInset) * 2 + rect.height;
      }
    }
  }

  return {
    mode: isCustomMode ? 'custom' as const : 'default' as const,
    top,
    left,
    right,
    width: isCustomMode ? right - left : si.windowWidth,
    height,
    bottom: top + height,
  };
}
