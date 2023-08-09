export interface User {
  ID: number
  firstName: string
  lastName: string
  isAdmin: boolean
}

export interface UserState {
  userData: User | null
  mounted?: boolean
  isLoading: boolean
}
