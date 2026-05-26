<!-- src/components/ProjectsSection.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore, htmlToArr, stripHtml } from '../stores/resume'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const store = useResumeStore()
const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

function formatIndex(i: number): string {
  return String(i + 1).padStart(2, '0')
}

const projects = computed(() =>
  store.projects.map((p) => ({
    ...p,
    intro: stripHtml(p.intro),
    responsibilities: htmlToArr(p.responsibilities),
    achievements: htmlToArr(p.achievements),
  })),
)
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

        <!-- 1. 项目简介与技术栈 -->
        <div class="project-section">
          <div class="section-label">项目简介与技术栈</div>
          <p class="section-content">{{ project.intro }}</p>
          <p class="tech-stack-line">{{ project.techStack }}</p>
        </div>

        <!-- 2. 核心职责 -->
        <div class="project-section">
          <div class="section-label">核心职责</div>
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

        <!-- 3. 难点与解决方案 (STAR) -->
        <div class="project-section">
          <div class="section-label">难点与解决方案</div>
          <div
            v-for="(challenge, idx) in project.challenges"
            :key="idx"
            class="challenge-block"
          >
            <div class="star-row">
              <span class="star-tag">S</span>
              <span class="star-text">{{ challenge.situation }}</span>
            </div>
            <div class="star-row">
              <span class="star-tag">T</span>
              <span class="star-text">{{ challenge.task }}</span>
            </div>
            <div class="star-row">
              <span class="star-tag">A</span>
              <span class="star-text">{{ challenge.action }}</span>
            </div>
            <div class="star-row">
              <span class="star-tag">R</span>
              <span class="star-text">{{ challenge.result }}</span>
            </div>
            <div v-if="challenge.techConcepts?.length" class="tech-concepts">
              <span
                v-for="concept in challenge.techConcepts"
                :key="concept"
                class="concept-tag"
              >
                {{ concept }}
              </span>
            </div>
          </div>
        </div>

        <!-- 4. 成果与沉淀 -->
        <div class="project-section">
          <div class="section-label">成果与沉淀</div>
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

        <!-- Tech stack tags -->
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
  font-family: var(--font-sans);
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
  font-size: 13px;
  color: var(--accent);
  padding: 2px 10px;
  border: 1px solid var(--accent);
  letter-spacing: 0.05em;
}

.project-period {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-dim);
}

.project-role {
  font-size: 15px;
  color: var(--text-dim);
  font-weight: 300;
}

/* Sections */
.project-section {
  margin-bottom: 20px;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.section-content {
  font-size: 16px;
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
  font-size: 15px;
  color: var(--text-dim);
  line-height: 1.6;
}

.bullet {
  color: var(--accent);
  font-size: 14px;
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
  font-size: 13px;
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

/* Tech stack line */
.tech-stack-line {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-top: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
}

/* Challenge block */
.challenge-block {
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--border);
}

.challenge-block:last-child {
  margin-bottom: 0;
}

/* STAR rows */
.star-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

.star-row:last-of-type {
  margin-bottom: 0;
}

.star-tag {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--bg);
  background: var(--accent);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.star-text {
  font-size: 15px;
  color: var(--text-dim);
  line-height: 1.7;
}

/* Tech concepts */
.tech-concepts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.concept-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  padding: 3px 10px;
  border: 1px solid rgba(232, 168, 73, 0.3);
  background: var(--accent-subtle);
  letter-spacing: 0.03em;
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
