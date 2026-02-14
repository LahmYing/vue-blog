<template>
  <div class="about">
    <h1>关于我</h1>
    <div class="about-content">
      <div class="about-text">
        <p>你好，我是 Lahm，一名前端开发者，热爱技术分享。</p>
        <p>这个博客是我记录学习心得、技术笔记和生活感悟的地方。</p>
        <p>我主要关注前端技术，包括 Vue、React、TypeScript、Webpack 等，同时也对后端技术和全栈开发有一定的兴趣。</p>
        <p>如果你有任何问题或建议，欢迎通过以下方式联系我：</p>
        <ul class="contact-list">
          <li><a href="https://github.com/LahmYing" target="_blank">GitHub</a></li>
          <li><a href="mailto:your.email@example.com">Email</a></li>
        </ul>
      </div>
      <div class="about-sidebar">
        <div class="sidebar-item">
          <h3>技术栈</h3>
          <ul class="tech-stack">
            <li>Vue 3</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>HTML5/CSS3</li>
            <li>Webpack/Vite</li>
            <li>Node.js</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 20px 0;
}

.about h1 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.about-content {
  display: flex;
  gap: 40px;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.about-text {
  flex: 1;
  line-height: 1.8;
  color: #555;
}

.about-text p {
  margin-bottom: 20px;
}

.contact-list {
  list-style: none;
  margin-top: 30px;
}

.contact-list li {
  margin-bottom: 10px;
}

.contact-list a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-list a:hover {
  color: #0069d9;
  text-decoration: underline;
}

.about-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-item {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.sidebar-item h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.tech-stack {
  list-style: none;
}

.tech-stack li {
  margin-bottom: 10px;
  color: #666;
  display: flex;
  align-items: center;
}

.tech-stack li::before {
  content: "•";
  color: #007bff;
  font-weight: bold;
  margin-right: 10px;
}

@media (max-width: 992px) {
  .about-content {
    flex-direction: column;
  }
  
  .about-sidebar {
    width: 100%;
  }
}
</style>