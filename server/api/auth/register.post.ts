import bcrypt from 'bcryptjs'
import { useDb } from '../../utils/db'
import { signToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event)

  if (!email || !password || !name) {
    throw createError({ statusCode: 400, message: 'Alle Felder sind erforderlich' })
  }
  if (password.length < 8) {
    throw createError({ statusCode: 400, message: 'Passwort muss mindestens 8 Zeichen haben' })
  }

  const db = useDb()
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    throw createError({ statusCode: 409, message: 'E-Mail bereits registriert' })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const result = db
    .prepare('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)')
    .run(email, name, passwordHash)

  const user = { id: result.lastInsertRowid as number, email, name }
  const token = signToken({ sub: user.id })
  return { token, user }
})
