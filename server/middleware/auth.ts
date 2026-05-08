import { verifyToken } from '../utils/jwt'

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname
  const publicRoutes = ['/api/auth/login', '/api/auth/register']
  if (!url.startsWith('/api/') || publicRoutes.includes(url)) return

  const auth = getHeader(event, 'authorization')
  if (!auth?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Nicht autorisiert' })
  }
  try {
    const payload = verifyToken(auth.slice(7))
    event.context.userId = Number(payload.sub)
  } catch {
    throw createError({ statusCode: 401, message: 'Token ungültig' })
  }
})
