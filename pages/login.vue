<!-- pages/login.vue -->
<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">ログイン</h1>
    <form @submit.prevent="login" class="space-y-4">
      <input v-model="username" placeholder="ユーザー名" class="w-full border p-2" />
      <input v-model="password" placeholder="パスワード" type="password" class="w-full border p-2" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">ログイン</button>
    </form>
    <div v-if="error" class="text-red-500">ログイン失敗</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()

const login = async () => {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })
    window.location.href = '/admin/post/'
  } catch (err) {
    error.value = true
  }
}
</script>