import { IBase } from "./root.types"

// интерфейс уровней приоритетности задачи
export enum EnumTAskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

// интервейс для ответа задачи с сервера
export interface ITaskResponse extends IBase {
  name: string
  priority?: EnumTAskPriority
  isCompleted: boolean
}

// тип для формы создания новой задачи. Выделенные 4 поля вырезаем и делаем их необязательными
export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>