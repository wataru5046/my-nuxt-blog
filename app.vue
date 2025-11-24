<template>
  <NuxtLayout />
</template>
<script setup>
useHead({
  script: [
    {
      src: "https://platform.twitter.com/widgets.js",
      async: true
    }
  ]
});
</script>

