export {}

export type Roles = 'USER' | 'ADMIN'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}