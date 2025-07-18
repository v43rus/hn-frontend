<script setup>
import { ref, onMounted, computed } from 'vue'
import { TECH_TAGS } from '@/constants/tags'
import { PERIODS } from '@/constants/periods'
import { fetchTopPostsByTagAndPeriod } from '@/services/trendService'

const selectedTag = ref('')
const selectedPeriod = ref('3d')
const posts = ref([])
const pagination = ref({})
const isLoading = ref(false)
const error = ref('')
const currentPage = ref(1)
const postsPerPage = 9

const sortedTags = computed(() => {
  return [...TECH_TAGS].sort()
})

const fetchPosts = async (page = 1) => {
  if (!selectedTag.value) return

  try {
    isLoading.value = true
    error.value = ''
    const data = await fetchTopPostsByTagAndPeriod(
      selectedTag.value,
      selectedPeriod.value,
      page,
      postsPerPage,
    )
    posts.value = data.posts
    pagination.value = data.pagination
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    error.value = 'Failed to load posts. Please try again.'
    posts.value = []
    pagination.value = {}
  } finally {
    isLoading.value = false
  }
}

const selectPeriod = (period) => {
  selectedPeriod.value = period
  currentPage.value = 1
  fetchPosts(1)
}

const onTagChange = () => {
  currentPage.value = 1
  fetchPosts(1)
}

// Pagination functions
const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.total_pages) {
    fetchPosts(page)
    // Scroll to top of posts section
    document.querySelector('.posts-container')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (pagination.value.has_next) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (pagination.value.has_prev) {
    goToPage(currentPage.value - 1)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getHostname = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return 'Unknown'
  }
}

onMounted(() => {
  if (TECH_TAGS.length > 0) {
    selectedTag.value = TECH_TAGS[23] // Default to 'AI'
    fetchPosts()
  }
})
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto p-6 bg-black/70 border border-green-500 rounded-md shadow-lg text-white text-center space-y-4"
  >
    <div class="text-center space-y-4">
      <h1 class="text-2xl md:text-3xl font-bold text-green-400">HackerNews Posts</h1>
      <p class="text-sm md:text-base">
        Trending posts from <strong>HackerNews</strong> based on trending tags and user
        interactions.
      </p>
    </div>

    <!-- Controls -->
    <div class="space-y-2 mt-2">
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <label class="text-green-400 font-bold text-sm">Select Tag:</label>
        <select
          v-model="selectedTag"
          @change="onTagChange"
          class="bg-black/80 border border-green-500 text-green-400 px-4 py-2 rounded-md focus:outline-none focus:border-green-300 font-mono text-sm"
        >
          <option value="">-- Select a tag --</option>
          <option v-for="tag in sortedTags" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>

      <!-- Period Selection -->
      <div class="text-center space-y-2">
        <h3 class="text-green-400 font-bold text-sm">Time Period:</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="period in PERIODS"
            :key="period.value"
            @click="selectPeriod(period.value)"
            :disabled="isLoading"
            class="hacker-button relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform"
            :class="[
              selectedPeriod === period.value ? 'hacker-button-active' : 'hacker-button-inactive',
              isLoading ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            <span class="relative z-10">{{ period.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8 mt-4">
      <p class="text-green-400/70 text-lg">Loading posts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8 mt-4">
      <p class="text-red-400 text-lg">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!selectedTag" class="text-center py-8 mt-4">
      <p class="text-green-400/70 text-lg">Select a tag to view posts</p>
    </div>

    <!-- No Posts State -->
    <div v-else-if="posts.length === 0" class="text-center py-8 mt-4">
      <p class="text-green-400/70 text-lg">
        No posts found for "{{ selectedTag }}" in the last {{ selectedPeriod }}
      </p>
    </div>

    <!-- Posts Grid -->
    <div v-else>
      <!-- Posts Info -->
      <div class="text-center text-green-400/70 text-sm font-mono">
        <span v-if="pagination.total_posts">
          Showing {{ (currentPage - 1) * postsPerPage + 1 }} -
          {{ Math.min(currentPage * postsPerPage, pagination.total_posts) }} of
          {{ pagination.total_posts }} posts
        </span>
      </div>

      <!-- Posts Grid Container -->
      <div class="posts-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-black/50 border border-green-500/50 rounded-md p-2 hover:border-green-400 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
        >
          <!-- Post Header -->
          <div class="space-y-2 mb-3">
            <h3 class="text-green-400 text-left font-bold text-sm line-clamp-2 leading-tight">
              <a
                :href="post.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-green-300 transition-colors"
              >
                {{ post.title }}
              </a>
            </h3>

            <div class="flex items-center gap-2 text-xs text-green-400/70">
              <span class="font-mono">{{ getHostname(post.url) }}</span>
              <span>•</span>
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
          </div>

          <!-- Post Stats -->
          <div class="flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-4">
              <span class="text-green-400"> ▲ {{ post.points || 0 }} </span>
              <span class="text-green-400/70"> 💬 {{ post.descendants || 0 }} </span>
            </div>

            <div class="text-green-400/70">by {{ post.author || 'Unknown' }}</div>
          </div>

          <!-- HackerNews Link -->
          <div class="mt-3 pt-3 border-t border-green-500/30">
            <a
              :href="`https://news.ycombinator.com/item?id=${post.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-green-400/70 hover:text-green-400 transition-colors font-mono"
            >
              View on HackerNews →
            </a>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total_pages > 1" class="flex justify-center items-center gap-2 mt-8">
        <!-- Previous Button -->
        <button
          @click="prevPage"
          :disabled="!pagination.has_prev"
          class="hacker-button relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform"
          :class="[
            pagination.has_prev
              ? 'hacker-button-inactive hover:hacker-button-active'
              : 'opacity-50 cursor-not-allowed',
          ]"
        >
          <span class="relative z-10">← Prev</span>
        </button>

        <!-- Page Numbers -->
        <div class="flex gap-1">
          <button
            v-for="page in Math.min(pagination.total_pages, 7)"
            :key="page"
            @click="goToPage(page)"
            class="hacker-button relative px-3 py-2 font-mono text-xs transition-all duration-200 transform"
            :class="[
              currentPage === page
                ? 'hacker-button-active'
                : 'hacker-button-inactive hover:hacker-button-active',
            ]"
          >
            <span class="relative z-10">{{ page }}</span>
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="nextPage"
          :disabled="!pagination.has_next"
          class="hacker-button relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform"
          :class="[
            pagination.has_next
              ? 'hacker-button-inactive hover:hacker-button-active'
              : 'opacity-50 cursor-not-allowed',
          ]"
        >
          <span class="relative z-10">Next →</span>
        </button>
      </div>
    </div>
  </div>
</template>

