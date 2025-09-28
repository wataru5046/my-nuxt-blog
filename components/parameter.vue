<template>
 <div>
  <NuxtLink :to="from ? { path: '/estimate', query: { from } } : '/estimate'">お見積りはこちら</NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  from: {
    type: String,
    default: null 
  }
})
</script>
<style scoped>

</style>