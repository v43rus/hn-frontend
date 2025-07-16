<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="w-full max-w-5xl m-2! bg-black/70 border border-green-500 rounded-md shadow-lg">
    <ul class="justify-between md:justify-between items-center px-6 py-4 text-sm md:text-base">
      <div class="flex p-2! gap-4 flex-wrap justify-evenly">
        <li v-for="link in navLinks" :key="link.name">
          <router-link
            :to="link.path"
            class="text-green-400 hover:text-white transition duration-150"
            :class="{ 'underline text-white': route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Trends', path: '/trends' },
  { name: 'Tags', path: '/tags' },
  { name: 'Posts', path: '/posts' },
  { name: 'About', path: '/about' },
]
</script>
