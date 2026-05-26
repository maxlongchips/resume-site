<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-icon">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
      <span class="logo-text">
        <span class="logo-bold">GeekResume</span>
        <span class="logo-light">Studio</span>
      </span>
    </div>
    <div class="header-right">
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  backdrop-filter: blur(12px);
  background: rgba(9, 9, 11, 0.8);
  border-bottom: 1px solid rgba(39, 39, 42, 0.8);
  flex-shrink: 0;
  z-index: 20;
}

:root[data-theme="warm-light"] .app-header,
:root[data-theme="cool-light"] .app-header {
  background: rgba(255, 255, 255, 0.8);
  border-bottom-color: rgba(0, 0, 0, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  color: #71717a;
}

:root[data-theme="warm-light"] .logo-icon,
:root[data-theme="cool-light"] .logo-icon {
  color: #a1a1aa;
}

.logo-text {
  font-size: 14px;
  letter-spacing: 0.01em;
}

.logo-bold {
  font-weight: 700;
  color: #fafafa;
}

.logo-light {
  font-weight: 400;
  color: #71717a;
  margin-left: 3px;
}

:root[data-theme="warm-light"] .logo-bold,
:root[data-theme="cool-light"] .logo-bold {
  color: #18181b;
}

:root[data-theme="warm-light"] .logo-light,
:root[data-theme="cool-light"] .logo-light {
  color: #a1a1aa;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
