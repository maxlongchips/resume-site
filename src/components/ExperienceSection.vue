<template>
  <section id="experience" class="relative overflow-hidden px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <div class="pb-10">
        <p class="mb-4 text-xs uppercase tracking-[0.35em] text-slate-400">Experience & Craft</p>
        <h2 class="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
          经验与技艺，简明而有力。
        </h2>
      </div>

      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-8" ref="containerRef">
          <div
            v-for="(item, index) in timeline"
            :key="item.year"
            class="reveal-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.18)] transition-all duration-700"
            :class="{ 'visible': visible[index] }"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <div class="absolute inset-y-6 left-0 w-0.5 bg-slate-600/20" />
            <div class="relative z-10">
              <span class="mb-4 inline-flex rounded-full bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                {{ item.year }}
              </span>
              <h3 class="text-2xl font-semibold text-white">{{ item.title }}</h3>
              <p class="mt-4 max-w-xl text-sm leading-7 text-slate-300">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-8">
          <p class="mb-6 text-sm uppercase tracking-[0.3em] text-slate-400">核心技能</p>
          <div class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="skill in skills"
              :key="skill"
              class="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-slate-100 transition duration-300 hover:-translate-y-1 hover:border-blue-600/30"
            >
              {{ skill }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const timeline = [
  {
    year: '2023 — 现在',
    title: '资深前端开发 · 合规系统',
    description: '主导老百姓合规系统的前端架构，把复杂流程转成可触达的体验。',
  },
  {
    year: '2021 — 2023',
    title: '前端工程师 · 处方管理',
    description: '负责处方管理与远程审方平台，保障效率与界面沉稳一致。',
  },
  {
    year: '2019 — 2021',
    title: '工程师 · 电商与小程序',
    description: '构建商城与健康小程序，聚焦流畅体验与高转换路径。',
  },
]

const skills = ['Vue 3', 'Node.js', '小程序', 'TypeScript', 'Claude Code', '产品逻辑']
const containerRef = ref<HTMLElement | null>(null)
const visible = ref<boolean[]>(timeline.map(() => false))
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(containerRef.value?.querySelectorAll('.reveal-card') || []).indexOf(entry.target as HTMLElement)
          if (index !== -1) {
            visible.value[index] = true
            observer?.unobserve(entry.target)
          }
        }
      })
    },
    { threshold: 0.25 }
  )

  Array.from(containerRef.value?.querySelectorAll('.reveal-card') || []).forEach((element) => observer?.observe(element))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.reveal-card {
  opacity: 0;
  transform: translateY(36px);
}

.reveal-card.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
