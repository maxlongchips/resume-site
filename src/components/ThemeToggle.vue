<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

type Theme = 'warm-dark' | 'cool-dark' | 'warm-light' | 'cool-light'

const current = ref<Theme>('warm-dark')

const isDark = computed(() => current.value.includes('dark'))

function setTheme(theme: Theme) {
  current.value = theme
  document.documentElement.dataset.theme = theme === 'warm-dark' ? '' : theme
  localStorage.setItem('theme', theme)
}

function toggle() {
  if (isDark.value) {
    setTheme('warm-light')
  } else {
    setTheme('warm-dark')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved && ['warm-dark', 'cool-dark', 'warm-light', 'cool-light'].includes(saved)) {
    setTheme(saved)
  }
})
</script>

<template>
  <button class="theme-toggle" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'" @click="toggle">
    <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.15s ease;
}

.theme-toggle:hover {
  color: var(--text);
  background: var(--accent-subtle);
  border-color: var(--border-hover);
}
</style>
