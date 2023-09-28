export type GetLeads = () => Promise<void>
export type ClearLeads = () => void

export interface Lead {
  ActivityDate: string
  Id: string
  Owner: {
    Name: string
  }
  OwnerId: string
  Priority: string
  Status: string
  Who: {
    Name: string
  }
  WhoId: string
  
}

export interface LeadsProviderProps {
  children: React.ReactNode
}

export interface LeadsContextType {
  loading: boolean
  assigned: number
  completed: number
  total: number
  getLeads: GetLeads
  clearLeads: ClearLeads
}
