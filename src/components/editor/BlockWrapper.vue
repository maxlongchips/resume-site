<script setup lang="ts">
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-vue-next'

defineProps<{
  canMoveUp?: boolean
  canMoveDown?: boolean
}>()

defineEmits<{
  moveUp: []
  moveDown: []
  remove: []
}>()
</script>

<template>
  <div class="block-wrapper">
    <div class="block-toolbar">
      <button
        v-if="canMoveUp"
        class="block-btn"
        title="上移"
        @click="$emit('moveUp')"
      ><ChevronUp :size="14" /></button>
      <button
        v-if="canMoveDown"
        class="block-btn"
        title="下移"
        @click="$emit('moveDown')"
      ><ChevronDown :size="14" /></button>
      <button
        class="block-btn danger"
        title="删除"
        @click="$emit('remove')"
      ><Trash2 :size="13" /></button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.block-wrapper {
  position: relative;
  border-radius: 4px;
  transition: background 0.15s;
}

.block-wrapper:hover {
  background: #f1f5f9;
}

.block-toolbar {
  position: absolute;
  right: -48px;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
}

.block-wrapper:hover .block-toolbar {
  opacity: 1;
}

.block-btn {
  width: 22px;
  height: 22px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #94a3b8;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 0;
}

.block-btn:hover {
  color: #475569;
  border-color: #cbd5e1;
  background: #f8fafc;
}

.block-btn.danger:hover {
  color: #dc2626;
  border-color: #fca5a5;
  background: #fef2f2;
}

@media print {
  .block-wrapper {
    background: transparent !important;
  }
  .block-toolbar {
    display: none !important;
  }
}
</style>
