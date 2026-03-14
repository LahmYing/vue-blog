# 暗黑模式样式修复计划

## 问题描述
在暗黑模式下：
1. 归档页面（Archive）的背景颜色不正确
2. 标签页面（Tag）的背景颜色不正确

## 根因分析
在 `global.css` 中，`.tag-content` 和 `.archive-content` 容器没有定义暗黑模式下的背景颜色样式。

## 修复步骤

### 步骤 1: 添加暗黑模式样式
在 `src/styles/global.css` 中添加以下暗黑模式样式：

```css
/* 暗黑模式下的 tag-content 和 archive-content 背景色 */
.app.dark-mode .tag-content {
  background-color: #2d2d2d !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  color: #e0e0e0 !important;
}

.app.dark-mode .archive-content {
  background-color: #2d2d2d !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  color: #e0e0e0 !important;
}
```

### 步骤 2: 添加其他暗黑模式细节样式
确保归档和标签页面的其他元素在暗黑模式下也有正确的样式：
- 标题颜色
- 边框颜色
- 链接颜色
- 列表项颜色

### 步骤 3: 验证修复
- 启动开发服务器
- 切换到暗黑模式
- 访问归档页和标签页
- 检查背景色是否正确显示
