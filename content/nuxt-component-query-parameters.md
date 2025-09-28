---
title: "共通コンポーネントのリンクにクエリパラメータを渡す方法"
date: "2025-09-27T11:16:15.554Z"
---

Nuxtで共通のコンポーネントを作っていると、「リンク先は同じだけど、ページごとにパラメータを変えたい」という場面があります。

たとえば「お見積りはこちら」リンクを各ページに設置したいけれど、アクセス元を示す fromパラメータだけはページごとに切り替えたい場合です

本記事ではパラメーターの値を各ページによって変更する方法を紹介していきます。

## 各ページからコンポーネントに値を渡す

下記のコードのように各ページに配置されているコンポーネントに値を渡すことができます。

fromの値をpriceページからはpriceに、productページからはproductにしています。

■priceページ

```html
<div>

  <Parameter from="price" />

</div>

```

■productページ

```html
<div>

   <Parameter from="product" />

 </div>

```

## コンポーネント側から値を受け取れるようにする

下記のようにdefinePropsで各ページのfromの値を受け取ることができます。

```js
<script setup>

defineProps({
  from: {
    type: String,
    default: null 
  }
})
</script>

```
{ from }の値が各ページで渡しているfromの値になります。

またfromが設定されていないときを加味して、fromに値が設定されていないときにはパラメーターをつけないという実装にしています。

```html
<template>

 <div>

  <NuxtLink :to="from ? { path: '/estimate', query: { from } } : '/estimate'">
お見積りはこちら</NuxtLink>

  </div>

</template>

```

