<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'

const route = useRoute()
const showHeader = computed(() => route.name === 'preview')
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="app-main">
      <AppHeader v-if="showHeader" />
      <div class="app-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: rgb(24, 24, 27);
}

:root[data-theme="warm-light"] .app-main,
:root[data-theme="cool-light"] .app-main {
  background: rgb(250, 250, 250);
}

.app-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .app-layout {
    padding-bottom: 56px;
  }
}
</style>
