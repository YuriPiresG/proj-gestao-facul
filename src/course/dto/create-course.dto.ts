import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  coordinator: string;

  @IsNotEmpty()
  @IsNumber()
  durationHours: number;

  @IsNotEmpty()
  @IsNumber()
  quantityClass: number;

  @IsNotEmpty()
  @IsNumber()
  quantitySemester: number;
}
