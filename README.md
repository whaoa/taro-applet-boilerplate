<h1 align="center">Taro Applet Boilerplate</h1>
<h4 align="center">
  A template for applet project, with react and taro.
</h4>

<p align="center">
  <a href="https://github.com/whaoa/taro-applet-boilerplate/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/whaoa/taro-applet-boilerplate?style=flat&label=license">
  </a>
  <a href="https://github.com/whaoa/taro-applet-boilerplate/releases">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/whaoa/taro-applet-boilerplate/main?style=flat&label=version">
  </a>
</p>

<p align="center">
  <a href="./README.md">中文</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="./README.en.md">English</a>
</div>

## 👋 介绍

这是一个支持 Web 和 小程序 的跨平台项目模版，基于 [Taro](https://docs.taro.zone/) 与 [React](https://react.dev/) 进行开发。项目通过 [@tarojs/cli](https://docs.taro.zone/docs/GETTING-STARTED) 创建，基于默认模版进行二次开发，提供了一些开箱即用的基础功实现。

[taro-applet-boilerplate](https://github.com/whaoa/taro-applet-boilerplate) 由 [whaoa](https://github.com/whaoa) 创建和维护，如果你喜欢这个项目，请点一个星星吧 🌟，分享这个项目来帮助更多的人。

## 🛠 技术栈

taro-applet-boilerplate 基于以下技术进行开发：

- [Taro](https://docs.taro.zone/)：用于项目构建
- [React](https://react.dev/)：用于内容渲染
- [Tailwind CSS](https://tailwindcss.com/)：用于样式编写
- [zustand](https://github.com/pmndrs/zustand)：用于全局状态管理
- [TanStack Query](https://tanstack.com/query/v4/docs/framework/react/overview)：用于数据请求
- [React Hook Form](https://react-hook-form.com/)：用于构建表单
- [NutUI](https://nutui.jd.com/taro/react/2x/)：一个基于 Taro 的 UI 组件库
- [React Modal Manager](https://github.com/whaoa/react-modal-manager)：一个轻量的弹窗管理器

PS: Tailwind CSS 官方仅支持 Web 环境，小程序环境是通过 [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss) 来实现的。

## 📐 功能

除 Taro 提供的基础能力外，项目内借助一些常用的依赖实现了以下实用功能：

- 基于 Taro API 包装的 [Router](./src/hooks/router.ts)，支持结构化参数调用与路由守卫
- 基于 Taro API 包装的网络请求，可方便的进行二次包装（[代码位置](./src/libs/network/)）
- 基于 TanStack Query 的 [网络请求](./src/hooks/query.ts) 以及 [相关辅助函数](./src/libs/query/util.ts)）
- React Hook Form 相关的 [Hooks](./src/hooks/form.ts)）和 [组件](./src/components/utility/form.tsx)
- 内置了用于处理屏幕安全区的 [SafeAreaInset](./src/components/ui/safe-area.tsx) 组件
- 内置了用于渲染图片的 [Image](./src/components/ui/image.tsx) 组件
- 基于 [NutUI/Popup](https://nutui.jd.com/taro/react/2x/#/zh-CN/component/popup) 实现的 Modal / Dialog 组件
- 基于 [react-modal-manager](https://github.com/whaoa/react-modal-manager) 实现的命令式弹窗管理器
- 支持自定义导航栏的 [Page](./src/components/feature/page.tsx) 组件
- 用于对用户登录状态进行路由守卫的 [UserLoginGuarder](./src/components/feature/page.tsx) 组件

## 📖 协议

MIT © [Taro Applet Boilerplate](https://github.com/whaoa/taro-applet-boilerplate)
