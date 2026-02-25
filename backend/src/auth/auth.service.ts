import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {
  REFRESH_TOKEN_NAME = 'refreshToken'
  EXPIRE_DAY_REFRESH_TOKEN = 1

  constructor(
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto)
    const tokens = this.issuerTokens(user.id)

    return { user, ...tokens }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email)

    if (oldUser) throw new BadRequestException('User already exists')

    const { password, ...user } = await this.userService.create(dto)
    const tokens = this.issuerTokens(user.id)

    return { user, ...tokens }
  }

  private issuerTokens(userId:string) {
    const data = {id:userId}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto:AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date() // указываем дату окончания. Берем текущую дату
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN) // к дате окончания добавляем с помощью setDate() текущую дату и указываем количество дней, когда будет заканчиваться refresh token

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, { // отдаем название cookie, что будет там лежать и важные опции
      httpOnly: true, // указываем, что это серверный cookie
      domain: 'localhost', // домен, к которому будет привязка. свой домен в prod
      expires: expiresIn, // указываем дату окончания токена
      secure: true, // опция показывает, что cookie будет https, иными словами - защищенная
      sameSite: 'none' // lax in prod. Проверка на домены
    })
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0), // обнуление даты
      secure: true,
      sameSite: 'none'
    })
  }
}
