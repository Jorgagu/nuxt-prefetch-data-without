<script setup lang="ts">
const { data, status } = await useFetch('/api/users', { lazy: true })
</script>

<template>
  <main>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <h1>Users</h1>
    <p v-if="status === 'pending'" data-testid="loading">
      Loading...
    </p>
    <template v-else-if="data">
      <ul data-testid="users">
        <li v-for="user in data.users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
      <p>Data generated at {{ data.generatedAt }}</p>
    </template>
  </main>
</template>
