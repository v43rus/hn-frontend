<script setup>
import MainNav from '@/components/MainNav.vue'
import HomeViewContent from '@/components/HomeViewContent.vue'
</script>

<template>
  <main>
    <img src="/logo.png" alt="HackerNews logo" class="w-[80px] sm:w-[120px] md:w-[160px]" />
    <MainNav />

    <HomeViewContent />
  </main>
</template>
