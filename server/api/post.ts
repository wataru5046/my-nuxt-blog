import { writeFile } from 'fs/promises'
import { defineEventHandler, readFormData } from 'h3'
import path from 'path'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('body') as string

  if (!title || !slug || !content) {
    return {
      success: false,
      message: 'すべての項目を入力してください。',
    }
  }

  // 画像タグの前後に改行がなければ挿入（正規表現で調整）
const contentWithLineBreaks = content
  .replace(/(?<!\n)<img /g, '\n<img ')       // 前に改行がなければ追加
  .replace(/>(?!\n)/g, '>\n')       

const markdown = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${contentWithLineBreaks}
`

  const filePath = path.resolve(`./content/${slug}.md`)
  try {
    await writeFile(filePath, markdown, 'utf-8')
    return {
      success: true,
      message: '記事が保存されました。',
    }
  } catch (err) {
    console.error('保存エラー:', err)
    return {
      success: false,
      message: '保存に失敗しました。',
    }
  }
})