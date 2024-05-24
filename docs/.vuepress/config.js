import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '笔记',
  description: '学习笔记',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [{
        text: '首页',
        link: '/',
      }],
  }),

  bundler: viteBundler(),
})
