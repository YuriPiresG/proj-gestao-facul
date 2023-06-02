import { IsArray, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Periods } from 'src/course/constants/period.constant';
import { DayOfTheWeek } from '../constants/dayOfTheWeek.constant';
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
  @IsArray()
  @IsNumber({}, { each: true })
  professor: number[];
}
