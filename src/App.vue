<script setup>
import { RouterView } from 'vue-router'
import { computed, onMounted, onUnmounted, ref } from 'vue'

// Matrix effect random characters
const getRandomChar = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  return chars[Math.floor(Math.random() * chars.length)]
}

const windowWidth = ref(window.innerWidth)

const getCharCountBasedOnWidth = computed(() => {
  return Math.floor(windowWidth.value / 20)
})

const getColumnSpacing = computed(() => {
  const columnCount = getCharCountBasedOnWidth.value
  return columnCount > 0 ? 100 / columnCount : 0
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div id="app">
    <!-- Matrix Rain Effect -->
    <div class="matrix-rain">
      <div
        class="matrix-column"
        v-for="i in getCharCountBasedOnWidth"
        :key="i"
        :style="{ left: `${(i - 1) * getColumnSpacing}%`, animationDelay: `${Math.random() * 5}s` }"
      >
        <span v-for="j in 20" :key="j" class="matrix-char">{{ getRandomChar() }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
