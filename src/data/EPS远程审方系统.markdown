# EPS 远程审方系统 — 前端面试准备文档
## 一、项目介绍
### 一句话版本
> 老百姓大药房远程审方系统前端负责人，带 5 人团队将 Thymeleaf + Layui 服务端渲染架构迁移为 Vue 2 SPA，覆盖全国 4 省门店的处方审核、视频问诊、调配发药全流程，日均处理数千张处方。
>

### 详细版本
| 维度 | 说明 |
| --- | --- |
| 项目名称 | EPS 远程审方系统（前端重构） |
| 业务背景 | 连锁药房合规要求：处方药销售必须经执业药师审核。老系统基于 Thymeleaf + Layui 服务端渲染，维护成本高、用户体验差 |
| 团队规模 | 6 人（1 前端负责人 + 5 前端开发） |
| 我的角色 | 整体项目负责人：架构设计、核心模块实现、Code Review、13 份模块设计文档 |
| 技术栈 | Vue 2.7 + Element UI 2.15 + Vuex 3 + Vue Router 3 + TRTC 视频 + SCSS |
| 部署方式 | 腾讯 COS CDN + Hash 路由，4 套环境（dev/test/uat/prod） |
| 兼容要求 | IE 10+（门店老电脑）+ 现代浏览器（药师端） |


### 核心模块一览
| 模块 | 路由 | 说明 |
| --- | --- | --- |
| 审方管理 | `/review-prescription` | 药师端审核 + 店员端创建，含远程/线下/视频三种模式 |
| 远程视频咨询 | `/remote-consultation` | 基于腾讯 TRTC 的实时视频问诊 |
| 处方药登记 | `/enrolment` | 处方药销售登记 + 现场审方登记 |
| 远程调配 | `/remote-prescription` | 药师端调配 + 门店端确认 |
| 基础数据 | `/basic-data` | 单据人员、指纹、药师资质、消息管理 |
| 系统管理 | `/system` | 全局参数、药师管理、手动审方 |
| 权限体系 | 全局 | CAS SSO + URL 权限标识 + 按钮级控制 |


---

## 二、核心模块拆解
### 2.1 审方管理
#### 2.1.1 业务流程
```plain
店员端创建处方
    │
    ▼
待审队列（5秒轮询拉取）
    │
    ├── 远程视频审方 ──→ 药师视频审核 ──→ 通过/驳回
    ├── 远程线下审方 ──→ 药师直接审核 ──→ 通过/驳回
    └── 现场审方     ──→ 门店药师审核 ──→ 通过/驳回
                                │
                                ▼
                        ┌───────┴───────┐
                        ▼               ▼
                    已驳回          待调配
                                    │
                                    ▼
                            指定调配人 + 复核人
                                    │
                                    ▼
                                待确认
                                    │
                                    ▼
                                已完成
```

**状态机：**

| 状态码 | 含义 | 下一步 |
| --- | --- | --- |
| 1 | 待审方 | 审核通过→2，驳回→5 |
| 2 | 待调配 | 指定人员→3 |
| 3 | 待确认 | 确认→4 |
| 4 | 已完成 | 终态 |
| 5 | 已驳回 | 终态 |


#### 2.1.2 双端页面结构
| 维度 | 药师端（druggist） | 店员端（clerk） |
| --- | --- | --- |
| 入口文件 | `views/review-prescription/druggist/Index.vue`（486行） | `views/review-prescription/clerk/Index.vue`（746行） |
| 详情弹窗 | `ReviewDetailDialog.vue`（555行） | `ClerkDetailDialog.vue`（512行） |
| 调配弹窗 | `AdjustmentReviewDialog.vue`（332行） | 无 |
| 轮询接口 | `getListByPage`（menuScene: `'PHARMACIST'`） | `getClerkListByPage`（menuScene: `'STORE'`） |
| 默认日期 | 当天 | 昨天 ~ 今天 |
| 审核后行为 | 自动打开下一条同状态处方 | 仅刷新列表 |
| 视频通话 | 被叫端（接听） | 主叫端（发起） |


#### 2.1.3 核心技术点
**（a）5 秒轮询 + Page Visibility**

```javascript
// druggist/Index.vue:250
startAutoRefresh() {
  this.pollingTimer = setInterval(() => { this.loadList() }, 5000)
}

// druggist/Index.vue:268
handleVisibilityChange() {
  if (document.hidden) { this.stopAutoRefresh() }
  else { this.startAutoRefresh() }
}
```

+ 为什么用轮询：审方列表需要"准实时"展示队列变化，但不需要毫秒级延迟；轮询实现简单、IE 兼容好
+ 为什么是 5 秒：处方从创建到进入队列有业务延迟，5 秒是体验和服务器压力的平衡点
+ Page Visibility：标签页切走时停止轮询，避免后台标签页浪费带宽和服务端资源

**（b）策略模式处理行操作**

```javascript
// druggist/Index.vue:361
const actionMap = {
  review: () => this.openReviewDialog('examine', row),
  dispatch: () => this.openReviewDialog('dispatch', row),
  confirm: () => this.openReviewDialog('again', row),
  adjustment: () => this.openAdjustmentDialog(row, 'dispatch'),
  adjustmentConfirm: () => this.openAdjustmentDialog(row, 'confirm'),
  print: () => this.handlePrint(row),
  video: () => this.handlePlayVideo(row),
}
actionMap[key]?.()
```

+ 每行有 3~7 个操作按钮，按钮组合取决于状态 + 角色 + 组织层级
+ 策略模式消除嵌套 if-else，新增操作只需加一行映射

**（c）数据驱动的页面配置**

搜索字段、表格列、行操作逻辑抽到独立 `index.js`：

```javascript
// druggist/index.js
export const searchFields = [
  { key: 'search', label: '患者姓名', type: 'input' },
  { key: 'orderNo', label: '处方号', type: 'input' },
  { key: 'medInsureType', label: '医保类型', type: 'select', options: MED_INSURE_OPTIONS },
  { key: 'dateRange', label: '创建时间', type: 'daterange' },
]

export const columns = [
  { prop: 'orderNo', label: '处方号', width: 180 },
  { prop: 'patientName', label: '患者姓名', width: 100 },
  // ...
]

export function getRowActions(row, { provinceDruggist, storeDruggist, currentBizOrg }) {
  // 100+ 行条件逻辑，决定每行显示哪些按钮
}
```

**（d）调配复核的数据驱动设计**

```javascript
// AdjustmentReviewDialog.vue:101
const ROLES = [
  { key: 'dispenser', label: '调配人', apiField: 'dispenser' },
  { key: 'checker', label: '复核人', apiField: 'checker' },
]
```

ROLES 数组驱动：表单字段生成、校验规则、模板渲染、数据组装。复核模式下"调配人"和"复核人"合并为一个 `checkerDeliver` 字段（UX 简化），提交时拆分为两个 API 字段。

#### 2.1.4 组件通信方式
| 通信方式 | 场景 | 代码位置 |
| --- | --- | --- |
| `$refs` 调子组件方法 | 打开对话框 `this.$refs.reviewDialog.open(mode, row)` | Index.vue:383 |
| `$emit('success')` | 子组件审核完成通知父组件刷新列表 | ReviewDetailDialog.vue:329 |
| `$parent` 调父组件方法 | ReviewDetailDialog 调父组件的 `openAdjustmentDialog` | ReviewDetailDialog.vue:342 |
| `$refs` 调子组件内部方法 | 父组件调 `reviewDetailDialog.handleClose()` | Index.vue:418 |


> **技术债：** `$parent` 耦合是已知问题，正确做法是 `$emit` 事件到父组件由父组件协调。
>

---

### 2.2 远程视频咨询
#### 2.2.1 业务流程
```plain
店员端发起视频审方
    │
    ▼
检查浏览器能力（isVideoCallSupported）
    │
    ├── 不支持 → 提示"请使用 Chrome/Edge"
    │
    ▼
检查 TRTC 是否已初始化（isTrtcInitialized）
    │
    ├── 未初始化 → initTrtc()
    │
    ▼
打开 PharmacistListDialog 选择在线药师
    │
    ▼
前端生成 roomId（1 ~ 2^31-1 随机整数）
    │
    ▼
makeVideoCall({ targetUserId, roomId, bizData })
    │
    ▼
TRTC SDK 发起视频呼叫
    │
    ╔═══════════════════════════════════════════════════╗
    ║  药师端（被叫）                                    ║
    ║  ON_CALL_RECEIVED → 解析 userData                  ║
    ║  用户接听 → ON_CALL_BEGIN                           ║
    ║  → videoRecordInit() 初始化视频记录                  ║
    ║  → updateOnlineStatus(BUSY) 标记忙碌                ║
    ║  → 自动跳转 /review/clerk                          ║
    ║  → 监听 store 打开对应处方详情                       ║
    ╠═══════════════════════════════════════════════════╣
    ║  通话结束 → ON_CALL_END                             ║
    ║  → updateOnlineStatus(ONLINE) 恢复在线              ║
    ║  → 清空 currentCallBizData                         ║
    ╚═══════════════════════════════════════════════════╝
```

#### 2.2.2 核心技术点
**（a）SDK 懒加载——防止 IE 崩溃**

```javascript
// utils/trtc.js:40
async function loadSdk() {
  if (uikit && engineLite) return { uikit, engineLite }
  const [uikitMod, engineMod] = await Promise.all([
    import('@trtc/calls-uikit-vue2'),
    import('@trtc/call-engine-lite-js'),
  ])
  uikit = uikitMod
  engineLite = engineMod
  return { uikit, engineLite }
}
```

TRTC SDK 内部引用 `AudioContext`、`RTCPeerConnection` 等 WebRTC API，IE 环境下直接 import 会在模块解析阶段就报错。动态 `import()` 是运行时按需加载，配合 `isVideoCallSupported()` 前置检测，确保 SDK 永远不会在 IE 中被加载。

**（b）幂等初始化 + 单例模式**

```javascript
// utils/trtc.js:116
export async function initTrtc(userInfo) {
  if (!isVideoCallSupported()) return false
  if (initialized) return true        // 已初始化，直接返回
  if (initializing) return initializing // 正在初始化，共享同一个 Promise
  initializing = (async () => { ... })()
  return initializing
}
```

用户登录后可能多处调用 `initTrtc`（路由守卫、组件 mounted），`initializing` 保存正在进行的 Promise，后续调用直接 await 同一个 Promise，保证只初始化一次。

**（c）被叫端自动导航 + store 桥接**

```javascript
// utils/trtc.js:102 — 通话接通后
if (isCallee && prescriptionId) {
  store.commit('business/SET_TRTC_PRESCRIPTION_ID', String(prescriptionId).trim())
  const target = '/review/clerk'
  router.currentRoute.path !== target && router.push({ path: target })
}

// clerk/Index.vue:286 — 监听 store 变化
watch: {
  trtcPrescriptionId: {
    immediate: true,
    handler(val) { if (val) this.autoOpenDetailsById() }
  }
}

// clerk/Index.vue:602 — 两次 $nextTick 防御
async autoOpenDetailsById() {
  await this.$nextTick()
  if (!this.$refs.clerkDetailDialog) {
    await this.$nextTick()
  }
  this.$refs.clerkDetailDialog.open('review', { id: prescriptionId })
  this.$store.commit('business/RESET_TRTC_PRESCRIPTION_ID')
}
```

TRTC 回调和 Vue 渲染是两个异步队列，store 值到了但 `$refs` 可能还没挂载。两次 `$nextTick` 是防御性编程。

**（d）浏览器能力检测**

```javascript
// utils/browser.js
export function isIE() {
  const ua = window.navigator.userAgent || ''
  return /MSIE |Trident\//.test(ua)
}

export function isWebRTCSupported() {
  const RTCPC = window.RTCPeerConnection
    || window.webkitRTCPeerConnection
    || window.mozRTCPeerConnection
  const hasGetUserMedia = !!(
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia
  )
  return !!RTCPC && hasGetUserMedia
}

export function isVideoCallSupported() {
  return !isIE() && isWebRTCSupported()
}
```

#### 2.2.3 三层防线架构
| 层级 | 位置 | 作用 |
| --- | --- | --- |
| 第一层 | `isVideoCallSupported()` | 组合检测 IE + WebRTC，不支持则整个功能隐藏 |
| 第二层 | `import()` 动态加载 | SDK 内部引用 WebRTC API，IE 中不加载就不会报错 |
| 第三层 | `v-if="supported"` | `VideoCall` 组件条件渲染，IE 中不挂载 |


---

### 2.3 权限体系
#### 2.3.1 认证流程
```plain
用户访问页面
    │
    ▼
router.beforeEach
    │
    ├── 有 token
    │       ├── permission.loaded === true → 直接放行
    │       └── permission.loaded === false → loadUserAndPermissions() → 放行
    │
    ├── 无 token + 有 ticket（CAS 刚回来）
    │       ├── createTokenByTicket() → 换取 token
    │       ├── loadUserAndPermissions() → 加载权限
    │       ├── cleanTicketFromUrl() → 手动清除 URL 中的 ticket
    │       └── next(savedPath) → 跳回用户原目标
    │
    └── 无 token + 无 ticket
            ├── 记录目标路径到 sessionStorage
            └── redirectToCasLogin() → 跳转 CAS 登录页
```

**loadUserAndPermissions（3 次串行请求）：**

```plain
① findUserInfo       → commit('user/SET_USER_INFO')
② getUserBizOrg      → dispatch('user/setBizOrgList')
③ findResourceByUserId → parseResourceByType → commit permission store
```

#### 2.3.2 权限数据结构
```javascript
// store/modules/permission.js
const state = {
  menuUrls: [],           // type=0 菜单资源 URL 列表
  buttonSet: new Set(),   // type=1 按钮资源 URL 集合（O(1) 查找）
  resourceList: [],       // 原始资源列表（便于扩展）
  loaded: false,          // 是否已完成全局权限初始化
  noPermission: false,    // 当前页面是否无权限
  pageLoading: false,     // 路由切换加载遮罩
}
```

#### 2.3.3 URL 作为权限标识
```javascript
// utils/resourcePermission.js:61
export function parseResourceByType(resource) {
  const menuSet = new Set()
  const buttonSet = new Set()
  for (const item of resource) {
    const url = normalizePermissionPath(String(item.url).trim())
    if (Number(item.type) === 0) menuSet.add(url)
    else if (Number(item.type) === 1) buttonSet.add(url)
  }
  return { menuUrls: [...menuSet], buttonSet, rawList: resource }
}
```

+ 为什么用 URL 而不是数字 ID：后端权限中台以 URL 为粒度管理资源，前端直接复用；URL 有语义性，调试方便
+ 为什么 `buttonSet` 用 Set：页面渲染时每个按钮都调 `hasPermission`，Set 的 O(1) 查找比 Array 的 O(n) 快
+ 为什么 `menuUrls` 用 Array：只在路由守卫和侧栏渲染时查询一次，Array 足够

#### 2.3.4 路径归一化
```javascript
// utils/resourcePermission.js:14
export function normalizePermissionPath(path) {
  if (path == null || path === '') return '/'
  let p = String(path).trim()
  if (!p.startsWith('/')) p = `/${p}`
  return p.replace(/\/+/g, '/')
}
```

后端返回的 URL 格式不一致（有的带前导 `/`，有的不带），不归一化会导致同一资源被判为不同。

#### 2.3.5 永不 resolve 的 Promise
```javascript
// api/request.js:90
if (String(res.code) === '11000') {
  store.commit('permission/SET_NO_PERMISSION', res.msg || '')
  return new Promise(() => {})  // 永不 resolve
}
```

+ 为什么不用 `Promise.reject()`：reject 需要每个 `await` 调用都写 catch，否则是 unhandled rejection
+ 永不 resolve：`await` 永远等待，后续业务逻辑全部"冻结"，配合 NoPermission 组件统一展示
+ 效果：一处拦截，所有 API 调用自动失效，业务代码零侵入

#### 2.3.6 多租户隔离
```javascript
// api/request.js:62
const currentBizOrg = store.getters.currentBizOrg
if (currentBizOrg) {
  if (currentBizOrg.bizId) config.headers['store-dept-id'] = currentBizOrg.bizId
  if (currentBizOrg.parentId) config.headers['province-dept-id'] = currentBizOrg.parentId
}
```

+ 为什么放在请求头：组织隔离是全局行为，所有 API 都需要；拦截器统一注入，业务代码零感知
+ 后端通过 header 做行级数据隔离，是多租户系统的标准做法

#### 2.3.7 CAS 重试保护
```javascript
// utils/permission.js:18
const MAX_CAS_RETRIES = 3

const redirectToCasLogin = () => {
  const retries = parseInt(sessionStorage.getItem(CAS_RETRY_KEY) || '0', 10)
  if (retries >= MAX_CAS_RETRIES) {
    sessionStorage.removeItem(CAS_RETRY_KEY)
    return  // 停止重定向，避免死循环
  }
  sessionStorage.setItem(CAS_RETRY_KEY, String(retries + 1))
  window.location.href = `${casUrl}/cas/login?service=${encodeURIComponent(getServiceUrl())}`
}
```

CAS 换票失败 → 跳 CAS → 带新 ticket 回来 → 再次失败 → 无限循环。用 `sessionStorage` 持久化计数，上限 3 次。

---

## 三、技术架构亮点
### 3.1 浏览器能力分级架构
| 问题 | 门店端电脑大量 IE10+，但视频审方需要 WebRTC |
| --- | --- |
| 方案 | 三层防线：`isVideoCallSupported()` 检测 → SDK 动态 `import()` 懒加载 → 组件 `v-if` 条件渲染 |
| 效果 | IE 用户看到纯文本操作界面，现代浏览器用户有完整视频功能；一套代码，两种体验 |


### 3.2 API 全局拦截机制
| 问题 | 后端 4 个团队返回的成功码格式不统一（`0` / `'0'` / `'200'` / `true`） |
| --- | --- |
| 方案 | `isSuccess()` 函数统一判断 4 种格式；`ignorErrorMsg` 配置项允许按接口关闭错误提示 |
| 效果 | 调用方不需要关心具体是哪种格式，统一 `await` 后直接使用 `res.data` |


### 3.3 无权限零侵入拦截
| 问题 | 无权限（code 11000）需要全局拦截，但不想每个页面都写权限判断 |
| --- | --- |
| 方案 | 响应拦截器返回 `new Promise(() => {})`，配合 `noPermission` 状态机 + NoPermission 组件 |
| 效果 | 一处拦截，所有 API 调用自动失效，业务代码零侵入 |


### 3.4 多租户请求头注入
| 问题 | 全国 4 省门店，所有 API 需要携带组织标识做数据隔离 |
| --- | --- |
| 方案 | axios 请求拦截器统一注入 `store-dept-id` 和 `province-dept-id` 到请求头 |
| 效果 | 业务代码零感知，组织切换时 store 变更自动生效 |


### 3.5 编译时 Feature Flag
| 问题 | V1 → V2 迁移需要增量发布，不能一次全量切换 |
| --- | --- |
| 方案 | `config/feature-flags.js` 定义编译时常量 `V2_REVIEW_ENABLED`，V2 组件用 `import()` 懒加载 |
| 效果 | flag 为 false 时，V2 代码被 tree-shake 移除，零运行时开销 |


### 3.6 数据驱动的页面配置
| 问题 | 每个业务页面的搜索字段、表格列、行操作逻辑重复度高 |
| --- | --- |
| 方案 | 配置外置到独立 `index.js`，组件只负责渲染；行操作用策略模式分发 |
| 效果 | 新增页面只需写配置 + 模板，业务逻辑复用率高；策略模式消除嵌套 if-else |


---

## 四、Bug 修复案例
### 4.1 DataTable 固定列遮挡横向滚动条
| 维度 | 内容 |
| --- | --- |
| **现象** | DataTable 有固定列时，底部横向滚动条被固定列区域遮挡，无法拖动 |
| **根因** | Element UI 的 `el-table__fixed` 默认 `height: 100%`，当固定列内容超出可视区域时，固定列区域覆盖了底部滚动条 |
| **修复** | CSS hack：`::v-deep .el-table__fixed { height: auto !important; bottom: 12px !important; }` |
| **收获** | UI 库内部结构导致的 bug 很难通过单元测试发现，需要视觉回归测试；Element UI 的固定列实现有已知局限 |


### 4.2 无权限页面闪烁
| 维度 | 内容 |
| --- | --- |
| **现象** | 用户无权限的页面会短暂显示内容，然后才被无权限提示覆盖 |
| **根因** | 路由守卫放行后组件渲染，API 返回 11000 之间有时间差（网络延迟） |
| **修复** | 引入 `pageLoading` 状态机——路由切换时立即设 true 渲染遮罩，第一个 API 响应后才关闭。`request.js` 响应拦截器中统一 `SET_PAGE_LOADING(false)` |
| **收获** | 前端状态机设计要考虑异步时序；遮罩层是解决"闪烁"问题的常用手段 |


### 4.3 Hash 模式下 CAS ticket 残留
| 维度 | 内容 |
| --- | --- |
| **现象** | CAS 登录成功后，每次路由切换都重新触发换票逻辑 |
| **根因** | CAS 回调 URL `http://host/?ticket=XXX#/path`，ticket 在 `#` 之前的 search 中；Vue Router Hash 模式只管理 `#` 后面部分，`next()` 不清除 `?ticket=XXX` |
| **修复** | `cleanTicketFromUrl()` 用 `window.history.replaceState` 手动删除 ticket 参数 |
| **收获** | Hash 模式下 `#` 前的 search 参数是 Vue Router 的盲区，需要手动管理 |


### 4.4 审方调配需拆为两步操作
| 维度 | 内容 |
| --- | --- |
| **现象** | 原设计"调配+复核"一步完成，实际业务需要先指定调配人，再单独确认复核 |
| **根因** | 业务需求理解不充分，设计阶段没有和药房运营对齐流程细节 |
| **修复** | 重构 `AdjustmentReviewDialog`：新增 `dispatch` 和 `confirm` 两种模式，数据驱动的 ROLES 配置支持模式切换；`confirm` 模式下"调配人"和"复核人"合并为 `checkerDeliver` 字段，提交时拆分 |
| **收获** | 医药业务流程比想象中复杂，设计阶段需要和业务方逐字确认；数据驱动设计让模式切换成本低 |


### 4.5 处方笺图片不自适应
| 维度 | 内容 |
| --- | --- |
| **现象** | 高分辨率处方笺图片在详情弹窗中溢出，需要横向滚动 |
| **根因** | 图片没有设置最大宽度约束 |
| **修复** | CSS：`max-width: 100%; object-fit: contain` |
| **收获** | 图片展示需要考虑原始尺寸和容器约束的关系；细节体验在医药场景中很重要（药师需要看清处方内容） |


---

## 五、面试 Q&A
### 5.1 项目概述
**Q1：简单介绍一下你在这个项目中做了什么？**

> 老百姓大药房远程审方系统前端负责人，带 5 人团队将 Thymeleaf + Layui 服务端渲染架构迁移为 Vue 2 SPA。核心业务是连锁药房的处方审核——门店店员录入处方，远程药师通过视频或线下方式审核。我负责整体架构设计、核心模块实现、CI/CD 流程、13 份设计文档。
>

**追问：为什么选 Vue 2 而不是 Vue 3？**

> 门店电脑大量 IE10+，Vue 3 的 Proxy 响应式不支持 IE。虽然有 `proxy-polyfill` 但限制多（不支持 `in`、`delete`），Element Plus 也明确不支持 IE。Vue 2.7 backport 了 Composition API，既能用新语法又不丢兼容性。
>

**追问：Hash 路由模式是为什么？**

> 前端部署在腾讯 COS 静态托管，没有服务端做 URL rewrite。Hash 模式下 `http://host/#/path` 不需要服务端配合，COS 直接返回 `index.html` 就行。History 模式需要 Nginx 或 CDN 配置 fallback，增加运维复杂度。
>

---

### 5.2 审方管理
**Q2：审方列表的实时性是怎么保证的？**

> 5 秒轮询 + Page Visibility API。轮询用 `setInterval`，`document.hidden` 时停止，切回来时恢复。不用 WebSocket 是因为列表刷新不需要毫秒级延迟，轮询实现简单且 IE 兼容好。
>

**追问：为什么是 5 秒不是 3 秒或 10 秒？**

> 处方从创建到进入队列有业务延迟（店员操作、系统校验），用户感知上 3 秒和 5 秒差别不大。10 秒会让药师感觉"卡"。5 秒是体验和服务器压力的平衡点。
>

**追问：轮询的错误怎么处理的？**

> 坦白说这里有改进空间。当前 `loadList` 在 catch 中 re-throw，但调用方是 `setInterval`，没有 catch 接住，变成 unhandled promise rejection。轮询场景应该 catch 后只 log 不 re-throw。
>

**Q3：行操作按钮的逻辑很复杂，怎么管理的？**

> 两个层面。一是配置外置——搜索字段、表格列、行操作逻辑都抽到独立 `index.js`，组件只负责渲染。二是策略模式——`handleRowAction` 用 `actionMap` 对象分发，消除嵌套 if-else。
>

**追问：**`getRowActions`** 的条件有多少？**

> 药师端约 50 行条件逻辑，店员端约 100 行。条件包括：处方状态（5 种）、用户角色（省级药师/门店药师）、组织层级（省级/门店）、是否支持远程审方、是否国平台处方（`medInsureType === 13` 时禁用远程/线下审核）。
>

---

### 5.3 视频通话
**Q4：TRTC SDK 在 IE 中怎么处理的？**

> 三层防线。`isVideoCallSupported()` 前置检测 IE + WebRTC；SDK 用动态 `import()` 懒加载，不在顶层 import（SDK 内部引用 `AudioContext`，IE 中直接 import 会报错）；`VideoCall` 组件 `v-if` 条件渲染。
>

**追问：被叫端接通后怎么自动跳到对应处方详情？**

> TRTC 的 `ON_CALL_BEGIN` 回调中把 `prescriptionId` commit 到 Vuex，然后 `router.push('/review/clerk')`。店员端页面 watcher 监听 `trtcPrescriptionId`，变化时打开详情。坑在于 TRTC 回调和 Vue 渲染是两个异步队列，做了两次 `$nextTick` 防御 `$refs` 未挂载。
>

**追问：UserSig 的安全性怎么保证？**

> UserSig 由后端签发，前端只存储和使用，不持有 SDKSecretKey。`config/trtc.js` 有注释明确标注"严禁前端持有 SDKSecretKey"。`fetchUserSig` 接口每次登录调用一次，过期时间 24 小时。
>

---

### 5.4 权限体系
**Q5：权限标识为什么用 URL 而不是角色码？**

> 后端权限中台以 URL 为粒度管理资源，前端直接复用，不需要维护一套角色→权限映射。URL 有语义性，`/review-prescription/druggist:export` 一看就知道是哪个页面的哪个按钮。
>

**追问：**`buttonSet`** 为什么用 Set 而不是 Array？**

> 按钮权限在页面渲染时频繁查询（每个按钮组件都调 `hasPermission`），Set 的 O(1) 查找比 Array 的 O(n) 快。菜单权限只在路由守卫和侧栏渲染时查询一次，Array 足够。
>

**Q6：11000 无权限码为什么返回永不 resolve 的 Promise？**

> 如果用 `Promise.reject()`，每个 `await` 调用都需要 catch，否则是 unhandled rejection。永不 resolve 意味着 `await` 永远等待，后续业务逻辑全部"冻结"。配合 `noPermission` 状态机在 UI 层统一展示，业务代码零侵入。
>

**追问：如果用户权限变更了怎么办？**

> 当前实现中权限数据在 `permission.loaded` 标记后只加载一次。如果用户权限变更，需要重新登录（CAS 登出再登入）才能刷新。这是一个设计权衡——权限变更频率低，每次都拉取权限数据会增加网络开销。
>

---

### 5.5 反思与改进
**Q7：如果让你重新做，你会改什么？**

> 三个改进。第一，审方管理药师端和店员端代码重复率约 70%（轮询、visibility、搜索、加载），现在我会抽 `usePrescriptionPolling` 组合函数。第二，两个 DetailDialog 模板和 CSS 重复率约 60%，应该抽共享基础组件。第三，V2 feature flag 的 `v-if` 运行时检查是冗余的，应该用 webpack DefinePlugin 在编译时完全移除死代码。
>

**追问：这些技术债你当时为什么没解决？**

> 优先级。业务验收是第一优先级，技术债我记录了但没有在第一版解决。药师端和店员端是我自己写的，当时意识到重复但排期不允许重构。后来引入了 `.cursor/rules` 中的"禁止 mixins"规则，但组合函数方案还没落地。
>

**Q8：你们团队的工程化规范是怎么建立的？**

> 三层。第一层 `.cursor/rules`——硬约束（CR 要求、代码风格、禁止 mixins）。第二层 `.cursor/skills`——8 份指导文档（API 规范、权限接入、公共组件、新页面指南等）。第三层 `AGENTS.md`——AI 协作契约（CodeAgent/ReviewAgent/TestAgent 角色定义）。13 份设计文档在编码前完成，先设计后编码。
>
