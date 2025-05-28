<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()
const tag = route.params.tag
</script>

<template>
  <div class="prose">
    <h1>分类 - {{ tag }}</h1>
    <PostsList :tag="tag" />
  </div>
</template>

<style scoped>

</style>
