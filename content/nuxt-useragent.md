---
title: "ユーザーエージェントでgoogle playボタン、appstoreボタンを出し分ける"
date: "2025-09-14T17:47:54.329Z"
---

google play ボタンや appstore ボタンの出し分けなど、使っている端末によって表示を出し分けたいことがありますよね。
そんなときに使えるのがユーザーエージェントです。今回は Nuxt.js でユーザーエージェントを使ってボタンの出し分けをしていきます。

## ユーザーエージェントとは

ユーザーエージェントとは web を閲覧しているユーザーが使用している OS やブラウザのことをいいます。
このユーザーエージェントでユーザーが使用している OS やブラウザの情報を取得して、その情報をもとに条件分岐で値を出し分けることができます。
下記が出し分けのコードになります。

```html
<div>
  <div v-if="isAndroid">google play</div>
  <div v-else-if="isIOS">appstore</div>
</div>
```

```js
<script setup>
  import {useRequestHeaders} from '#app' // ←ここがポイント const ua =
  (useRequestHeaders(['user-agent'])['user-agent'] || '').toLowerCase() const
  isAndroid = /android/.test(ua) const isIOS = /iphone|ipad|ipod/.test(ua)
</script>
```

Nuxt.js では「(useRequestHeaders(['user-agent'])」から、ユーザーエージェントを取得可能です。
例えば iPhoneSE ならば「mozilla/5.0 (iphone; cpu iphone os 18_5 like mac os x ～」のような値が取得できます。
.test メソッドを使って、取得したユーザーエージェントの値から android という単語が含まれているか、または iphone|ipad|ipod が含まれているかを調べさせて真偽値を返しています。
そして v-if を使って、ボタンを出し分けることを可能にしています。
