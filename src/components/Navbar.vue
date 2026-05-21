<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="flex flex-wrap justify-center gap-4 rounded-full border border-white/20 bg-black/50 px-8 py-3 backdrop-blur-md">
      <a
        v-for="item in navItems"
        :key="item.name"
        :href="item.link"
        class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { IconHome, IconUser, IconCode, IconArticle, IconVideo, IconMail } from '@tabler/icons-vue'

const navItems = [
  {
    name: '首页',
    link: '#hero',
    icon: IconHome,
  },
  {
    name: '关于我',
    link: '#about',
    icon: IconUser,
  },
  {
    name: '技术栈',
    link: '#skills',
    icon: IconCode,
  },
  {
    name: '项目作品',
    link: '#projects',
    icon: IconArticle,
  },
  {
    name: '文章视频',
    link: '#content',
    icon: IconVideo,
  },
  {
    name: '联系方式',
    link: '#contact',
    icon: IconMail,
  },
]
</script>
