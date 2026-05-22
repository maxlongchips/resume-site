<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore } from '../stores/resume'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const store = useResumeStore()
const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
const contacts = computed(() => store.contacts)
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat contact.ts" section-num="06" />

    <div class="contacts-grid" data-reveal>
      <component
        :is="contact.href ? 'a' : 'div'"
        v-for="contact in contacts"
        :key="contact.label"
        class="contact-card"
        :href="contact.href"
        :target="contact.href?.startsWith('http') ? '_blank' : undefined"
        :rel="contact.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
        :aria-label="contact.label + ': ' + contact.value"
      >
        <div class="contact-icon-box">
          {{ contact.icon }}
        </div>
        <div>
          <div class="font-[var(--font-mono)] text-[11px] text-[var(--text-muted)] tracking-[0.15em] mb-1">
            {{ contact.label }}
          </div>
          <div class="text-sm text-[var(--text)]">
            {{ contact.value }}
          </div>
        </div>
      </component>
    </div>
  </section>
</template>

<style scoped>
.contacts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }
}

.contact-card {
  padding: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-subtle), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.contact-card:hover::before {
  opacity: 1;
}

.contact-icon-box {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  font-size: 18px;
  color: var(--accent);
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
}
</style>
