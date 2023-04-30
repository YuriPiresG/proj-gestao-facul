import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Periods } from 'src/course/constants/period.constant';

export class CreateProfessorDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsEnum(Periods, { each: true })
  periods: Periods[];
}
