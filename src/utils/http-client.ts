import axios, { AxiosInstance } from "axios"
const baseURL = "/admin-api"

export const accessTokenKey = "access_token" as const
export const refreshTokenKey = "refresh_token" as const

// Create an Axios instance with default configuration
export const httpClient: AxiosInstance = axios.create({ baseURL })
// Add a request interceptor to set the bearer token
httpClient.interceptors.request.use(
  (config) => {
    // Check if a bearer token is available
    const token = localStorage.getItem(accessTokenKey)
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
