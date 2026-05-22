<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Theme = 'warm-dark' | 'cool-dark' | 'warm-light' | 'cool-light'

const themes: { id: Theme; label: string; icon: string }[] = [
  { id: 'warm-dark', label: '暖夜', icon: '☽' },
  { id: 'cool-dark', label: '冷夜', icon: '☾' },
  { id: 'warm-light', label: '暖日', icon: '☼' },
  { id: 'cool-light', label: '冷日', icon: '☀' },
]

const current = ref<Theme>('warm-dark')

function setTheme(theme: Theme) {
  current.value = theme
  document.documentElement.dataset.theme = theme === 'warm-dark' ? '' : theme
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved && themes.some(t => t.id === saved)) {
    setTheme(saved)
  }
})
</script>

<template>
  <div class="theme-toggle">
    <button
      v-for="t in themes"
      :key="t.id"
      class="theme-btn"
      :class="{ active: current === t.id }"
      :title="t.label"
      @click="setTheme(t.id)"
    >
      {{ t.icon }}
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  padding-right: 12px;
}

.theme-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  border-radius: 4px;
}

.theme-btn:hover {
  color: var(--text);
  background: var(--accent-subtle);
  border-color: var(--border);
}

.theme-btn.active {
  color: var(--accent);
  background: var(--accent-subtle);
  border-color: var(--accent);
}
</style>
