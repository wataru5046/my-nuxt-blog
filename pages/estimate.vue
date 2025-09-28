<template>
  <form @submit.prevent="goToPrint">
    <div>
      <label>会社名:</label>
      <input type="text" v-model="form.company" />
    </div>
    <div>
      <label>名前:</label>
      <input type="text" v-model="form.name" />
    </div>
    <div>
      <label>住所:</label>
      <input type="text" v-model="form.address" />
    </div>
    <div>
      <label>電話番号:</label>
      <input type="text" v-model="form.phone" />
    </div>
    
    <!-- 商品ごとのセレクト -->
    <div v-for="p in products" :key="p.value">
      <label>{{ p.label }} ({{ p.price }}円)</label>
      <select v-model.number="quantities[p.value]">
        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
    <button type="submit">見積書を表示</button>
  </form>
</template>

<script setup lang="ts">
const products = [
  { label: "A商品", value: "A", price: 1000 },
  { label: "B商品", value: "B", price: 2000 },
  { label: "C商品", value: "C", price: 3000 },
  { label: "D商品", value: "D", price: 4000 },
  { label: "E商品", value: "E", price: 5000 }
]

const form = reactive({
  company: "",
  name: "",
  address: "",
  phone: ""
})

// 商品ごとの数量（初期値1）
const quantities = reactive<Record<string, number>>({
  A: 1,
  B: 1,
  C: 1,
  D: 1,
  E: 1
})

const goToPrint = () => {
  // URL パラメータ用に商品と数量をまとめる
  const query = {
    company: form.company,
    name: form.name,
    address: form.address,
    phone: form.phone,
    products: JSON.stringify(quantities) // ← 文字列化して渡す
  }

  navigateTo({
    path: "/print",
    query
  })
}
</script>