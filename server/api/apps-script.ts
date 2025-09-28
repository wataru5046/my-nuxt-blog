// server/api/receive-json.ts
import { writeFile } from 'fs/promises'
import { defineEventHandler, readBody } from 'h3'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Apps Script から送られてきたデータを受け取る
    const body = await readBody(event)

    // JSON文字列として保存する
    const filePath = path.resolve('./public/data.json')
    await writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8')

    return {
      success: true,
      message: 'JSONファイルを生成しました。',
      path: '/data.json',
    }
  } catch (err) {
    console.error('保存エラー:', err)
    return {
      success: false,
      message: '保存に失敗しました。',
    }
  }
})