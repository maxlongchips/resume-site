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
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function startEdit() {
  editing.value = true
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.focus()
      autoResize()
    }
  })
}

function finishEdit() {
  editing.value = false
}

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
  autoResize()
}

function autoResize() {
  if (!textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    finishEdit()
  }
}
</script>

<template>
  <div
    v-if="!editing"
    class="it-trigger"
    :class="props.class"
    @click="startEdit"
  >{{ modelValue || placeholder || '' }}</div>
  <textarea
    v-else
    ref="textareaRef"
    class="it-textarea"
    :class="props.class"
    :value="modelValue"
    :placeholder="placeholder"
    @input="onInput"
    @blur="finishEdit"
    @keydown="onKeydown"
  />
</template>

<style scoped>
.it-trigger {
  cursor: text;
  border-radius: 3px;
  transition: background 0.15s;
  white-space: pre-wrap;
}

.it-trigger:hover {
  background: #dbeafe;
}

.it-textarea {
  background: transparent;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  padding: 0;
  width: 100%;
  resize: none;
  overflow: hidden;
  line-height: inherit;
  letter-spacing: inherit;
}

@media print {
  .it-trigger {
    background: transparent !important;
  }
  .it-trigger:hover {
    background: transparent !important;
  }
}
</style>
