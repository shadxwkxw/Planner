import Cookies from 'js-cookie'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken'
}

// получаем access token
export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

// сохранем access token
export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1
  })
}

// удаляем access token
export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
}