---
title: "js"
date: "2025-07-05T16:07:58.656Z"
---


```js
const insertHeading = () =>
 {
  if (headingLevel.value) {
    const level = headingLevel.value
    const headingText = prompt(`H${level} 見出しのテキストを入力してください:`)
    if (headingText) {
      const markdown = `${'#'.repeat(Number(level))} ${headingText}
`
      body.value += markdown
    }
    headingLevel.value = ''
  }
}
```

