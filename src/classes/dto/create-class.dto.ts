import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
