# Resume Site

极客简历构建平台 — 所见即所得的个人简历编辑与展示系统。

采用 Vue 3 + Pinia + Tiptap 构建，实现 Notion 级流畅的所见即所得 (WYSIWYG) 富文本编辑体验。深入解决前端打印适配痛点，基于 CSS `@media print` 与响应式布局，实现 100% 还原的 A4 纸级 PDF 高清导出，彻底解决跨端分页截断问题。

## Features

- **A4 WYSIWYG 编辑器** — 基于 Tiptap 富文本引擎，支持列表、加粗、斜体等格式，实时预览 A4 纸张排版
- **PDF 高清导出** — 原生 `window.print()` + `@media print` 精确控制，零依赖导出 A4 标准 PDF
- **四套主题系统** — 暖色黑夜 / 冷色黑夜 / 暖色白天 / 冷色白天，CSS 变量驱动，`localStorage` 持久化
- **响应式设计** — 桌面端侧边栏导航 + 移动端汉堡菜单抽屉，全断点自适应
- **数据持久化** — Pinia store 单一数据源，编辑器与首页实时同步，`localStorage` 自动保存
- **无障碍支持** — ARIA 属性、键盘导航、`prefers-reduced-motion` 减弱动画偏好
- **滚动动画** — GSAP + ScrollTrigger 驱动的入场动画与打字机效果

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| State | Pinia + `storeToRefs` |
| Rich Text | Tiptap (`@tiptap/vue-3` + StarterKit) |
| Routing | Vue Router 4 (Hash Mode) |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animation | GSAP + ScrollTrigger |
| Typography | Inter Variable / JetBrains Mono / Playfair Display |
| Build | Vite + `vue-tsc` |
| Deploy | GitHub Pages + Netlify |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (includes type check)
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/styles/main.css     # Tailwind + themes + global styles
├── components/
│   ├── editor/                # WYSIWYG editor components
│   │   ├── BlockWrapper.vue   # Block hover toolbar (move/delete)
│   │   ├── InlineInput.vue    # Single-line inline edit
│   │   └── RichTextEditor.vue # Tiptap rich text wrapper
│   ├── Sidebar.vue            # Navigation sidebar
│   ├── TabBar.vue             # Top tab bar + theme toggle
│   ├── ThemeToggle.vue        # 4-theme switcher
│   ├── SiteHome.vue           # Main layout orchestrator
│   ├── HeroSection.vue        # Hero with typewriter effect
│   ├── AboutSection.vue       # Bio + info cards
│   ├── ExperienceSection.vue  # Timeline layout
│   ├── ProjectsSection.vue    # STAR method project cards
│   ├── SkillsSection.vue      # Skill bars with progress
│   ├── ContactSection.vue     # Contact cards grid
│   └── SectionHeader.vue      # Reusable section header
├── composables/
│   └── useScrollReveal.ts     # GSAP scroll reveal composable
├── data/content.ts            # Static data (nav, tabs, sections)
├── router/index.ts            # Vue Router config
├── stores/resume.ts           # Pinia store (single source of truth)
└── views/EditorView.vue       # A4 resume editor page
```

## Routes

| Path | Description |
|---|---|
| `/` | 个人简历展示页（侧边栏 + 分段滚动） |
| `/editor` | A4 WYSIWYG 简历编辑器 |

## Deploy

### GitHub Pages

自动部署：push 到 `master` 分支触发 GitHub Actions 构建。

### Netlify

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

## License

MIT
