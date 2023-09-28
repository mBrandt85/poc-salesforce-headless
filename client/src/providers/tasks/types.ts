export type GetTasks = () => Promise<void>
export type GetTask = (id: string) => Promise<void>
export type ClearTasks = () => void

export interface Task {
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

export interface TasksProviderProps {
  children: React.ReactNode
}

export interface TasksContextType {
  loading: boolean
  tasks: Task[]
  getTasks: GetTasks
  getTask: GetTask
  clearTasks: ClearTasks
}
