import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarDto } from './create-calendar.dto';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCalendarDto extends PartialType(CreateCalendarDto) {
  @IsNotEmpty()
  @IsNumber()
  course: number;

  @IsNotEmpty()
  @IsNumber()
  semester: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
