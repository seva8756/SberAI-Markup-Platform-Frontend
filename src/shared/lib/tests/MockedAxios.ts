import axios, { type AxiosStatic } from 'axios'
import { type MockedFunction, vi } from 'vitest'
vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

export class TestAsync {
  api: MockedFunction<AxiosStatic>
  constructor() {
    this.api = mockedAxios
  }
}
