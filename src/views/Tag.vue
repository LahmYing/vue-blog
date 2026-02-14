<template>
  <div class="tag">
    <h1>标签：{{ route.params.tag }}</h1>
    <div class="tag-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="posts.length === 0" class="empty">该标签下暂无文章</div>
      <div v-else class="post-list">
        <div v-for="post in posts" :key="post.id" class="post-item">
          <h2 class="post-title">
            <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
          </h2>
          <div class="post-meta">
            <span class="post-date">{{ post.date }}</span>
            <span class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">
                <router-link :to="`/tag/${encodeURIComponent(tag)}`">{{ tag }}</router-link>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="all-tags">
        <h3>所有标签</h3>
        <div class="tag-cloud">
          <span v-for="tag in allTags" :key="tag.name" class="tag">
            <router-link :to="`/tag/${encodeURIComponent(tag.name)}`">{{ tag.name }} ({{ tag.count }})</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPostsByTag, getTags } from '../services/postService'

const route = useRoute()

const posts = ref([])
const loading = ref(true)
const allTags = ref([])

const loadPosts = async () => {
  const tagName = route.params.tag
  loading.value = true
  try {
    // 获取指定标签的文章
    const taggedPosts = await getPostsByTag(tagName)
    posts.value = taggedPosts
    
    // 获取所有标签
    const tags = await getTags()
    allTags.value = tags
  } catch (error) {
    console.error('Error loading posts by tag:', error)
  } finally {
    loading.value = false
  }
}

// 监听路由参数变化
watch(
  () => route.params.tag,
  () => {
    loadPosts()
  }
)

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.tag {
  padding: 20px 0;
}

.tag h1 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.tag-content {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading,
.empty {
  text-align: center;
  padding: 100px 0;
  font-size: 18px;
  color: #666;
}

.post-list {
  margin-bottom: 40px;
}

.post-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.post-item:last-child {
  border-bottom: none;
}

.post-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.post-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.post-title a:hover {
  color: #007bff;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

.post-tags {
  display: flex;
  gap: 10px;
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
  margin-bottom: 15px;
  line-height: 1.6;
  color: #555;
}

.read-more {
  display: inline-block;
  padding: 6px 12px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

.read-more:hover {
  background-color: #0069d9;
}

.all-tags {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.all-tags h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.tag-cloud .tag {
  font-size: 14px;
  padding: 4px 12px;
}

@media (max-width: 768px) {
  .tag-content {
    padding: 20px;
  }
  
  .tag h1 {
    font-size: 24px;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .post-tags {
    margin-top: 5px;
  }
}


</style>