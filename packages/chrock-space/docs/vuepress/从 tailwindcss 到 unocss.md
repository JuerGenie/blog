---
title: 从 tailwindcss 到 unocss
subtitle: 爱不释手。
cover: https://images.pexels.com/photos/276223/pexels-photo-276223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
tags:
  - vuepress
  - tailwindcss
  - unocss
  - css
  - 前端
  - vitejs
---

## 总之，来试试新东西吧！

之前的几个项目，使用的都是 tailwindcss，包括之前博客也是使用的 tailwindcss，不过自从有次在知乎上看到了关于 unocss 的介绍后，顿时对其大有好感，该怎么说呢？这种实现方式很灵活，也很方便扩展，是十分的符合我的喜好的一个模块。

于是，我试着在某个小玩具项目（安易彩华，一个基于 peerjs 的 P2P 聊天工具）里试用了一下，从体感上来说也很顺畅，除了插件提供的 autocomplete 有些孱弱之外，其他一切都好。

关于 autocomplete，我大概能想到为什么会有这种不足，还是因为太过灵活了，以至于无法很好的进行推断，同时插件的 autocomplete 还依赖于各种规则提供的 hooks，通过 hooks 来提供补全参数，如果规则本身没有提供比较好的 hooks 的话，autocomplete 的效果也会有所削弱。

总之，整体使用下来我很满意，于是便把算盘打到了博客上。

毕竟本来就打算重构博客，干脆把基础设施也翻新一下吧。

## 简单的迁移过程——

从 tailwindcss 迁移到 unocss 并不复杂，只需要 `pnpm add -D unocss`，然后在 `vite.config.ts` 中添加上从 `unocss/vite` 引入的插件到 `plugins` 字段即可。

整理下来，大概的步骤如下：

1. 添加 `unocss`
   ```bash
   pnpm add -D unocss
   ```
2. 注册插件
   ```ts {11}
   // chrock-space/node/index.ts
   import unocss from "unocss/vite";

   export const chrockTheme = ((app) => {
     return {
       name: "vuepress-theme-chrock",
       /** ...... */
       extendsBundlerOptions(options) {
         merge(options, {
           viteOptions: {
             plugins: [unocss()],

             css: {
               postcss: {
                 plugins: [
                   eachVariables(),
                   each(),
                   presetEnv({
                     features: {
                       "nesting-rules": true,
                     },
                   }),
                   autoprefixer(),
                 ],
               },
             },
           } as UserConfigExport,
         });
       },
     }
   }) as Theme;
   ```
3. 添加 `uno.config.ts` 配置文件
   ```ts
   import {
     defineConfig,
     presetUno,
     presetIcons,
     presetAttributify,
     transformerCompileClass,
     transformerDirectives,
     transformerVariantGroup,
     UserConfig,
   } from "unocss";
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
   import { colors } from "@unocss/preset-uno/colors";

   const chrockType = {
     primary: colors.blue,
     secondary: colors.slate,
     warning: colors.amber,
     error: colors.rose,
     success: colors.green,
   };

   export default defineConfig({
     transformers: [
       transformerCompileClass(),
       transformerDirectives(),
       transformerVariantGroup(),
     ],
     presets: [presetUno(), presetIcons(), presetAttributify()],
     theme: {
       colors: {
         ...chrockType,
       },
     },
     rules: [],
   }) as UserConfig;
   ```
4. 在客户端入口文件引入 `uno.css`
   ```ts {4}
   import { defineClientConfig } from "@vuepress/client";

   import "@unocss/reset/tailwind.css";
   import "uno.css";

   export default defineClientConfig({
     /** ... */
   });
   ```
   `uno.css` 是由 `unocss` 插件生成的虚拟文件，具体可以查看[这个文档](https://cn.vitejs.dev/guide/api-plugin.html#importing-a-virtual-file)。
5. 一切就绪，可以愉快的开始玩耍了！

## 在此基础上，还额外引用了一些插件

主要是为了提高开发效率和体验，全都是 `postcss` 插件，大概如下：

- `postcss-preset-env`  
  它集成了很多基于预编译实现的 CSS3 Modules 新特性的 polyfill，比如 `nesting module` 和 `custom selector`，可谓是以一当十，于是便愉快的把之前使用的几个插件给移除掉了，只需要一个 `postcss-preset-env` 即可。
- `postcss-each-variables`  
  搭配 `postcss-each` 插件一起使用，用于使 `@each` 指令支持遍历 `css custom properties`。
- `postcss-each`  
  用于提供 `@each` 指令，进行循环，这样可以减少许多重复代码，比如：
  ```css
  :root {
    --types: (
      primary, secondary, warning, error
    );
  }

  @each $type in var(--types) {
    .btn.$(type) {
      @apply bg-$(type);
    }
  }
  ```

---

这次更新大概就做了这些事情，然后一通操作下来，感觉开发体验得到了不少的提升，心里还是挺满足的。

后续可能会基于 unocss 实现一套自己的前端样式规范，但也可能不会做，我太懒了（笑）。
