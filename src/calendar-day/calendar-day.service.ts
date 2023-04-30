import { Injectable } from '@nestjs/common';
import { CreateCalendarDayDto } from './dto/create-calendar-day.dto';
import { UpdateCalendarDayDto } from './dto/update-calendar-day.dto';

@Injectable()
export class CalendarDayService {
  create(createCalendarDayDto: CreateCalendarDayDto) {
    return 'This action adds a new calendarDay';
  }

  findAll() {
    return `This action returns all calendarDay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calendarDay`;
  }

  update(id: number, updateCalendarDayDto: UpdateCalendarDayDto) {
    return `This action updates a #${id} calendarDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendarDay`;
  }
}
