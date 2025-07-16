<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Chart, registerables } from 'chart.js'
import { fetchTagHistory } from '@/services/trendService'
import 'chartjs-adapter-date-fns'

Chart.register(...registerables)

const route = useRoute()
const tagName = route.params.tag || route.query.tag || 'Unknown'
const chartRef = ref(null)
const tagData = ref([])
let tagChart = null

// Technical indicator calculations
const calculateMovingAverage = (data, period) => {
  return data.map((_, index) => {
    if (index < period - 1) return null
    const slice = data.slice(index - period + 1, index + 1)
    return slice.reduce((sum, val) => sum + val, 0) / period
  })
}

const calculateMomentum = (data, period = 3) => {
  return data.map((current, index) => {
    if (index < period) return null
    const previous = data[index - period]
    return previous === 0 ? 0 : ((current - previous) / previous) * 100
  })
}

const calculateTrendingScore = (data, period = 7) => {
  const average = data.reduce((sum, val) => sum + val, 0) / data.length

  return data.map((_, index) => {
    if (index < period - 1) return null
    const recentSlice = data.slice(index - period + 1, index + 1)
    const recentAverage = recentSlice.reduce((sum, val) => sum + val, 0) / period
    return average === 0 ? 0 : recentAverage / average
  })
}

const filterDataByTimeframe = (data) => {
  const today = new Date()
  const daysBack = 90 // Always use 3 months
  const cutoffDate = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000)

  return data.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate >= cutoffDate
  })
}

const getTagHistory = async () => {
  try {
    const data = await fetchTagHistory(tagName)
    tagData.value = data
    // Add a small delay to ensure DOM is ready
    await new Promise((resolve) => setTimeout(resolve, 100))
    renderChart()
  } catch (error) {
    console.error(`Failed to fetch history for tag ${tagName}:`, error)
  }
}

const renderChart = () => {
  if (!chartRef.value || !tagData.value.length) return

  const ctx = chartRef.value.getContext('2d')

  if (tagChart) {
    tagChart.destroy()
  }

  // Filter data based on 3 months timeframe
  const filteredData = filterDataByTimeframe(tagData.value)

  // Transform data for chart
  const labels = filteredData.map((item) => {
    const date = new Date(item.date)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })
  const counts = filteredData.map((item) => item.count)

  // Calculate technical indicators
  const movingAverage7 = calculateMovingAverage(counts, 7)
  const momentum = calculateMomentum(counts, 3)
  const trendingScore = calculateTrendingScore(counts, 7)

  // Create datasets
  const datasets = [
    {
      label: `${tagName} mentions`,
      data: counts,
      borderColor: '#00ff00',
      backgroundColor: '#00ff0020',
      borderWidth: 2,
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 8,
      pointBackgroundColor: '#00ff00',
      pointBorderColor: '#000000',
      pointBorderWidth: 2,
      yAxisID: 'y',
    },
    {
      label: '7-day MA',
      data: movingAverage7,
      borderColor: '#ff6b00',
      backgroundColor: 'transparent',
      borderWidth: 2,
      fill: false,
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 6,
      pointBackgroundColor: '#ff6b00',
      pointBorderColor: '#000000',
      pointBorderWidth: 1,
      yAxisID: 'y',
    },
    {
      label: 'Momentum (%)',
      data: momentum,
      borderColor: '#ff0066',
      backgroundColor: 'transparent',
      borderWidth: 1,
      fill: false,
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 6,
      pointBackgroundColor: '#ff0066',
      pointBorderColor: '#000000',
      pointBorderWidth: 1,
      yAxisID: 'y1',
    },
    {
      label: 'Trending Score',
      data: trendingScore,
      borderColor: '#00ffff',
      backgroundColor: 'transparent',
      borderWidth: 1,
      fill: false,
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 6,
      pointBackgroundColor: '#00ffff',
      pointBorderColor: '#000000',
      pointBorderWidth: 1,
      yAxisID: 'y2',
    },
  ]

  tagChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          ticks: { color: '#00ff00' },
          grid: { color: '#0f0f0f' },
          title: {
            display: true,
            text: 'Mentions per Day',
            color: '#00ff00',
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
          ticks: { color: '#ff0066' },
          title: {
            display: true,
            text: 'Momentum (%)',
            color: '#ff0066',
          },
        },
        y2: {
          type: 'linear',
          display: false,
          position: 'right',
          min: 0,
          max: 3,
          grid: {
            drawOnChartArea: false,
          },
          ticks: { color: '#00ffff' },
          title: {
            display: true,
            text: 'Trending Score',
            color: '#00ffff',
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
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              // Format value based on dataset
              if (context.parsed.y !== null) {
                if (context.dataset.label === 'Momentum (%)') {
                  label += context.parsed.y.toFixed(1) + '%'
                } else if (context.dataset.label === 'Trending Score') {
                  label += context.parsed.y.toFixed(2) + 'x'
                } else {
                  label += Math.round(context.parsed.y * 100) / 100
                }
              }
              return label
            },
          },
        },
      },
    },
  })
}

// Helper functions for indicator summaries
const getCurrentTrend = () => {
  if (!tagData.value.length) return 'N/A'

  const filteredData = filterDataByTimeframe(tagData.value)
  const counts = filteredData.map((item) => item.count)
  const movingAverage = calculateMovingAverage(counts, 7)

  const recent = movingAverage.slice(-3).filter((val) => val !== null)
  if (recent.length < 2) return 'N/A'

  const trend = recent[recent.length - 1] > recent[0] ? '↗️ Rising' : '↘️ Falling'
  return trend
}

const get7DayAverage = () => {
  if (!tagData.value.length) return 'N/A'

  const filteredData = filterDataByTimeframe(tagData.value)
  const counts = filteredData.map((item) => item.count)
  const movingAverage = calculateMovingAverage(counts, 7)

  const lastValue = movingAverage.filter((val) => val !== null).pop()
  return lastValue ? Math.round(lastValue * 10) / 10 : 'N/A'
}

const getMomentumStatus = () => {
  if (!tagData.value.length) return 'N/A'

  const filteredData = filterDataByTimeframe(tagData.value)
  const counts = filteredData.map((item) => item.count)
  const momentum = calculateMomentum(counts, 3)

  const lastValue = momentum.filter((val) => val !== null).pop()
  if (!lastValue) return 'N/A'

  const status =
    lastValue > 20
      ? '🚀 Strong'
      : lastValue > 0
        ? '📈 Positive'
        : lastValue > -20
          ? '📉 Negative'
          : '💥 Weak'
  return status
}

const getTrendingStatus = () => {
  if (!tagData.value.length) return 'N/A'

  const filteredData = filterDataByTimeframe(tagData.value)
  const counts = filteredData.map((item) => item.count)
  const trendingScore = calculateTrendingScore(counts, 7)

  const lastValue = trendingScore.filter((val) => val !== null).pop()
  if (!lastValue) return 'N/A'

  const status =
    lastValue > 1.5
      ? '🔥 Hot'
      : lastValue > 1.1
        ? '📊 Above Avg'
        : lastValue > 0.9
          ? '➡️ Normal'
          : '❄️ Cold'
  return status
}

watch(
  tagData,
  () => {
    if (tagData.value.length > 0) {
      renderChart()
    }
  },
  { deep: true },
)

onMounted(() => {
  getTagHistory()
})
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto p-6! bg-black/70 border border-green-500 rounded-md shadow-lg text-white text-center space-y-4"
  >
    <h1 class="hidden">{{ tagName }}</h1>

    <p class="text-sm md:text-base text-green-400/80">
      Trending data and mentions over time for <strong>{{ tagName }}</strong> (Last 3 months)
    </p>

    <!-- Chart Container -->
    <div class="relative w-full h-[400px] bg-black/30 border border-green-500/30 rounded-t-md p-4">
      <div v-if="!tagData.length" class="flex items-center justify-center h-full">
        <p class="text-green-400/70 text-lg">Loading tag data...</p>
      </div>
      <canvas v-else ref="chartRef"></canvas>
    </div>

    <!-- Technical Indicators Summary -->
    <div v-if="tagData.length" class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-1">
      <div class="bg-black/50 border border-green-500/30 md:rounded-b-md p-4">
        <h4 class="text-green-400 font-bold mb-2">Current Trend</h4>
        <p class="text-xl font-mono text-white">
          {{ getCurrentTrend() }}
        </p>
      </div>
      <div class="bg-black/50 border border-orange-500/30 md:rounded-b-md p-4">
        <h4 class="text-orange-400 font-bold mb-2">7-Day Average</h4>
        <p class="text-xl font-mono text-white">
          {{ get7DayAverage() }}
        </p>
      </div>
      <div class="bg-black/50 border border-pink-500/30 md:rounded-b-md p-4">
        <h4 class="text-pink-400 font-bold mb-2">Momentum</h4>
        <p class="text-xl font-mono text-white">
          {{ getMomentumStatus() }}
        </p>
      </div>
      <div class="bg-black/50 border border-cyan-500/30 md:rounded-b-md p-4">
        <h4 class="text-cyan-400 font-bold mb-2">Trending Score</h4>
        <p class="text-xl font-mono text-white">
          {{ getTrendingStatus() }}
        </p>
      </div>
    </div>
  </div>
</template>
