<script setup lang="ts">
defineProps<{
  command: string
  sectionNum: string
}>()
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.section-cmd {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border-hover), transparent);
}

.section-num {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.15em;
}

@media (max-width: 768px) {
  .section-num {
    display: none;
  }
}
</style>

<template>
  <div class="section-header" data-reveal>
    <span class="section-cmd">
      <span class="text-[var(--accent)]">❯</span> {{ command }}
    </span>
    <span class="section-line"></span>
    <span class="section-num">{{ sectionNum }}</span>
  </div>
</template>
