import { axiosWithAuth } from "@/api/interceptors"
import { IPomodoroSessionResponse, TypePomodoroRoundState, TypePomodoroSessionState } from "@/type/pomodoro.types"

class PomodoroService {
  private BASE_URL = '/user/timer'

  // получение текущей сессии
  async getTodaySession() {
    const response = await axiosWithAuth.get<IPomodoroSessionResponse>(`${this.BASE_URL}/today`)
    return response
  }

  // создание сессии
  async createSession() {
    const response = await axiosWithAuth.post<IPomodoroSessionResponse>(this.BASE_URL)
    return response
  }

  // обновление сессии
  async updateSession(id: string, data: TypePomodoroSessionState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return response
  }

  // удаление сессии
  async deleteSession(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response
  }

  // обновление круга
  async updateRound(id: string, data: TypePomodoroRoundState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return response
  }
}

export const pomodoroService = new PomodoroService()