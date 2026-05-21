# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Terminal/IDE-themed Vue 3 personal portfolio website with warm amber-gold aesthetics and GSAP animations.

**Architecture:** Single-page application with fixed sidebar navigation and scrollable main content. All personal data lives in a typed data module. Components are pure presentation — they receive data via props/imports and render the design. GSAP handles all animations (typing, scroll reveals, hover effects).

**Tech Stack:** Vue 3 (Composition API, `<script setup>`), Vite, Tailwind CSS, GSAP 3 (ScrollTrigger), Space Grotesk + JetBrains Mono + Playfair Display fonts.

---

### Task 1: Scaffold Vue 3 + Vite Project

**Files:**
- Create: `package.json` (via Vite scaffold)
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`

- [ ] **Step 1: Create Vite project**

```bash
cd /c/Users/LBX/personal-website
npm create vite@latest . -- --template vue-ts
```

If prompted about non-empty directory, select "Ignore files and continue".

- [ ] **Step 2: Verify scaffold**

```bash
ls src/
```

Expected: `App.vue`, `main.ts`, `assets/`, `components/`, `vite-env.d.ts`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vue 3 + Vite project"
```

---

### Task 2: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install production dependencies**

```bash
npm install gsap @fontsource/space-grotesk @fontsource/jetbrains-mono @fontsource/playfair-display
```

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Verify installations**

```bash
npm ls gsap tailwindcss
```

Expected: both packages listed without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install GSAP, Tailwind CSS, and font packages"
```

---

### Task 3: Configure Vite + Tailwind CSS

**Files:**
- Modify: `vite.config.ts`
- Create: `src/assets/styles/main.css`

- [ ] **Step 1: Update vite.config.ts**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
```

- [ ] **Step 2: Create main.css with Tailwind imports and design system**

```css
/* src/assets/styles/main.css */
@import "tailwindcss";

@import "@fontsource/space-grotesk/300.css";
@import "@fontsource/space-grotesk/400.css";
@import "@fontsource/space-grotesk/500.css";
@import "@fontsource/space-grotesk/600.css";
@import "@fontsource/space-grotesk/700.css";
@import "@fontsource/jetbrains-mono/300.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/400-italic.css";
@import "@fontsource/playfair-display/700.css";

:root {
  --bg: #1a1714;
  --bg-deep: #12100e;
  --surface: #221f1b;
  --surface-hover: #2a2622;
  --border: rgba(255, 235, 210, 0.08);
  --border-hover: rgba(255, 235, 210, 0.15);
  --text: #f5efe6;
  --text-warm: #e8dfd3;
  --text-dim: rgba(245, 239, 230, 0.45);
  --text-muted: rgba(245, 239, 230, 0.25);
  --accent: #e8a849;
  --accent-warm: #d4903a;
  --accent-glow: rgba(232, 168, 73, 0.15);
  --accent-subtle: rgba(232, 168, 73, 0.06);

  --font-sans: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
}

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(232, 168, 73, 0.2);
  border-radius: 2px;
}

/* Selection */
::selection {
  background: rgba(232, 168, 73, 0.3);
  color: var(--text);
}
```

- [ ] **Step 3: Import CSS in main.ts**

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'

createApp(App).mount('#app')
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts without errors. Open browser to confirm dark background renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure Vite + Tailwind CSS with design system tokens"
```

---

### Task 4: Create Data Layer

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Create content.ts with all personal data**

```ts
// src/data/content.ts
export const personal = {
  name: '李强',
  nameEn: 'Li Qiang',
  title: '资深前端开发',
  titleEn: 'Senior Frontend Developer',
  slogan: 'Building digital products that feel human.',
  avatarChar: '强',
}

export const stats = [
  { value: '5+', label: 'Years Exp' },
  { value: '6', label: 'Projects' },
  { value: '∞', label: 'Passion' },
]

export const about = {
  bio: '专注于 <strong>Vue3 生态</strong>和<span class="highlight">小程序开发</span>的资深前端工程师。热衷于用代码构建有温度的数字产品，让技术服务于人。擅长将复杂的业务逻辑转化为<span class="highlight">简洁优雅</span>的用户界面。',
  cards: [
    { icon: '⌘', label: 'Location', value: '中国' },
    { icon: '◈', label: 'Focus', value: 'Vue3 / 小程序' },
    { icon: '◉', label: 'Status', value: 'Open to work', accent: true },
  ],
}

export interface SkillItem {
  name: string
  level: number
}

export interface SkillGroup {
  title: string
  skills: SkillItem[]
}

export const skills: SkillGroup[] = [
  {
    title: 'Core',
    skills: [
      { name: 'Vue3', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Vite', level: 90 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind', level: 85 },
      { name: 'GSAP', level: 70 },
      { name: 'Webpack', level: 80 },
    ],
  },
  {
    title: 'Platform',
    skills: [
      { name: '微信小程序', level: 90 },
      { name: 'Uni-app', level: 85 },
      { name: 'Taro', level: 75 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Claude Code', level: 85 },
      { name: 'Figma', level: 70 },
    ],
  },
]

export interface Project {
  name: string
  type: string
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    name: '老百姓合规系统',
    type: 'Enterprise',
    description: '大型连锁药房合规管理系统，保障业务流程符合行业法规要求',
    tags: ['Vue3', 'Element Plus', 'Node.js'],
  },
  {
    name: '处方管理平台',
    type: 'Platform',
    description: '医疗处方全流程管理平台，实现处方数字化与智能化管理',
    tags: ['Vue3', 'TypeScript', 'WebSocket'],
  },
  {
    name: 'EPS 远程审方系统',
    type: 'System',
    description: '远程处方审核系统，连接药师与患者，提升审方效率与准确性',
    tags: ['Vue3', 'WebRTC', 'Canvas'],
  },
  {
    name: '百姓通处方工具',
    type: 'Tool',
    description: '面向药房的处方流转工具，简化处方处理流程',
    tags: ['Vue3', 'API Integration'],
  },
  {
    name: '老百姓商城',
    type: 'E-commerce',
    description: '老百姓大药房官方电商平台，提供药品在线购买服务',
    tags: ['Vue3', 'Uni-app', 'Pay SDK'],
  },
  {
    name: '健康我帮您小程序',
    type: 'Mini Program',
    description: '健康管理微信小程序，提供便捷的健康服务入口',
    tags: ['微信小程序', 'Taro', 'Vant'],
  },
]

export interface ContactItem {
  icon: string
  label: string
  value: string
  href?: string
}

export const contacts: ContactItem[] = [
  { icon: '@', label: 'EMAIL', value: 'your@email.com', href: 'mailto:your@email.com' },
  { icon: '{ }', label: 'GITHUB', value: 'github.com/liqiang', href: 'https://github.com/liqiang' },
  { icon: 'in', label: 'LINKEDIN', value: 'linkedin.com/in/liqiang', href: 'https://linkedin.com/in/liqiang' },
  { icon: '▸', label: 'WECHAT', value: 'liqiang_dev' },
]

export const navItems = [
  { id: 'hero', label: 'hero.md', num: '01' },
  { id: 'about', label: 'about.md', num: '02' },
  { id: 'skills', label: 'skills.json', num: '03' },
  { id: 'projects', label: 'projects/', num: '04' },
  { id: 'contact', label: 'contact.ts', num: '05' },
]

export const tabs = [
  { id: 'hero', label: 'hero.md' },
  { id: 'about', label: 'about.md' },
  { id: 'skills', label: 'skills.json' },
]
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: add typed content data layer"
```

---

### Task 5: Create Composables

**Files:**
- Create: `src/composables/useTypingEffect.ts`
- Create: `src/composables/useScrollReveal.ts`

- [ ] **Step 1: Create useTypingEffect composable**

```ts
// src/composables/useTypingEffect.ts
import { ref, onMounted, type Ref } from 'vue'
import gsap from 'gsap'

export function useTypingEffect(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options: { speed?: number; delay?: number; onComplete?: () => void } = {}
) {
  const displayText = ref('')
  const { speed = 50, delay = 0, onComplete } = options

  onMounted(() => {
    if (!elementRef.value) return

    gsap.to(
      { progress: 0 },
      {
        progress: text.length,
        duration: (text.length * speed) / 1000,
        delay: delay / 1000,
        ease: 'none',
        onUpdate() {
          // @ts-expect-error gsap context
          const idx = Math.floor(this.targets()[0].progress)
          displayText.value = text.slice(0, idx)
        },
        onComplete() {
          displayText.value = text
          onComplete?.()
        },
      }
    )
  })

  return { displayText }
}
```

- [ ] **Step 2: Create useScrollReveal composable**

```ts
// src/composables/useScrollReveal.ts
import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(
  containerRef: Ref<HTMLElement | null>,
  selector: string = '[data-reveal]'
) {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!containerRef.value) return

    ctx = gsap.context(() => {
      const elements = containerRef.value!.querySelectorAll(selector)

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
```

- [ ] **Step 3: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/composables/
git commit -m "feat: add GSAP typing effect and scroll reveal composables"
```

---

### Task 6: Build SectionHeader Component

**Files:**
- Create: `src/components/SectionHeader.vue`

- [ ] **Step 1: Create SectionHeader.vue**

```vue
<!-- src/components/SectionHeader.vue -->
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
```

- [ ] **Step 2: Verify component compiles**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeader.vue
git commit -m "feat: add SectionHeader component"
```

---

### Task 7: Build Sidebar Component

**Files:**
- Create: `src/components/Sidebar.vue`

- [ ] **Step 1: Create Sidebar.vue**

```vue
<!-- src/components/Sidebar.vue -->
<script setup lang="ts">
import { personal, navItems } from '../data/content'

defineProps<{
  activeSection: string
}>()

defineEmits<{
  navigate: [id: string]
}>()
</script>

<template>
  <aside class="sidebar">
    <!-- Terminal dots -->
    <div class="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]">
      <span class="w-2.5 h-2.5 rounded-full bg-[#e85c4a]"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-[#5ae86a]"></span>
    </div>

    <!-- Avatar area -->
    <div class="text-center py-10 px-6">
      <div class="avatar-ring mx-auto mb-5">
        <div class="avatar-inner">
          {{ personal.avatarChar }}
        </div>
      </div>
      <div class="text-lg font-semibold tracking-[0.2em] mb-1">
        {{ personal.name }}
      </div>
      <div class="font-[var(--font-mono)] text-[11px] text-[var(--accent)] tracking-widest">
        {{ personal.titleEn }}
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-7">
      <div class="px-7 mb-4 font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
        Explorer
      </div>
      <div
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click="$emit('navigate', item.id)"
      >
        <span class="nav-num">{{ item.num }}</span>
        <span>{{ item.label }}</span>
      </div>
    </nav>

    <!-- Status -->
    <div class="px-7 py-5 border-t border-[var(--border)]">
      <div class="flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] text-[var(--text-dim)]">
        <span class="status-dot"></span>
        <span>Available for work</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  background: var(--bg-deep);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
}

.sidebar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, var(--accent) 0%, transparent 30%, transparent 70%, var(--accent) 100%);
  opacity: 0.3;
}

.avatar-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0.4;
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px dashed var(--accent);
  opacity: 0.15;
  animation: spin 20s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.avatar-inner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-warm) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 700;
  color: var(--bg);
}

.nav-item {
  padding: 10px 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-dim);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-size: 13px;
  font-family: var(--font-mono);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--accent);
  transition: width 0.3s;
}

.nav-item:hover {
  color: var(--text);
  background: var(--accent-subtle);
}

.nav-item.active {
  color: var(--text);
  background: var(--accent-subtle);
}

.nav-item.active::before {
  width: 3px;
}

.nav-num {
  font-size: 9px;
  color: var(--text-muted);
  width: 20px;
}

.nav-item.active .nav-num {
  color: var(--accent);
}

.status-dot {
  width: 7px;
  height: 7px;
  background: #5ae86a;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 8px rgba(90, 232, 106, 0.4);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.vue
git commit -m "feat: add Sidebar component with avatar, nav, and status"
```

---

### Task 8: Build TabBar Component

**Files:**
- Create: `src/components/TabBar.vue`

- [ ] **Step 1: Create TabBar.vue**

```vue
<!-- src/components/TabBar.vue -->
<script setup lang="ts">
import { tabs } from '../data/content'

defineProps<{
  activeTab: string
}>()
</script>

<template>
  <div class="flex border-b border-[var(--border)] font-[var(--font-mono)] text-[11px] bg-[var(--bg-deep)] sticky top-0 z-10">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{ active: activeTab === tab.id }"
    >
      <span class="tab-dot"></span>
      <span>{{ tab.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.tab {
  padding: 12px 24px;
  color: var(--text-muted);
  border-right: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.tab.active {
  color: var(--text);
  background: var(--bg);
  position: relative;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
}

.tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
}

.tab.active .tab-dot {
  opacity: 1;
}
</style>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TabBar.vue
git commit -m "feat: add TabBar component"
```

---

### Task 9: Build HeroSection Component

**Files:**
- Create: `src/components/HeroSection.vue`

- [ ] **Step 1: Create HeroSection.vue**

```vue
<!-- src/components/HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { personal, stats } from '../data/content'

const heroRef = ref<HTMLElement | null>(null)
const sloganRef = ref<HTMLElement | null>(null)
const sloganText = ref('')

onMounted(() => {
  if (!heroRef.value) return

  const tl = gsap.timeline({ delay: 0.3 })

  // Animate command line
  tl.fromTo(
    '.hero-command',
    { opacity: 0 },
    { opacity: 1, duration: 0.4 }
  )

  // Animate greeting
  tl.fromTo(
    '.hero-greeting',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.1'
  )

  // Animate name line
  tl.fromTo(
    '.hero-name-line',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.3'
  )

  // Type slogan
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

  // Animate stats
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
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "feat: add HeroSection with GSAP typing animation"
```

---

### Task 10: Build AboutSection Component

**Files:**
- Create: `src/components/AboutSection.vue`

- [ ] **Step 1: Create AboutSection.vue**

```vue
<!-- src/components/AboutSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { about } from '../data/content'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat about.md" section-num="01" />

    <p
      class="text-lg leading-[2] text-[var(--text-dim)] font-light mb-12 max-w-[700px]"
      data-reveal
      v-html="about.bio"
    ></p>

    <div class="grid grid-cols-3 gap-4" data-reveal>
      <div
        v-for="card in about.cards"
        :key="card.label"
        class="info-card"
      >
        <div class="font-[var(--font-mono)] text-xl text-[var(--accent)] opacity-60 mb-3">
          {{ card.icon }}
        </div>
        <div class="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-[0.15em] uppercase mb-1.5">
          {{ card.label }}
        </div>
        <div
          class="text-sm"
          :class="card.accent ? 'text-[var(--accent)]' : 'text-[var(--text)]'"
        >
          {{ card.value }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.highlight) {
  color: var(--accent);
  font-weight: 400;
  position: relative;
}

:deep(.highlight)::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0.3;
}

:deep(strong) {
  color: var(--text);
  font-weight: 500;
}

.info-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.info-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.info-card:hover::before {
  opacity: 1;
}
</style>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.vue
git commit -m "feat: add AboutSection with bio and info cards"
```

---

### Task 11: Build SkillsSection Component

**Files:**
- Create: `src/components/SkillsSection.vue`

- [ ] **Step 1: Create SkillsSection.vue**

```vue
<!-- src/components/SkillsSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { skills } from '../data/content'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat skills.json" section-num="02" />

    <div class="grid grid-cols-2 gap-7" data-reveal>
      <div
        v-for="group in skills"
        :key="group.title"
        class="skill-group"
      >
        <div class="skill-group-title">
          <span>{{ group.title }}</span>
        </div>
        <div
          v-for="skill in group.skills"
          :key="skill.name"
          class="skill-item"
        >
          <span>{{ skill.name }}</span>
          <div class="skill-bar">
            <div
              class="skill-bar-fill"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-group {
  padding: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
}

.skill-group::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 30px;
  right: 30px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.1;
}

.skill-group-title {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.skill-group-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.skill-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

.skill-item:last-child {
  border-bottom: none;
}

.skill-bar {
  width: 80px;
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 1s ease-out;
}
</style>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsSection.vue
git commit -m "feat: add SkillsSection with progress bars"
```

---

### Task 12: Build ProjectsSection Component

**Files:**
- Create: `src/components/ProjectsSection.vue`

- [ ] **Step 1: Create ProjectsSection.vue**

```vue
<!-- src/components/ProjectsSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '../data/content'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

function formatIndex(i: number): string {
  return String(i + 1).padStart(2, '0')
}
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="ls projects/" section-num="03" />

    <div class="flex flex-col gap-5" data-reveal>
      <div
        v-for="(project, i) in projects"
        :key="project.name"
        class="project-row"
      >
        <div class="project-idx">{{ formatIndex(i) }}</div>
        <div class="project-info">
          <div class="text-base font-medium tracking-wide mb-1.5">
            {{ project.name }}
          </div>
          <p class="text-[13px] text-[var(--text-dim)] leading-relaxed mb-2.5">
            {{ project.description }}
          </p>
          <div class="flex gap-1.5 flex-wrap">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="project-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="project-arrow">→</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-row {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  gap: 30px;
  padding: 28px 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.project-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--accent);
  transition: width 0.3s;
}

.project-row:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
}

.project-row:hover::before {
  width: 3px;
}

.project-idx {
  font-family: var(--font-serif);
  font-size: 36px;
  color: var(--accent);
  opacity: 0.3;
  transition: opacity 0.3s;
}

.project-row:hover .project-idx {
  opacity: 0.6;
}

.project-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
}

.project-arrow {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--text-muted);
  transition: all 0.3s;
}

.project-row:hover .project-arrow {
  color: var(--accent);
  transform: translateX(4px);
}
</style>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsSection.vue
git commit -m "feat: add ProjectsSection with project list"
```

---

### Task 13: Build ContactSection Component

**Files:**
- Create: `src/components/ContactSection.vue`

- [ ] **Step 1: Create ContactSection.vue**

```vue
<!-- src/components/ContactSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { contacts } from '../data/content'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="mb-25">
    <SectionHeader command="cat contact.ts" section-num="04" />

    <div class="grid grid-cols-2 gap-5" data-reveal>
      <component
        :is="contact.href ? 'a' : 'div'"
        v-for="contact in contacts"
        :key="contact.label"
        class="contact-card"
        :href="contact.href"
        :target="contact.href?.startsWith('http') ? '_blank' : undefined"
        :rel="contact.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
      >
        <div class="contact-icon-box">
          {{ contact.icon }}
        </div>
        <div>
          <div class="font-[var(--font-mono)] text-[9px] text-[var(--text-muted)] tracking-[0.15em] mb-1">
            {{ contact.label }}
          </div>
          <div class="text-sm text-[var(--text)]">
            {{ contact.value }}
          </div>
        </div>
      </component>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  padding: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-subtle), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.contact-card:hover::before {
  opacity: 1;
}

.contact-icon-box {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  font-size: 18px;
  color: var(--accent);
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
}
</style>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: add ContactSection with contact cards"
```

---

### Task 14: Build FooterSection Component

**Files:**
- Create: `src/components/FooterSection.vue`

- [ ] **Step 1: Create FooterSection.vue**

```vue
<!-- src/components/FooterSection.vue -->
<template>
  <footer class="text-center py-15 pb-10">
    <div class="w-10 h-px bg-[var(--accent)] mx-auto mb-5 opacity-30"></div>
    <p class="font-[var(--font-mono)] text-[10px] text-[var(--text-muted)] tracking-[0.2em]">
      DESIGNED &amp; BUILT BY 李强 © 2024
    </p>
  </footer>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FooterSection.vue
git commit -m "feat: add FooterSection component"
```

---

### Task 15: Build App.vue Root Layout

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Replace App.vue with root layout**

```vue
<!-- src/App.vue -->
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
const sidebarVisible = ref(false)

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
```

- [ ] **Step 2: Verify dev server runs and page renders**

```bash
npm run dev
```

Open browser. Expected: Full page renders with sidebar, hero, and all sections visible. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: build App root layout with all sections"
```

---

### Task 16: Add Responsive Behavior

**Files:**
- Modify: `src/components/Sidebar.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: Add responsive styles to Sidebar.vue**

Add the following to the `<style scoped>` block in `Sidebar.vue`:

```css
@media (max-width: 1024px) {
  .sidebar {
    width: 60px;
  }

  .sidebar .avatar-ring,
  .sidebar .sidebar-name,
  .sidebar .sidebar-title,
  .sidebar nav .nav-label,
  .sidebar nav .nav-item span:not(.nav-num),
  .sidebar .status-dot + span {
    display: none;
  }

  .sidebar nav .nav-item {
    padding: 10px;
    justify-content: center;
  }

  .sidebar nav .nav-num {
    width: auto;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -300px;
    top: 0;
    bottom: 0;
    z-index: 50;
    width: 300px;
    transition: left 0.3s;
  }

  .sidebar.open {
    left: 0;
  }
}
```

- [ ] **Step 2: Add responsive styles to App.vue**

Update the `<style scoped>` block in `App.vue`:

```css
@media (max-width: 1024px) {
  .content-area {
    padding: 60px 40px;
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
```

- [ ] **Step 3: Verify responsive behavior**

Resize browser window. Expected:
- Above 1024px: Full sidebar with all text
- 768-1024px: Narrow sidebar with icons only
- Below 768px: Sidebar hidden (hamburger menu to be added)

- [ ] **Step 4: Commit**

```bash
git add src/components/Sidebar.vue src/App.vue
git commit -m "feat: add responsive breakpoints for sidebar and content"
```

---

### Task 17: Final Polish and Verify

**Files:**
- Modify: `src/assets/styles/main.css` (if needed)

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open browser. Verify all sections render correctly, animations play, hover effects work.

- [ ] **Step 3: Run type check**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final polish and build verification"
```
