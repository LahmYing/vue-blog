# Lahm's Blog

一个基于 Vue 3 + Vite 的个人博客项目，从 Hexo 博客迁移而来。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Markdown-it

## 版本信息

- Node.js: v24.13.1
- npm: 11.8.0

## 安装和运行

1. 克隆项目

```bash
git clone <repository-url>
cd vue-blog
```

2. 安装依赖

```bash
npm install
```

3. 运行开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
vue-blog/
├── public/           # 静态资源
│   └── assets/       # 图片等资源
├── src/              # 源代码
│   ├── data/         # Markdown 文章文件
│   ├── services/     # 服务文件
│   ├── styles/       # 样式文件
│   ├── utils/         # 工具函数
│   ├── views/         # 页面组件
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── index.html        # HTML 模板
├── package.json      # 项目配置
└── README.md         # 项目说明
```

## 功能说明

- 文章列表展示
- 文章详情页
- 文章归档
- 标签分类
- 暗黑主题切换
- 响应式布局

## 开发说明

- 文章使用 Markdown 格式编写，存放在 `src/data/posts/` 目录下
- 图片资源存放在 `public/assets/images/` 目录下
- 全局样式和暗黑主题样式定义在 `src/styles/global.css` 文件中

## 许可证

MIT
