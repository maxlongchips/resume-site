<script setup lang="ts">
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'rte-prose prose prose-sm prose-slate max-w-none focus:outline-none',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    const isSame = editor.value.getHTML() === value
    if (isSame) return
    editor.value.commands.setContent(value || '', false)
  },
)
</script>

<template>
  <div class="rte-wrap">
    <editor-content v-if="editor" :editor="editor" />
  </div>
</template>

<style scoped>
.rte-wrap :deep(.tiptap) {
  outline: none;
  cursor: text;
  border-radius: 3px;
  transition: background 0.15s;
  min-height: 1em;
}

.rte-wrap :deep(.tiptap:hover) {
  background: #dbeafe;
}

.rte-wrap :deep(.tiptap:focus) {
  background: transparent;
}

.rte-wrap :deep(.tiptap p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #94a3b8;
  pointer-events: none;
  height: 0;
}

/* Ensure lists render properly in the editor */
.rte-wrap :deep(.tiptap ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.25rem 0;
}

.rte-wrap :deep(.tiptap ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.25rem 0;
}

.rte-wrap :deep(.tiptap li) {
  margin: 0.1rem 0;
}

.rte-wrap :deep(.tiptap li p) {
  margin: 0;
}

.rte-wrap :deep(.tiptap p) {
  margin: 0;
}

@media print {
  .rte-wrap :deep(.tiptap:hover) {
    background: transparent !important;
  }
}
</style>
