# Personal Portfolio Website — Design Spec

## Overview

A Terminal/IDE-themed personal portfolio website for 李强 (Li Qiang), a senior frontend developer. The design blends a developer tool aesthetic with warm, sophisticated visuals — dark brown-black base, amber gold accents, serif + mono typography pairing.

## Tech Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Build:** Vite
- **Styling:** Tailwind CSS + custom CSS variables
- **Animation:** GSAP (scroll-triggered reveals, typing effects, hover interactions)
- **Fonts:** Space Grotesk (sans), JetBrains Mono (mono), Playfair Display (serif)

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#1a1714` | Page background (deep warm brown-black) |
| `--bg-deep` | `#12100e` | Sidebar, tab bar background |
| `--surface` | `#221f1b` | Cards, panels |
| `--border` | `rgba(255,235,210,0.08)` | Subtle borders |
| `--border-hover` | `rgba(255,235,210,0.15)` | Hover state borders |
| `--text` | `#f5efe6` | Primary text (warm white) |
| `--text-warm` | `#e8dfd3` | Secondary text |
| `--text-dim` | `rgba(245,239,230,0.45)` | Tertiary text |
| `--text-muted` | `rgba(245,239,230,0.25)` | Labels, hints |
| `--accent` | `#e8a849` | Amber gold — primary accent |
| `--accent-warm` | `#d4903a` | Darker accent variant |
| `--accent-glow` | `rgba(232,168,73,0.15)` | Ambient glow orbs |

### Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Headings | Playfair Display | 400/700 | Hero greeting, stat numbers |
| Body | Space Grotesk | 300-500 | Body text, navigation |
| Code/UI | JetBrains Mono | 300-500 | Commands, labels, tags, terminal elements |

### Texture & Effects

- **Noise overlay:** SVG-based noise filter at 3% opacity across the entire page
- **Ambient glow:** Two radial gradient orbs (fixed position) for warmth
- **Guide line:** Vertical accent line in content area (left border pseudo-element)

## Layout

### Structure

```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌────────────────────────────────────┐ │
│ │ SIDEBAR  │ │ TAB BAR                            │ │
│ │          │ ├────────────────────────────────────┤ │
│ │ Terminal │ │                                    │ │
│ │ dots     │ │         MAIN CONTENT               │ │
│ │          │ │                                    │ │
│ │ Avatar   │ │    ┌─ Hero ─────────────────────┐  │ │
│ │ ring     │ │    │  Hello,                    │  │ │
│ │          │ │    │  I'M 李强                   │  │ │
│ │ Nav      │ │    │  Stats: 5+ years / 6 proj  │  │ │
│ │ items    │ │    └────────────────────────────┘  │ │
│ │          │ │                                    │ │
│ │ Status   │ │    ┌─ About ────────────────────┐  │ │
│ │ dot      │ │    │  Bio text + Info cards     │  │ │
│ └──────────┘ │    └────────────────────────────┘  │ │
│              │                                    │ │
│              │    ┌─ Skills ───────────────────┐   │ │
│              │    │  2x2 grid with progress    │   │ │
│              │    └────────────────────────────┘   │ │
│              │                                    │ │
│              │    ┌─ Projects ─────────────────┐   │ │
│              │    │  Horizontal project rows   │   │ │
│              │    └────────────────────────────┘   │ │
│              │                                    │ │
│              │    ┌─ Contact ──────────────────┐   │ │
│              │    │  2x2 contact cards         │   │ │
│              │    └────────────────────────────┘   │ │
│              └────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

- **Sidebar:** Fixed 300px width. Contains terminal dots, avatar with animated ring, file-tree navigation, status indicator.
- **Main content:** Scrollable. Tab bar (sticky top), content sections with terminal command headers.

## Sections

### 1. Hero

- Terminal command entry: `❯ cat hero.md`
- Large serif "Hello," (80px, Playfair Display, italic comma in accent color)
- Name line: "I'M 李强" (56px, light weight, 12px letter-spacing) + decorative line extending right
- Slogan: "Building digital products that feel human." (mono, 14px, typing animation via GSAP)
- Stats row: Three stat blocks (Years Experience, Projects, Passion) separated by vertical lines, numbers in serif + accent color

### 2. About

- Command header: `❯ cat about.md` with section number `01`
- Bio paragraph: Mixed bold/normal/highlighted text. Key terms underlined with accent color
- Info cards: 3-column grid — Location, Focus, Status. Each card has icon, label, value. Hover lifts card and reveals top accent border

### 3. Skills

- Command header: `❯ cat skills.json` with section number `02`
- 2x2 grid of skill groups: Core, Frontend, Platform, Tools
- Each group: title with accent color + divider line, list of skills with progress bars
- Progress bars: 80px wide, 3px height, accent color fill

### 4. Projects

- Command header: `❯ ls projects/` with section number `03`
- Vertical list of project rows
- Each row: large serif index number (01-04, accent color, 30% opacity), project info (name, description, tech tags), arrow indicator
- Hover: left accent border grows in, row shifts right 4px, arrow turns accent color

### 5. Contact

- Command header: `❯ cat contact.ts` with section number `04`
- 2x2 grid of contact cards: Email, GitHub, LinkedIn, WeChat
- Each card: icon box + label/value text
- Hover: accent border, card lifts, gradient overlay appears

### 6. Footer

- Centered text: "DESIGNED & BUILT BY 李强 © 2024"
- Small accent line above

## Interactions & Animation

### Page Load

1. Sidebar fades in from left (GSAP)
2. Hero elements type in sequentially: command → greeting → name → slogan → stats
3. Slogan uses character-by-character typing effect

### Scroll Reveals

- Each section fades in + slides up as it enters viewport (GSAP ScrollTrigger)
- Staggered children within sections (cards, project rows, skill items)

### Hover Effects

- **Nav items:** Left accent border grows, background warms
- **Info cards:** Lift 2px, top accent border appears
- **Skill tags:** Border turns accent, subtle accent background
- **Project rows:** Left border grows, row shifts right, arrow animates
- **Contact cards:** Accent border, lift, gradient overlay

### Sidebar Avatar

- Outer ring: dashed border rotates continuously (20s)
- Inner ring: solid accent border, static
- Status dot: pulsing green glow

## Responsive Behavior

- Below 1024px: Sidebar collapses to icon-only mode (60px width)
- Below 768px: Sidebar becomes a hamburger menu overlay; content goes full-width
- Font sizes scale down proportionally on smaller screens

## File Structure

```
src/
├── App.vue                    # Root layout (sidebar + main)
├── main.ts                    # Entry point
├── assets/
│   └── styles/
│       └── main.css           # Global styles, CSS variables, noise texture
├── components/
│   ├── Sidebar.vue            # Left sidebar (avatar, nav, status)
│   ├── TabBar.vue             # IDE tab bar
│   ├── SectionHeader.vue      # Reusable terminal command header
│   ├── HeroSection.vue        # Hero with typing animation
│   ├── AboutSection.vue       # Bio + info cards
│   ├── SkillsSection.vue      # Skill groups with progress bars
│   ├── ProjectsSection.vue    # Project list
│   ├── ContactSection.vue     # Contact cards
│   └── FooterSection.vue      # Footer
├── composables/
│   └── useTypingEffect.ts     # GSAP typing animation composable
│   └── useScrollReveal.ts     # GSAP ScrollTrigger composable
└── data/
    └── content.ts             # All personal data (name, skills, projects, etc.)
```

## Content Data

All text content lives in `src/data/content.ts` as typed constants, making it easy to update without touching components.

## Dependencies

- `vue` ^3.4
- `gsap` ^3.12 (with ScrollTrigger plugin)
- `tailwindcss` ^3.4
- `@fontsource/space-grotesk`
- `@fontsource/jetbrains-mono`
- `@fontsource/playfair-display`
