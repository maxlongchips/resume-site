<template>
  <section id="hero" class="relative min-h-screen overflow-hidden">
    <div class="flex flex-col items-center justify-center gap-8 px-4 py-32 text-center">
      <!-- 头像 -->
      <div class="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
        <img
          :src="personalData.avatar"
          :alt="personalData.name"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- 名字 -->
      <h1 class="text-5xl font-bold tracking-tight md:text-7xl">
        <span class="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          {{ personalData.name }}
        </span>
      </h1>

      <!-- 标题 -->
      <h2 class="text-xl font-medium text-neutral-300 md:text-2xl">
        {{ personalData.title }}
      </h2>

      <!-- 介绍文字 -->
      <div class="max-w-2xl">
        <p class="text-lg text-neutral-400">
          {{ personalData.bio }}
        </p>
      </div>

      <!-- 社交链接按钮 -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a
          v-for="link in personalData.socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- 向下滚动提示 -->
      <div class="absolute bottom-10 animate-bounce">
        <svg
          class="h-6 w-6 text-white/50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>
