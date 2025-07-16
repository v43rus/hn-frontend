<script setup>
import MainNav from '@/components/MainNav.vue'
import TrendsViewContent from '@/components/TrendsViewContent.vue'
</script>

<template>
  <main>
    <img src="/logo.png" alt="HackerNews logo" class="logo w-[80px] sm:w-[120px] md:w-[160px]" />
    <MainNav />

    <TrendsViewContent />
  </main>
</template>
