import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Repository } from 'typeorm';
import { CourseService } from '../course/course.service';
import { CalendarDayService } from '../calendar-day/calendar-day.service';

@Injectable()
export class CalendarService {
  constructor(
    @Inject(forwardRef(() => CalendarDayService))
    private calendarDayService: CalendarDayService,
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
    private courseService: CourseService,
  ) {}
  async create(createCalendarDto: CreateCalendarDto) {
    const courseFound = await this.courseService.findById({
      id: createCalendarDto.course,
    });
    if (!courseFound) {
      throw new BadRequestException('Course not found');
    }
    if (createCalendarDto.semester > courseFound.quantitySemester) {
      throw new BadRequestException(
        `Semester is greater than ${courseFound.quantitySemester}`,
      );
    }
    const calendar = new Calendar();
    calendar.course = courseFound;
    calendar.semester = createCalendarDto.semester;
    calendar.isActive = createCalendarDto.isActive;
    this.calendarRepository.save(calendar);
    return calendar;
  }

  findAll() {
    return this.calendarRepository.find({ relations: ['course'] });
  }

  findOne(id: number) {
    return this.calendarRepository.findOne({
      where: { id },
      relations: [
        'course',
        'calendarDays',
        'calendarDays.subject',
        'calendarDays.professor',
        'calendarDays.professor.user',
      ],
    });
  }

  async update(id: number, updateCalendarDto: UpdateCalendarDto) {
    const courseFound = await this.courseService.findById({
      id: updateCalendarDto.course,
    });
    if (!courseFound) {
      throw new BadRequestException('Course not found');
    }
    const updatedCalendar = new Calendar();
    updatedCalendar.course = courseFound;
    updatedCalendar.semester = updateCalendarDto.semester;
    updatedCalendar.isActive = updateCalendarDto.isActive;
    this.calendarRepository.update({ id }, updatedCalendar);

    return `Calendar updated to ${JSON.stringify(updatedCalendar)}`;
  }

  async remove(id: number) {
    const calendarDayFound = await this.calendarDayService.findByCalendarId(id);
    if (calendarDayFound.length > 0) {
      calendarDayFound.forEach(async (calendarDay) => {
        await this.calendarDayService.remove(calendarDay.id);
      });
    }
    await this.calendarRepository.delete({ id });
    return `Calendar with id ${id} deleted`;
  }
}
