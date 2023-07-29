import axios from 'axios'

export const API_URL = 'http://127.0.0.1:5000'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

// $api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//   return config
// })

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post(`${API_URL}/users/refresh`, { withCredentials: true })
        return $api.request(originalRequest)
      } catch (e) {
        console.log('Unauthorised')
      }
    }
    throw error
  }
)
export default $api
