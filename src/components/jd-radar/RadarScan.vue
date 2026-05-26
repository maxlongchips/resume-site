<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  ready: []
}>()

const logLines = ref<string[]>([])
const logInterval = ref<ReturnType<typeof setInterval> | null>(null)

const terminalLogs = [
  '[INIT] Connecting to analysis engine...',
  '[SCAN] Parsing JD structure...',
  '[SCAN] Extracting skill requirements...',
  '[SCAN] Mapping experience vectors...',
  '[PROC] Running semantic similarity...',
  '[PROC] Calculating match coefficients...',
  '[PROC] Cross-referencing tech stack...',
  '[EVAL] Generating gap analysis...',
  '[EVAL] Compiling recommendations...',
  '[DONE] Radar scan complete.',
]

onMounted(() => {
  let i = 0
  logInterval.value = setInterval(() => {
    if (i < terminalLogs.length) {
      logLines.value.push(terminalLogs[i])
      if (logLines.value.length > 6) logLines.value.shift()
      i++
    } else {
      if (logInterval.value) clearInterval(logInterval.value)
    }
  }, 300)
  emit('ready')
})

onUnmounted(() => {
  if (logInterval.value) clearInterval(logInterval.value)
})
</script>

<template>
  <div class="radar-wrap">
    <!-- Radar visual -->
    <div class="radar-container">
      <div class="radar-ring r1" />
      <div class="radar-ring r2" />
      <div class="radar-ring r3" />
      <div class="radar-sweep" />
      <div class="radar-center" />
      <div class="crosshair ch-h" />
      <div class="crosshair ch-v" />
      <div class="blip b1" />
      <div class="blip b2" />
      <div class="blip b3" />
    </div>

    <p class="scan-status">正在扫描分析中...</p>

    <div class="terminal-log">
      <div
        v-for="(line, idx) in logLines"
        :key="idx"
        class="log-line"
        :class="{ done: line.includes('[DONE]') }"
      >
        <span class="prompt">&gt; </span>{{ line }}
      </div>
      <span class="cursor" />
    </div>
  </div>
</template>

<style scoped>
.radar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  height: 100%;
}

.radar-container {
  width: 130px;
  height: 130px;
  position: relative;
}

.radar-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--border);
}
.r1 { inset: 0; }
.r2 { inset: 16px; }
.r3 { inset: 32px; }

.radar-sweep {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--accent-glow) 30deg,
    var(--accent-subtle) 60deg,
    transparent 90deg
  );
  animation: rotate 2s linear infinite;
}

.radar-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent-glow);
}

.crosshair {
  position: absolute;
  background: var(--border);
}
.ch-h { top: 50%; left: 0; right: 0; height: 1px; }
.ch-v { left: 50%; top: 0; bottom: 0; width: 1px; }

.blip {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  animation: pulse 2s ease-in-out infinite;
}
.b1 { top: 25%; left: 60%; animation-delay: 0.3s; }
.b2 { top: 65%; left: 30%; animation-delay: 0.8s; }
.b3 { top: 40%; left: 75%; animation-delay: 1.4s; }

@keyframes rotate { to { transform: rotate(360deg); } }
@keyframes pulse {
  0%, 20% { opacity: 0; transform: scale(0.5); }
  40% { opacity: 1; transform: scale(1.5); }
  60% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.5); }
}

.scan-status {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  animation: blink-slow 1.5s ease-in-out infinite;
}
@keyframes blink-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.terminal-log {
  width: 100%;
  max-width: 320px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.7;
}
.log-line {
  color: var(--text-muted);
  transition: opacity 0.2s;
}
.log-line.done {
  color: var(--accent);
}
.prompt {
  color: var(--text-muted);
  opacity: 0.4;
}
.cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  background: var(--accent);
  opacity: 0.6;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
