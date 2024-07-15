import type { Platform } from '@/types/taro';

export const PLATFORM = process.env.TARO_ENV;

export const IS_WEB_PLATFORM = PLATFORM === 'h5';

export const IS_APPLET_PLATFORM = (['weapp', 'tt', 'alipay', 'swan', 'qq', 'jd'] as Platform[]).includes(PLATFORM);

export const IS_UNSUPPORTED_PLATFORM = !IS_WEB_PLATFORM && !IS_APPLET_PLATFORM;

export const BASE_DESIGN_WIDTH = 375;
