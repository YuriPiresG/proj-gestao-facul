import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';
import { DayOfTheWeek } from '../constants/dayOfTheWeek.constant';
import { Periods } from 'src/course/constants/period.constant';

export class CreateCalendarDayDto {
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
  professor: number;
}
