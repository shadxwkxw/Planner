import { axiosWithAuth } from "@/api/interceptors"
import { ITimeBlockResponse, TypeTimeBlockFormState } from "@/type/time-block.types"

class TimeBlockService {
  private BASE_URL = '/user/time-blocks'

  // получение тайм блоков
  async getTimeBlocks() {
    const response = await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL)
    return response
  }

  // создание тайм блока
  async createTimeBlock(data: TypeTimeBlockFormState) {
    const response = await axiosWithAuth.post(this.BASE_URL, data)
    return response
  }

  // обновление тайм блока
  async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
    const response = await axiosWithAuth.put<TypeTimeBlockFormState>(`${this.BASE_URL}/${id}`, data)
    return response
  }

  // обновление порядка тайм блоков
  async updateOrderTimeBlock(ids: string[]) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, {ids})
    return response
  }

  // удаление тайм блока
  async deleteTimeBlock(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response
  }
}

export const timeBlockService = new TimeBlockService()