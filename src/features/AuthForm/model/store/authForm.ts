import { defineStore } from 'pinia'
import type { AuthState } from '@/features/AuthForm/model/types/authState'
import AuthService from '@/features/AuthForm/model/services/AuthService'
import { useUserStore } from '@/entities/User'
import { AxiosError } from 'axios'

export const useAuthFormStore = defineStore('authForm', {
  state: (): AuthState => ({
    loginForm: {
      email: '',
      password: ''
    },
    registerForm: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    isLoading: false,
    error: null
  }),
  actions: {
    async login() {
      const userStore = useUserStore()

      if (this.loginForm.email && this.loginForm.password) {
        try {
          this.isLoading = true
          const response = await AuthService.login(this.loginForm.email, this.loginForm.password)
          userStore.userData = response.data
          this.$reset()
        } catch (e) {
          if (e instanceof AxiosError) {
            console.log(e)
            this.error = e.response?.data?.error
          } else {
            console.log(e)
          }
        } finally {
          this.isLoading = false
        }
      }
    },
    async register() {
      const userStore = useUserStore()

      if (Object.values(this.registerForm).every((el) => el)) {
        try {
          this.isLoading = true
          const response = await AuthService.registration(
            this.registerForm.email,
            this.registerForm.password,
            this.registerForm.firstName,
            this.registerForm.lastName
          )
          userStore.userData = response.data
          this.$reset()
        } catch (e) {
          if (e instanceof AxiosError) {
            this.error = e.response?.data?.error
            console.log(e)
          } else {
            console.log(e)
          }
        } finally {
          this.isLoading = false
        }
      }
    },
    async logout() {
      const userStore = useUserStore()

      try {
        this.isLoading = true
        await AuthService.logout()
        userStore.userData = null
      } catch (e) {
        if (e instanceof AxiosError) {
          this.error = e.response?.data?.error
        } else {
          console.log(e)
        }
      } finally {
        this.isLoading = false
      }
    },
    clearError() {
      this.error = null
    }
  }
})
