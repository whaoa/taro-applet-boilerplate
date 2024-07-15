import process from 'node:process';

import { defineConfig } from '@tarojs/cli';

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { UnifiedWebpackPluginV5 as AppletTailwindPlugin } from 'weapp-tailwindcss/webpack';

import devConfig from './dev';
import prodConfig from './prod';

import type { UserConfigExport } from '@tarojs/cli';

type TaroConfig = Exclude<UserConfigExport, Promise<any> | ((...args: any[]) => any)>;
type TaroPostCSSConfig = NonNullable<NonNullable<TaroConfig['mini']>['postcss']>;

const cssModuleConfig: NonNullable<TaroPostCSSConfig['cssModules']> = {
  enable: true,
  config: {
    namingPattern: 'module',
    generateScopedName: '[local]-[hash:base64:6]',
  },
};

const pxTransformConfig: NonNullable<TaroPostCSSConfig['pxtransform']> = {
  enable: true,
  config: {
    minRootSize: 16,
    onePxTransform: false,
  },
};

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig((merge, { mode }) => {
  const buildMode = mode === 'production' ? 'build' : 'dev';

  const baseConfig: UserConfigExport = {
    projectName: 'taro-applet-boilerplate',
    date: '2024-7-12',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: `dist/${buildMode}/${process.env.TARO_ENV}`,
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      // to fix some webpack error like this:
      // EnvironmentNotSupportAsyncWarning:
      // The generated code contains 'async/await' because this module is using "external script".
      prebundle: { enable: false },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: cssModuleConfig,
        pxtransform: pxTransformConfig,
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        // https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/taro
        chain.plugin('applet-tailwind').use(AppletTailwindPlugin, [{ appType: 'taro' }]);
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: cssModuleConfig,
        pxtransform: pxTransformConfig,
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
      },
      devServer: {
        open: false,
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
