import { Module } from '@nestjs/common';
import { CalendarDayService } from './calendar-day.service';
import { CalendarDayController } from './calendar-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarDay } from './entities/calendar-day.entity';
import { Calendar } from 'src/calendar/entities/calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarDay]), Calendar],
  controllers: [CalendarDayController],
  providers: [CalendarDayService],
  exports: [CalendarDayService],
})
export class CalendarDayModule {}
