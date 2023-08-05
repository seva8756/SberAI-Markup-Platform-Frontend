import { defineStore } from 'pinia'
import type { AuthState } from '../types/authState'
import AuthService from '../services/AuthService/AuthService'
import { useUserStore } from '@/entities/User'
import { AxiosError } from 'axios'
import { ValidateAuthData } from '../services/ValidateAuthData/ValidateAuthData'

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
    error: null,
    validationErrors: []
  }),
  actions: {
    async login() {
      const userStore = useUserStore()
      this.validationErrors = ValidateAuthData(this.loginForm)
      if (!this.validationErrors.length) {
        try {
          this.isLoading = true

          const response = await AuthService.login(this.loginForm.email, this.loginForm.password)
          userStore.userData = response.data
          this.$reset()
        } catch (e) {
          if (e instanceof AxiosError) {
            const axiosError = JSON.parse(e.response?.data?.error)
            this.validationErrors.push(axiosError.name)
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
      this.validationErrors = ValidateAuthData(this.registerForm)

      if (!this.validationErrors.length) {
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
            const axiosError = JSON.parse(e.response?.data?.error)
            this.validationErrors.push(axiosError.name)
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
