import type { Preview } from "@storybook/react";
import "../src/styles/index.scss"
import {library} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


const preview: Preview = {
  parameters: {
    /**
     //* actions: 配置 Storybook 的动作（例如点击事件）的参数。
      argTypesRegex: "^on[A-Z].*": 这是一个正则表达式，
      用于匹配动作参数的类型。它匹配所有以 "on" 开头并且后面跟着一个大写字母的参数，如 onClick、onChange 等。
     */
    actions: { argTypesRegex: "^on[A-Z].*" },
    /**
     //* controls: 配置 Storybook 控制面板的参数。
     * matchers: 定义如何匹配和控制不同类型的属性。
     */
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
     docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
};



export default preview;
