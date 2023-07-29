export interface AuthState {
  loginForm: LoginForm
  registerForm: RegisterForm
  isLoading: boolean
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
