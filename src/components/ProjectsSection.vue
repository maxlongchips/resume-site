<template>
  <section id="projects" class="relative overflow-hidden py-20">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="mb-12 text-center text-4xl font-bold">项目作品集</h2>

      <!-- 分类筛选 -->
      <div class="mb-8 flex flex-wrap items-center justify-center gap-2">
        <button
          v-for="category in projectCategories"
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

      <!-- 项目网格 -->
      <div class="mx-auto max-w-6xl grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group rounded-lg border border-white/10 bg-white/5 overflow-hidden transition-all hover:border-white/20 hover:shadow-lg"
        >
          <div class="relative h-48 w-full overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <h3 class="mb-2 text-lg font-bold text-white">{{ project.title }}</h3>
            <p class="mb-4 text-sm text-neutral-400">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full bg-white/10 px-2 py-1 text-xs text-white"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-3">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 rounded border border-white/20 bg-white/5 px-3 py-2 text-center text-sm text-white hover:bg-white/10 transition-all"
              >
                GitHub
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 rounded border border-white/20 bg-white/5 px-3 py-2 text-center text-sm text-white hover:bg-white/10 transition-all"
              >
                Demo
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
import { projectCategories } from '@/data/categories'

const activeCategory = ref('全部')

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部') {
    return personalData.projects
  }
  return personalData.projects.filter((project) => project.category === activeCategory.value)
})
</script>
