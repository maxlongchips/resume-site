<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  class?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function startEdit() {
  editing.value = true
  nextTick(() => inputRef.value?.focus())
}

function finishEdit() {
  editing.value = false
}

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    finishEdit()
  }
}
</script>

<template>
  <span
    v-if="!editing"
    class="ie-trigger"
    :class="props.class"
    @click="startEdit"
  >{{ modelValue || placeholder || '' }}</span>
  <input
    v-else
    ref="inputRef"
    type="text"
    class="ie-input"
    :class="props.class"
    :value="modelValue"
    :placeholder="placeholder"
    @input="onInput"
    @blur="finishEdit"
    @keydown="onKeydown"
  />
</template>

<style scoped>
.ie-trigger {
  cursor: text;
  border-radius: 2px;
  transition: background 0.15s;
}

.ie-trigger:hover {
  background: #dbeafe;
}

.ie-input {
  background: transparent;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  padding: 0;
  width: 100%;
  letter-spacing: inherit;
  line-height: inherit;
}

@media print {
  .ie-trigger {
    background: transparent !important;
  }
  .ie-trigger:hover {
    background: transparent !important;
  }
}
</style>
