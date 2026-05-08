import jwt from 'jsonwebtoken'
import { useRuntimeConfig } from '#imports'

export function signToken(payload: object): string {
  const { jwtSecret } = useRuntimeConfig()
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string): jwt.JwtPayload {
  const { jwtSecret } = useRuntimeConfig()
  return jwt.verify(token, jwtSecret) as jwt.JwtPayload
}
