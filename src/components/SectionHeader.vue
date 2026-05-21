<script setup lang="ts">
defineProps<{
  command: string
  sectionNum: string
}>()
</script>

<template>
  <div class="flex items-center gap-4 mb-10" data-reveal>
    <span class="font-[var(--font-mono)] text-xs text-[var(--text-muted)] whitespace-nowrap">
      <span class="text-[var(--accent)]">❯</span> {{ command }}
    </span>
    <span class="flex-1 h-px bg-gradient-to-r from-[var(--border-hover)] to-transparent"></span>
    <span class="font-[var(--font-mono)] text-[10px] text-[var(--text-muted)] tracking-[0.15em]">
      {{ sectionNum }}
    </span>
  </div>
</template>
