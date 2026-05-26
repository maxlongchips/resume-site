<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string
  title: string
  filename: string
  dotColor: string
  placeholder?: string
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)

const localValue = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
})

const lineCount = computed(() => {
  const n = props.modelValue.split('\n').length
  return n < 10 ? `0${n}` : String(n)
})

const charCount = computed(() => {
  const n = props.modelValue.length
  return n < 100 ? String(n).padStart(3, '0') : String(n)
})
</script>

<template>
  <div
    class="code-panel"
    :class="{ focused }"
  >
    <!-- Editor Header Bar -->
    <div class="cp-header">
      <div class="dots">
        <span /><span /><span />
      </div>
      <div class="filename-tab">
        <span class="file-dot" :class="`dot-${dotColor}`" />
        {{ filename }}
      </div>
      <span class="stats">Ln {{ lineCount }} &middot; {{ charCount }} chars</span>
    </div>

    <!-- Label -->
    <div class="cp-label">{{ title }}</div>

    <!-- Textarea -->
    <div class="cp-body">
      <div class="gutter">
        <div v-for="n in lineCount" :key="n" class="gutter-line">{{ n }}</div>
      </div>
      <textarea
        v-model="localValue"
        :placeholder="placeholder"
        :readonly="readonly"
        class="cp-textarea"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>
  </div>
</template>

<style scoped>
.code-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.code-panel.focused {
  border-color: var(--accent);
  box-shadow: 0 0 16px var(--accent-subtle);
}

.cp-header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 38px;
  padding: 0 14px;
  background: var(--surface-hover);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.dots {
  display: flex;
  gap: 5px;
}
.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}
.filename-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 5px;
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
}
.file-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.dot-accent { background: var(--accent); }
.dot-warm { background: var(--accent-warm); }
.dot-green { background: #10b981; }

.stats {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.cp-label {
  padding: 10px 16px 4px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  flex-shrink: 0;
}

.cp-body {
  flex: 1;
  min-height: 0;
  position: relative;
}

.gutter {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 42px;
  background: var(--bg-deep);
  border-right: 1px solid var(--border);
  overflow: hidden;
  pointer-events: none;
}
.gutter-line {
  padding: 0 6px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.7;
  text-align: right;
  color: var(--text-muted);
  user-select: none;
}

.cp-textarea {
  width: 100%;
  height: 100%;
  background: transparent;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.75;
  padding: 0 16px 0 52px;
  border: none;
  outline: none;
  resize: none;
  caret-color: var(--accent);
}
.cp-textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}
</style>
