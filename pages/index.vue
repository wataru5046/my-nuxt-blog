<script setup lang="ts">
const { data } = await useAsyncData("content", () =>
  queryCollection("content").all(),
);
</script>

<template>
  <main>
    <ul v-if="data" class="list">
      <li v-for="article in data" :key="article.path" class="list_item">
        <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>