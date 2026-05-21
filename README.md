# 个人网站

这是一个使用 Vue 3 + Vite + TypeScript + Tailwind CSS 构建的个人网站项目。

## 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **编程语言**: TypeScript
- **样式**: Tailwind CSS
- **路由**: Vue Router
- **图标**: Tabler Icons

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

然后在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 生产构建

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览构建结果

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 项目结构

```
src/
├── components/        # Vue 组件
│   ├── Navbar.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── SkillsSection.vue
│   ├── ProjectsSection.vue
│   ├── ContentSection.vue
│   ├── ContactSection.vue
│   ├── Footer.vue
│   └── ui/           # UI 组件库
├── views/            # 页面视图
│   └── Home.vue
├── router/           # 路由配置
│   └── index.ts
├── data/             # 数据配置
│   ├── personal.ts
│   └── categories.ts
├── lib/              # 工具函数
│   └── utils.ts
├── app/              # 全局样式
│   └── globals.css
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

## 主要功能

- 🎨 现代化设计，深色主题
- 📱 响应式布局
- 🚀 快速加载和动画效果
- 📝 项目展示
- 📄 文章和视频动态
- 📧 联系方式

## 使用说明

### 修改个人信息

编辑 `src/data/personal.ts` 文件来自定义你的个人信息、项目、文章等内容。

### 修改项目分类

编辑 `src/data/categories.ts` 文件来自定义项目和文章的分类。

### 自定义样式

项目使用 Tailwind CSS，你可以在 `src/app/globals.css` 中添加自定义样式，或直接在组件中使用 Tailwind 的 class。

## 部署

项目可以部署到任何支持静态网站的平台：

- Vercel (推荐)
- Netlify
- GitHub Pages
- 自有服务器

## 许可证

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
