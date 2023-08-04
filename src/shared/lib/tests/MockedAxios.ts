import axios from 'axios'
import { vi } from 'vitest'

export const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn()
}))

export const axiosFactory = async (importActual: <T = unknown>() => Promise<T>) => {
  const actual = await importActual<typeof import('axios')>()
  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.fn,
        post: mocks.fn
      }))
    }
  }

  return mockAxios
}

// export const mockedAxios = vi.mocked(axios, true)
