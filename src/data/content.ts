export const personal = {
  name: '李强',
  nameEn: 'Li Qiang',
  title: '资深前端开发',
  titleEn: 'Senior Frontend Developer',
  slogan: 'Building digital products that feel human.',
  avatarChar: '强',
  summary: '8 年前端开发经验，专注于 Vue3 生态和企业级管理系统开发。主导过多个大型医疗健康项目的前端架构设计与实施，具备从 0 到 1 搭建完整前端体系的能力。热衷于探索前沿技术，善于将复杂业务逻辑转化为简洁优雅的用户界面。',
}

export const stats = [
  { value: '8+', label: 'Years Exp' },
  { value: '15+', label: 'Projects' },
  { value: '50w+', label: 'Lines of Code' },
]

export const about = {
  bio: '专注于 <strong>Vue3 生态</strong>和<span class="highlight">企业级应用开发</span>的资深前端工程师。拥有 8 年互联网行业经验，先后服务于多家知名互联网企业和医疗健康公司。擅长<span class="highlight">前端架构设计</span>、性能优化和团队技术栈规划。热衷于用代码构建有温度的数字产品，让技术真正服务于业务和用户。',
  cards: [
    { icon: '⌘', label: 'Location', value: '湖南长沙' },
    { icon: '◈', label: 'Focus', value: 'Vue3 / Node.js / 小程序' },
    { icon: '◉', label: 'Status', value: 'Open to work', accent: true },
    { icon: '⚡', label: 'Experience', value: '8 年前端开发经验' },
    { icon: '🎯', label: 'Speciality', value: '企业级管理系统 / 医疗健康' },
    { icon: '💡', label: 'Philosophy', value: '代码即设计，简洁即力量' },
  ],
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
  techStack: string[]
}

export const experiences: Experience[] = [
  {
    company: '老百姓大药房',
    position: '高级前端工程师 / 前端负责人',
    period: '2021.03 - 至今',
    description: '负责公司核心业务系统的前端架构设计与开发，带领 5 人前端团队完成多个关键项目的交付。',
    achievements: [
      '主导设计并开发了公司合规管理系统，覆盖全国 3000+ 门店的合规审查流程',
      '搭建处方管理平台前端架构，实现处方流转效率提升 40%',
      '推动团队从 Vue2 迁移至 Vue3 + TypeScript，代码质量和开发效率显著提升',
      '建立前端工程化体系，包括 CI/CD 流水线、代码规范、组件库等',
    ],
    techStack: ['Vue3', 'TypeScript', 'Element Plus', 'Pinia', 'Vite', 'Node.js'],
  },
  {
    company: '某互联网医疗公司',
    position: '前端开发工程师',
    period: '2019.06 - 2021.02',
    description: '参与互联网医疗平台的前端开发，负责在线问诊、电子处方等核心功能模块。',
    achievements: [
      '开发远程审方系统，支持药师在线审核处方，日均处理处方 2000+',
      '优化首屏加载性能，FCP 从 3.2s 降至 1.1s',
      '封装 20+ 业务组件，形成团队内部组件库，提升开发效率 30%',
    ],
    techStack: ['Vue2', 'Webpack', 'Element UI', 'WebSocket', 'Canvas'],
  },
  {
    company: '某软件科技公司',
    position: '前端开发工程师',
    period: '2017.07 - 2019.05',
    description: '负责公司 SaaS 产品的前端开发，参与多个 B 端项目的从 0 到 1 建设。',
    achievements: [
      '独立完成 3 个 SaaS 产品的前端开发和上线',
      '引入 Vue CLI 脚手架，标准化项目初始化流程',
      '编写技术文档和最佳实践指南，帮助新人快速上手',
    ],
    techStack: ['Vue2', 'JavaScript', 'Sass', 'Axios', 'ECharts'],
  },
]

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
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'Node.js', level: 80 },
    ],
  },
  {
    title: 'Build & Tools',
    skills: [
      { name: 'Vite', level: 90 },
      { name: 'Webpack', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'CI/CD', level: 75 },
    ],
  },
  {
    title: 'UI & Styling',
    skills: [
      { name: 'Element Plus', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Sass/Less', level: 90 },
      { name: 'ECharts', level: 80 },
    ],
  },
  {
    title: 'Platform',
    skills: [
      { name: '微信小程序', level: 90 },
      { name: 'Uni-app', level: 85 },
      { name: 'Taro', level: 75 },
      { name: 'Electron', level: 65 },
    ],
  },
]

export interface Project {
  name: string
  type: string
  period: string
  role: string
  background: string
  description: string
  responsibilities: string[]
  achievements: string[]
  tags: string[]
}

export const projects: Project[] = [
  {
    name: '老百姓合规管理系统',
    type: 'Enterprise',
    period: '2023.01 - 2023.08',
    role: '前端负责人',
    background: '随着国家对医药零售行业监管趋严，公司需要一套完整的合规管理系统来确保全国 3000+ 门店的经营行为符合 GSP 规范。',
    description: '大型连锁药房合规管理系统，涵盖证照管理、药品追溯、质量管控、培训考核等核心模块，保障业务流程符合行业法规要求。',
    responsibilities: [
      '主导前端技术选型和架构设计，采用 Vue3 + TypeScript + Pinia 技术栈',
      '设计并实现基于 RBAC 的动态权限系统，支持细粒度的菜单和按钮权限控制',
      '封装复杂表单组件，支持动态字段配置和表单联动，减少 60% 的重复代码',
      '优化大数据量表格渲染性能，实现虚拟滚动，支持万级数据流畅展示',
    ],
    achievements: [
      '系统上线后合规审查效率提升 60%，违规事件下降 80%',
      '获得公司年度最佳项目奖',
      '前端架构方案被推广至其他业务线复用',
    ],
    tags: ['Vue3', 'TypeScript', 'Element Plus', 'Pinia', 'Vite', 'ECharts'],
  },
  {
    name: '处方管理平台',
    type: 'Platform',
    period: '2022.03 - 2022.12',
    role: '核心开发 / 前端架构',
    background: '为响应国家电子处方流转政策，公司需要搭建一套完整的处方管理平台，连接医院、药房和患者，实现处方的数字化流转。',
    description: '医疗处方全流程管理平台，实现从处方开具、审核、调配到发药的全流程数字化管理，支持多端协同工作。',
    responsibilities: [
      '设计处方流转状态机，实现复杂的处方状态管理和流程控制',
      '开发实时消息通知系统，基于 WebSocket 实现处方状态实时推送',
      '实现处方模板管理功能，支持拖拽式模板编辑和预览',
      '对接医保系统和 HIS 系统，处理复杂的数据格式转换',
    ],
    achievements: [
      '处方流转效率提升 40%，患者等待时间缩短 50%',
      '系统日均处理处方 5000+ 单，稳定性达 99.9%',
      '获得省级数字化转型优秀案例',
    ],
    tags: ['Vue3', 'TypeScript', 'WebSocket', 'Canvas', 'Pinia'],
  },
  {
    name: 'EPS 远程审方系统',
    type: 'System',
    period: '2021.06 - 2022.02',
    role: '前端开发',
    background: '为解决基层医疗机构药师资源不足的问题，开发远程审方系统，让执业药师可以在线审核处方，提高审方效率和准确性。',
    description: '远程处方审核系统，连接药师与患者，支持实时视频沟通、电子签名、处方批注等功能，提升审方效率与准确性。',
    responsibilities: [
      '基于 WebRTC 实现音视频通话功能，支持屏幕共享和实时标注',
      '开发 Canvas 处方批注工具，支持手写签名、高亮标注、文字批注',
      '实现处方 OCR 识别结果的前端展示和人工校验流程',
      '优化视频流传输质量，实现自适应码率调节',
    ],
    achievements: [
      '日均审核处方 2000+，审核准确率达 99.5%',
      '视频通话延迟控制在 200ms 以内',
      '系统获得国家软件著作权',
    ],
    tags: ['Vue3', 'WebRTC', 'Canvas', 'WebSocket', 'TypeScript'],
  },
  {
    name: '老百姓商城小程序',
    type: 'Mini Program',
    period: '2022.06 - 2022.10',
    role: '前端开发',
    background: '为拓展线上销售渠道，公司决定开发微信小程序商城，提供药品在线购买、健康咨询、会员管理等服务。',
    description: '老百姓大药房官方电商平台小程序，提供药品在线购买、处方药预约、健康资讯、会员积分等一站式健康服务。',
    responsibilities: [
      '基于 Taro + React 技术栈开发跨端小程序',
      '实现商品 SKU 选择器，支持复杂的药品规格和库存管理',
      '对接微信支付、物流查询、消息推送等第三方服务',
      '优化小程序包体积和加载性能，首屏加载时间控制在 1.5s 以内',
    ],
    achievements: [
      '上线首月 DAU 突破 10 万',
      '订单转化率较 H5 版本提升 35%',
      '获得微信小程序性能优化标杆案例',
    ],
    tags: ['Taro', 'React', 'TypeScript', 'Vant', '微信支付'],
  },
  {
    name: '健康我帮您小程序',
    type: 'Mini Program',
    period: '2021.09 - 2022.01',
    role: '前端开发',
    background: '为提升用户粘性和健康管理体验，开发健康管理类小程序，提供健康档案、用药提醒、在线问诊等服务。',
    description: '健康管理微信小程序，为用户提供个人健康档案管理、用药提醒、在线问诊预约、健康知识科普等便捷健康服务。',
    responsibilities: [
      '设计并实现健康档案模块，支持多维度健康数据的录入和展示',
      '开发用药提醒功能，对接微信订阅消息实现定时提醒',
      '实现健康数据可视化，基于 ECharts 展示健康趋势图表',
      '优化小程序性能，实现分包加载和预加载策略',
    ],
    achievements: [
      '用户留存率较上一版本提升 25%',
      '日活跃用户 5 万+',
      '获得公司产品创新奖',
    ],
    tags: ['微信小程序', 'Uni-app', 'ECharts', 'Vant'],
  },
  {
    name: '百姓通处方工具',
    type: 'Tool',
    period: '2022.11 - 2023.02',
    role: '前端开发',
    background: '为方便门店药师快速处理处方，开发轻量级处方工具，集成在门店 POS 系统中，实现处方的快速录入和查询。',
    description: '面向药房门店的处方流转工具，集成在 POS 系统中，实现处方的快速录入、查询、打印和状态跟踪。',
    responsibilities: [
      '设计简洁高效的操作界面，支持处方的快速录入和编辑',
      '实现处方模板库，支持常用处方的快速调用和修改',
      '对接打印机 SDK，实现处方的热敏打印和 A4 打印',
      '开发处方状态跟踪功能，实时展示处方流转进度',
    ],
    achievements: [
      '处方录入效率提升 50%',
      '覆盖全国 3000+ 门店',
      '获得门店药师一致好评',
    ],
    tags: ['Vue3', 'Electron', 'Node.js', 'Printer SDK'],
  },
]

export interface ContactItem {
  icon: string
  label: string
  value: string
  href?: string
}

export const contacts: ContactItem[] = [
  { icon: '@', label: 'EMAIL', value: 'liqiang.dev@gmail.com', href: 'mailto:liqiang.dev@gmail.com' },
  { icon: '{ }', label: 'GITHUB', value: 'github.com/liqiang', href: 'https://github.com/liqiang' },
  { icon: 'in', label: 'LINKEDIN', value: 'linkedin.com/in/liqiang', href: 'https://linkedin.com/in/liqiang' },
  { icon: '▸', label: 'WECHAT', value: 'liqiang_dev' },
]

export const navItems = [
  { id: 'hero', label: 'hero.md', num: '01' },
  { id: 'about', label: 'about.md', num: '02' },
  { id: 'experience', label: 'experience.ts', num: '03' },
  { id: 'skills', label: 'skills.json', num: '04' },
  { id: 'projects', label: 'projects/', num: '05' },
  { id: 'contact', label: 'contact.ts', num: '06' },
]

export const tabs = [
  { id: 'hero', label: 'hero.md' },
  { id: 'about', label: 'about.md' },
  { id: 'experience', label: 'experience.ts' },
]
