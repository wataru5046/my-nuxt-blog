<template>
  <div>
    <label class="block font-medium">画像を挿入</label>
    <input type="file" accept="image/*" @change="uploadImage" />
  </div>

  <div>
  <label class="block font-medium">見出しを挿入</label>
  <select v-model="headingLevel" @change="insertHeading" class="border rounded p-2">
    <option value="">-- 選択してください --</option>
    <option value="2">H2</option>
    <option value="3">H3</option>
  </select>
</div>

<button @click="insertCodeBlock" class="bg-gray-600 text-white px-2 py-1 rounded ml-2">
  コードを挿入
</button>


  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">新しい記事を投稿</h1>

    <form @submit.prevent="submitPost" class="space-y-4">
      <div>
        <label class="block font-medium">タイトル</label>
        <input v-model="title" type="text" class="w-full border rounded p-2" required />
      </div>

      <div>
        <label class="block font-medium">スラッグ（例: my-first-post）</label>
        <input v-model="slug" type="text" class="w-full border rounded p-2" required />
      </div>

      <div class="markdown_content">
        <label class="block font-medium">本文（Markdown）</label>
        <textarea v-model="body" rows="10" class="w-full border rounded p-2" required></textarea>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        投稿する
      </button>
    </form>

    <div v-if="submitted" class="mt-4 text-green-600">投稿が完了しました！</div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')
const slug = ref('')
const body = ref('')
const submitted = ref(false)

const uploadImage = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const formData = new FormData()
  formData.append('image', files[0])

  const response = await $fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

if (response?.url) {
 body.value += `<img src="${response.url}" alt="説明">`
}
}

const submitPost = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('slug', slug.value)
  formData.append('body', body.value)

  await $fetch('/api/post', {
    method: 'POST',
    body: formData,
  })

  title.value = ''
  slug.value = ''
  body.value = ''
  submitted.value = true
}

const headingLevel = ref('')

const insertHeading = () => {
  if (headingLevel.value) {
    const level = headingLevel.value
    const headingText = prompt(`H${level} 見出しのテキストを入力してください:`)
    if (headingText) {
      const markdown = `${'#'.repeat(Number(level))} ${headingText}\n`
      body.value += markdown
    }
    headingLevel.value = ''
  }
}

const insertCodeBlock = () => {
  const language = prompt('使用する言語を入力してください（例: js, css, html）:')
  const code = prompt('コード内容を入力してください（改行は\\nで）:')
  if (language && code) {
    const formattedCode = `\n\`\`\`${language}\n${code.replace(/\\n/g, '\n')}\n\`\`\`\n`
    body.value += formattedCode
  }
}

definePageMeta({
  middleware: 'auth'
})
</script>

<style>
.markdown_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p img {
  display: block;
  margin: 1em 0;
}
</style>
