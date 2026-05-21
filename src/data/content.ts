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
