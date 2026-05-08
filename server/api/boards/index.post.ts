import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { name, description = '' } = await readBody(event)
  if (!name) throw createError({ statusCode: 400, message: 'Name ist erforderlich' })

  const db = useDb()
  const result = db
    .prepare('INSERT INTO boards (owner_id, name, description) VALUES (?, ?, ?)')
    .run(event.context.userId, name, description)

  return { id: result.lastInsertRowid, name, description }
})
