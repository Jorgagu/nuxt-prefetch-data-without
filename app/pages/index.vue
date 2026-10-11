<script setup lang="ts">
// time (ms) between the page becoming interactive and the /users payload being prefetched
const prefetchedAfter = ref<number | null>(null)
let observer: PerformanceObserver | undefined

onMounted(() => {
  const mountedAt = performance.now()
  observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
      if (entry.startTime >= mountedAt && new URL(entry.name).pathname === '/users/_payload.json') {
        prefetchedAfter.value = entry.responseEnd - mountedAt
        observer?.disconnect()
      }
    }
  })
  observer.observe({ type: 'resource', buffered: true })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <main>
    <h1>Home</h1>
    <NuxtLink to="/users">
      Users
    </NuxtLink>
    <p data-testid="prefetch-status">
      Users data prefetched:
      <strong v-if="prefetchedAfter !== null">yes ({{ (prefetchedAfter / 1000).toFixed(1) }} s after the page became interactive)</strong>
      <strong v-else>no</strong>
    </p>
  </main>
</template>
