import { useDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const columnId = Number(getRouterParam(event, 'id'))
  const { title } = await readBody(event)
  if (!title) throw createError({ statusCode: 400, message: 'Titel ist erforderlich' })

  const pos = (db
    .prepare('SELECT COALESCE(MAX(position), -1) + 1 AS pos FROM tasks WHERE column_id = ?')
    .get(columnId) as { pos: number }).pos

  const result = db
    .prepare('INSERT INTO tasks (column_id, title, position) VALUES (?, ?, ?)')
    .run(columnId, title, pos)

  return { id: result.lastInsertRowid, title, position: pos }
})
