import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from '../calendar/calendar.module';
import { ProfessorModule } from '../professor/professor.module';
import { SubjectsModule } from '../subject/subjects.module';
import { CalendarDayController } from './calendar-day.controller';
import { CalendarDayService } from './calendar-day.service';
import { CalendarDay } from './entities/calendar-day.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CalendarDay]),
    forwardRef(() => CalendarModule),
    ProfessorModule,
    SubjectsModule,
  ],
  controllers: [CalendarDayController],
  providers: [CalendarDayService],
  exports: [CalendarDayService],
})
export class CalendarDayModule {}
