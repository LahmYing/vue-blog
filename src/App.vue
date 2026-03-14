<template>
  <div class="app" :class="{ 'dark-mode': isDarkMode }">
    <header class="header">
      <div class="container">
        <div class="logo">
          <router-link to="/">Lahm's Blog</router-link>
        </div>
        <div class="header-right">
          <nav class="nav">
            <router-link to="/">首页</router-link>
            <router-link to="/archive">归档</router-link>
          </nav>
          <button class="theme-toggle" @click="toggleTheme">
            {{ isDarkMode ? "☀️" : "🌙" }}
          </button>
        </div>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <p>
          © {{ new Date().getFullYear() }} Lahm's Blog. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 主题切换逻辑
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.darkMode = isDarkMode.value;
};

onMounted(() => {
  // 从本地存储中读取主题设置
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    isDarkMode.value = savedTheme === 'true';
  }
});
</script>

<style>
/* 导入全局样式 */
@import "./styles/global.css";
</style>
