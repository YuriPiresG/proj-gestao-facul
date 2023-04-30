import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { IsEnum } from 'class-validator';
import { Periods } from 'src/course/constants/period.constant';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
  @IsEnum(Periods, { each: true })
  periods?: Periods[];
}
