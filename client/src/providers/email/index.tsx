import { createContext, useCallback, useState } from 'react'
import { EmailContextType, EmailProviderProps, SendEmail } from './types'
import { useAuth } from '..'

export const EmailContext = createContext({} as EmailContextType)

export default function EmailProvider({ children }: EmailProviderProps) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)

  const sendEmail: SendEmail = async (to, subject, body) => {
    setLoading(true)
    let bool

    try {
      const data = await fetch('http://localhost:3001/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ to, subject, body })
      }).then(data => data.json())
      
      if (data.error)
        throw new Error(data.error)

      bool = data.success
    } catch (error) {
      console.error((error as Error).message)
      bool = false
    } finally {
      setLoading(false)
      return bool
    }
  }

  return <EmailContext.Provider value={{
    loading,
    sendEmail
  }}>
    {children}
  </EmailContext.Provider>
}