import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // Импорт адаптера
import { Pool } from 'pg'; // Импорт драйвера

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined");
    }

    // Создаем пул соединений с использованием драйвера pg
    const pool = new Pool({ connectionString });

    // Передаем адаптер в конструктор PrismaClient
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  // Рекомендуется добавить onModuleDestroy для чистого отключения
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
