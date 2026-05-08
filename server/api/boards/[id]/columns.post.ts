import { useDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const boardId = Number(getRouterParam(event, 'id'))
  const { name } = await readBody(event)
  if (!name) throw createError({ statusCode: 400, message: 'Name ist erforderlich' })

  const board = db
    .prepare('SELECT id FROM boards WHERE id = ? AND owner_id = ?')
    .get(boardId, event.context.userId)
  if (!board) throw createError({ statusCode: 404, message: 'Board nicht gefunden' })

  const pos = (db
    .prepare('SELECT COALESCE(MAX(position), -1) + 1 AS pos FROM columns WHERE board_id = ?')
    .get(boardId) as { pos: number }).pos

  const result = db
    .prepare('INSERT INTO columns (board_id, name, position) VALUES (?, ?, ?)')
    .run(boardId, name, pos)

  return { id: result.lastInsertRowid, name, position: pos }
})
