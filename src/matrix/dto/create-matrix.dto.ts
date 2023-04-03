import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatrixDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsArray()
  classes: string[];

  @IsNotEmpty()
  @IsArray()
  objectives: string[];
}
