import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
