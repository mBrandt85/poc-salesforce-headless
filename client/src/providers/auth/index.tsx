import { createContext, useCallback, useState } from 'react'
import { AuthContextType, AuthProviderProps, AuthResponse, Login, Logout, User } from './types'

export const AuthContext = createContext({} as AuthContextType)

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const isAuth = !!token && !!user

  const login: Login = useCallback(async (username, password) => {
    setLoading(true)

    try {
      const req = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const res: AuthResponse = await req.json()
      
      if (res.error)
        throw new Error(res.error)

      const { token, user } = res
      setToken(token)
      setUser(user)
      console.log(`token: ${token}`)
    } catch (error) {
      console.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout: Logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{
    loading,
    token,
    user,
    isAuth,
    login,
    logout
  }}>
    {children}
  </AuthContext.Provider>
}