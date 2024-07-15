import type Taro from '@tarojs/taro';

export type Platform = typeof process.env.TARO_ENV;

export type SystemInfo = ReturnType<typeof Taro.getSystemInfoSync>;

export type ShowToastOptions = NonNullable<Parameters<typeof Taro.showLoading>[0]>;
export type ShowLoadingOptions = NonNullable<Parameters<typeof Taro.showLoading>[0]>;

export type Page = ReturnType<typeof Taro.getCurrentPages>[number];
