import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Course } from 'src/course/entities/course.entity';

export class UpdateMatrixDto {
  @IsNotEmpty()
  @IsArray()
  classes: string[];

  @IsNotEmpty()
  @IsArray()
  skillsDescription: string[];

  @IsNotEmpty()
  @IsNumber()
  courseId: Course;
}
