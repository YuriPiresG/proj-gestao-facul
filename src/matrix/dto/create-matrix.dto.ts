import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMatrixDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsString()
  objectives: string[];

  @IsNotEmpty()
  @IsString()
  classes: string;
}
