import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMatrixDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  subjects: number[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skillsDescription: string[];

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  semester: number;
}
