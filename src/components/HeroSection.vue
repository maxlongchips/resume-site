<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { personal, stats } from '../data/content'

const heroRef = ref<HTMLElement | null>(null)
const sloganText = ref('')

onMounted(() => {
  if (!heroRef.value) return

  const tl = gsap.timeline({ delay: 0.3 })

  tl.fromTo(
    '.hero-command',
    { opacity: 0 },
    { opacity: 1, duration: 0.4 }
  )

  tl.fromTo(
    '.hero-greeting',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.1'
  )

  tl.fromTo(
    '.hero-name-line',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.3'
  )

  tl.add(() => {
    const text = personal.slogan
    gsap.to(
      { progress: 0 },
      {
        progress: text.length,
        duration: (text.length * 40) / 1000,
        ease: 'none',
        onUpdate() {
          // @ts-expect-error gsap context
          const idx = Math.floor(this.targets()[0].progress)
          sloganText.value = text.slice(0, idx)
        },
      }
    )
  })

  tl.fromTo(
    '.stat',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
    '-=0.2'
  )
})
</script>

<template>
  <section ref="heroRef" class="mb-30">
    <div class="hero-command font-[var(--font-mono)] text-xs text-[var(--text-muted)] mb-7 flex items-center gap-2.5">
      <span class="text-[var(--accent)]">❯</span>
      <span>cat hero.md</span>
    </div>

    <h1 class="hero-greeting font-[var(--font-serif)] text-[80px] font-normal leading-[1.05] tracking-[-0.05em] mb-2">
      Hello<span class="italic text-[var(--accent)]">,</span>
    </h1>

    <div class="hero-name-line flex items-baseline gap-5 mb-8">
      <span class="text-[56px] font-light tracking-[0.2em] text-[var(--text-warm)]">
        I'M {{ personal.name }}
      </span>
      <span class="flex-1 h-px bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30"></span>
    </div>

    <p class="font-[var(--font-mono)] text-sm text-[var(--text-dim)] tracking-[0.15em] mb-12">
      {{ sloganText }}<span class="inline-block w-0.5 h-4 bg-[var(--accent)] ml-0.5 animate-pulse"></span>
    </p>

    <div class="hero-stats flex gap-15">
      <div v-for="stat in stats" :key="stat.label" class="stat relative">
        <div class="font-[var(--font-serif)] text-[42px] font-normal text-[var(--accent)] leading-none mb-1.5">
          {{ stat.value }}
        </div>
        <div class="font-[var(--font-mono)] text-[10px] text-[var(--text-muted)] tracking-[0.15em] uppercase">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </section>
</template>
