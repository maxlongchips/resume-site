<script setup lang="ts">
import { personal, navItems } from '../data/content'

defineProps<{
  activeSection: string
}>()

defineEmits<{
  navigate: [id: string]
}>()
</script>

<template>
  <aside class="sidebar">
    <!-- Terminal dots -->
    <div class="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]">
      <span class="w-2.5 h-2.5 rounded-full bg-[#e85c4a]"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-[#5ae86a]"></span>
    </div>

    <!-- Avatar area -->
    <div class="text-center py-10 px-6">
      <div class="avatar-ring mx-auto mb-5">
        <div class="avatar-inner">
          {{ personal.avatarChar }}
        </div>
      </div>
      <div class="text-lg font-semibold tracking-[0.2em] mb-1">
        {{ personal.name }}
      </div>
      <div class="font-[var(--font-mono)] text-[11px] text-[var(--accent)] tracking-widest">
        {{ personal.titleEn }}
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-7">
      <div class="px-7 mb-4 font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
        Explorer
      </div>
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
    </nav>

    <!-- Status -->
    <div class="px-7 py-5 border-t border-[var(--border)]">
      <div class="flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] text-[var(--text-dim)]">
        <span class="status-dot"></span>
        <span>Available for work</span>
      </div>
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

.avatar-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0.4;
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px dashed var(--accent);
  opacity: 0.15;
  animation: spin 20s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.avatar-inner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-warm) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 700;
  color: var(--bg);
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
  font-size: 13px;
  font-family: var(--font-mono);
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
  font-size: 9px;
  color: var(--text-muted);
  width: 20px;
}

.nav-item.active .nav-num {
  color: var(--accent);
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

@media (max-width: 1024px) {
  .sidebar {
    width: 60px;
  }

  .sidebar .avatar-ring,
  .sidebar .sidebar-name,
  .sidebar .sidebar-title,
  .sidebar nav .nav-label,
  .sidebar nav .nav-item span:not(.nav-num),
  .sidebar .status-dot + span {
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
}
</style>
