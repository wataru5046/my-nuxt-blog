import { defineEventHandler, readBody, setCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (username !== 'test1' || password !== 'test123') {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  setCookie(event, 'auth_token', 'test-token', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return { success: true }
})