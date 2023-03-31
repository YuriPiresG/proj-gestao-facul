import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
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
}
