import { axiosWithAuth } from "@/api/interceptors"
import { ITaskResponse, TypeTaskFormState } from "@/type/task.types"

class TaskService {
  private BASE_URL = '/user/tasks'

  // получение задач
  async getTasks() {
    const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
    return response
  }

  // создание задачи
  async createTask(data: TypeTaskFormState) {
    const response = await axiosWithAuth.post(this.BASE_URL, data)
    return response
  }

  // обновление задачи
  async updateTask(id: string, data: TypeTaskFormState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return response
  }

  // удаление задачи
  async deleteTask(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response
  }
}

export const taskService = new TaskService()