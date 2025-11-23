<script setup>
const url = "https://script.google.com/macros/s/AKfycbwvfhHgT9ziGzhiAapsnIfiBfKOuvWR-dP722AwSvAgtaDTbm660YlwcSfr3D8GYUjJEw/exec";

const { data, error } = await useFetch(url);

console.log(data.value); // ← 配列で取得される
</script>

<template>
  <div>
    <h1>スプレッドシートのデータ</h1>

    <div v-if="error">読み込みエラー: {{ error }}</div>

    <ul v-if="data">
      <li v-for="(item, i) in data" :key="i">
        {{ item }}
      </li>
    </ul>
  </div>
</template>