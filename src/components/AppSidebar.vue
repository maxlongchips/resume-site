<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '简历预览', icon: 'preview' },
  { path: '/editor', label: '简历编辑', icon: 'editor' },
  { path: '/jd-radar', label: '岗位雷达', icon: 'radar' },
]

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <span class="nav-icon">
          <svg v-if="item.icon === 'preview'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <svg v-else-if="item.icon === 'editor'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          <svg v-else-if="item.icon === 'radar'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
          </svg>
        </span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 240px;
  background: rgb(9, 9, 11);
  border-right: 1px solid rgba(39, 39, 42, 0.8);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 16px 12px;
}

:root[data-theme="warm-light"] .app-sidebar,
:root[data-theme="cool-light"] .app-sidebar {
  background: rgb(244, 244, 245);
  border-right-color: rgba(0, 0, 0, 0.06);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: normal;
  color: #71717a;
  transition: all 0.15s ease;
}

.nav-item:hover {
  color: #d4d4d8;
  background: rgba(39, 39, 42, 0.4);
}

.nav-item.active {
  color: #fafafa;
  font-weight: 500;
  background: rgba(63, 63, 70, 0.5);
}

/* Light theme */
:root[data-theme="warm-light"] .nav-item,
:root[data-theme="cool-light"] .nav-item {
  color: #71717a;
}

:root[data-theme="warm-light"] .nav-item:hover,
:root[data-theme="cool-light"] .nav-item:hover {
  color: #27272a;
  background: rgba(0, 0, 0, 0.04);
}

:root[data-theme="warm-light"] .nav-item.active,
:root[data-theme="cool-light"] .nav-item.active {
  color: #18181b;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.06);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.5;
}

.nav-item.active .nav-icon {
  opacity: 1;
}

.nav-label {
  white-space: nowrap;
}

/* Responsive: tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .app-sidebar {
    width: 64px;
    padding: 16px 8px;
    align-items: center;
  }

  .nav-item {
    justify-content: center;
    padding: 10px;
  }

  .nav-label {
    display: none;
  }
}

/* Responsive: mobile */
@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-top: 1px solid rgba(39, 39, 42, 0.8);
    z-index: 50;
  }

  .sidebar-nav {
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  .nav-item {
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
  }

  .nav-label {
    font-size: 11px;
  }
}
</style>
