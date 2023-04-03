import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Periods } from '../constants/period.constant';

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
  period: Periods[];
}
