import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Устанавливаем глобальный префикс для всех маршрутов
  app.use(cookieParser()); // Подключаем middleware для парсинга cookies
  app.enableCors({
    origin: 'http://localhost:3000', // Разрешаем запросы с этого происхождения
    credentials: true, // Разрешаем отправку cookies
    exposedHeaders: ['Set-Cookie'], // Разрешаем клиенту видеть заголовок Set-Cookie
  })
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
