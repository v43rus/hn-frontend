<script setup>
import MainNav from '@/components/MainNav.vue'
import AboutViewContent from '@/components/AboutViewContent.vue'
</script>

<template>
  <main>
    <h1 class="hidden">HackerNews About</h1>
    <img src="/logo.png" alt="HackerNews logo" class="logo w-[80px] sm:w-[120px] md:w-[160px]" />
    <MainNav />

    <AboutViewContent />
  </main>
</template>
