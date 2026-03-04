import { IBase } from "./root.types"

// интерфейс для ответа с сервера
export interface ITimeBlockResponse extends IBase {
  name: string
  color?: string
  duration: number
  order: number
}

// тип для формы создания. Выделенные 5 полей вырезаем и делаем их необязательными
export type TypeTimeBlockFormState = Partial<Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>>