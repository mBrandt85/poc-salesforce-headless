export type SendEmail = (to: string, subject: string, body: string) => Promise<boolean>

export interface EmailProviderProps {
  children: React.ReactNode
}

export interface EmailContextType {
  loading: boolean
  sendEmail: SendEmail
}
