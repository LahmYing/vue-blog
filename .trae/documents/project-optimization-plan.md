# Vue Blog 项目优化计划

## 当前问题分析

根据之前的 ESLint 检查结果，项目存在以下问题：

### 1. ESLint 配置问题
- eslint.config.js 中使用了 `process.env.NODE_ENV` 导致 `no-undef` 错误
- 需要正确配置 Node.js 全局变量

### 2. 代码质量问题
- src/services/postService.ts: `generatePostId` 函数定义但未使用
- src/types/global.d.ts: 存在未使用的变量和 any 类型警告
- src/utils/mdParser.ts: 正则表达式中存在不必要的转义字符
- src/views/Post.vue: `postId` 变量赋值但未使用

### 3. 构建输出问题
- dist 目录中的文件不应被 ESLint 检查（已排除）

## 优化步骤

### 步骤 1: 修复 ESLint 配置
- 移除 `process.env.NODE_ENV` 的使用，改为硬编码值
- 确保配置简洁且符合 ESLint 10 的 flat config 规范
- 正确配置浏览器环境全局变量（如 console、localStorage 等）

### 步骤 2: 修复代码中的 ESLint 错误
- 修复 src/utils/mdParser.ts 中的正则表达式转义字符问题
- 移除或注释掉未使用的变量和函数

### 步骤 3: 优化 TypeScript 类型定义
- 清理 src/types/global.d.ts 中未使用的类型定义
- 确保类型定义准确且有用

### 步骤 4: 清理未使用的代码
- 移除或注释掉 postService.ts 中未使用的 `generatePostId` 函数
- 清理 Post.vue 中未使用的 `postId` 变量

### 步骤 5: 配置保存时自动修复
- 确保 VS Code 配置保存时自动运行 ESLint 修复

### 步骤 6: 验证优化结果
- 运行 ESLint 检查确认所有错误已修复
- 确保项目能正常构建和运行

## 预期结果

1. ESLint 检查无错误（允许少量不影响功能的警告）
2. 代码质量提升，无未使用的变量和函数
3. TypeScript 类型定义清晰准确
4. 保存时自动格式化代码
5. 项目构建和运行正常
