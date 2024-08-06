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

## 👋 Introduction

This is a cross-platform project template to support Web and Applets, based on [Taro](https://docs.taro.zone/) and [React](https://react.dev/). The project is created via [@tarojs/cli](https://docs.taro.zone/docs/GETTING-STARTED), based on the default template for secondary development, and provides some out-of-the-box implementation of the basic functions.

[taro-applet-boilerplate](https://github.com/whaoa/taro-applet-boilerplate) is created and maintained by [whaoa](https://github.com/whaoa), if you like this project, please give a star 🌟 and share this project to help more people.

## 🛠 Tech Stacks

taro-applet-boilerplate is developed based on these technologies:

- [Taro](https://docs.taro.zone/): for or project building
- [React](https://react.dev/): for view rendering
- [Tailwind CSS](https://tailwindcss.com/): for styling
- [zustand](https://github.com/pmndrs/zustand): for global state management
- [TanStack Query](https://tanstack.com/query/v4/docs/framework/react/overview): for data fetching
- [React Hook Form](https://react-hook-form.com/): for building forms
- [NutUI](https://nutui.jd.com/taro/react/2x/): A Taro-based UI library
- [React Modal Manager](https://github.com/whaoa/react-modal-manager): A lightweight modal manager for React.

PS: Tailwind CSS officially only supports web environment, applet environment is realized by [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss).

## 📐 Features

In addition to the base API provided by Taro,
these useful features are implemented in the project through some awesome packages:

- A lightweight [router](./src/hooks/router.ts), like Next.js, support route-guards.
- A simple [network requester](./src/libs/network/) that can be easily extended.
- Some [hooks](./src/hooks/query.ts) and [helper functions](./src/libs/query/util.ts) for TanStack Query.
- Some [hooks](./src/hooks/form.ts) and [components](./src/components/utility/form.tsx) for React Hook Form.
- The [SafeAreaInset](./src/components/ui/safe-area.tsx) component for handling screen safe areas.
- The [Image](./src/components/ui/image.tsx) component for rendering images.
- The Modal and Dialog component based on [NutUI/Popup](https://nutui.jd.com/taro/react/2x/#/zh-CN/component/popup).
- An imperative modal manager based on [react-modal-manager](https://github.com/whaoa/react-modal-manager).
- A [Page](./src/components/feature/page.tsx) component with customizable navigation bar.
- A [UserLoginGuarder](./src/components/feature/user.tsx) component for route guarding of user login state.

## 📖 License

MIT © [Taro Applet Boilerplate](https://github.com/whaoa/taro-applet-boilerplate)
