// интерфейс формы авторизации
export interface IAuthForm {
  email: string
  password: string
}

// интерфейс пользователя
export interface IUser {
  id: number
  name?: string
  email: string

  workInterval?: number
  breakInterval?: number
  intervalsCount?: number
}

// интерфейс ответа сервера. Указывает что приходит с сервера
export interface IAuthResponse {
  accessToken: string
  user: IUser
}

// тип для формы пользователя с 6 полями
export type TypeUserForm = Omit<IUser, 'id'> & { password?: string}