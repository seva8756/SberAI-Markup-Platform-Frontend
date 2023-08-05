import { ValidationErrors } from '../../const/const'

export interface AuthState {
  loginForm: LoginForm
  registerForm: RegisterForm
  isLoading: boolean
  error: string | null
  validationErrors: ValidationErrors[]
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface RegisterFormState {
  form: RegisterForm
  isLoading: boolean
}
