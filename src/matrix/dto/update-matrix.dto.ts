import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';
import { CreateMatrixDto } from './create-matrix.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMatrixDto extends PartialType(CreateMatrixDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  subjects?: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skillsDescription?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  courseId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  semester?: number;
}
