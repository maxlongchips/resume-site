<template>
  <section id="content" class="relative overflow-hidden py-20">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="mb-12 text-center text-4xl font-bold">文章 / 视频动态</h2>

      <!-- 分类筛选 -->
      <div class="mb-8 flex flex-wrap items-center justify-center gap-2">
        <button
          v-for="category in articleCategories"
          :key="category"
          @click="activeCategory = category"
          :class="[
            'rounded-full px-4 py-2 text-sm font-medium transition-all',
            activeCategory === category
              ? 'bg-white text-black'
              : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- 最新视频 -->
      <div class="mb-16">
        <h3 class="mb-8 text-2xl font-bold">最新视频</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            v-for="video in personalData.videos.slice(0, 4)"
            :key="video.id"
            class="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-white/20"
          >
            <div class="relative h-48 w-full overflow-hidden">
              <div class="flex h-full items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
                <svg
                  class="h-16 w-16 text-white/80 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h4 class="mb-2 text-lg font-bold text-white">{{ video.title }}</h4>
              <p class="mb-4 text-sm text-neutral-400">{{ video.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="rounded-full bg-white/10 px-2 py-1 text-xs text-white">
                    {{ video.platform }}
                  </span>
                  <span class="text-sm text-neutral-500">{{ video.views }}次播放</span>
                </div>
                <a
                  :href="video.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  观看 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最新文章 -->
      <div>
        <h3 class="mb-8 text-2xl font-bold">最新文章</h3>
        <div class="space-y-6 max-w-4xl mx-auto">
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <h3 class="mb-2 text-xl font-bold text-white">{{ article.title }}</h3>
            <p class="mb-4 text-neutral-400">{{ article.summary }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span class="text-sm text-neutral-500">{{ article.date }}</span>
                <span class="rounded-full bg-white/10 px-2 py-1 text-xs text-white">
                  {{ article.category }}
                </span>
                <span class="text-sm text-neutral-500">{{ article.readTime }}</span>
              </div>
              <a
                :href="article.link"
                class="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                阅读 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { personalData } from '@/data/personal'
import { articleCategories } from '@/data/categories'

const activeCategory = ref('全部')

const filteredArticles = computed(() => {
  if (activeCategory.value === '全部') {
    return personalData.articles
  }
  return personalData.articles.filter((article) => article.category === activeCategory.value)
})
</script>
