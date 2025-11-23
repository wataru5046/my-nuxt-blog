<script setup lang="ts">
import { ref } from 'vue'

// 各パネルの開閉状態を管理
const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

// サンプルデータ
const items = [
  { title: 'Nuxt3とは？', content: 'Nuxt3はVue3ベースのフレームワークで、サーバーサイドレンダリングや静的サイト生成を簡単に行えます。' },
  { title: 'Tailwind CSSとは？', content: 'Tailwind CSSはユーティリティファーストなCSSフレームワークで、クラスを組み合わせてデザインを構築します。' },
  { title: 'アコーディオンの使いどころ', content: 'よくある質問（FAQ）や詳細情報を折りたたみ表示する際に便利です。' }
]
</script>

<template>
  <div class="w-full max-w-lg mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center">アコーディオンサンプル</h2>

    <div class="space-y-2">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="border border-gray-300 rounded-lg overflow-hidden"
      >
        <button
          class="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
          @click="toggle(index)"
        >
          <span class="font-medium">{{ item.title }}</span>
          <span class="text-gray-500">{{ openIndex === index ? '−' : '+' }}</span>
        </button>

        <div
          v-if="openIndex === index"
          class="p-4 text-gray-700 bg-white border-t border-gray-200"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* アニメーションを追加したい場合 */
div[role="region"] {
  transition: max-height 0.3s ease;
}
</style>