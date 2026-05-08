import { verifyToken } from '../utils/jwt'

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname
  const publicRoutes = ['/api/auth/login', '/api/auth/register']
  if (!url.startsWith('/api/') || publicRoutes.includes(url)) return

  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : getCookie(event, 'auth_token')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Nicht autorisiert' })
  }
  try {
    const payload = verifyToken(token)
    event.context.userId = Number(payload.sub)
  } catch {
    throw createError({ statusCode: 401, message: 'Token ungültig' })
  }
})
