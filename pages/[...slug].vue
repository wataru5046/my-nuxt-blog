<template>
  <div v-if="data">
    <h1>{{ data.title }}</h1>
    <ContentRenderer :value="data" />
  </div>
  <div v-else>
    <p>記事が見つかりませんでした。</p>
  </div>
</template>

<script setup>
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
  queryCollection("content").path(route.path).first(),
);
</script>
<style>
h2 {
  font-size: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 1.25rem;
  margin-top: 1.2em;
  margin-bottom: 0.4em;
}

pre {
  background-color: #1e1e1e; /* ダーク背景 */
  color: #dcdcdc;            /* 明るい文字色 */
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 1em 0;
}

code {
  display: block;
  white-space: pre;
}
</style>