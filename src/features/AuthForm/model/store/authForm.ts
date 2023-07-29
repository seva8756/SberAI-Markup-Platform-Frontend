import { defineStore } from 'pinia'
import type { AuthState } from '@/features/AuthForm/model/types/authState'
import AuthService from '@/features/AuthForm/model/services/AuthService'
import { useUserStore } from '@/entities/User'

const userStore = useUserStore()

export const useAuthFormStore = defineStore('loginForm', {
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
    isLoading: false
  }),
  actions: {
    async login() {
      if (this.loginForm.email && this.loginForm.password) {
        try {
          this.isLoading = true
          const response = await AuthService.login(this.loginForm.email, this.loginForm.password)
          userStore.userData = response.data
        } catch (e: any) {
          console.log(e)
        } finally {
          this.$reset()
          this.isLoading = false
        }
      }
    },
    async register() {
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
        } catch (e) {
          console.log(e)
        } finally {
          this.$reset()
          this.isLoading = false
        }
      }
    },
    async logout() {
      try {
        this.isLoading = true
        await AuthService.logout()
        userStore.userData = null
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
