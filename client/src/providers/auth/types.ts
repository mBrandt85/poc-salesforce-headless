export type Login = (email: string, password: string) => void
export type Logout = () => void
export type FetchUserInfo = (token: string) => Promise<User | null>

export interface User {
  Id: string,
  Username: string,
  LastName: string,
  FirstName: string,
  Name: string,
  Email: string,
  VCC_Market__c: string,
  Migration_CDS_ID__c: string,
  UserRole: {
    attributes: {
      type: string,
      url: string
    },
    Name: string
  }
}

export interface AuthResponse {
  token: string
  user: User
  error?: string
}

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface AuthContextType {
  loading: boolean
  token: string | null
  user: User | null
  isAuth: boolean
  login: Login
  logout: Logout
}
