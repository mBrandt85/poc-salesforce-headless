import { useContext } from "react"
import { BrowserRouter } from "react-router-dom"

import MuiProvider from "./mui"
import AuthProvider, { AuthContext } from './auth'
import TasksProvider, { TasksContext } from "./tasks"
import CustomersProvider, { CustomersContext } from "./customers"
import LeadsProvider, { LeadsContext } from "./leads"
import CadenceProvider, { CadenceContext } from "./cadence"
import EmailProvider, { EmailContext } from "./email"

interface ProviderProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return (
    <BrowserRouter>
      <MuiProvider>
        <AuthProvider>
          <TasksProvider>
            <LeadsProvider>
              <CustomersProvider>
                <CadenceProvider>
                  <EmailProvider>
                    {children}
                  </EmailProvider>
                </CadenceProvider>
              </CustomersProvider>
            </LeadsProvider>
          </TasksProvider>
        </AuthProvider>
      </MuiProvider>
    </BrowserRouter>
  )
}

export const useAuth = () => useContext(AuthContext)
export const useTasks = () => useContext(TasksContext)
export const useLeads = () => useContext(LeadsContext)
export const useCustomers = () => useContext(CustomersContext)
export const useCadence = () => useContext(CadenceContext)
export const useEmail = () => useContext(EmailContext)