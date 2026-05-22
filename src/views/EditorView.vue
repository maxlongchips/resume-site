<script setup lang="ts">
import { useResumeStore } from '../stores/resume'
import InlineInput from '../components/editor/InlineInput.vue'
import RichTextEditor from '../components/editor/RichTextEditor.vue'
import BlockWrapper from '../components/editor/BlockWrapper.vue'

const store = useResumeStore()

function printResume() {
  window.print()
}
</script>

<template>
  <div class="editor-shell">
    <!-- Toolbar -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <router-link to="/" class="back-link">&#8592; 保存并返回</router-link>
        <span class="toolbar-title">简历编辑器</span>
      </div>
      <div class="toolbar-actions">
        <button class="tb" @click="store.addAbout">+ 简介</button>
        <button class="tb" @click="store.addExperience">+ 经历</button>
        <button class="tb" @click="store.addProject">+ 项目</button>
        <button class="tb" @click="store.addSkillGroup">+ 技能组</button>
        <button class="tb primary" @click="printResume">导出 PDF</button>
      </div>
    </div>

    <!-- A4 Canvas -->
    <div class="a4-viewport">
      <div class="a4-paper">
        <!-- Header -->
        <header class="r-header">
          <div class="r-header-main">
            <h1 class="r-name">
              <InlineInput v-model="store.personal.name" placeholder="姓名" class="f-name" />
            </h1>
            <p class="r-title">
              <InlineInput v-model="store.personal.title" placeholder="职位头衔" class="f-title" />
            </p>
          </div>
          <div class="r-contact">
            <div class="r-contact-row">
              <span class="r-contact-icon">&#9742;</span>
              <InlineInput v-model="store.basic.phone" placeholder="电话" class="f-contact" />
            </div>
            <div class="r-contact-row">
              <span class="r-contact-icon">&#9993;</span>
              <InlineInput v-model="store.basic.email" placeholder="邮箱" class="f-contact" />
            </div>
            <div class="r-contact-row">
              <span class="r-contact-icon">&#9679;</span>
              <InlineInput v-model="store.basic.location" placeholder="所在地" class="f-contact" />
            </div>
            <div class="r-contact-row">
              <span class="r-contact-icon">&#10003;</span>
              <InlineInput v-model="store.basic.status" placeholder="求职状态" class="f-contact" />
            </div>
          </div>
        </header>

        <!-- About -->
        <section class="r-section" v-if="store.about.length">
          <h2 class="r-h2">个人简介</h2>
          <div class="r-divider"></div>
          <BlockWrapper
            v-for="(item, idx) in store.about"
            :key="item.id"
            :can-move-up="idx > 0"
            :can-move-down="idx < store.about.length - 1"
            @move-up=""
            @move-down=""
            @remove="store.removeAbout(item.id)"
          >
            <RichTextEditor v-model="item.content" />
          </BlockWrapper>
        </section>

        <!-- Experience -->
        <section class="r-section" v-if="store.experiences.length">
          <h2 class="r-h2">工作经历</h2>
          <div class="r-divider"></div>
          <BlockWrapper
            v-for="(exp, idx) in store.experiences"
            :key="exp.id"
            :can-move-up="idx > 0"
            :can-move-down="idx < store.experiences.length - 1"
            @move-up="store.moveExperience(exp.id, -1)"
            @move-down="store.moveExperience(exp.id, 1)"
            @remove="store.removeExperience(exp.id)"
          >
            <div class="r-exp">
              <div class="r-exp-head">
                <div class="r-exp-left">
                  <div class="r-exp-company">
                    <InlineInput v-model="exp.company" placeholder="公司名称" class="f-company" />
                  </div>
                  <div class="r-exp-pos">
                    <InlineInput v-model="exp.position" placeholder="职位" class="f-position" />
                  </div>
                </div>
                <div class="r-exp-period">
                  <InlineInput v-model="exp.period" placeholder="时间段" class="f-period" />
                </div>
              </div>
              <div class="r-exp-desc">
                <RichTextEditor v-model="exp.description" />
              </div>
              <div class="r-exp-ach" v-if="exp.achievements">
                <RichTextEditor v-model="exp.achievements" />
              </div>
            </div>
          </BlockWrapper>
        </section>

        <!-- Projects -->
        <section class="r-section" v-if="store.projects.length">
          <h2 class="r-h2">项目经历</h2>
          <div class="r-divider"></div>
          <BlockWrapper
            v-for="(proj, idx) in store.projects"
            :key="proj.id"
            :can-move-up="idx > 0"
            :can-move-down="idx < store.projects.length - 1"
            @move-up="store.moveProject(proj.id, -1)"
            @move-down="store.moveProject(proj.id, 1)"
            @remove="store.removeProject(proj.id)"
          >
            <div class="r-proj">
              <div class="r-proj-head">
                <div class="r-proj-left">
                  <div class="r-proj-name">
                    <InlineInput v-model="proj.name" placeholder="项目名称" class="f-proj-name" />
                  </div>
                  <div class="r-proj-role">
                    <InlineInput v-model="proj.role" placeholder="角色" class="f-position" />
                  </div>
                </div>
                <div class="r-exp-period">
                  <InlineInput v-model="proj.period" placeholder="时间段" class="f-period" />
                </div>
              </div>

              <div class="r-proj-intro">
                <RichTextEditor v-model="proj.intro" />
              </div>

              <div class="r-field">
                <span class="r-field-label">技术栈：</span>
                <InlineInput v-model="proj.techStack" placeholder="技术栈" class="f-body-sm" />
              </div>

              <div class="r-field" v-if="proj.responsibilities">
                <span class="r-field-label">核心职责：</span>
                <RichTextEditor v-model="proj.responsibilities" />
              </div>

              <div class="r-field" v-if="proj.challenges.length">
                <span class="r-field-label">难点与解决方案：</span>
                <div v-for="(ch, ci) in proj.challenges" :key="ci" class="r-star">
                  <div class="r-star-row">
                    <span class="r-star-tag">S</span>
                    <RichTextEditor v-model="ch.situation" />
                  </div>
                  <div class="r-star-row">
                    <span class="r-star-tag">T</span>
                    <RichTextEditor v-model="ch.task" />
                  </div>
                  <div class="r-star-row">
                    <span class="r-star-tag">A</span>
                    <RichTextEditor v-model="ch.action" />
                  </div>
                  <div class="r-star-row">
                    <span class="r-star-tag">R</span>
                    <RichTextEditor v-model="ch.result" />
                  </div>
                </div>
              </div>

              <div class="r-field" v-if="proj.achievements">
                <span class="r-field-label">成果与沉淀：</span>
                <RichTextEditor v-model="proj.achievements" />
              </div>
            </div>
          </BlockWrapper>
        </section>

        <!-- Skills -->
        <section class="r-section" v-if="store.skillGroups.length">
          <h2 class="r-h2">技能</h2>
          <div class="r-divider"></div>
          <div class="r-skills-grid">
            <BlockWrapper
              v-for="(group, idx) in store.skillGroups"
              :key="group.id"
              :can-move-up="idx > 0"
              :can-move-down="idx < store.skillGroups.length - 1"
              @move-up=""
              @move-down=""
              @remove="store.removeSkillGroup(group.id)"
            >
              <div class="r-skill-group">
                <div class="r-skill-title">
                  <InlineInput v-model="group.title" placeholder="分组名" class="f-skill-title" />
                </div>
                <div class="r-skill-items">
                  <div v-for="(skill, si) in group.skills" :key="si" class="r-skill-row">
                    <InlineInput v-model="skill.name" placeholder="技能名" class="f-body-sm" />
                    <span class="r-skill-level">{{ skill.level }}%</span>
                  </div>
                </div>
              </div>
            </BlockWrapper>
          </div>
        </section>

        <!-- Contacts -->
        <section class="r-section" v-if="store.contacts.length">
          <h2 class="r-h2">联系方式</h2>
          <div class="r-divider"></div>
          <div class="r-contacts-grid">
            <div v-for="contact in store.contacts" :key="contact.id" class="r-contact-item">
              <span class="r-contact-label">
                <InlineInput v-model="contact.label" placeholder="标签" class="f-label" />
              </span>
              <span class="r-contact-val">
                <InlineInput v-model="contact.value" placeholder="内容" class="f-body-sm" />
              </span>
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
  </div>
</template>

<style scoped>
/* ==============================
   WORKSPACE — dark surround
   ============================== */
.editor-shell {
  min-height: 100vh;
  background: #18181b;
  padding-bottom: 60px;
}

/* Toolbar */
.editor-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  background: #18181b;
  border-bottom: 1px solid #27272a;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-link {
  color: #a1a1aa;
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 13px;
  transition: color 0.15s;
}

.back-link:hover {
  color: #e4e4e7;
}

.toolbar-title {
  font-family: var(--font-sans);
  font-size: 14px;
  color: #71717a;
  letter-spacing: 0.02em;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.tb {
  padding: 6px 14px;
  border: 1px solid #3f3f46;
  background: #27272a;
  color: #a1a1aa;
  font-family: var(--font-sans);
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s;
}

.tb:hover {
  border-color: #52525b;
  color: #e4e4e7;
  background: #2d2d30;
}

.tb.primary {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  font-weight: 600;
}

.tb.primary:hover {
  background: #1d4ed8;
}

/* ==============================
   A4 VIEWPORT & PAPER
   ============================== */
.a4-viewport {
  display: flex;
  justify-content: center;
  padding: 48px 20px 80px;
}

.a4-paper {
  width: 210mm;
  min-height: 297mm;
  background: #ffffff;
  color: #1e293b;
  padding: 28mm 24mm 20mm 24mm;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
  border-radius: 2px;
  position: relative;
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.65;
}

/* ==============================
   HEADER
   ============================== */
.r-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 24px;
}

.r-header-main {
  flex: 1;
}

.r-name {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
  color: #0f172a;
  line-height: 1.2;
}

.r-title {
  font-size: 18px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.r-contact {
  text-align: right;
  font-size: 13px;
  color: #475569;
  flex-shrink: 0;
}

.r-contact-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 5px;
}

.r-contact-icon {
  font-size: 12px;
  color: #94a3b8;
}

/* ==============================
   SECTION
   ============================== */
.r-section {
  margin-bottom: 20px;
}

.r-h2 {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 24px 0 8px 0;
  letter-spacing: 0.02em;
}

.r-divider {
  height: 1px;
  background: #e2e8f0;
  margin-bottom: 14px;
}

/* ==============================
   EXPERIENCE
   ============================== */
.r-exp {
  margin-bottom: 16px;
}

.r-exp-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.r-exp-left {
  flex: 1;
}

.r-exp-company {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.r-exp-pos {
  font-size: 14px;
  color: #64748b;
  margin-top: 2px;
}

.r-exp-period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #94a3b8;
  flex-shrink: 0;
  padding-top: 3px;
}

.r-exp-desc {
  font-size: 15px;
  color: #475569;
  margin-bottom: 8px;
  line-height: 1.65;
}

.r-exp-ach {
  margin-top: 4px;
}

/* ==============================
   PROJECTS
   ============================== */
.r-proj {
  margin-bottom: 18px;
  padding-bottom: 14px;
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
  margin-bottom: 6px;
}

.r-proj-left {
  flex: 1;
}

.r-proj-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.r-proj-role {
  font-size: 14px;
  color: #64748b;
  margin-top: 2px;
}

.r-proj-intro {
  font-size: 15px;
  color: #475569;
  margin-bottom: 10px;
  line-height: 1.65;
}

.r-field {
  margin-bottom: 10px;
}

.r-field-label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 4px;
}

/* STAR */
.r-star {
  margin: 6px 0 12px 0;
  padding: 10px 12px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #cbd5e1;
}

.r-star-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 5px;
}

.r-star-row:last-child {
  margin-bottom: 0;
}

.r-star-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  background: #e2e8f0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ==============================
   SKILLS
   ============================== */
.r-skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.r-skill-title {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}

.r-skill-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.r-skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #475569;
}

.r-skill-level {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #94a3b8;
}

/* ==============================
   CONTACTS
   ============================== */
.r-contacts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.r-contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.r-contact-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #94a3b8;
  min-width: 72px;
}

.r-contact-val {
  color: #475569;
}

/* ==============================
   FOOTER
   ============================== */
.r-footer {
  margin-top: 28px;
  text-align: center;
}

.r-footer-line {
  height: 1px;
  background: #e2e8f0;
  margin-bottom: 12px;
}

.r-footer-text {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.2em;
}

/* ==============================
   FIELD-LEVEL FONT CLASSES
   ============================== */
.f-name {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #0f172a;
  line-height: 1.2;
}

.f-title {
  font-size: 18px;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.02em;
}

.f-contact {
  font-size: 13px;
  color: #475569;
}

.f-company {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.f-position {
  font-size: 14px;
  color: #64748b;
}

.f-period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #94a3b8;
}

.f-proj-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.f-body-sm {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
}

.f-skill-title {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  letter-spacing: 0.04em;
}

.f-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #94a3b8;
}

@media (max-width: 1100px) {
  .a4-paper {
    width: 100%;
    padding: 24px 20px;
  }
}
</style>

<!-- UNSCOPED: print must target html/body/#app which don't carry scoped attrs -->
<style>
@page {
  margin: 0mm;
  size: A4;
}

@media print {
  html, body, #app {
    height: auto !important;
    overflow: visible !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
  }

  body::before {
    display: none !important;
  }

  .editor-toolbar {
    display: none !important;
  }

  .editor-shell {
    background: #ffffff !important;
    padding: 0 !important;
    min-height: auto !important;
  }

  .a4-viewport {
    padding: 0 !important;
  }

  .a4-paper {
    width: 100% !important;
    min-height: auto !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 12mm 16mm !important;
    background: #ffffff !important;
    color: #1e293b !important;
  }

  .block-wrapper {
    background: transparent !important;
  }

  .block-toolbar {
    display: none !important;
  }

  .rte-wrap .tiptap:hover {
    background: transparent !important;
  }

  .r-name, .f-name { color: #0f172a !important; }
  .r-h2 { color: #0f172a !important; }
  .r-divider, .r-footer-line { background: #e2e8f0 !important; }
  .r-star { background: #f8fafc !important; border-left-color: #cbd5e1 !important; }
  .r-star-tag { background: #e2e8f0 !important; color: #475569 !important; }
}
</style>
