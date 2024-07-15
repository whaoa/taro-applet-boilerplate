interface ElementBoundingClientRect {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface DouyinApplet {
  /**
   * 获取自定义导航栏下不可改变的元素位置信息
   * @link https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/interface/menu/tt-get-custom-button-bounding-client-rect
   */
  getCustomButtonBoundingClientRect: () => {
    leftIcon?: ElementBoundingClientRect;
    capsule: ElementBoundingClientRect;
  };
}

declare global {
  /**
   * 抖音小程序 API
   * @link https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/overview
   */
  const tt: DouyinApplet;
}

export {};
