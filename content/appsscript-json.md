---
title: "Google Apps Script（GAS）でjsonファイルを生成、ダウンロードできるようにする"
date: "2025-09-23T14:23:19.922Z"
---

スプレッドシートで管理しているデータを外部システムや Web アプリに連携させたいとき、まず必要になるのが「JSON 形式への変換」です。手作業でコピー＆ペーストして整形するのは時間の無駄ですし、人的ミスの原因にもなります。Google Apps Script（GAS）を活用すれば、シートの 1 行目をキー、2 行目以降を値として自動的に JSON を生成し、そのままダウンロードできる仕組みを組み込むことが可能です。この記事では、実務でそのまま使えるコード例とともに、効率的に JSON を扱うためのポイントを解説します。

## スプレッドシートに key と value の値を入力する

まずはスプレッドシートに一列目を key の値、2 列目以降を value の値を入れていきます。今回は商品リストの json ファイルを作成しようとしています。

また共有のステータスを「リンクを知っている全員」に変更しましょう。公開状態にしないと Apps Script が作動しないためです。

<img src="/uploads/8a0f78ee-3d1a-4d9c-8671-b55ba8d65e2f-スクリーンショット 2025-09-23 230021.png" alt="説明">

##Apps Script で json ファイルを作成する

ではここから Apps Script の作業に入ります。まず json ファイルをダウンロードする用のボタンを作成します。

### ダウンロード用のボタンを作成する

```script
function onOpen() {
  // スプレッドシートが開いたときにメニューを追加
  SpreadsheetApp.getUi()
    .createMenu("📂 エクスポート")   // メニュー名（好きに変えられる）
    .addItem("JSONをダウンロード", "showDownloadButton") // メニュー項目
    .addToUi();
}
```

上記の onOpen 関数を実行すればスプレッドシートのメニューにダウンロードボタンを配置できます。

onOpen 関数を作ったら、実行を押しましょう。

<img src="/uploads/a8fc5c9a-9a25-4465-98cc-00276b64ae81-スクリーンショット 2025-09-23 230853.png" alt="説明">

実行すると「エクスポート」というのメニューが増えています。こちらがダウンロード用のボタンです。

<img src="/uploads/251cbfc8-179a-462d-a653-6dc00f858e8a-スクリーンショット 2025-09-23 230710.png" alt="説明">

### スプレッドシートの値を json ファイルに変換

ダウンロードボタンを押したら、次に作成する関数「showDownloadButton」が起動し、ダイアログが表示されて、ダウンロードできるというのが実装の流れです。

「showDownloadButton」関数の全体のコードは下記のとおりです。

```script
function showDownloadButton() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getDataRange().getValues();
  const keys = values[0];

  const data = values.slice(1).map(row =>
 {
    let obj = {};
    keys.forEach((key, i) =>
 obj[key] = row[i]);
    return obj;
  });

  const json = JSON.stringify(data, null, 2);

  // UTF-8 に変換してから Base64 エンコード
  const encoded = Utilities.base64Encode(
    Utilities.newBlob(json, "application/json", "data.json").getBytes()
  );

  const html = HtmlService.createHtmlOutput(`
    <html>
      <body>
        <h3>JSONをダウンロードできます</h3>
        <a id="dl" download="data.json"
           href="data:application/json;charset=utf-8;base64,${encoded}">
           <button>ダウンロード</button>
        </a>
      </body>
    </html>
  `).setWidth(300).setHeight(150);
  SpreadsheetApp.getUi().showModalDialog(html, "JSONダウンロード");

```

const keys = values[0];がキーで、values.slice(1).map ～で 2 行目以降の値を value の値にして json 形式のデータに変換しています。

HtmlService.createHtmlOutput(`がボタンを押したときのダイアログです。

<img src="/uploads/dbb616a2-2fd0-4a1e-9718-53e3733f56c8-スクリーンショット 2025-09-23 232126.png" alt="説明">

上記のダイアログで「ダウンロード」を押すと、json ファイルをダウンロードできます。
