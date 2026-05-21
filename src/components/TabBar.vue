<script setup lang="ts">
import { tabs } from '../data/content'

defineProps<{
  activeTab: string
}>()
</script>

<template>
  <div class="flex border-b border-[var(--border)] font-[var(--font-mono)] text-[11px] bg-[var(--bg-deep)] sticky top-0 z-10">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{ active: activeTab === tab.id }"
    >
      <span class="tab-dot"></span>
      <span>{{ tab.label }}</span>
    </div>
  </div>
</template>

<style scoped>
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
