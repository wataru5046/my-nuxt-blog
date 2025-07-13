import { defineEventHandler, readFormData } from 'h3'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const image = formData.get('image') as File

  if (!image) {
    return { success: false, message: '画像がありません' }
  }

  const buffer = Buffer.from(await image.arrayBuffer())
  const filename = `${uuidv4()}-${image.name}`
  const filePath = path.resolve(`./public/uploads/${filename}`)

  await writeFile(filePath, buffer)

  return {
    success: true,
    url: `/uploads/${filename}`,
  }
})
