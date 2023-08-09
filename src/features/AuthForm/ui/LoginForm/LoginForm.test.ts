import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { componentRender } from '@/shared/lib/tests/componentRender'
import LoginForm from './LoginForm.vue'
import { useAuthFormStore } from '../../model/store/authForm'
import { AuthForm } from '../../const/const'
import $api from '@/shared/api/api'
import axios from 'axios'
import type { User } from '@/entities/User'
import { useUserStore } from '@/entities/User'
import AuthService from '../../model/services/AuthService/AuthService'

// const mocks = vi.hoisted(() => ({
//   get: vi.fn(),
//   post: vi.fn()
// }))
//
// vi.mock('axios', async (importActual) => {
//   const actual = await importActual<typeof import('axios')>()
//
//   const mockAxios = {
//     default: {
//       ...actual.default,
//       create: vi.fn(() => ({
//         ...actual.default.create(),
//         get: mocks.get,
//         post: mocks.post
//       }))
//     }
//   }
//
//   return mockAxios
// })

const mocks = vi.hoisted(() => ({
  login: vi.fn()
}))
vi.mock('../../model/services/AuthService.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof AuthService>()
  return {
    ...mod,
    login: mocks.login
  }
})
const initialState = {
  authForm: {
    loginForm: {
      email: '',
      password: ''
    }
  }
}

describe('feature/LoginForm', () => {
  beforeEach(() => {
    // mocks.post.mockReset()
    // axios.interceptors = {
    //   request: vi.fn,
    //   response: vi.fn
    // }
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  test('email filed should be saved into store', async () => {
    const { getByTestId } = componentRender(LoginForm, initialState, {
      formType: AuthForm.LOGIN
    })
    const authStore = useAuthFormStore()
    const emailInput = getByTestId('LoginForm.input')
    await fireEvent.update(emailInput, 'test@test.ru')
    expect(authStore.loginForm.email).toBe('test@test.ru')
  })
  // test('loader should appear', async () => {
  //   const { getByTestId } = componentRender(LoginForm, initialState, {
  //     formType: AuthForm.LOGIN
  //   })
  //   const mockedUserData: User = {
  //     ID: 1,
  //     firstName: 'first',
  //     lastName: 'last',
  //     isAdmin: false
  //   }
  //   // mocks.post.mockResolvedValue({
  //   //   data: mockedUserData
  //   // })
  //   const authStore = useAuthFormStore()
  //   const userStore = useUserStore()
  //   const emailInput = getByTestId('LoginForm.input')
  //   const passwordInput = getByTestId('LoginForm.password')
  //   const loginBtn = getByTestId('LoginForm.loginBtn')
  //   await fireEvent.update(emailInput, 'test@test.ru')
  //   await fireEvent.update(passwordInput, '123456')
  //   // await fireEvent.click(loginBtn)
  //   await authStore.login()
  //   // await authStore.login()
  //
  //   // expect(userStore.userData).toStrictEqual(mockedUserData)
  //   expect(authStore.isLoading).toBe(true)
  // })
})
