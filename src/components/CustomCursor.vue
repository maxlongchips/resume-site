<template>
  <div class="cursor-dot" :class="{ active: state.visible }" :style="dotStyle" aria-hidden="true" />
  <div class="cursor-ring" :class="{ active: state.visible }" :style="ringStyle" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'

const state = reactive({
  pointerX: 0,
  pointerY: 0,
  ringX: 0,
  ringY: 0,
  visible: false,
})

const dotStyle = computed(() => ({
  left: `${state.pointerX}px`,
  top: `${state.pointerY}px`,
}))

const ringStyle = computed(() => ({
  left: `${state.ringX}px`,
  top: `${state.ringY}px`,
}))

let rafId = 0

function syncRing() {
  state.ringX += (state.pointerX - state.ringX) * 0.16
  state.ringY += (state.pointerY - state.ringY) * 0.16
  rafId = requestAnimationFrame(syncRing)
}

function handleMove(event: PointerEvent) {
  state.pointerX = event.clientX
  state.pointerY = event.clientY
  state.visible = true
}

function handleLeave() {
  state.visible = false
}

onMounted(() => {
  window.addEventListener('pointermove', handleMove)
  window.addEventListener('pointerleave', handleLeave)
  syncRing()
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handleMove)
  window.removeEventListener('pointerleave', handleLeave)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 0.24s ease, transform 0.2s ease;
}

.cursor-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.cursor-ring {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(0, 47, 167, 0.8);
}

.active {
  opacity: 1;
}
</style>
