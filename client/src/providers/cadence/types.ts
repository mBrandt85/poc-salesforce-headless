export type GetCadence = (id: string) => Promise<void>
export type AddCadence = (id: string) => Promise<void>
export type ClearCadence = () => void

export interface Cadence {
  attributes: {
    type: string
    url: string
  },
  Id: string
  StepTitle: string
  State: 'Active' | 'Completed',
  Target: {
    attributes: {
      type: string
      url: string
    },
    Name: string
  },
  ActionCadenceStep: {
    attributes: {
      type: string
      url: string
    },
    StepComments: string
  },
  StepType: string
}

export interface CadenceProviderProps {
  children: React.ReactNode
}

export interface CadenceContextType {
  loading: boolean
  current: Cadence[]
  completed: Cadence[]
  getCadence: GetCadence
  addCadence: AddCadence
  clearCadence: ClearCadence
}
