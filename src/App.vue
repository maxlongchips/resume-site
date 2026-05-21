<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Sidebar from './components/Sidebar.vue'
import TabBar from './components/TabBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const activeSection = ref('hero')

function navigateTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Sidebar entrance animation
  gsap.fromTo(
    '.sidebar',
    { x: -300, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
  )

  // Observe sections for active nav tracking
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
    <!-- Ambient glow orbs -->
    <div class="glow-orb top"></div>
    <div class="glow-orb bottom"></div>

    <Sidebar
      :active-section="activeSection"
      @navigate="navigateTo"
    />

    <main class="flex-1 overflow-y-auto">
      <TabBar :active-tab="activeSection" />

      <div class="content-area">
        <HeroSection id="hero" />
        <AboutSection id="about" />
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
  max-width: 1000px;
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
</style>
