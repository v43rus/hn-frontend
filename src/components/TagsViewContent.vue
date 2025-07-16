<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { TECH_TAGS, TAG_COLORS } from '@/constants/tags'
import { Chart, registerables } from 'chart.js'
import { fetchTagHistory } from '@/services/trendService'
import 'chartjs-adapter-date-fns'

Chart.register(...registerables)

const router = useRouter()
const selectedTags = ref([])
const chartRef = ref(null)
const tagDataCache = ref({})
const loadingTags = ref(new Set())
let tagChart = null

const getTagHistory = async (tag) => {
  // Check if data is already cached
  if (tagDataCache.value[tag]) {
    return tagDataCache.value[tag]
  }

  if (loadingTags.value.has(tag)) {
    return null
  }

  try {
    loadingTags.value.add(tag)
    const data = await fetchTagHistory(tag)

    const labels = data.map((item) => {
      const date = new Date(item.date)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
    const counts = data.map((item) => item.count)

    const processedData = { labels, data: counts }

    // Cache the processed data
    tagDataCache.value[tag] = processedData

    return processedData
  } catch (error) {
    console.error(`Failed to fetch history for tag ${tag}:`, error)
    return null
  } finally {
    loadingTags.value.delete(tag)
  }
}

const toggleTag = async (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
    const tagData = await getTagHistory(tag)
    if (tagData) {
      renderChart()
    }
  }
}

const renderChart = () => {
  if (!chartRef.value || selectedTags.value.length === 0) return

  const ctx = chartRef.value.getContext('2d')

  if (tagChart) {
    tagChart.destroy()
  }

  // Get all cached tag data
  const tagDataArray = selectedTags.value
    .map((tag) => ({
      tag,
      data: tagDataCache.value[tag],
    }))
    .filter((item) => item.data)

  if (tagDataArray.length === 0) return

  const labels = tagDataArray[0].data.labels

  const datasets = tagDataArray.map((item, index) => {
    return {
      label: item.tag,
      data: item.data.data,
      borderColor: TAG_COLORS[index % TAG_COLORS.length],
      backgroundColor: TAG_COLORS[index % TAG_COLORS.length] + '20',
      borderWidth: 2,
      fill: false,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: TAG_COLORS[index % TAG_COLORS.length],
      pointBorderColor: '#000000',
      pointBorderWidth: 1,
    }
  })

  tagChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0]
          const datasetIndex = element.datasetIndex
          const selectedTag = tagDataArray[datasetIndex].tag

          router.push(`/tags/${selectedTag}`)
        }
      },
      onHover: (event, elements) => {
        event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default'
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            color: '#00ff00',
            maxTicksLimit: 10,
          },
          grid: { color: '#0f0f0f' },
          title: {
            display: true,
            text: 'Date',
            color: '#00ff00',
          },
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#00ff00' },
          grid: { color: '#0f0f0f' },
          title: {
            display: true,
            text: 'Mentions per Day',
            color: '#00ff00',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#00ff00',
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: '#00ff00',
          bodyColor: '#ffffff',
          borderColor: '#00ff00',
          borderWidth: 1,
        },
      },
    },
  })
}

watch(selectedTags, renderChart, { deep: true })

onMounted(() => {
  renderChart()
})
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto p-6! bg-black/70 border border-green-500 rounded-md shadow-lg text-white text-center space-y-4"
  >
    <h1 class="text-2xl md:text-3xl font-bold text-green-400">Tag Comparison</h1>

    <p class="text-sm md:text-base">
      Compare multiple <strong>tech tags</strong> over time to see trending patterns and
      correlations.
    </p>

    <!-- Tag Selection Buttons -->
    <div class="my-6">
      <h3 class="text-lg font-bold text-green-400 mb-4">Select Tags to Compare:</h3>
      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="tag in TECH_TAGS"
          :key="tag"
          @click="toggleTag(tag)"
          :disabled="loadingTags.has(tag)"
          class="hacker-button relative px-3 py-1 font-mono text-xs uppercase tracking-wider transition-all duration-200 transform"
          :class="[
            selectedTags.includes(tag) ? 'hacker-button-active' : 'hacker-button-inactive',
            loadingTags.has(tag) ? 'opacity-50 cursor-not-allowed' : '',
          ]"
        >
          <span class="relative z-10">
            {{ tag }}
            <span v-if="loadingTags.has(tag)" class="ml-1">⟳</span>
          </span>
        </button>
      </div>
      <p class="text-green-400/70 text-xs mt-2">
        Selected: {{ selectedTags.length }} tags
        <span v-if="loadingTags.size > 0" class="ml-2">
          (Loading {{ loadingTags.size }} tag{{ loadingTags.size > 1 ? 's' : '' }}...)
        </span>
      </p>
    </div>

    <!-- Chart Container -->
    <div class="relative w-full h-[400px] bg-black/30 border border-green-500/30 rounded-md p-4">
      <div v-if="selectedTags.length === 0" class="flex items-center justify-center h-full">
        <p class="text-green-400/70 text-lg">Select one or more tags to compare their trends</p>
      </div>
      <canvas v-else ref="chartRef"></canvas>
    </div>
  </div>
</template>
