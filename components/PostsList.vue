<script setup lang="ts">
import { formatDate } from '~/utils'

defineOptions({
  name: 'PostsList',
})

defineProps<{
  tag?: string
}>()

const router = useRouter()
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('post').order('created_at', 'DESC').all())

if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true,
  })
}

function goToCategory(tag: string) {
  router.push(`/tags/${tag}`)
}
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="post in posts" :key="post.path">
      <section class="mb-6">
        <div class="flex items-center gap-4 no-underline">
          <RouterLink v-if="post.path" :to="post.path" class="block font-normal no-underline transition-all hover:op70">
            {{ post.title }}
          </RouterLink>
          <div v-if="post.labels">
            <div v-for="label in post.labels" :key="label.name" class="cursor-pointer" @click="goToCategory(label.name)">
              #{{ label.name }}
            </div>
          </div>
        </div>
        <div class="flex gap-4 ws-nowrap text-sm op50">
          <span>
            {{ formatDate(post.date) }}
          </span>
          <div>{{ formatReadTime(readTime(post.description)) }}</div>
        </div>
      </section>
    </template>
  </ul>
</template>
