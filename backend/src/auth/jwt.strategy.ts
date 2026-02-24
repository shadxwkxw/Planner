import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super ({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем JWT из заголовка Authorization
      ignoreExpiration: true, // Игнорируем истечение срока действия токена
      secretOrKey: configService.get('JWT_SECRET') // Секретный ключ для проверки подписи JWT
    })
  }

  async validate({ id }: { id: string }) {
    return this.userService.getById(id); // Находим пользователя по ID, который был закодирован в JWT
  }
}