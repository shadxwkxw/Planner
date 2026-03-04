import { getAccessToken, removeFromStorage } from '@/services/auth-token.service'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'
import { authService } from '@/services/auth.service'

const options:CreateAxiosDefaults = {
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // указываем что работаем с серверными cookie
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

// запрос с авторизацией
axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken) // если конфиг существует, к его header добаляем access token
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

// запрос без авторизации
axiosClassic.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 || 
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config && !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }
    throw error
  }
)

export { axiosClassic, axiosWithAuth }