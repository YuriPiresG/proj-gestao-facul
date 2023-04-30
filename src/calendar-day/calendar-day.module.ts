import { Module } from '@nestjs/common';
import { CalendarDayService } from './calendar-day.service';
import { CalendarDayController } from './calendar-day.controller';

@Module({
  controllers: [CalendarDayController],
  providers: [CalendarDayService]
})
export class CalendarDayModule {}
