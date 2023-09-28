export type GetCustomers = () => Promise<void>
export type GetCustomer = (id: string) => Promise<void>
export type CreateCustomer = (customer: Customer) => Promise<string>
export type ClearCustomers = () => void

export interface Customer {
  Id?: string
  CreatedDate: string
  CurrencyIsoCode: string 
  Description: string 
  Email: string
  FirstName: string
  LastModifiedDate: string
  Phone: number
  LastName: string
  LeadSource: string
  Market__c: string
  Model__c: string
  Name: string
  Owner: {
    Name: string
  } 
  OwnerId: string
  Preferred_Contact_Date__c: string
  Preferred_Contact_Timeslot__c: string
  Rating: string
  Status: string
}

export interface CustomersProviderProps {
  children: React.ReactNode
}

export interface CustomersContextType {
  loading: boolean
  customers: Customer[]
  getCustomers: GetCustomers
  getCustomer: GetCustomer
  createCustomer: CreateCustomer
  clearCustomers: ClearCustomers
}
