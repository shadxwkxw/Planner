import { IsArray, isArray, IsString } from "class-validator";

export class UpdateOrderDto {
  @IsArray()
  @IsString({ each: true }) // каждый элемент массива является строкой
  ids: string[]
}