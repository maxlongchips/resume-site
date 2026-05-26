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
              <div class="r-field">
                <span class="r-field-label">技术栈：</span>
                <div class="r-tag-list">
                  <span v-for="(tech, ti) in exp.techStack" :key="ti" class="r-tag-chip">
                    {{ tech }}
                    <button class="r-tag-remove" @click="exp.techStack.splice(ti, 1)">×</button>
                  </span>
                  <button class="r-tag-add" @click="exp.techStack.push('新技术')">+ 技术栈</button>
                </div>
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

              <div class="r-field" v-if="proj.achievements">
                <span class="r-field-label">成果与沉淀：</span>
                <RichTextEditor v-model="proj.achievements" />
              </div>

              <div class="r-field">
                <span class="r-field-label">标签：</span>
                <div class="r-tag-list">
                  <span v-for="(tag, ti) in proj.tags" :key="ti" class="r-tag-chip">
                    {{ tag }}
                    <button class="r-tag-remove" @click="proj.tags.splice(ti, 1)">×</button>
                  </span>
                  <button class="r-tag-add" @click="proj.tags.push('新标签')">+ 标签</button>
                </div>
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
  min-height: 100%;
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
  justify-content: flex-end;
  padding: 10px 24px;
  background: #18181b;
  border-bottom: 1px solid #27272a;
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

/* Tags */
.r-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.r-tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 3px;
  background: #f1f5f9;
  color: #475569;
  font-family: var(--font-mono);
}

.r-tag-remove {
  border: none;
  background: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
  line-height: 1;
}

.r-tag-remove:hover {
  color: #ef4444;
}

.r-tag-add {
  border: 1px dashed #d1d5db;
  background: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 3px;
  font-family: var(--font-sans);
  transition: all 0.15s;
}

.r-tag-add:hover {
  border-color: #94a3b8;
  color: #475569;
}

/* ==============================
   SKILLS
   ============================== */
.r-skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

