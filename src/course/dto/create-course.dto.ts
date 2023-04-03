import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  coordinatorId: number;

  @IsNotEmpty()
  @IsNumber()
  durationHours: number;

  @IsNotEmpty()
  @IsNumber()
  quantityClass: number;

  @IsNotEmpty()
  @IsNumber()
  quantitySemester: number;

  @IsNotEmpty()
  @IsString({ each: true })
  objectives: string[];
}
