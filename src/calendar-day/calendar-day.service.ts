import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCalendarDayDto } from './dto/create-calendar-day.dto';
import { UpdateCalendarDayDto } from './dto/update-calendar-day.dto';
import { CalendarDay } from './entities/calendar-day.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorService } from 'src/professor/professor.service';
import { SubjectsService } from 'src/subject/subjects.service';
import { CalendarService } from 'src/calendar/calendar.service';

@Injectable()
export class CalendarDayService {
  constructor(
    @InjectRepository(CalendarDay)
    private calendarDayRepository: Repository<CalendarDay>,
    private calendarService: CalendarService,
    private professorService: ProfessorService,
    private subjectsService: SubjectsService,
  ) {}
  async create(createCalendarDayDto: CreateCalendarDayDto) {
    const calendarFound = await this.calendarService.findOne(
      createCalendarDayDto.calendarId,
    );
    if (!calendarFound) {
      throw new BadRequestException('Calendar not found');
    }
    const professorFound = await this.professorService.findOne(
      createCalendarDayDto.professor,
    );
    if (!professorFound) {
      throw new BadRequestException('Professor not found');
    }
    const subjectFound = await this.subjectsService.findOne(
      createCalendarDayDto.subject,
    );
    if (!subjectFound) {
      throw new BadRequestException('Subject not found');
    }
    const calendarDay = new CalendarDay();
    calendarDay.dayOfTheWeek = createCalendarDayDto.dayOfTheWeek;
    calendarDay.calendarId = calendarFound;
    calendarDay.subject = subjectFound;
    calendarDay.professor = professorFound;
    calendarDay.period = createCalendarDayDto.period;
    return this.calendarDayRepository.save(calendarDay);
  }

  findAll() {
    return this.calendarDayRepository.find({
      relations: ['calendarId', 'subject', 'professor'],
    });
  }

  findOne(id: number) {
    return this.calendarDayRepository.findOne({
      where: { id },
      relations: ['calendarId', 'calendarId.course', 'subject', 'professor'],
    });
  }

  async update(id: number, updateCalendarDayDto: UpdateCalendarDayDto) {
    const calendarFound = await this.calendarService.findOne(
      updateCalendarDayDto.calendarId,
    );
    if (!calendarFound) {
      throw new BadRequestException('Calendar not found');
    }
    const professorFound = await this.professorService.findOne(
      updateCalendarDayDto.professor,
    );
    if (!professorFound) {
      throw new BadRequestException('Professor not found');
    }
    const subjectFound = await this.subjectsService.findOne(
      updateCalendarDayDto.subject,
    );
    if (!subjectFound) {
      throw new BadRequestException('Subject not found');
    }
    const updatedCalendarDay = new CalendarDay();
    updatedCalendarDay.dayOfTheWeek = updateCalendarDayDto.dayOfTheWeek;
    updatedCalendarDay.calendarId = calendarFound;
    updatedCalendarDay.subject = subjectFound;
    updatedCalendarDay.professor = professorFound;
    updatedCalendarDay.period = updateCalendarDayDto.period;
    this.calendarDayRepository.update({ id }, updatedCalendarDay);
    return `CalendarDay updated to ${JSON.stringify(updatedCalendarDay)}`;
  }

  remove(id: number) {
    return this.calendarDayRepository.delete(id);
  }
}
