import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import UnoCSS from '@unocss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineUserConfig({
  lang: "zh-CN",
  title: "笔记",
  description: "学习笔记",
  head: [
    ["link", { rel: "icon", href: "/images/logo.svg" }],
    ["link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" }]
  ],
  theme: defaultTheme({
    logo: "/images/logo.svg",
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "GitHub",
        link: "https://github.com/ruancong/ruancong.github.io",
      },
    ],
    sidebarDepth: 3,
  }),

  plugins: [
    registerComponentsPlugin({
      // 自动扫描组件目录
      componentsDir: resolve(__dirname, './components'),
      // 或者手动指定组件（二选一即可）
      // components: {
      //   VocabularyAudio: resolve(__dirname, './components/VocabularyAudio.vue')
      // }
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: [
          {
            find: /^\.\/audios\/(.*)/,
            replacement: "/audios/$1",
          },
        ],
      },
      plugins: [
        UnoCSS(),
      ],
    },
  }),
});
