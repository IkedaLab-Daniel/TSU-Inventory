'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthUser, SESSION_KEY, COOKIE_NAME, findUser } from '@/lib/auth'

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  function login(email: string, password: string): boolean {
    const found = findUser(email, password)
    if (!found) return false
    setUser(found)
    localStorage.setItem(SESSION_KEY, JSON.stringify(found))
    setCookie(COOKIE_NAME, found.id)
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    clearCookie(COOKIE_NAME)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
