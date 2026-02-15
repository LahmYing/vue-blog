<template>
  <div class="post">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="!post" class="error">文章不存在</div>
    <div v-else class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta">
        <span class="post-date">{{ post.date }}</span>
        <span class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            <router-link :to="`/tag/${encodeURIComponent(tag)}`">{{
              tag
            }}</router-link>
          </span>
        </span>
      </div>
      <div class="post-body" v-html="renderedContent"></div>
      <div class="post-nav">
        <div v-if="prevPost" class="prev-post">
          <router-link :to="`/post/${prevPost.id}`"
            >上一篇：{{ prevPost.title }}</router-link
          >
        </div>
        <div v-if="nextPost" class="next-post">
          <router-link :to="`/post/${nextPost.id}`"
            >下一篇：{{ nextPost.title }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getPost, getPosts } from "../services/postService";
import type { Post } from "../services/postService";
import MarkdownIt from "markdown-it";

const route = useRoute();
const postId = route.params.id;

const post = ref<Post | null>(null);
const loading = ref(true);
const prevPost = ref<Post | null>(null);
const nextPost = ref<Post | null>(null);

// 初始化 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// 渲染 Markdown 内容
const renderedContent = computed(() => {
  if (!post.value) return "";
  return md.render(post.value.content);
});

const loadPost = async () => {
  loading.value = true;
  try {
    // 重置上一篇和下一篇
    prevPost.value = null;
    nextPost.value = null;

    // 获取最新的文章 ID
    const currentPostId = route.params.id;

    // 获取文章详情
    const postData = await getPost(currentPostId);
    post.value = postData;

    if (postData) {
      // 获取所有文章，用于计算上一篇和下一篇
      const allPosts = await getPosts();
      const index = allPosts.findIndex((p) => p.id == currentPostId);

      if (index > 0) {
        prevPost.value = allPosts[index - 1];
      }

      if (index < allPosts.length - 1) {
        nextPost.value = allPosts[index + 1];
      }
    }
  } catch (error) {
    console.error("Error loading post:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPost();
});

// 监听路由参数变化
watch(
  () => route.params.id,
  () => {
    loadPost();
  }
);
</script>

<style scoped>
.post {
  padding: 20px 0;
}

.loading,
.error {
  text-align: center;
  padding: 100px 0;
  font-size: 18px;
  color: #666;
}

.post-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: 0 auto;
}

.post-title {
  font-size: 32px;
  margin-bottom: 24px;
  color: #333;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

.post-tags {
  display: flex;
  gap: 16px;
}

.tag {
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.tag a {
  color: #666;
  text-decoration: none;
}

.tag a:hover {
  color: #007bff;
}

.post-body {
  line-height: 1.8;
  color: #333;
  margin-bottom: 24px;
  overflow: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

.post-body h2 {
  margin: 24px 0 16px;
  font-size: 24px;
  color: #333;
}

.post-body h3 {
  margin: 24px 0 16px;
  font-size: 20px;
  color: #333;
}

.post-body p {
  margin-bottom: 16px;
}

:deep(.post-body img) {
  max-width: 100%;
  width: 100%;
  height: auto;
  margin: 24px auto;
  border-radius: 4px;
  display: block;
  object-fit: contain;
  box-sizing: border-box;
}

.post-body code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
}

.post-body pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 20px 0;
}

.post-body pre code {
  background-color: transparent;
  padding: 0;
}

.post-body ul,
.post-body ol {
  margin: 16px 0;
  padding-left: 24px;
}

.post-body li {
  margin-bottom: 8px;
}

.post-nav {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 24px;
}

.prev-post,
.next-post {
  flex: 1;
}

.prev-post {
  margin-right: 16px;
}

.next-post {
  margin-left: 16px;
  text-align: right;
}

.post-nav a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.post-nav a:hover {
  color: #0069d9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .post-content {
    padding: 16px;
    max-width: 100%;
    margin: 0 auto;
  }

  .post-title {
    font-size: 24px;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .post-tags {
    margin-top: 8px;
  }

  .post-nav {
    flex-direction: column;
    gap: 16px;
  }

  .prev-post,
  .next-post {
    margin: 0;
    text-align: left;
  }
}
</style>
