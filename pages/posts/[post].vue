<script setup lang="ts">
import mediumZoom from 'medium-zoom'

const route = useRoute()
const router = useRouter()

const content = ref<HTMLElement | null>(null)

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('post').path(route.path).first())

onMounted(() => {
  mediumZoom('[data-image-zoom]', {
    background: 'rgba(0, 0, 0, 0.8)',
    margin: 24,
    scrollOffset: 0,
  })
})
function navigate(hash?: string) {
  if (location.hash || hash) {
    document.querySelector(decodeURIComponent(hash || location.hash))
      ?.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})
</script>

<template>
  <section v-if="page" class="slide-enter-content relative">
    <ContentRenderer class="prose" :value="page" />
    <BackTop class="fixed bottom-10 right-10" />
    <PostComment :number="page.number" />
  </section>
</template>

<style></style>
