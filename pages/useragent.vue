<template>
  <div>
    <div v-if="isAndroid">google play</div>
    <div v-else-if="isIOS">appstore</div>
  </div>
</template>

<script setup>
import { useRequestHeaders } from '#app'  // ←ここがポイント

const headers = useRequestHeaders(['user-agent'])
const ua = (headers['user-agent'] || '').toLowerCase()

const isAndroid = /android/.test(ua)
const isIOS = /iphone|ipad|ipod/.test(ua)

console.log("UA:", ua)
</script>

<style scoped>

</style>