import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "zh-CN",
  title: "笔记",
  description: "学习笔记",
  head: [["link", { rel: "icon", href: "/images/logo.svg" }]],
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
    },
  }),
});
