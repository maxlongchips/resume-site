<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Sidebar from './Sidebar.vue'
import TabBar from './TabBar.vue'
import HeroSection from './HeroSection.vue'
import AboutSection from './AboutSection.vue'
import ExperienceSection from './ExperienceSection.vue'
import SkillsSection from './SkillsSection.vue'
import ProjectsSection from './ProjectsSection.vue'
import ContactSection from './ContactSection.vue'
import FooterSection from './FooterSection.vue'

const activeSection = ref('hero')
const sidebarOpen = ref(false)

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function navigateTo(id: string) {
  sidebarOpen.value = false
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }
}

onMounted(() => {
  if (!prefersReducedMotion) {
    gsap.fromTo(
      '.sidebar',
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }

  const sections = document.querySelectorAll('section[id]')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-30% 0px -70% 0px' }
  )
  sections.forEach((section) => observer.observe(section))
})
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div class="glow-orb top"></div>
    <div class="glow-orb bottom"></div>

    <!-- Mobile hamburger -->
    <button
      class="hamburger"
      :class="{ open: sidebarOpen }"
      @click="sidebarOpen = !sidebarOpen"
      aria-label="Toggle navigation"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Mobile backdrop -->
    <div
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      @click="sidebarOpen = false"
    ></div>

    <Sidebar
      :active-section="activeSection"
      :open="sidebarOpen"
      @navigate="navigateTo"
    />

    <main class="flex-1 overflow-y-auto">
      <TabBar :active-tab="activeSection" @navigate="navigateTo" />

      <div class="content-area">
        <HeroSection id="hero" />
        <AboutSection id="about" />
        <ExperienceSection id="experience" />
        <SkillsSection id="skills" />
        <ProjectsSection id="projects" />
        <ContactSection id="contact" />
        <FooterSection />
      </div>
    </main>
  </div>
</template>

<style scoped>
.glow-orb {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.glow-orb.top {
  top: -100px;
  right: -100px;
}

.glow-orb.bottom {
  bottom: -100px;
  left: 300px;
}

.content-area {
  padding: 80px 100px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

.content-area::before {
  content: '';
  position: absolute;
  left: 60px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--border) 10%, var(--border) 90%, transparent);
}

@media (max-width: 1024px) {
  .content-area {
    padding: 60px 40px;
    max-width: 100%;
  }

  .content-area::before {
    left: 20px;
  }
}

@media (max-width: 768px) {
  .content-area {
    padding: 40px 20px;
  }

  .content-area::before {
    display: none;
  }
}

/* Hamburger */
.hamburger {
  display: none;
  position: fixed;
  top: 14px;
  left: 14px;
  z-index: 60;
  width: 36px;
  height: 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0;
}

.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
  transition: all 0.3s;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.sidebar-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 49;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .sidebar-backdrop {
    display: block;
  }

  :deep(.tab-bar) {
    display: none;
  }
}
</style>
