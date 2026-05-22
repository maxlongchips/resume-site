import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// --- Interfaces ---
export interface ResumePersonal {
  name: string
  nameEn: string
  title: string
  titleEn: string
  slogan: string
  avatarChar: string
  summary: string
}

export interface ResumeStat {
  value: string
  label: string
}

export interface ResumeAboutCard {
  icon: string
  label: string
  value: string
  accent?: boolean
}

export interface ResumeBasic {
  phone: string
  email: string
  location: string
  status: string
}

export interface ResumeAbout {
  id: string
  content: string // HTML
}

export interface ResumeExperience {
  id: string
  company: string
  position: string
  period: string
  description: string // HTML
  achievements: string // HTML (<ul><li>...</li></ul>)
  techStack: string[]
}

export interface ResumeProject {
  id: string
  name: string
  type: string
  period: string
  role: string
  intro: string // HTML
  techStack: string
  responsibilities: string // HTML
  challenges: { situation: string; task: string; action: string; result: string; techConcepts?: string[] }[]
  achievements: string // HTML
  tags: string[]
}

export interface ResumeSkillGroup {
  id: string
  title: string
  skills: { name: string; level: number }[]
}

export interface ResumeContact {
  id: string
  icon: string
  label: string
  value: string
  href?: string
}

// --- Helpers ---
function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

function arrToHtml(items: string[]): string {
  if (!items.length) return ''
  const li = items.map((s) => `<li>${s}</li>`).join('')
  return `<ul>${li}</ul>`
}

/** Parse HTML <ul><li>...</li></ul> back to string[] */
export function htmlToArr(html: string): string[] {
  if (!html) return []
  const matches = html.match(/<li>(.*?)<\/li>/g)
  if (!matches) return [html.replace(/<[^>]*>/g, '').trim()].filter(Boolean)
  return matches.map((m) => m.replace(/<\/?li>/g, '').replace(/<[^>]*>/g, '').trim())
}

/** Strip HTML tags for plain text display */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

// --- localStorage ---
const STORAGE_KEY = 'resume-store'

function loadFromStorage(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToStorage(data: Record<string, unknown>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* ignore */ }
}

// --- Store ---
export const useResumeStore = defineStore('resume', () => {
  const saved = loadFromStorage()

  const personal = ref<ResumePersonal>(
    saved?.personal ?? {
      name: '李强',
      nameEn: 'Li Qiang',
      title: '资深前端开发',
      titleEn: 'Senior Frontend Developer',
      slogan: 'Building digital products that feel human.',
      avatarChar: '强',
      summary: '8 年前端开发经验，先后服务于多家互联网企业和医疗健康公司。作为前端负责人，主导过医药电商小程序、互联网医院、远程审方系统、医保合规管理系统等多个大型项目的架构设计与实施。擅长从 0 到 1 搭建前端体系，具备跨端（小程序/H5/PC）全栈交付能力。',
    },
  )

  const stats = ref<ResumeStat[]>(
    saved?.stats ?? [
      { value: '8+', label: 'Years Exp' },
      { value: '6+', label: 'Projects' },
      { value: '200+', label: 'Pages Built' },
    ],
  )

  const aboutCards = ref<ResumeAboutCard[]>(
    saved?.aboutCards ?? [
      { icon: '⌘', label: 'Location', value: '湖南长沙' },
      { icon: '◈', label: 'Focus', value: 'Vue3 / 小程序 / 企业级系统' },
      { icon: '◉', label: 'Status', value: 'Open to work', accent: true },
      { icon: '⚡', label: 'Experience', value: '8 年前端开发经验' },
      { icon: '🎯', label: 'Speciality', value: '医药电商 / 医疗健康 / 合规管理' },
      { icon: '👥', label: 'Leadership', value: '带 5-6 人前端团队' },
    ],
  )

  const basic = ref<ResumeBasic>(
    saved?.basic ?? {
      phone: '138-0000-0000',
      email: 'liqiang.dev@gmail.com',
      location: '湖南长沙',
      status: 'Open to work',
    },
  )

  const about = ref<ResumeAbout[]>(
    saved?.about ?? [
      {
        id: uid(),
        content:
          '<p>拥有 <strong>8 年互联网行业经验</strong>的资深前端工程师，先后服务于多家互联网企业和医疗健康公司。目前在老百姓大药房担任前端负责人，带领 5-6 人团队，主导了医药电商小程序、互联网医院、远程审方系统、医保合规管理系统等多个核心项目的架构设计与落地实施。技术栈覆盖 Vue2/3、微信小程序原生、TypeScript，具备从 0 到 1 搭建完整前端体系的能力。项目经验涵盖跨端开发（小程序 / H5 / PC）、复杂业务状态机设计、实时音视频通信、医保支付对接等领域。</p>',
      },
    ],
  )

  const experiences = ref<ResumeExperience[]>(
    saved?.experiences ?? [
      {
        id: uid(),
        company: '老百姓大药房',
        position: '高级前端工程师 / 前端负责人',
        period: '2021.03 - 至今',
        description: '<p>担任前端负责人，带领 5-6 人前端团队，负责公司核心业务系统的架构设计、技术选型与交付落地。</p>',
        achievements: arrToHtml([
          '主导医保合规管理系统架构设计，覆盖 9 类医保规则的全生命周期管理，支撑全国 5000+ 门店合规运营，552 次提交 / 16 次正式发版',
          '负责处方管理平台前端建设，管理全国数千家门店的互联网医院对接、处方流转与审方配置，项目周期 18 个月',
          '推动团队从 Vue2 迁移至 Vue3 + TypeScript，建立 ESLint + Husky + lint-staged 工程化体系',
          '主导前端 Code Review、技术方案评审，产出 13+ 份模块设计文档',
        ]),
        techStack: ['Vue3', 'TypeScript', 'Element Plus', 'Vite', 'Vuex', 'SCSS'],
      },
      {
        id: uid(),
        company: '老百姓大药房（互联网医疗方向）',
        position: '前端开发工程师 / 前端负责人',
        period: '2019.06 - 2021.02',
        description: '<p>负责互联网医疗产品线前端开发，主导 EPS 远程审方系统重构，从 Thymeleaf + Layui 服务端渲染迁移为 Vue2 SPA 架构。</p>',
        achievements: arrToHtml([
          '主导 EPS 远程审方系统前端重构，覆盖全国 4 省门店的处方审核、视频问诊、调配发药全流程，日均处理数千张处方',
          '从 0 到 1 开发"580 健康我帮您"互联网医院小程序，对接 4 家医疗服务供应商，持续迭代 6 年（243 次提交 / 30+ 页面 / 50+ 接口）',
          '基于腾讯 TRTC 实现远程视频审方功能，支持药师与门店实时音视频沟通',
          '设计 GrowingIO 埋点体系，建立问诊转化漏斗数据模型',
        ]),
        techStack: ['Vue2', '微信小程序', 'Element UI', 'TRTC', 'WebSocket', 'Canvas'],
      },
      {
        id: uid(),
        company: '某软件科技公司',
        position: '前端开发工程师',
        period: '2017.07 - 2019.05',
        description: '<p>负责公司 SaaS 产品的前端开发，参与多个 B 端项目的从 0 到 1 建设。</p>',
        achievements: arrToHtml([
          '独立完成 3 个 SaaS 产品的前端开发和上线',
          '引入 Vue CLI 脚手架，标准化项目初始化流程',
          '编写技术文档和最佳实践指南，帮助新人快速上手',
        ]),
        techStack: ['Vue2', 'JavaScript', 'Sass', 'Axios', 'ECharts'],
      },
    ],
  )

  const projects = ref<ResumeProject[]>(
    saved?.projects ?? [
      {
        id: uid(),
        name: '老百姓大药房小程序（lbxmall）',
        type: 'Mini Program',
        period: '2019 - 至今',
        role: '前端负责人 & 核心开发（0→1 主导）',
        intro: '<p>从 0 到 1 主导开发的医药电商微信小程序，服务于老百姓大药房连锁药房体系（覆盖 18+ 子品牌），承载在线购药、互联网医院复诊开方、医保支付、全球购跨境商城、会员储值卡、分销直播等全链路业务。项目规模：14 个分包、200+ 页面、25+ API 模块、60+ 公共组件。</p>',
        techStack: '微信小程序原生框架 + Vant Weapp + 自研 wxMiniStore 状态管理 + EventEmitter3 事件总线 + GrowingIO / 神策双埋点 + BigNumber.js + JsBarcode + WebSocket',
        responsibilities: arrToHtml([
          '主导整体架构设计，规划 14 个分包策略实现按需加载，控制主包体积在 [填写具体大小] 以内',
          '自研 wxMiniStore 响应式状态管理库：劫持 Page/Component 构造函数自动注入 $state，通过 diff 算法计算最小变更集精准 setData，支持 useProp 按需订阅，减少小程序 JSBridge 通信开销',
          '自研 Request 单例网络层：实现请求队列 + EventEmitter3 事件总线重放 + 401 重试队列 + Token 主动续期（剩余 <600s 时后台静默刷新），解决冷启动多页面并发请求的登录态竞态问题',
          '设计医保支付策略模式架构（YbPayManager + BaseYbPayStrategy + 城市具体策略），封装 6 个生命周期钩子，新增城市从改 5+ 文件降为新增 1 个策略文件',
          '主导 GrowingIO + 神策双通道埋点体系设计，封装统一 gioTrack() 函数，自动注入 12+ 维度上下文，页面性能采用 Barrier 模式（onReady + 路由完成 + N 个 API 响应后统一计算）',
          '从 0 到 1 搭建前端工程化体系：ESLint + Husky + lint-staged 代码规范卡口、分包预加载策略、多品牌小程序配置化方案',
        ]),
        challenges: [
          {
            situation: '小程序冷启动时，首页、分类、购物车等多个页面同时发起请求，但微信登录态尚未就绪，导致大量请求 401 失败。同时 Token 2 小时过期，被动刷新会中断用户正在操作的表单。',
            task: '设计一套统一的请求层，解决登录态竞态和 Token 无感续期两个核心问题。',
            action: '设计了 Request 单例类：未登录的请求入队并生成 GUID，通过 EventEmitter3 的 once(guid) 挂起 Promise；登录完成后批量重放队列，每个请求 resolve 时 emit 对应 guid 恢复 Promise 链。Token 续期方面，在 wxcache.get() 的读取钩子中检查过期时间，若剩余 <600s 则触发 referLogin 事件后台静默刷新。401 场景走 addToRetryQueue，配合 loginFailCount 熔断机制（3 次失败弹窗提示）。这里用到了 Promise 链的挂起与恢复、事件驱动的异步协调模式。',
            result: '冷启动请求成功率从 [填写]% 提升至 [填写]%，Token 过期导致的用户操作中断降为 0，熔断机制兜底了极端网络异常场景。',
            techConcepts: ['Promise 链挂起与恢复', '事件驱动异步协调', '请求队列重放机制'],
          },
          {
            situation: '不同城市的医保授权和支付流程差异巨大（武汉、广州、南通各有独立的授权小程序和支付 H5），但原代码中每个城市的逻辑散落在各页面的 if-else 中，新增一个城市需要改动 5+ 个文件。',
            task: '重构医保支付架构，使新增城市只需最小改动量，同时保持各城市流程的独立灵活性。',
            action: '采用策略模式重构：抽象出 BaseYbPayStrategy 基类定义 6 个生命周期钩子（matchOnShow / matchPayAction / onAuthPrepare / onAuthReturn / onPayPrepare / onPayReturn），YbPayManager 单例管理器持有策略数组，在页面 onShow 和支付点击时遍历匹配。选择策略模式而非模板方法，因为各城市流程差异太大（广州和南通的授权→支付链路完全不同），模板方法的固定骨架反而限制灵活性。9 个文件 356 行新代码替代了散落的 if-else。',
            result: '新增城市从改 5+ 文件降为新增 1 个策略文件，已对接武汉/广州/南通 3 个城市医保系统，代码可维护性显著提升。',
            techConcepts: ['策略模式 vs 模板方法的选型依据', '生命周期钩子的抽象设计'],
          },
          {
            situation: '商品瀑布流列表原实现逐个商品调用 setData + getBoxHeight，在小程序中每次 setData 都是一次 JSBridge 调用，N 个商品就是 N 次跨线程通信，列表滚动严重卡顿。',
            task: '优化瀑布流渲染性能，消除 JSBridge 通信瓶颈。',
            action: '设计了三步优化方案：①预取当前左右列高度（一次 getBoundingClientRect 调用）；②高度差启发式分配（diff > 280 阈值时分配到矮列）；③所有商品计算完后合并为一个 setData 对象一次性提交。将 O(N) 次 setData 降为 O(1) 次。核心思路是批量合并策略——将多次细粒度的状态更新聚合为一次粗粒度的渲染提交。',
            result: '瀑布流 setData 次数从 N 次降到 1 次，页面性能自动上报覆盖 18 个核心页面，滚动帧率从 [填写] fps 提升至 [填写] fps。',
            techConcepts: ['setData 的 JSBridge 通信开销', '批量合并渲染策略', '高度差启发式分配'],
          },
        ],
        achievements: arrToHtml([
          '项目持续迭代 6 年+，243 次提交 / 8 位贡献者，服务千万级用户',
          '覆盖全国多省市医保对接（武汉/广州/南通），对接 6+ 家互联网医院',
          '自研 wxMiniStore 和 Request 单例被多个内部项目复用，成为团队基础设施',
          '策略模式重构医保支付（9 文件 356 行），新增城市改动量从 5+ 文件降为 1 文件',
        ]),
        tags: ['微信小程序', '自研框架', '策略模式', '事件驱动', '医保支付', 'GrowingIO', 'WebSocket', 'BigNumber.js'],
      },
      {
        id: uid(),
        name: '医保合规管理系统',
        type: 'Enterprise',
        period: '2024.11 - 2026.05',
        role: '前端负责人（整体项目负责人）',
        intro: '<p>老百姓大药房医保业务的合规管理中枢，覆盖 9 类医保规则（诊断/提示/数量/金额/年龄/性别/周期/通用/门店）的全生命周期管理（创建→配置→关联→启停→导出）。系统通过规则配置引擎实现灵活配置，通过合理用药模块对处方进行合规审核，通过调用日志模块实现操作可追溯，支撑全国 5000+ 门店的医保合规运营。</p>',
        techStack: 'Vue 2.6 + Vuex 3 + Vue Router 3 + @lbx/element-ui（私有 Fork）+ Webpack（Vue CLI 4）+ CAS SSO + husky + lint-staged + plop + compression-webpack-plugin',
        responsibilities: arrToHtml([
          '主导前端架构设计，采用枚举驱动的多态渲染方案：6 个 switch 函数集中管理 9 种规则类型在 6 个维度（表头/字段映射/Tab 标题/列配置/表单标签/导出模板）的差异配置',
          '设计 URL 参数驱动的模块级通信机制：pageKey 贯穿卡片导航→规则列表→详情→关联药品/门店全链路，天然支持浏览器前进/后退和链接分享',
          '实现两步提交流程（门店级规则）：第一步提交规则获取 ruleId，第二步用 ruleId 关联门店文件上传',
          '建立全局防抖机制（postLoading 锁 + dialogTaskOperation mixin），防止重复提交和并发操作冲突',
          '产出 cc-element 公共组件库（16 个业务组件）：Tabcom 通用表格、aedFrom 动态表单容器（shallowRef 持有组件引用）、comonImportModal 通用导入、comonSidebarLog 审计日志',
          '管理 4 套环境（dev/test/pre/prod）的部署配置，建立 husky + lint-staged 提交卡口和 plop 模板生成规范',
        ]),
        challenges: [
          {
            situation: '9 种医保规则类型在 6 个维度上各有不同的配置（表头、字段映射、Tab 标题、列配置、表单标签、导出模板），如果用 if-else 散落在各组件中，新增规则类型需要改 6+ 个文件且容易遗漏。',
            task: '设计一套集中管理的多态渲染方案，新增规则类型时改动量最小且不会遗漏维度。',
            action: '采用枚举驱动方案：在 enumDictionary.js 中建立 6 个 switch 函数，每个函数管理 9 种规则类型在一个维度上的差异配置。选择 switch 集中管理而非策略模式，原因是：策略模式适合"同一接口不同实现"，但这里是"同一个 key 在 6 个函数中各有不同配置"。switch 集中管理、一目了然，新增规则类型只需在 6 个函数中各加一个 case，比维护 9 个策略对象（每个对象 6 个方法）更直观。同时用 URL 参数（而非 Vuex）驱动模块级通信，pageKey 贯穿全链路，天然支持浏览器前进/后退和链接分享。',
            result: '新增规则类型从改 6+ 文件降为在 6 个 switch 函数中各加一个 case，552 次 Git 提交、16 次正式发版、19 个月持续迭代无架构性重构。',
            techConcepts: ['枚举驱动 vs 策略模式的选型依据', 'URL 参数驱动的状态管理（对比 Vuex）'],
          },
          {
            situation: 'Element Plus 的表单校验器在初始化时绑定静态 rules 对象，后续动态修改 rules 不会生效。而业务场景要求：渠道选择小程序时身份证和首诊信息变为必填，选择互联网医院后根据医院配置动态调整必填字段。',
            task: '实现动态表单校验规则，支持运行时根据业务条件切换必填/选填。',
            action: '使用 computed 动态计算校验规则，每次业务条件变化时返回全新的 rules 对象，触发 Element Plus 重新绑定。互联网医院联动方面，选择医院后调用 getNetHospitalRequiredConfig 接口获取该医院的必填字段配置，如果返回包含 isIdCardRequired，则强制将身份证设为必填且禁用修改（医院要求的合规底线，运营不能关闭）。提交时非小程序渠道自动将 isIdCardRequired 和 isFirstVisitRequired 设为 null，避免脏数据写入后端。',
            result: '9 种规则类型的动态表单校验零 bug 上线，运营配置效率提升 [填写]%，脏数据写入率降为 0。',
            techConcepts: ['Element Plus 校验器的初始化绑定机制', 'computed 驱动的动态 rules 刷新'],
          },
        ],
        achievements: arrToHtml([
          '552 次 Git 提交，16 次正式发版，19 个月持续迭代，支撑全国 5000+ 门店合规运营',
          '产出 16 个业务组件 + cc-element 公共组件库，被其他业务线复用',
          '作为整体项目负责人，带领 6 人前端团队完成交付，产出完整的技术方案文档',
        ]),
        tags: ['Vue2', 'Element UI', '枚举驱动', 'CAS SSO', '合规引擎', 'Webpack', 'plop'],
      },
      {
        id: uid(),
        name: '处方管理平台（lbx-web-rp-mng）',
        type: 'Platform',
        period: '2024.12 - 2026.05',
        role: '前端负责人',
        intro: '<p>老百姓大药房处方流转的后台管理中枢，负责管理全国数千家门店与互联网医院的对接配置、处方流转状态追踪、审方规则控制和药品合规管理。系统覆盖 POS 终端、百姓通 APP、小程序三端渠道，是"线上问诊→电子处方→门店取药"闭环的核心配置层。</p>',
        techStack: 'Vue 3 + Vuex 4 + Vue Router 4 + Element Plus + SCSS + Vue CLI 5 + CAS SSO',
        responsibilities: arrToHtml([
          '设计业务配置中心（ServiceConfiguration）：管理门店×互联网医院×渠道×处方类型的"开关矩阵"，包含合理用药/医保合规/网院审方/签章管控等 10+ 维度的动态配置',
          '实现动态表单校验引擎：当渠道选择小程序时身份证和首诊信息变为必填，选择互联网医院后根据医院配置动态调整必填字段，使用 computed 驱动校验规则刷新',
          '开发处方数据查询模块：支持多维度筛选（处方ID/战区/经营归属/门店远程搜索/互联网医院/业务类型等），详情页展示处方全貌（业务数据/处方图片/用户数据/订单数据/药品数据/违规数据）',
          '设计医保费用的整数缩放计算方案：*10000→取整→加法→/10000，将浮点运算转化为整数运算，消除 JavaScript 浮点精度累积误差',
          '实现中西药数量差异化渲染：同一 applyQuantity 字段，中药代表剂数、西药代表剂量，前端做业务语义层面的差异化展示',
        ]),
        challenges: [
          {
            situation: '每家门店需要对接哪些互联网医院、走什么渠道（POS/百姓通/小程序）、开什么类型的处方（西药/中药、医保/非医保）、需要什么合规校验（网院审方/合理用药/医保合规），配置维度多达 10+，且各维度之间存在联动关系。',
            task: '设计一个灵活的"开关矩阵"配置系统，支持多维度交叉配置且不产生冲突。',
            action: '设计 ServiceConfiguration 业务配置中心，将配置维度抽象为矩阵行（门店）和列（互联网医院×渠道×处方类型×合规开关）。选择互联网医院后，调用 getNetHospitalRequiredConfig 接口获取该医院的必填字段配置，如果返回包含 isIdCardRequired，则强制将身份证设为必填且禁用修改（医院合规底线）。提交时非小程序渠道自动清洗 isIdCardRequired 和 isFirstVisitRequired 字段，避免脏数据。列表与详情采用同页切换（v-if 切换 showTable 状态），列表的搜索条件和分页状态保存在组件内存中，返回时不需要重新请求。',
            result: '覆盖 6+ 家互联网医院对接，实现 POS / 百姓通 / 小程序三端处方流转统一管理，配置冲突率降为 0。',
            techConcepts: ['配置矩阵的维度抽象', '同页切换 vs 路由跳转的状态保持策略'],
          },
        ],
        achievements: arrToHtml([
          '18 个月持续迭代，覆盖 6+ 家互联网医院对接，管理全国数千家门店配置',
          '前端架构方案沉淀为团队标准模板，被后续项目复用',
          '作为整体项目负责人，带领 6 人团队完成从 0 到 1 的交付',
        ]),
        tags: ['Vue3', 'Element Plus', 'Vuex', 'CAS SSO', '配置矩阵', '浮点精度'],
      },
      {
        id: uid(),
        name: '580 健康我帮您（互联网医院小程序）',
        type: 'Mini Program',
        period: '2019 - 至今',
        role: '前端负责人 & 核心开发',
        intro: '<p>老百姓大药房旗下互联网医院微信小程序，为用户提供在线问诊（图文/视频/AI 三种模式）、电子处方、药品购买一站式服务。用户从商城小程序跳入，经过门店解析、医生选择、问诊提交、在线支付、诊室交互（图文聊天/AI 问卷/视频跳转），最终获取处方并完成购药闭环。对接 4 家医疗服务供应商（华夏/智云/泰康/平安），每家有独立的接入方式、字段校验规则和实名认证要求。</p>',
        techStack: '微信小程序原生框架（WXML/WXSS/JS）+ Node.js + 阿里云 OSS + WebSocket + HTTP 轮询 + GrowingIO + BigNumber.js + JsBarcode + qrjs',
        responsibilities: arrToHtml([
          '设计多供应商协议适配层：对接华夏/智云/泰康/平安 4 家互联网医院，每家医院独立的接入方式、字段校验规则、实名认证要求，通过 netHospitalCode 路由到不同的处理逻辑',
          '设计实时通信双通道架构：WebSocket 提供实时性（医生接诊瞬间感知）+ HTTP 轮询作为兜底（WebSocket 断连/心跳超时/网络波动时保证不丢消息），任一通道收到终态后停止另一通道',
          '实现处方状态机管理：基于 serviceType × status × videoAccept 的状态矩阵驱动 UI 渲染，支持服务端驱动的问诊方式降级/升级（visitWay 动态覆盖）',
          '负责核心提交模块 inquiry.js（1191 行）的架构设计：10 步校验链 + 6 个子组件通信（命令式调用 + 事件驱动 + 发布订阅三种模式）+ 医院切换的连锁反应处理',
          '搭建 GrowingIO 埋点体系：设计 UUID 流程追踪生命周期（生成→三处存储→全链路携带→消费标记→重新生成），建立问诊转化漏斗数据模型',
        ]),
        challenges: [
          {
            situation: '小程序冷启动时多个页面同时发起请求但登录态尚未就绪；同时对接 4 家互联网医院，每家的字段校验规则、实名认证要求、问诊方式都不同；提交页的 10 步校验链涉及 6 个子组件的异步数据收集，子组件初始化完成顺序不确定。',
            task: '设计一套统一的请求层解决登录态竞态，同时设计一套可扩展的多供应商适配架构。',
            action: '请求层：设计 Request 单例类，未登录请求入队生成 GUID，通过 EventEmitter3 的 once(guid) 挂起 Promise，登录完成后批量重放。Token 续期在 wxcache.get() 读取钩子中检查过期时间，<600s 时后台静默刷新。多供应商适配：通过 netHospitalCode 路由到不同的处理逻辑，泰康强制实名认证（失败弹编辑 Dialog 自动重新提交），平安强制 visitWay=2 + 专用告知书，580 有未完成订单拦截（5 个触发点互为补刀覆盖异步完成顺序不确定的场景）。提交页子组件通信采用三种模式：命令式调用（selectComponent 调子组件方法）、事件驱动（triggerEvent 上报）、发布订阅（EventEmitter3 跨页面通信）。',
            result: '冷启动请求成功率提升至 [填写]%，4 家医院差异化适配零架构性重构，10 步校验链覆盖所有异步竞态场景。',
            techConcepts: ['Promise 链的挂起与恢复', '事件驱动的异步协调模式', '多供应商适配的路由策略'],
          },
          {
            situation: '精致中药的剂量校验涉及浮点运算：如 3 × 0.15 % 0.3，JS 原生浮点运算结果为 0.44999999999999996 % 0.3 = 0.14999...（而非 0），导致用户填写的剂量明明是包装规格的整数倍但校验不通过。',
            task: '解决中药剂量校验的浮点精度问题，确保校验结果的数学正确性。',
            action: '引入 BigNumber.js，所有乘法/取模运算改为 new BigNumber(x).times(y).mod(z).toString() !== \'0\'。同时在问诊提交的 10 步校验链中，精致中药（tcmType===\'3\'）在 Step 1 和 Step 11 两次触发 BigNumber 校验，确保剂量 × 剂数是包装规格（mcContent）的整数倍。',
            result: '精致中药剂量校验准确率 100%，消除了 JS 浮点运算导致的误报，用户投诉率从 [填写] 降为 0。',
            techConcepts: ['IEEE 754 浮点精度问题', 'BigNumber.js 的精确运算原理'],
          },
        ],
        achievements: arrToHtml([
          '持续迭代 6 年+，243 次提交 / 8 位贡献者 / 30+ 页面 / 50+ 接口',
          '对接 4 家医疗服务供应商，覆盖 4 种医保类型（门诊统筹/普通医保/门诊慢特病/非医保）',
          'GrowingIO 埋点体系支撑问诊转化漏斗分析，数据驱动产品优化',
          '多次主导线上故障排查（异步竞态弹窗不展示、UUID 重复污染、埋点事件丢失），保障系统稳定性',
        ]),
        tags: ['微信小程序', 'WebSocket 双通道', '状态机', 'BigNumber.js', 'GrowingIO', '事件驱动'],
      },
      {
        id: uid(),
        name: 'EPS 远程审方系统',
        type: 'System',
        period: '2019 - 2021',
        role: '前端负责人（架构迁移主导）',
        intro: '<p>连锁药房合规要求：处方药销售必须经执业药师审核。原系统基于 Thymeleaf + Layui 服务端渲染架构，维护成本高、用户体验差、无法支持实时音视频审方。我主导了前端架构迁移方案设计，将服务端渲染迁移为 Vue 2 SPA，覆盖全国 4 省门店的处方审核、远程视频问诊、调配发药全流程。</p>',
        techStack: 'Vue 2.7 + Element UI 2.15 + Vuex 3 + Vue Router 3 + TRTC（腾讯实时音视频）+ SCSS + 腾讯 COS CDN + CAS SSO',
        responsibilities: arrToHtml([
          '主导架构迁移方案设计：从 Thymeleaf + Layui 服务端渲染迁移为 Vue 2 SPA，设计渐进式迁移策略，确保业务零中断',
          '设计审方管理模块的双端架构：药师端（被叫/审核）和店员端（主叫/创建）各有独立的页面结构和交互逻辑，通过数据驱动的配置（searchFields / columns / getRowActions）实现差异化渲染',
          '基于腾讯 TRTC 实现远程视频审方：SDK 懒加载（动态 import 防止 IE 崩溃）+ 幂等初始化（单例模式 + Promise 共享）+ 被叫端自动导航 + store 桥接',
          '设计策略模式处理行操作：每行 3~7 个操作按钮，按钮组合取决于状态 + 角色 + 组织层级，用 actionMap 消除嵌套 if-else',
          '实现 CAS SSO + URL 权限标识 + 按钮级权限控制体系，支持 4 套环境（dev/test/uat/prod）独立配置',
        ]),
        challenges: [
          {
            situation: '老系统基于 Thymeleaf + Layui 服务端渲染，页面每次交互都需要完整刷新，用户体验差且无法支持实时音视频审方。同时门店电脑多为 IE 10+ 环境，TRTC SDK 内部引用 WebRTC API，IE 环境下直接 import 会在模块解析阶段报错。',
            task: '在保证业务零中断的前提下完成架构迁移，同时解决 TRTC SDK 的 IE 兼容性问题。',
            action: '设计渐进式迁移策略：核心链路（审方管理）优先迁移，非核心模块（基础数据/系统管理）后续跟进。TRTC SDK 采用懒加载方案：动态 import() 是运行时按需加载，配合 isVideoCallSupported() 前置检测，确保 SDK 永远不会在 IE 中被加载。初始化采用幂等单例模式：initializing 保存正在进行的 Promise，后续调用直接 await 同一个 Promise，保证只初始化一次（用户登录后可能多处调用 initTrtc）。被叫端通过 store 桥接实现自动导航：ON_CALL_RECEIVED → 解析 userData → 自动跳转到对应处方详情。',
            result: '完成 Thymeleaf → Vue 2 SPA 全量迁移，覆盖全国 4 省门店，日均处理数千张处方。TRTC 视频通话支持 IE 10+ 和现代浏览器双环境，通话延迟控制在 [填写]ms 以内。',
            techConcepts: ['动态 import() 的懒加载机制', '幂等初始化的 Promise 共享模式', '渐进式架构迁移策略'],
          },
        ],
        achievements: arrToHtml([
          '完成 Thymeleaf → Vue 2 SPA 全量迁移，日均处理数千张处方，覆盖全国 4 省门店',
          '团队 6 人（1 前端负责人 + 5 前端开发），产出 13 份模块设计文档',
          '系统部署于腾讯 COS CDN，支持 4 套环境，IE 10+ 兼容',
          '策略模式处理行操作，新增操作只需加一行 actionMap 映射',
        ]),
        tags: ['Vue2', 'TRTC', '策略模式', '架构迁移', 'CAS SSO', 'IE 兼容', '懒加载'],
      },
      {
        id: uid(),
        name: '百姓通处方工具（bxt-h5-prescription）',
        type: 'H5 App',
        period: '2024 - 至今',
        role: '核心开发（第 3 高贡献者）',
        intro: '<p>为连锁药店店员提供的移动端处方流转工作台，内嵌于百姓通原生 App 中运行。涵盖开具处方、AI 拍照识别处方、药师审方、人工调配、复核发药、电子签章、凭证管理、视频问诊等全流程功能。项目规模：102 个 Vue 文件 + 56 个 TS 文件，3.3MB / 32,593 行代码。</p>',
        techStack: 'Vue 3 + TypeScript + Vite + Vant 4 UI + Tailwind CSS + Vuex + vue-router + Aegis 监控 + GIO 埋点 + 腾讯云 COS + TRTC 音视频 + WebSocket',
        responsibilities: arrToHtml([
          '设计声明式表单策略引擎：将多步骤 AI 处方录入流程抽象为 StepStrategy 接口（layout / getConfig / validate），DynamicForm 组件根据配置动态渲染 5 种控件，新增业务步骤无需修改 UI 层代码',
          '实现电子签章全链路：封装 SignatureBoard 签名画板组件，设计墨迹自动裁剪居中算法（像素级 BoundingBox 检测 → 等比缩放至 378×157 标准尺寸），编写 useSignature hook 统一签章校验拦截逻辑，通过字典接口实现灰度开关控制',
          '设计多平台 Native 桥接抽象层：BasePlatform 抽象基类 + iOS/Android/PC 策略实现，封装扫码/用户认证/视频通话/导航栏控制等 8 类原生能力，非 Native 环境自动 mock 降级保障开发调试效率',
          '实现处方药品对品匹配系统：三态模型（pending → completed → unmatchable）+ 进度条实时反馈 + 批号级精细匹配',
          '封装通用轮询框架 pollUntilResolved：支持超时中断与自动重试，与 WebSocket 实时通道组成双通道消息保障机制',
          '搭建 Aegis + GIO 双通道监控体系：Aegis 负责技术监控（全量错误捕获 + 接口异常上报 + SPA 路由 PV），GIO 负责业务埋点（处方全流程转化追踪）',
        ]),
        challenges: [
          {
            situation: 'AI 处方识别后的多步骤录入流程（患者信息→药品选择→诊断录入→配药）需要支持中西药方差异化表单校验，且业务步骤可能频繁新增。如果硬编码每个步骤的表单结构，新增步骤需要同时改 UI 和校验逻辑。',
            task: '设计一套可扩展的表单引擎，使新增业务步骤无需修改 UI 层代码。',
            action: '设计声明式表单策略引擎：每个步骤实现 StepStrategy 接口，包含 layout（布局配置）、getConfig（字段配置）、validate（校验规则）三个方法。DynamicForm 组件根据配置动态渲染 input/radio/select/medicine-selector/date 五种控件，字段可见性由 ifVisible 函数控制（如中药方才显示"副数"字段）。药品选择器支持搜索、多选、分页加载；诊断选择器支持 Tag 标签形式添加/删除，上限 5 个。这套设计的核心思想是将"做什么"（策略配置）和"怎么做"（DynamicForm 渲染）分离，策略层描述业务语义，渲染层负责 UI 实现。',
            result: '新增业务步骤从改 3+ 文件降为实现一个 StepStrategy 接口，AI 处方录入流程覆盖 [填写] 种业务场景，表单校验零遗漏。',
            techConcepts: ['声明式 vs 命令式的表单设计', '策略模式在表单引擎中的应用', '字段可见性的函数式控制'],
          },
          {
            situation: '电子签章要求签名图像固定尺寸（378×157）、清晰可辨。但用户在画板上的签名大小和位置不一致，直接上传会导致签章图像不合规。同时签章功能需要灰度放量，不能一次性全量上线。',
            task: '设计签章图像的标准化处理方案和灰度发布机制。',
            action: '设计墨迹自动裁剪居中算法：遍历 Canvas 像素矩阵定位墨迹 BoundingBox → 按安全边距等比缩放 → 居中绘制到固定尺寸 378×157。封装 useSignature hook 统一签章校验拦截逻辑（有签章放行 / 无签章阻断并引导录入）。灰度方面，通过字典接口动态配置签章功能的开关，支持按门店/按用户灰度，出问题时后端一键关闭。同时设计了人脸识别认证的递归重试机制：先查接口判断是否需要认证 → 弹窗提示 → 调起 Native 人脸比对 → 失败时递归调用自身形成重试闭环 → 服务异常时默认放行（降级策略）。',
            result: '签章图像合规率 100%，灰度控制使签章功能分阶段安全上线，人脸识别通过率 [填写]%。',
            techConcepts: ['Canvas 像素矩阵的 BoundingBox 检测', '灰度发布的 Feature Flag 模式', '递归重试与降级放行策略'],
          },
          {
            situation: 'H5 内嵌在百姓通 App 中运行，需要调用扫码、获取用户信息、视频通话、导航栏控制等原生能力。但 iOS 和 Android 的 JSBridge 协议不同，PC 端没有 Native 环境，直接在业务代码中 if-else 判断平台会导致代码耦合严重。',
            task: '设计一套平台无关的 Native 能力抽象层，使业务代码零修改即可跨端运行。',
            action: '采用抽象工厂 + 策略模式：BasePlatform 抽象基类定义 8 个抽象方法（扫码/用户信息/导航栏/Token/视频通话等），AndroidP/IosP/PCP 各自实现。platformTool 单例工厂通过 UA 检测自动选择平台实现。每个平台实现都有 isBxtEnv() 检测，非百姓通环境自动降级为 mock 数据，保证本地开发无需真机。视频通话状态机通过 currState 追踪通话生命周期（0失败/1成功/-1进行中），避免重复上报。',
            result: '业务代码与平台完全解耦，iOS/Android/PC 三端一套代码零修改运行，本地开发效率提升 [填写]%。',
            techConcepts: ['抽象工厂模式在跨端适配中的应用', '环境检测与 Mock 降级策略', '状态机驱动的通话生命周期管理'],
          },
        ],
        achievements: arrToHtml([
          '142 个 commit，占总量 1,044 的 13.6%，项目第 3 高贡献者',
          '独立维护 6+ 个核心页面（复核发药/处方详情/处方列表/凭证管理等），净增代码约 20,000+ 行',
          '从 0 搭建 Aegis + GIO 双通道监控体系，线上问题可追溯、业务转化可量化',
          '封装 SignatureBoard / useSignature / pollUntilResolved 等公共组件，被多场景复用',
        ]),
        tags: ['Vue3', 'TypeScript', '声明式表单引擎', '策略模式', 'Canvas 像素算法', '灰度发布', 'TRTC', 'Aegis'],
      },
    ],
  )

  const skillGroups = ref<ResumeSkillGroup[]>(
    saved?.skillGroups ?? [
      {
        id: uid(),
        title: 'Core',
        skills: [
          { name: 'Vue3', level: 95 },
          { name: 'TypeScript', level: 90 },
          { name: 'JavaScript', level: 95 },
          { name: 'Node.js', level: 80 },
        ],
      },
      {
        id: uid(),
        title: 'Build & Tools',
        skills: [
          { name: 'Vite', level: 90 },
          { name: 'Webpack', level: 85 },
          { name: 'Git', level: 90 },
          { name: 'CI/CD', level: 75 },
        ],
      },
      {
        id: uid(),
        title: 'UI & Styling',
        skills: [
          { name: 'Element Plus', level: 90 },
          { name: 'Tailwind CSS', level: 85 },
          { name: 'Sass/Less', level: 90 },
          { name: 'ECharts', level: 80 },
        ],
      },
      {
        id: uid(),
        title: 'Platform',
        skills: [
          { name: '微信小程序', level: 90 },
          { name: 'Uni-app', level: 85 },
          { name: 'Taro', level: 75 },
          { name: 'Electron', level: 65 },
        ],
      },
    ],
  )

  const contacts = ref<ResumeContact[]>(
    saved?.contacts ?? [
      { id: uid(), icon: '@', label: 'EMAIL', value: 'liqiang.dev@gmail.com', href: 'mailto:liqiang.dev@gmail.com' },
      { id: uid(), icon: '{ }', label: 'GITHUB', value: 'github.com/liqiang', href: 'https://github.com/liqiang' },
      { id: uid(), icon: 'in', label: 'LINKEDIN', value: 'linkedin.com/in/liqiang', href: 'https://linkedin.com/in/liqiang' },
      { id: uid(), icon: '▸', label: 'WECHAT', value: 'liqiang_dev' },
    ],
  )

  // --- Auto-save to localStorage ---
  watch(
    [personal, stats, aboutCards, basic, about, experiences, projects, skillGroups, contacts],
    () => {
      saveToStorage({
        personal: personal.value,
        stats: stats.value,
        aboutCards: aboutCards.value,
        basic: basic.value,
        about: about.value,
        experiences: experiences.value,
        projects: projects.value,
        skillGroups: skillGroups.value,
        contacts: contacts.value,
      })
    },
    { deep: true },
  )

  // --- Actions ---
  function addExperience() {
    experiences.value.push({
      id: uid(),
      company: '新公司',
      position: '职位',
      period: '20XX - 至今',
      description: '<p>工作描述</p>',
      achievements: '<ul><li>成就 1</li></ul>',
      techStack: ['技术栈'],
    })
  }

  function removeExperience(id: string) {
    experiences.value = experiences.value.filter((e) => e.id !== id)
  }

  function moveExperience(id: string, dir: -1 | 1) {
    const idx = experiences.value.findIndex((e) => e.id === id)
    const target = idx + dir
    if (target < 0 || target >= experiences.value.length) return
    const arr = [...experiences.value]
    ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
    experiences.value = arr
  }

  function addProject() {
    projects.value.push({
      id: uid(),
      name: '新项目',
      type: 'Project',
      period: '20XX - 至今',
      role: '角色',
      intro: '<p>项目简介</p>',
      techStack: '技术栈',
      responsibilities: '<ul><li>职责 1</li></ul>',
      challenges: [],
      achievements: '<ul><li>成果 1</li></ul>',
      tags: [],
    })
  }

  function removeProject(id: string) {
    projects.value = projects.value.filter((p) => p.id !== id)
  }

  function moveProject(id: string, dir: -1 | 1) {
    const idx = projects.value.findIndex((p) => p.id === id)
    const target = idx + dir
    if (target < 0 || target >= projects.value.length) return
    const arr = [...projects.value]
    ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
    projects.value = arr
  }

  function addSkillGroup() {
    skillGroups.value.push({
      id: uid(),
      title: '新分组',
      skills: [{ name: '技能名', level: 80 }],
    })
  }

  function removeSkillGroup(id: string) {
    skillGroups.value = skillGroups.value.filter((g) => g.id !== id)
  }

  function addAbout() {
    about.value.push({ id: uid(), content: '<p>新增个人简介段落</p>' })
  }

  function removeAbout(id: string) {
    about.value = about.value.filter((a) => a.id !== id)
  }

  return {
    personal,
    stats,
    aboutCards,
    basic,
    about,
    experiences,
    projects,
    skillGroups,
    contacts,
    addExperience,
    removeExperience,
    moveExperience,
    addProject,
    removeProject,
    moveProject,
    addSkillGroup,
    removeSkillGroup,
    addAbout,
    removeAbout,
  }
})
