import { useDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const db = useDb()
  const boardId = Number(getRouterParam(event, 'id'))

  const board = db
    .prepare('SELECT id, name, description FROM boards WHERE id = ? AND owner_id = ?')
    .get(boardId, event.context.userId) as { id: number; name: string; description: string } | undefined

  if (!board) throw createError({ statusCode: 404, message: 'Board nicht gefunden' })

  const columns = db
    .prepare('SELECT id, name, position FROM columns WHERE board_id = ? ORDER BY position')
    .all(boardId) as { id: number; name: string; position: number }[]

  const enriched = columns.map((col) => ({
    ...col,
    tasks: db
      .prepare('SELECT id, title, position FROM tasks WHERE column_id = ? ORDER BY position')
      .all(col.id),
  }))

  return { board, columns: enriched }
})
