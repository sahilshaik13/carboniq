import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('carboniq_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('carboniq_token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient

// API Methods
export const authAPI = {
  register: (email: string, password: string, fullName: string) =>
    axios.post(`${API_BASE_URL}/auth/register`, { email, password, full_name: fullName }),
  login: (email: string, password: string) =>
    axios.post(`${API_BASE_URL}/auth/login`, { email, password }),
  verify: () => apiClient.post('/auth/verify'),
}

export const activitiesAPI = {
  create: (activity: any) => apiClient.post('/activities', activity),
  list: (userId: string) => apiClient.get(`/activities/${userId}`),
  delete: (id: string) => apiClient.delete(`/activities/${id}`),
}

export const insightsAPI = {
  get: (userId: string) => apiClient.get(`/insights/${userId}`),
  generate: (data: any) => apiClient.post('/insights', data),
}

export const dashboardAPI = {
  getStats: (userId: string) => apiClient.get(`/dashboard/${userId}`),
}

export const emissionsAPI = {
  getFactors: () => apiClient.get('/emissions-factors'),
  calculate: (data: any) => apiClient.post('/emissions/calculate', data),
}
