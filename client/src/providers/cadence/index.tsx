import { createContext, useState } from 'react'
import { CadenceContextType, CadenceProviderProps, Cadence, GetCadence, ClearCadence, AddCadence } from './types'
import { useAuth } from '..'

export const CadenceContext = createContext({} as CadenceContextType)

export default function CadenceProvider({ children }: CadenceProviderProps) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState<Cadence[]>([])
  const [completed, setCompleted] = useState<Cadence[]>([])

  const getCadence: GetCadence = async id => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/cadence/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const { data } = await res.json()
    
      setCurrent(data.current)
      setCompleted(data.completed)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const addCadence: AddCadence = async id => {
    if (!token) 
    return

  setLoading(true)

  try {
    const res = await fetch(`http://localhost:3001/api/cadence/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    const data = await res.json()
  
    console.log(data)

    await new Promise(resolve => {
      setTimeout(async () => {
        await getCadence(id)
        resolve(true)
      }, 2000)
    })
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
  }

  const clearCadence: ClearCadence = () => {
    setCurrent([])
  }

  return <CadenceContext.Provider value={{
    loading,
    current,
    completed,
    getCadence,
    addCadence,
    clearCadence
  }}>
    {children}
  </CadenceContext.Provider>
}