<script setup lang="ts">
import { useResumeStore } from '../stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="preview-workspace">
    <div class="a4-paper">
      <!-- Header -->
      <header class="r-header">
        <div class="r-header-main">
          <h1 class="r-name">{{ store.personal.name }}</h1>
          <p class="r-title">{{ store.personal.title }}</p>
        </div>
        <div class="r-contact">
          <div class="r-contact-row">
            <span class="r-contact-icon">&#9742;</span>
            <span>{{ store.basic.phone }}</span>
          </div>
          <div class="r-contact-row">
            <span class="r-contact-icon">&#9993;</span>
            <span>{{ store.basic.email }}</span>
          </div>
          <div class="r-contact-row">
            <span class="r-contact-icon">&#9679;</span>
            <span>{{ store.basic.location }}</span>
          </div>
          <div class="r-contact-row">
            <span class="r-contact-icon">&#10003;</span>
            <span>{{ store.basic.status }}</span>
          </div>
        </div>
      </header>

      <!-- About -->
      <section v-if="store.about.length" class="r-section">
        <h2 class="r-h2">个人简介</h2>
        <div class="r-divider"></div>
        <div v-for="item in store.about" :key="item.id" class="r-about-text" v-html="item.content"></div>
      </section>

      <!-- Experience -->
      <section v-if="store.experiences.length" class="r-section">
        <h2 class="r-h2">工作经历</h2>
        <div class="r-divider"></div>
        <div v-for="exp in store.experiences" :key="exp.id" class="r-exp">
          <div class="r-exp-head">
            <div class="r-exp-left">
              <div class="r-exp-company">{{ exp.company }}</div>
              <div class="r-exp-pos">{{ exp.position }}</div>
            </div>
            <div class="r-exp-period">{{ exp.period }}</div>
          </div>
          <div class="r-exp-desc" v-html="exp.description"></div>
          <div v-if="exp.achievements" class="r-exp-ach" v-html="exp.achievements"></div>
          <div v-if="exp.techStack.length" class="r-tech-stack">
            <span v-for="tech in exp.techStack" :key="tech" class="r-tech-tag">{{ tech }}</span>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section v-if="store.projects.length" class="r-section">
        <h2 class="r-h2">项目经历</h2>
        <div class="r-divider"></div>
        <div v-for="proj in store.projects" :key="proj.id" class="r-proj">
          <div class="r-proj-head">
            <div class="r-proj-left">
              <div class="r-proj-name">{{ proj.name }}</div>
              <div class="r-proj-role">{{ proj.role }}</div>
            </div>
            <div class="r-proj-period">{{ proj.period }}</div>
          </div>
          <div class="r-proj-intro" v-html="proj.intro"></div>
          <div v-if="proj.techStack" class="r-field">
            <span class="r-field-label">技术栈：</span>
            <span class="r-field-value">{{ proj.techStack }}</span>
          </div>
          <div v-if="proj.responsibilities" class="r-field">
            <span class="r-field-label">核心职责：</span>
            <div class="r-field-html" v-html="proj.responsibilities"></div>
          </div>
          <div v-if="proj.achievements" class="r-field">
            <span class="r-field-label">成果与沉淀：</span>
            <div class="r-field-html" v-html="proj.achievements"></div>
          </div>
          <div v-if="proj.tags.length" class="r-tags">
            <span v-for="tag in proj.tags" :key="tag" class="r-tag">{{ tag }}</span>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section v-if="store.skillGroups.length" class="r-section">
        <h2 class="r-h2">技能</h2>
        <div class="r-divider"></div>
        <div class="r-skills-grid">
          <div v-for="group in store.skillGroups" :key="group.id" class="r-skill-group">
            <div class="r-skill-title">{{ group.title }}</div>
            <div class="r-skill-items">
              <div v-for="skill in group.skills" :key="skill.name" class="r-skill-row">
                <span class="r-skill-name">{{ skill.name }}</span>
                <span class="r-skill-level">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contacts -->
      <section v-if="store.contacts.length" class="r-section">
        <h2 class="r-h2">联系方式</h2>
        <div class="r-divider"></div>
        <div class="r-contacts-grid">
          <div v-for="contact in store.contacts" :key="contact.id" class="r-contact-item">
            <span class="r-contact-label">{{ contact.label }}</span>
            <span class="r-contact-val">{{ contact.value }}</span>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="r-footer">
        <div class="r-footer-line"></div>
        <p class="r-footer-text">DESIGNED &amp; BUILT BY {{ store.personal.name }}</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.preview-workspace {
  display: flex;
  justify-content: center;
  padding: 40px 24px 80px;
  min-height: 100%;
}

.a4-paper {
  width: 210mm;
  min-height: 297mm;
  background: #ffffff;
  color: #1e293b;
  padding: 28mm 24mm 20mm 24mm;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  position: relative;
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.6;
}

/* Header */
.r-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 24px;
}

.r-header-main {
  flex: 1;
}

.r-name {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: #0f172a;
  line-height: 1.2;
}

.r-title {
  font-size: 16px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.r-contact {
  text-align: right;
  font-size: 12px;
  color: #475569;
  flex-shrink: 0;
}

.r-contact-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-bottom: 4px;
}

.r-contact-icon {
  font-size: 11px;
  color: #94a3b8;
}

/* Sections */
.r-section {
  margin-bottom: 16px;
}

.r-h2 {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 20px 0 6px 0;
  letter-spacing: 0.02em;
}

.r-divider {
  height: 1px;
  background: #e2e8f0;
  margin-bottom: 12px;
}

/* About */
.r-about-text {
  font-size: 13px;
  color: #334155;
  line-height: 1.7;
}

.r-about-text :deep(strong) {
  font-weight: 600;
  color: #0f172a;
}

/* Experience */
.r-exp {
  margin-bottom: 14px;
}

.r-exp-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.r-exp-left {
  flex: 1;
}

.r-exp-company {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.r-exp-pos {
  font-size: 13px;
  color: #64748b;
  margin-top: 1px;
}

.r-exp-period {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #94a3b8;
  flex-shrink: 0;
  padding-top: 2px;
}

.r-exp-desc {
  font-size: 13px;
  color: #475569;
  margin-bottom: 6px;
  line-height: 1.6;
}

.r-exp-ach {
  margin-top: 2px;
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}

.r-exp-ach :deep(ul) {
  list-style: none;
  padding-left: 0;
}

.r-exp-ach :deep(li) {
  position: relative;
  padding-left: 14px;
  margin-bottom: 2px;
}

.r-exp-ach :deep(li::before) {
  content: '\25B8';
  position: absolute;
  left: 0;
  color: #94a3b8;
  font-size: 10px;
}

.r-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.r-tech-tag {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 3px;
  background: #f1f5f9;
  color: #475569;
  font-family: var(--font-mono);
}

/* Projects */
.r-proj {
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.r-proj:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.r-proj-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.r-proj-left {
  flex: 1;
}

.r-proj-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.r-proj-role {
  font-size: 13px;
  color: #64748b;
  margin-top: 1px;
}

.r-proj-period {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #94a3b8;
  flex-shrink: 0;
  padding-top: 2px;
}

.r-proj-intro {
  font-size: 13px;
  color: #475569;
  margin-bottom: 8px;
  line-height: 1.6;
}

.r-field {
  margin-bottom: 8px;
}

.r-field-label {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 2px;
}

.r-field-value {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}

.r-field-html {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}

.r-field-html :deep(ul) {
  list-style: none;
  padding-left: 0;
}

.r-field-html :deep(li) {
  position: relative;
  padding-left: 14px;
  margin-bottom: 2px;
}

.r-field-html :deep(li::before) {
  content: '\25B8';
  position: absolute;
  left: 0;
  color: #94a3b8;
  font-size: 10px;
}

.r-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.r-tag {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 3px;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

/* Skills */
.r-skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.r-skill-title {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}

.r-skill-items {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.r-skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #475569;
}

.r-skill-level {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #94a3b8;
}

/* Contacts */
.r-contacts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.r-contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.r-contact-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: #94a3b8;
  min-width: 60px;
}

.r-contact-val {
  color: #475569;
}

/* Footer */
.r-footer {
  margin-top: 24px;
  text-align: center;
}

.r-footer-line {
  height: 1px;
  background: #e2e8f0;
  margin-bottom: 10px;
}

.r-footer-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #94a3b8;
  letter-spacing: 0.2em;
}

/* Responsive */
@media (max-width: 1100px) {
  .a4-paper {
    width: 100%;
    padding: 24px 20px;
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .preview-workspace {
    padding: 16px 12px 60px;
  }

  .r-skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
