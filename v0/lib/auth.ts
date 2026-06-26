export type UserRole = 'MIS Admin' | 'MIS Staff'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  initials: string
}

interface MockCredential extends AuthUser {
  password: string
}

export const MOCK_USERS: MockCredential[] = [
  {
    id: 'USR-001',
    name: 'Dr. Jose Dela Cruz',
    email: 'admin@tau.edu.ph',
    password: 'admin123',
    role: 'MIS Admin',
    initials: 'JD',
  },
  {
    id: 'USR-002',
    name: 'Maria Santos',
    email: 'staff@tau.edu.ph',
    password: 'staff123',
    role: 'MIS Staff',
    initials: 'MS',
  },
]

export const SESSION_KEY = 'ict_ims_user'
export const COOKIE_NAME = 'ict_ims_session'

export function findUser(email: string, password: string): AuthUser | null {
  const found = MOCK_USERS.find(
    u => u.email === email && u.password === password
  )
  if (!found) return null
  const { password: _pw, ...user } = found
  return user
}
