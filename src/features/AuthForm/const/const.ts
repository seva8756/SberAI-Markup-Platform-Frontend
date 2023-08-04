export enum AuthForm {
  LOGIN,
  REGISTER
}

export enum ResponseError {
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password'
}

export const ErrorMessage: Record<string, string> = {}
