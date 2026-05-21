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
    <SectionHeader command="ls projects/" section-num="05" />

    <div class="flex flex-col gap-6" data-reveal>
      <div
        v-for="(project, i) in projects"
        :key="project.name"
        class="project-card"
      >
        <!-- Project header -->
        <div class="project-header">
          <div class="project-idx">{{ formatIndex(i) }}</div>
          <div class="project-title-area">
            <div class="project-name">{{ project.name }}</div>
            <div class="project-meta">
              <span class="project-type">{{ project.type }}</span>
              <span class="project-period">{{ project.period }}</span>
              <span class="project-role">{{ project.role }}</span>
            </div>
          </div>
        </div>

        <!-- Project background -->
        <div class="project-section">
          <div class="section-label">项目背景</div>
          <p class="section-content">{{ project.background }}</p>
        </div>

        <!-- Project description -->
        <div class="project-section">
          <div class="section-label">项目描述</div>
          <p class="section-content">{{ project.description }}</p>
        </div>

        <!-- Responsibilities -->
        <div class="project-section">
          <div class="section-label">个人职责</div>
          <ul class="responsibilities-list">
            <li
              v-for="(resp, idx) in project.responsibilities"
              :key="idx"
              class="responsibility-item"
            >
              <span class="bullet">▸</span>
              <span>{{ resp }}</span>
            </li>
          </ul>
        </div>

        <!-- Achievements -->
        <div class="project-section">
          <div class="section-label">项目成果</div>
          <ul class="achievements-list">
            <li
              v-for="(achievement, idx) in project.achievements"
              :key="idx"
              class="achievement-item"
            >
              <span class="bullet success">✓</span>
              <span>{{ achievement }}</span>
            </li>
          </ul>
        </div>

        <!-- Tech stack -->
        <div class="project-footer">
          <div class="tech-tags">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="tech-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 32px;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
}

.project-card:hover::before {
  opacity: 1;
}

/* Header */
.project-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
}

.project-idx {
  font-family: var(--font-serif);
  font-size: 42px;
  color: var(--accent);
  opacity: 0.3;
  line-height: 1;
  flex-shrink: 0;
}

.project-card:hover .project-idx {
  opacity: 0.6;
}

.project-title-area {
  flex: 1;
}

.project-name {
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.project-type {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  padding: 2px 10px;
  border: 1px solid var(--accent);
  letter-spacing: 0.05em;
}

.project-period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

.project-role {
  font-size: 13px;
  color: var(--text-dim);
  font-weight: 300;
}

/* Sections */
.project-section {
  margin-bottom: 20px;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.section-content {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.8;
  font-weight: 300;
}

/* Lists */
.responsibilities-list,
.achievements-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.responsibility-item,
.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.6;
}

.bullet {
  color: var(--accent);
  font-size: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

.bullet.success {
  color: #5ae86a;
}

/* Footer */
.project-footer {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.tech-tags {
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
  .project-card {
    padding: 24px;
  }

  .project-idx {
    font-size: 32px;
  }

  .project-name {
    font-size: 18px;
  }

  .project-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
