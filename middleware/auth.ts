export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    const cookieHeader = useRequestHeaders(['cookie'])['cookie'] || ''
    const token = cookieHeader
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('auth_token='))?.split('=')[1]

    if (token !== 'test-token') {
      return navigateTo('/login')
    }
  } else {
    // クライアント側ではチェックをスキップ（SSRで済むなら）
    return
  }
})