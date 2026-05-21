<template>
  <footer class="border-t border-white/10 bg-black py-12">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
        <!-- 版权信息 -->
        <div class="text-center md:text-left">
          <p class="text-lg font-bold text-white">{{ personalData.name }}</p>
          <p class="mt-2 text-sm text-neutral-400">
            © {{ currentYear }} {{ personalData.name }}. All rights reserved.
          </p>
        </div>

        <!-- 社交链接 -->
        <div class="flex gap-4">
          <a
            v-for="link in personalData.socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="link.name"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <span class="text-xs text-white">{{ link.name[0] }}</span>
          </a>
        </div>

        <!-- 备案信息 -->
        <div class="text-center md:text-right">
          <p class="text-sm text-neutral-400">京ICP备XXXXXXXX号-1</p>
          <p class="mt-1 text-xs text-neutral-500">使用 Vue3 + Vite 构建</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { personalData } from '@/data/personal'

const currentYear = computed(() => new Date().getFullYear())
</script>
