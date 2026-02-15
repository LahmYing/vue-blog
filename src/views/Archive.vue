<template>
  <div class="archive">
    <h1>归档</h1>
    <div class="archive-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="Object.keys(groupedPosts).length === 0" class="empty">
        暂无文章
      </div>
      <div v-else>
        <div
          v-for="(yearPosts, year) in groupedPosts"
          :key="year"
          class="year-group"
        >
          <h2 class="year">{{ year }}</h2>
          <div class="month-group">
            <div
              v-for="(monthPosts, month) in yearPosts"
              :key="month"
              class="month"
            >
              <h3 class="month-title">{{ month }}</h3>
              <ul class="post-list">
                <router-link
                  v-for="post in monthPosts"
                  :key="post.id"
                  :to="`/post/${post.id}`"
                  class="post-item"
                  tag="li"
                >
                  <span class="post-title">{{ post.title }}</span>
                  <span class="post-date">{{ post.date }}</span>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getArchive } from "../services/postService";

const groupedPosts = ref({});
const loading = ref(true);

const loadArchive = async () => {
  loading.value = true;
  try {
    const archiveData = await getArchive();
    groupedPosts.value = archiveData;
  } catch (error) {
    console.error("Error loading archive:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadArchive();
});
</script>

<style scoped>
.archive {
  padding: 20px 0;
}

.archive h1 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.archive-content {
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

.year-group {
  margin-bottom: 40px;
}

.year {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.month {
  margin-bottom: 30px;
}

.month-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #666;
}

.post-list {
  list-style: none;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.post-item:last-child {
  border-bottom: none;
}

.post-item:hover {
  color: #007bff;
}

.post-item .post-title {
  flex: 1;
}

.post-date {
  font-size: 14px;
  color: #999;
  margin-left: 20px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .archive-content {
    padding: 20px;
  }

  .archive h1 {
    font-size: 24px;
  }

  .year {
    font-size: 20px;
  }

  .month-title {
    font-size: 16px;
  }

  .post-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .post-date {
    margin-left: 0;
  }
}
</style>
