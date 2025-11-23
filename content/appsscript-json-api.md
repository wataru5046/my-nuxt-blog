---
title: "ページ側からスプレッドシートの値を読み込む方法"
date: "2025-09-14T17:47:54.329Z"
---

職場でスプレッドシートの値とページ側の表示を連携してほしいという依頼がありました。今回は app script を使ってスプレッドシートとページ側を連携させる方法を紹介します。

## スプレッドシート側から WEB API を作成する

まずはスプレッドシートを開き、「拡張機能」の「Apps script」を開きます。

そして Apps script で doGet()メソッドを配置します。doGet()メソッドは、ページ側からスプレッドシートにアクセスしたときに処理が走ります。下記のコードではスプレッドシートの値を一列目をキーにして、二列目を value にして json 形式にしています。「シート」の部分は、自分が使っているスプレッドシートのシート名をいれて下さい。

```script

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("シート1");
  const values = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();

  // 1行目をキーとして、オブジェクト形式に整形
  const header = values.shift();
  const data = values.map(row => {
    let obj = {};
    header.forEach((key, i) => (obj[key] = row[i]));
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}


```

## WEB API として公開する

ページ側からスプレッドシートの値にアクセスするには WEB API として公開する必要があります。Apps script の右上の「デプロイ」から「新しいデプロイ」を選択。アクセスできるユーザーを全員にします。

するとウェブアプリ用の URL で「https://script.google.com/macros/s/XXXXXXX/exec」
という形式の URL が表示されるので、その URL をコピーします。

## ページ側からスプレッドシートにアクセスする

さきほどのウェブアプリ用の URL を使ってスプレッドシートのデータを表示してみます。useFetch で API からデータを取得できます。

```script

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

```

上記のコードで下記のようにスプレッドシートの値をページに表示できました。

![説明文](/images/nuxt/apps-script/apps-script-api_1.png)

アクセスしたスプレッドシートの内容は下記のとおりです。

![説明文](/images/nuxt/apps-script/apps-script-api_2.png)
