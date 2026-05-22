<!-- src/components/SkillsSection.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore } from '../stores/resume'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const store = useResumeStore()
const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
const skills = computed(() => store.skillGroups)
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat skills.json" section-num="04" />

    <div class="skills-grid" data-reveal>
      <div
        v-for="group in skills"
        :key="group.title"
        class="skill-group"
      >
        <div class="skill-group-title">
          <span>{{ group.title }}</span>
        </div>
        <div
          v-for="skill in group.skills"
          :key="skill.name"
          class="skill-item"
          role="progressbar"
          :aria-valuenow="skill.level"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="skill.name + ': ' + skill.level + '%'"
        >
          <span>{{ skill.name }}</span>
          <div class="skill-bar">
            <div
              class="skill-bar-fill"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

.skill-group {
  padding: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
}

.skill-group::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 30px;
  right: 30px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.1;
}

.skill-group-title {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.skill-group-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.skill-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-dim);
}

.skill-item:last-child {
  border-bottom: none;
}

.skill-bar {
  width: 80px;
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 1s ease-out;
}
</style>
