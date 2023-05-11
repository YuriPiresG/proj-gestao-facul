import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Periods } from 'src/course/constants/period.constant';
import { DayOfTheWeek } from '../constants/dayOfTheWeek.constant';
import { CreateCalendarDayDto } from './create-calendar-day.dto';

export class UpdateCalendarDayDto extends PartialType(CreateCalendarDayDto) {
  @IsNotEmpty()
  @IsEnum(DayOfTheWeek)
  dayOfTheWeek: DayOfTheWeek;

  @IsNotEmpty()
  @IsNumber()
  calendarId: number;

  @IsNotEmpty()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Periods, { each: true })
  period: Periods[];

  @IsNotEmpty()
  @IsNumber()
  professor: number[];
}
