# 代码提交计划

## 当前状态
- 分支: master
- 有 13 个文件被修改，1 个新文件

## 待提交的文件变更

### 新增文件
- `eslint.config.js` - ESLint 10 flat config 配置

### 修改的文件
1. `src/App.vue` - 移除未使用的 postId 变量
2. `src/main.ts` - 样式导入修改
3. `src/router/index.ts` - 路由配置
4. `src/services/postService.ts` - 移除未使用的 generatePostId 导入
5. `src/styles/global.css` - 添加暗黑模式下归档页和标签页的样式
6. `src/types/global.d.ts` - markdown-it 类型声明
7. `src/utils/mdParser.ts` - 修复正则表达式转义字符
8. `src/views/About.vue` - 样式调整
9. `src/views/Archive.vue` - 样式调整
10. `src/views/Home.vue` - 移除未使用的 changePage 变量（警告）
11. `src/views/Post.vue` - 移除未使用的 postId 变量
12. `src/views/Tag.vue` - 样式调整

## 提交步骤

### 步骤 1: 添加所有更改
使用 `git add .` 添加所有更改

### 步骤 2: 提交更改
使用有意义的 commit message 描述本次更改

### 步骤 3: 推送到远程
使用 `git push` 推送到远程仓库

## 建议的 commit message
```
fix: 优化 ESLint 配置并修复暗黑模式样式问题

- 迁移到 ESLint 10 flat config 格式
- 修复正则表达式不必要的转义字符
- 移除未使用的变量和导入
- 添加暗黑模式下归档页和标签页的背景色样式
```
