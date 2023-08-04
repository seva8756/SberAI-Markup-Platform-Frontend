import { describe, expect, test, vi, beforeEach } from 'vitest'
import type { User } from '@/entities/User'
import AuthService from '../services/AuthService'

// vi.mock('axios', axiosFactory)
//
// const mockedAxios = vi.mocked(axios, true)

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn()
}))

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>()

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post
      }))
    }
  }

  return mockAxios
})

describe('authService', () => {
  beforeEach(() => {
    mocks.post.mockReset()
  })
  test('login success', async () => {
    const mockedUserData: User = {
      ID: 1,
      firsName: 'first',
      lastName: 'last',
      isAdmin: false
    }
    mocks.post.mockResolvedValue({
      data: mockedUserData
    })
    const loginUser = await AuthService.login('test@test.ru', '123456')

    expect(mocks.post).toHaveBeenCalled()
    expect(loginUser.data).toStrictEqual(mockedUserData)
  })
  test('login error', async () => {
    mocks.post.mockResolvedValue({
      status: 403
    })
    const loginUser = await AuthService.login('test@test.ru', '123456')

    expect(mocks.post).toHaveBeenCalled()
    expect(loginUser.status).toBe(403)
  })
})
