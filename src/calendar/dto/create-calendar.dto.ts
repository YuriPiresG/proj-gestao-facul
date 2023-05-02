import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCalendarDto {
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
