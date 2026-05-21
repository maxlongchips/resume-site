<!-- src/components/ProjectsSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '../data/content'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

function formatIndex(i: number): string {
  return String(i + 1).padStart(2, '0')
}
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="ls projects/" section-num="03" />

    <div class="flex flex-col gap-5" data-reveal>
      <div
        v-for="(project, i) in projects"
        :key="project.name"
        class="project-row"
      >
        <div class="project-idx">{{ formatIndex(i) }}</div>
        <div class="project-info">
          <div class="text-base font-medium tracking-wide mb-1.5">
            {{ project.name }}
          </div>
          <p class="text-[13px] text-[var(--text-dim)] leading-relaxed mb-2.5">
            {{ project.description }}
          </p>
          <div class="flex gap-1.5 flex-wrap">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="project-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="project-arrow">→</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-row {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  gap: 30px;
  padding: 28px 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.project-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--accent);
  transition: width 0.3s;
}

.project-row:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
}

.project-row:hover::before {
  width: 3px;
}

.project-idx {
  font-family: var(--font-serif);
  font-size: 36px;
  color: var(--accent);
  opacity: 0.3;
  transition: opacity 0.3s;
}

.project-row:hover .project-idx {
  opacity: 0.6;
}

.project-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
}

.project-arrow {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--text-muted);
  transition: all 0.3s;
}

.project-row:hover .project-arrow {
  color: var(--accent);
  transform: translateX(4px);
}
</style>
