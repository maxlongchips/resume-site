<script setup lang="ts">
import { ref } from 'vue'
import { experiences } from '../data/content'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat experience.ts" section-num="03" />

    <div class="timeline" data-reveal>
      <div
        v-for="(exp, index) in experiences"
        :key="exp.company"
        class="timeline-item"
        :class="{ 'is-last': index === experiences.length - 1 }"
      >
        <!-- Timeline line and dot -->
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          <div class="timeline-line"></div>
        </div>

        <!-- Content -->
        <div class="timeline-content">
          <!-- Header -->
          <div class="timeline-header">
            <div class="timeline-period">{{ exp.period }}</div>
            <h3 class="timeline-company">{{ exp.company }}</h3>
            <div class="timeline-position">{{ exp.position }}</div>
          </div>

          <!-- Description -->
          <p class="timeline-desc">{{ exp.description }}</p>

          <!-- Achievements -->
          <div class="timeline-achievements">
            <div class="achievements-title">主要成就</div>
            <ul class="achievements-list">
              <li
                v-for="(achievement, i) in exp.achievements"
                :key="i"
                class="achievement-item"
              >
                <span class="achievement-bullet">▸</span>
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>

          <!-- Tech Stack -->
          <div class="timeline-tech">
            <span
              v-for="tech in exp.techStack"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  padding-left: 40px;
}

.timeline-item {
  position: relative;
  padding-bottom: 40px;
}

.timeline-item.is-last {
  padding-bottom: 0;
}

/* Timeline marker (line + dot) */
.timeline-marker {
  position: absolute;
  left: -40px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--bg);
  box-shadow: 0 0 0 2px var(--accent);
  z-index: 1;
  flex-shrink: 0;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, var(--accent), var(--border));
  margin-top: 4px;
}

.timeline-item.is-last .timeline-line {
  display: none;
}

/* Timeline content */
.timeline-content {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 28px;
  position: relative;
  transition: all 0.3s;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 12px;
  left: -8px;
  width: 14px;
  height: 14px;
  background: var(--surface);
  border-left: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transform: rotate(45deg);
}

.timeline-content:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
}

/* Header */
.timeline-header {
  margin-bottom: 16px;
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.timeline-company {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: 0.02em;
}

.timeline-position {
  font-size: 14px;
  color: var(--text-dim);
  font-weight: 300;
}

/* Description */
.timeline-desc {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.8;
  margin-bottom: 20px;
  font-weight: 300;
}

/* Achievements */
.timeline-achievements {
  margin-bottom: 20px;
}

.achievements-title {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.achievements-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.6;
}

.achievement-bullet {
  color: var(--accent);
  font-size: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Tech tags */
.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.tech-tag:hover {
  border-color: var(--accent);
  color: var(--text);
  background: var(--accent-subtle);
}

/* Responsive */
@media (max-width: 768px) {
  .timeline {
    padding-left: 30px;
  }

  .timeline-marker {
    left: -30px;
  }

  .timeline-content {
    padding: 20px;
  }

  .timeline-company {
    font-size: 18px;
  }
}
</style>
