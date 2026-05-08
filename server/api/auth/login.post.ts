import bcrypt from 'bcryptjs'
import { useDb } from '../../utils/db'
import { signToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'E-Mail und Passwort erforderlich' })
  }

  const db = useDb()
  const user = db
    .prepare('SELECT id, email, name, password_hash FROM users WHERE email = ?')
    .get(email) as { id: number; email: string; name: string; password_hash: string } | undefined

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw createError({ statusCode: 401, message: 'Ungültige Anmeldedaten' })
  }

  const token = signToken({ sub: user.id })
  return { token, user: { id: user.id, email: user.email, name: user.name } }
})
