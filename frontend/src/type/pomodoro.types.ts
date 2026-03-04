import { IBase } from "./root.types";

// интерфейс для ответа круга с сервера
export interface IPomodoroRoundResponse extends IBase {
  isCompleted?: boolean
  totalSeconds: number
}

// интерфейс для ответа сессии с сервера
export interface IPomodoroSessionResponse extends IBase {
  isCompleted?: boolean
  rounds?: IPomodoroRoundResponse[]
}

// тип для формы сессии
export type TypePomodoroSessionState = Partial<Omit<IPomodoroSessionResponse, 'id' | 'createdAt' | 'updatedAt'>>

// тип для формы круга
export type TypePomodoroRoundState = Partial<Omit<IPomodoroRoundResponse, 'id' | 'createdAt' | 'updatedAt'>>