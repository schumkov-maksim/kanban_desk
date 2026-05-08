import { useDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const db = useDb()
  return db
    .prepare('SELECT id, name, description FROM boards WHERE owner_id = ? ORDER BY created_at DESC')
    .all(event.context.userId)
})
