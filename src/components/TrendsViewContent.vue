<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { PERIODS } from '@/constants/periods'
import { fetchPopularTags } from '@/services/trendService'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const router = useRouter()
const selectedPeriod = ref('3d')
const tags = ref([])
const chartRef = ref(null)
let tagChart = null

const loadTags = async () => {
  try {
    const data = await fetchPopularTags(selectedPeriod.value)
    tags.value = data
    renderChart()
  } catch (error) {
    console.error('Failed to fetch tags:', error)
  }
}

const generateColors = (values) => {
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = maxValue - minValue

  return values.map((value) => {
    // Calculate percentage (0-1)
    const percentage = range === 0 ? 1 : (value - minValue) / range

    // Create gradient from dark green to bright green
    const intensity = Math.floor(50 + percentage * 205)
    const color = `rgb(0, ${intensity}, 0)`
    const hoverColor = `rgb(0, ${Math.min(255, intensity + 50)}, 0)`

    return {
      backgroundColor: color,
      borderColor: color,
      hoverBackgroundColor: hoverColor,
      hoverBorderColor: hoverColor,
    }
  })
}

const renderChart = () => {
  if (!chartRef.value) return
  const ctx = chartRef.value.getContext('2d')
  if (tagChart) {
    tagChart.destroy()
  }

  const values = tags.value.map((t) => t.count)
  const colors = generateColors(values)

  tagChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tags.value.map((t) => t.tag),
      datasets: [
        {
          label: 'Tags',
          data: values,
          backgroundColor: colors.map((c) => c.backgroundColor),
          borderColor: colors.map((c) => c.borderColor),
          borderWidth: 1,
          hoverBackgroundColor: colors.map((c) => c.hoverBackgroundColor),
          hoverBorderColor: colors.map((c) => c.hoverBorderColor),
          barPercentage: 0.8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const elementIndex = elements[0].index
          const selectedTag = tags.value[elementIndex]

          router.push(`/tags/${selectedTag.tag}`)
        }
      },
      onHover: (event, elements) => {
        event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default'
      },
      scales: {
        x: {
          ticks: { color: '#00ff00' },
          grid: { color: '#0f0f0f' },
        },
        y: {
          ticks: { color: '#00ff00' },
          grid: { color: '#0f0f0f' },
        },
      },
      plugins: {
        legend: { labels: { color: '#00ff00' } },
      },
    },
  })
}

onMounted(loadTags)
watch(selectedPeriod, loadTags)
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto p-6 bg-black/70 border border-green-500 rounded-md shadow-lg text-white text-center space-y-4"
  >
    <h1 class="text-2xl md:text-3xl font-bold text-green-400">Trending Tags</h1>

    <div class="flex m-2 justify-center gap-3 flex-wrap mb-6">
      <button
        v-for="period in PERIODS"
        :key="period.value"
        @click="selectedPeriod = period.value"
        class="hacker-button relative px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-200 transform"
        :class="selectedPeriod === period.value ? 'hacker-button-active' : 'hacker-button-inactive'"
      >
        <span class="relative z-10">{{ period.label }}</span>
      </button>
    </div>

    <div class="relative w-full h-[400px]">
      <canvas ref="chartRef"></canvas>
    </div>

    <p class="text-sm text-green-400 mt-2 opacity-75">
      Click on any bar to view detailed information about that tag
    </p>
  </div>
</template>

