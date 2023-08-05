import type { User } from '@/entities/User'
import $api from '@/shared/api/api'

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post<User>('users/login', { email, password })
  }
  static async registration(email: string, password: string, firstName: string, lastName: string) {
    return $api.post<User>('users/create', { email, password, firstName, lastName })
  }
  static async logout() {
    return $api.post('users/logout')
  }
}
