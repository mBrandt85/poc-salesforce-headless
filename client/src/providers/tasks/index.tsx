import { createContext, useCallback, useState } from 'react'
import { TasksContextType, TasksProviderProps, Task, GetTasks, ClearTasks, GetTask } from './types'
import { useAuth } from '..'

export const TasksContext = createContext({} as TasksContextType)

export default function TasksProvider({ children }: TasksProviderProps) {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const getTasks: GetTasks = async () => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const { data } = await res.json()
    
      setTasks(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getTask: GetTask = async id => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const { data } = await res.json()
    
      setTasks(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clearTasks: ClearTasks = () => setTasks([])

  return <TasksContext.Provider value={{
    loading,
    tasks,
    getTasks,
    getTask,
    clearTasks
  }}>
    {children}
  </TasksContext.Provider>
}