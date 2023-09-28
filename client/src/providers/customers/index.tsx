import { createContext, useState } from 'react'
import { CustomersContextType, CustomersProviderProps, Customer, GetCustomers, ClearCustomers, CreateCustomer, GetCustomer } from './types'
import { useAuth } from '..'

export const CustomersContext = createContext({} as CustomersContextType)

export default function CustomersProvider({ children }: CustomersProviderProps) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])

  const getCustomers: GetCustomers = async () => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const { data } = await res.json()
      
      setCustomers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getCustomer: GetCustomer = async (id) => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/customers/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const { data } = await res.json()
      
      setCustomers([{ ...data }])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const createCustomer: CreateCustomer = async (customer) => {
    if (!token) 
      return

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3001/api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customer)
      })
      
      const { data } = await res.json()
      
      return data
    } catch (error) {
      console.log(error)
      return ''
    } finally {
      setLoading(false)
    }
  }

  const clearCustomers: ClearCustomers = () => setCustomers([])

  return <CustomersContext.Provider value={{
    loading,
    customers,
    getCustomers,
    getCustomer,
    createCustomer,
    clearCustomers
  }}>
    {children}
  </CustomersContext.Provider>
}