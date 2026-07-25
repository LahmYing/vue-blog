# Lahm's Blog

<div align="center">

一个基于 Vue 3 + Vite 的个人博客项目，从 Hexo 博客迁移而来。

[![Vue 3](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[在线演示](#-在线演示) · [快速开始](#-快速开始) · [功能特性](#-功能特性) · [常见问题](#-常见问题)

</div>

---

## 📖 目录

- [项目简介](#-项目简介)
- [功能特性](#-功能特性)
- [项目截图](#-项目截图)
- [在线演示](#-在线演示)
- [技术选型](#-技术选型)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [开发说明](#-开发说明)
- [常见问题](#-常见问题)
- [更新日志](#-更新日志)
- [相关资源](#-相关资源)
- [许可证](#-许可证)

---

## 🎯 项目简介

Lahm's Blog 是一个现代化的个人博客系统，采用 Vue 3 + Vite 构建，具有以下特点：

- **轻量高效**：基于 Vite 构建，开发体验极佳，构建速度快
- **响应式设计**：完美适配桌面端和移动端
- **暗黑主题**：支持明暗主题切换，保护视力
- **Markdown 支持**：原生支持 Markdown 写作，语法高亮
- **从 Hexo 迁移**：保留原有博客内容，无缝迁移

---

## ✨ 功能特性

### 核心功能
- 📝 **文章管理**：文章列表展示、文章详情页、文章归档
- 🏷️ **标签分类**：按标签筛选文章，快速查找内容
- 🌓 **主题切换**：支持明暗主题切换，自动保存用户偏好
- 📱 **响应式布局**：自适应各种屏幕尺寸
- 🔍 **搜索功能**：快速搜索文章标题和内容

### 用户体验
- ⚡ **快速加载**：基于 Vite 的优化构建，首屏加载快
- 🎨 **简洁设计**：极简主义设计风格，专注内容阅读
- ♿ **无障碍**：遵循 Web 无障碍标准

---

## 📸 项目截图

### 首页
![首页截图](public/assets/images/screenshot-home.png)

### 文章详情页
![文章详情页](public/assets/images/screenshot-post.png)

### 暗黑主题
![暗黑主题](public/assets/images/screenshot-dark.png)

> 注：截图待补充

---

## 🚀 在线演示

- **演示地址**：[https://your-demo-url.com](https://your-demo-url.com)
- **备用地址**：[https://your-backup-url.com](https://your-backup-url.com)

> 注：演示链接待补充

---

## 🛠 技术选型

### 前端框架
- **Vue 3**：采用 Composition API，代码更简洁，逻辑复用性更强
- **Vue Router 4**：官方路由管理器，支持路由懒加载
- **Vite 6**：下一代前端构建工具，开发服务器启动快，HMR 瞬间响应

### 核心依赖
- **markdown-it**：功能强大的 Markdown 解析器，支持 CommonMark 标准
- **TypeScript**：类型安全，减少运行时错误
- **ESLint**：代码规范检查，保持代码质量

### 开发工具
- **Vite Plugin ESLint**：开发时实时检查代码规范
- **@vitejs/plugin-vue**：官方 Vue 3 插件，支持 JSX

### 选型理由
1. **Vue 3 vs React**：Vue 3 的 Composition API 更适合中小型项目，学习曲线平缓
2. **Vite vs Webpack**：Vite 开发体验更好，构建速度提升明显
3. **markdown-it vs marked**：markdown-it 功能更强大，插件生态丰富
4. **TypeScript**：提升代码可维护性，减少 bug

---

## 🚀 快速开始

### 环境要求

- **Node.js**: v24.13.1 或更高版本
- **npm**: 11.8.0 或更高版本

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/your-username/vue-blog.git
cd vue-blog
```

2. **安装依赖**

```bash
npm install
```

3. **运行开发服务器**

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看项目

4. **构建生产版本**

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

5. **预览生产构建**

```bash
npm run preview
```

### 配置说明

本项目无需环境变量配置，所有配置均在代码中硬编码。如需自定义配置，可修改以下文件：

- `vite.config.js`：Vite 构建配置
- `src/main.js`：应用入口配置

---

## 📁 项目结构

```
vue-blog/
├── public/                    # 静态资源
│   └── assets/                # 图片等资源
│       └── images/            # 图片文件
├── src/                       # 源代码
│   ├── data/                  # 数据文件
│   │   └── posts/             # Markdown 文章文件
│   ├── services/              # 服务层
│   │   └── postService.js     # 文章数据服务
│   ├── styles/                # 样式文件
│   │   └── global.css         # 全局样式（含暗黑主题）
│   ├── utils/                 # 工具函数
│   │   └── markdown.js        # Markdown 解析工具
│   ├── views/                 # 页面组件
│   │   ├── Home.vue           # 首页
│   │   ├── Post.vue           # 文章详情页
│   │   └── Archive.vue        # 归档页
│   ├── components/            # 公共组件
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── .eslintrc.js              # ESLint 配置
├── .gitignore                # Git 忽略文件
├── .npmrc                    # npm 配置
├── eslint.config.js          # ESLint 平铺配置
├── index.html                # HTML 模板
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Node TypeScript 配置
├── vite.config.js            # Vite 配置
└── README.md                 # 项目说明
```

---

## 💻 开发说明

### 文章管理

- **文章存放位置**：`src/data/posts/` 目录
- **文章格式**：Markdown 文件（`.md`）
- **文件命名**：建议使用 `YYYY-MM-DD-title.md` 格式
- **图片资源**：存放于 `public/assets/images/` 目录

### 样式定制

- **全局样式**：`src/styles/global.css`
- **暗黑主题**：在 `global.css` 中通过 CSS 变量实现
- **组件样式**：使用 scoped CSS 或 CSS Modules

### 代码规范

- **ESLint**：项目配置了 ESLint，开发时会自动检查
- **自动修复**：保存时自动修复可修复的问题
- **TypeScript**：推荐使用 TypeScript 编写新代码

### 添加新文章

1. 在 `src/data/posts/` 创建新的 Markdown 文件
2. 使用标准 Markdown 语法编写内容
3. 在文章头部添加元数据（标题、日期、标签等）
4. 图片使用相对路径引用

---

## ❓ 常见问题

### 1. 安装依赖时报错

**问题**：`npm install` 时出现网络错误或依赖安装失败

**解决方案**：
- 检查网络连接
- 尝试使用淘宝镜像：`npm config set registry https://registry.npmmirror.com`
- 清除缓存：`npm cache clean --force`

### 2. 开发服务器启动失败

**问题**：`npm run dev` 启动失败，提示端口被占用

**解决方案**：
- 检查 5173 端口是否被占用
- 修改 `vite.config.js` 中的端口配置
- 或手动终止占用端口的进程

### 3. 构建后样式丢失

**问题**：`npm run build` 后样式不生效

**解决方案**：
- 检查样式文件路径是否正确
- 确认样式文件是否被正确引入
- 检查构建产物中的 CSS 文件

### 4. Markdown 渲染异常

**问题**：文章内容显示异常，Markdown 未正确解析

**解决方案**：
- 检查 Markdown 语法是否正确
- 确认 markdown-it 配置是否正确
- 查看浏览器控制台错误信息

### 5. 暗黑主题不生效

**问题**：切换主题后样式未变化

**解决方案**：
- 检查浏览器是否支持 CSS 变量
- 确认 `global.css` 中的主题变量定义
- 检查 localStorage 是否正常工作

### 6. 图片无法显示

**问题**：文章中的图片无法加载

**解决方案**：
- 确认图片路径是否正确（相对于 `public/` 目录）
- 检查图片文件是否存在
- 确认图片格式是否支持

### 7. 路由跳转失败

**问题**：点击文章链接后页面未跳转

**解决方案**：
- 检查 Vue Router 配置是否正确
- 确认路由路径是否匹配
- 查看浏览器控制台错误信息

### 8. TypeScript 类型错误

**问题**：开发时出现 TypeScript 类型错误

**解决方案**：
- 检查 `tsconfig.json` 配置
- 确认类型定义是否正确
- 使用 `// @ts-ignore` 临时忽略（不推荐）

---

## 📝 更新日志

### v0.0.0 (2026-07-20)

**初始版本**
- 从 Hexo 博客迁移到 Vue 3 + Vite
- 实现文章列表、详情页、归档功能
- 支持标签分类
- 实现暗黑主题切换
- 响应式布局适配

---

## 🔗 相关资源

### 官方文档
- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue Router 官方文档](https://router.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

### 工具库
- [markdown-it 文档](https://github.com/markdown-it/markdown-it)
- [ESLint 文档](https://eslint.org/)

### 学习资源
- [Vue 3 教程](https://vuejs.org/tutorial/)
- [Vite 指南](https://vitejs.dev/guide/)
- [Composition API 手册](https://vuejs.org/api/composition-api-setup.html)

---

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️**

Made with ❤️ by Lahm

</div>
