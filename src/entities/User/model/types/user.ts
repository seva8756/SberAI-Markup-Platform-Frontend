export interface User {
  ID: number
  firsName: string
  lastName: string
  isAdmin: boolean
}

export interface UserState {
  userData: User | null
  mounted?: boolean
  isLoading: boolean
}
