<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const tagName = route.params.tag || route.query.tag || 'Unknown'
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto p-6! bg-black/70 border border-green-500 rounded-md shadow-lg text-white text-center space-y-4"
  >
    <h1 class="text-2xl md:text-3xl font-bold text-green-400">{{ tagName }}</h1>
  </div>
</template>
