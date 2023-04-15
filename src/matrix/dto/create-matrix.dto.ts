import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Course } from 'src/course/entities/course.entity';

export class CreateMatrixDto {
  @IsNotEmpty()
  @IsArray()
  classes: string[];

  @IsNotEmpty()
  @IsArray()
  skills: string[];

  @IsNotEmpty()
  @IsNumber()
  courseId: Course;
}
