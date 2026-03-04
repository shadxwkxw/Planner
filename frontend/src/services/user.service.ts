import { axiosWithAuth } from "@/api/interceptors";
import { IUser, TypeUserForm } from "@/type/auth.types";

export interface IProfileResponse {
  user: IUser
  statistics: {
    label: string
    value: string
  }[]
}

class UserService {
  private BASE_URL = '/user/profile'

  // получение профиля
  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
    return response.data
  }

  // обновление профиля
  async update(data: TypeUserForm) {
    const response = await axiosWithAuth.put(this.BASE_URL, data)
    return response.data
  }
}

export const userService = new UserService()