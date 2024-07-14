const process = require('node:process');

const isApplet = ['weapp', 'swan', 'alipay', 'tt', 'qq', 'jd'].includes(process.env.TARO_ENV);

module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    // https://weapp-tw.icebreaker.top/docs/quick-start/rem2rpx
    'postcss-rem-to-responsive-pixel': {
      disabled: !isApplet,
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx',
    },
  },
};
