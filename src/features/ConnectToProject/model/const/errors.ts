export type ConnectionToProjectErrors = 'errProjectNotFound'

export const connectionErrMapper: Record<ConnectionToProjectErrors, string> = {
  errProjectNotFound: 'Проект не найден'
}
