<script setup>
import MainNav from '@/components/MainNav.vue'
import TagsViewContent from '@/components/TagsViewContent.vue'
</script>

<template>
  <main>
    <img src="/logo.png" alt="HackerNews logo" class="logo w-[80px] sm:w-[120px] md:w-[160px]" />
    <MainNav />

    <TagsViewContent />
  </main>
</template>
