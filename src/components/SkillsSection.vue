<template>
  <section id="skills" class="relative overflow-hidden py-20">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="mb-12 text-center text-4xl font-bold">技术栈</h2>
      <div class="mx-auto max-w-5xl grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="skill in personalData.skills"
          :key="skill.name"
          class="group rounded-lg border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg"
        >
          <h3 class="mb-2 text-lg font-bold text-white group-hover:text-blue-400">{{ skill.name }}</h3>
          <div class="mb-3 h-2 w-full rounded-full bg-white/10">
            <div
              class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
          <p class="text-sm text-neutral-400">{{ skill.level }}%</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>
