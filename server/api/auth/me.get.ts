import { useDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const db = useDb()
  const user = db
    .prepare('SELECT id, email, name FROM users WHERE id = ?')
    .get(event.context.userId) as { id: number; email: string; name: string } | undefined

  if (!user) throw createError({ statusCode: 404, message: 'Benutzer nicht gefunden' })
  return { user }
})
