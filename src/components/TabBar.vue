<script setup lang="ts">
import { tabs } from '../data/content'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  navigate: [id: string]
}>()

function handleKeydown(e: KeyboardEvent, tabId: string) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('navigate', tabId)
  }
}
</script>

<template>
  <div class="tab-bar" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      role="tab"
      :aria-selected="activeTab === tab.id"
      :tabindex="activeTab === tab.id ? 0 : -1"
      :class="{ active: activeTab === tab.id }"
      @click="emit('navigate', tab.id)"
      @keydown="handleKeydown($event, tab.id)"
    >
      <span class="tab-dot" aria-hidden="true"></span>
      <span>{{ tab.label }}</span>
    </button>
    <ThemeToggle />
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--bg-deep);
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab {
  padding: 12px 24px;
  color: var(--text-muted);
  border-right: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.tab.active {
  color: var(--text);
  background: var(--bg);
  position: relative;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
}

.tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
}

.tab.active .tab-dot {
  opacity: 1;
}
</style>
