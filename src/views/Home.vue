<template>
  <div class="home">
    <div class="row">
      <div class="col-md-8">
        <div class="post-list">
          <div v-if="loading" class="loading">加载中...</div>
          <div v-else-if="posts.length === 0" class="empty">暂无文章</div>
          <div v-else>
            <router-link
              v-for="post in posts"
              :key="post.id"
              :to="`/post/${post.id}`"
              class="post-item"
            >
              <h2 class="post-title">{{ post.title }}</h2>
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
            </router-link>
          </div>
        </div>
        <div class="pagination" v-if="!loading && posts.length > 0">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            上一页
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            下一页
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="sidebar">
          <div class="sidebar-item">
            <h3>热门标签</h3>
            <div class="tag-cloud">
              <span v-for="tag in hotTags" :key="tag.name" class="tag">
                <router-link :to="`/tag/${encodeURIComponent(tag.name)}`"
                  >{{ tag.name }} ({{ tag.count }})</router-link
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPosts, getTags } from "../services/postService";
import type { Post, Tag } from "../services/postService";

const posts = ref<Post[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const hotTags = ref<Tag[]>([]);

const loadPosts = async () => {
  loading.value = true;
  try {
    // 获取文章列表
    const allPosts = await getPosts();

    // 分页处理（假设每页 10 篇）
    const pageSize = 10;
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    posts.value = allPosts.slice(startIndex, endIndex);

    // 获取热门标签
    const tags = await getTags();
    hotTags.value = tags;

    // 计算总页数
    totalPages.value = Math.ceil(allPosts.length / pageSize);
  } catch (error) {
    console.error("Error loading posts:", error);
  } finally {
    loading.value = false;
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadPosts();
  }
};

onMounted(() => {
  loadPosts();
});
</script>

<style scoped>
.home {
  padding: 20px 0;
}

.row {
  display: flex;
  gap: 30px;
}

.col-md-8 {
  flex: 1;
}

.col-md-4 {
  width: 300px;
  flex-shrink: 0;
}

.post-list {
  margin-bottom: 30px;
}

.loading,
.empty {
  text-align: center;
  padding: 100px 0;
  font-size: 18px;
  color: #666;
}

.post-item {
  display: block;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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

.post-excerpt {
  margin-bottom: 20px;
  line-height: 1.8;
  color: #555;
}

.read-more {
  display: inline-block;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.read-more:hover {
  background-color: #0069d9;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.pagination button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sidebar {
  position: sticky;
  top: 100px;
}

.sidebar-item {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-item h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 992px) {
  .row {
    flex-direction: column;
  }

  .col-md-4 {
    width: 100%;
  }

  .sidebar {
    position: static;
  }
}
</style>
