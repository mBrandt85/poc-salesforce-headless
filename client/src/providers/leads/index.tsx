import { createContext, useState } from 'react'
import { LeadsContextType, LeadsProviderProps, Lead, GetLeads, ClearLeads } from './types'
import { useAuth } from '..'

export const LeadsContext = createContext({} as LeadsContextType)

export default function LeadsProvider({ children }: LeadsProviderProps) {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [assigned, setAssigned] = useState<number>(0)
  const [completed, setCompleted] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const getLeads: GetLeads = async () => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/leads?userId=${user?.Id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const { data } = await res.json()
    
      setAssigned(data.assigned)
      setCompleted(data.completed)
      setTotal(data.total)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clearLeads: ClearLeads = () => {
    setAssigned(0)
    setCompleted(0)
    setTotal(0)
  }

  return <LeadsContext.Provider value={{
    loading,
    assigned,
    completed,
    total,
    getLeads,
    clearLeads
  }}>
    {children}
  </LeadsContext.Provider>
}