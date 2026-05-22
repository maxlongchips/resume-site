<script setup lang="ts">
import { navItems } from '../data/content'
import { useResumeStore } from '../stores/resume'
import ThemeToggle from './ThemeToggle.vue'

const store = useResumeStore()

defineProps<{
  activeSection: string
  open?: boolean
}>()

defineEmits<{
  navigate: [id: string]
}>()
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <!-- Avatar + Name -->
    <div class="sidebar-header">
      <div class="avatar-ring">
        <div class="avatar-inner">
          {{ store.personal.avatarChar }}
        </div>
      </div>
      <div class="sidebar-identity">
        <div class="sidebar-name">{{ store.personal.name }}</div>
        <div class="sidebar-title">{{ store.personal.title }}</div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-7">
      <div
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click="$emit('navigate', item.id)"
      >
        <span class="nav-num">{{ item.num }}</span>
        <span>{{ item.label }}</span>
      </div>

      <!-- Editor link -->
      <router-link to="/editor" class="nav-item editor-link">
        <span class="nav-num">07</span>
        <span>简历编辑</span>
      </router-link>
    </nav>

    <!-- Status (desktop) -->
    <div class="sidebar-status">
      <div class="flex items-center gap-2.5 font-[var(--font-mono)] text-[13px] text-[var(--text-dim)]">
        <span class="status-dot"></span>
        <span>Available for work</span>
      </div>
    </div>

    <!-- Theme toggle (mobile only) -->
    <div class="sidebar-theme">
      <ThemeToggle />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  background: var(--bg-deep);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
}

.sidebar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, var(--accent) 0%, transparent 30%, transparent 70%, var(--accent) 100%);
  opacity: 0.3;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 20px;
  border-bottom: 1px solid var(--border);
}

.avatar-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-inner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-warm) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--bg);
}

.sidebar-identity {
  min-width: 0;
}

.sidebar-name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-title {
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.04em;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-item {
  padding: 10px 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-dim);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-size: 14px;
  font-family: var(--font-sans);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--accent);
  transition: width 0.3s;
}

.nav-item:hover {
  color: var(--text);
  background: var(--accent-subtle);
}

.nav-item.active {
  color: var(--text);
  background: var(--accent-subtle);
}

.nav-item.active::before {
  width: 3px;
}

.nav-num {
  font-size: 11px;
  color: var(--text-muted);
  width: 20px;
  font-family: var(--font-mono);
}

.nav-item.active .nav-num {
  color: var(--accent);
}

.editor-link {
  text-decoration: none;
  border-top: 1px dashed var(--border);
  margin-top: 4px;
  padding-top: 12px;
}

.sidebar-status {
  padding: 20px 28px;
  border-top: 1px solid var(--border);
}

.sidebar-theme {
  display: none;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
}

.status-dot {
  width: 7px;
  height: 7px;
  background: #5ae86a;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 8px rgba(90, 232, 106, 0.4);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .sidebar {
    width: 60px;
  }

  .sidebar .sidebar-header {
    display: none;
  }

  .sidebar nav .nav-item span:not(.nav-num) {
    display: none;
  }

  .sidebar nav .nav-item {
    padding: 10px;
    justify-content: center;
  }

  .sidebar nav .nav-num {
    width: auto;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -300px;
    top: 0;
    bottom: 0;
    z-index: 50;
    width: 300px;
    transition: left 0.3s;
  }

  .sidebar.open {
    left: 0;
  }

  .sidebar nav .nav-num {
    display: none;
  }

  .sidebar-status {
    display: none;
  }

  .sidebar-theme {
    display: block;
  }
}
</style>
