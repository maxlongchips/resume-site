<!-- src/components/AboutSection.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore } from '../stores/resume'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const store = useResumeStore()
const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const about = computed(() => ({
  bio: store.about.map((a) => a.content).join(''),
  cards: store.aboutCards,
}))
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat about.md" section-num="02" />

    <p
      class="text-lg leading-[2] text-[var(--text-dim)] font-light mb-12 max-w-[700px]"
      data-reveal
      v-html="about.bio"
    ></p>

    <div class="about-cards-grid" data-reveal>
      <div
        v-for="card in about.cards"
        :key="card.label"
        class="info-card"
      >
        <div class="font-[var(--font-mono)] text-xl text-[var(--accent)] opacity-60 mb-3">
          {{ card.icon }}
        </div>
        <div class="font-[var(--font-mono)] text-[11px] text-[var(--text-muted)] tracking-[0.15em] uppercase mb-1.5">
          {{ card.label }}
        </div>
        <div
          class="text-sm"
          :class="card.accent ? 'text-[var(--accent)]' : 'text-[var(--text)]'"
        >
          {{ card.value }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .about-cards-grid {
    grid-template-columns: 1fr;
  }
}

:deep(.highlight) {
  color: var(--accent);
  font-weight: 400;
  position: relative;
}

:deep(.highlight)::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0.3;
}

:deep(strong) {
  color: var(--text);
  font-weight: 500;
}

.info-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.info-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.info-card:hover::before {
  opacity: 1;
}
</style>
