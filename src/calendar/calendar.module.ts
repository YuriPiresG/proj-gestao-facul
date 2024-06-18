import { Module, forwardRef } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { CourseModule } from '../course/course.module';
import { CalendarDayModule } from '../calendar-day/calendar-day.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calendar]),
    CourseModule,
    forwardRef(() => CalendarDayModule),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
