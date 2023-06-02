import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCalendarDayDto } from './dto/create-calendar-day.dto';
import { UpdateCalendarDayDto } from './dto/update-calendar-day.dto';
import { CalendarDay } from './entities/calendar-day.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorService } from 'src/professor/professor.service';
import { SubjectsService } from 'src/subject/subjects.service';
import { CalendarService } from 'src/calendar/calendar.service';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Professor } from 'src/professor/entities/professor.entity';
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
    const subjectFound = await this.subjectsService.findOne(
      createCalendarDayDto.subject,
    );
    if (!subjectFound) {
      throw new BadRequestException('Subject not found');
    }
    const calendarDay = this.calendarDayRepository.create();
    calendarDay.dayOfTheWeek = createCalendarDayDto.dayOfTheWeek;
    calendarDay.calendar = { id: createCalendarDayDto.calendarId } as Calendar;
    calendarDay.subject = { id: createCalendarDayDto.subject } as Subject;
    calendarDay.professor = createCalendarDayDto.professor.map(
      (professor) => ({ id: professor } as Professor),
    );
    calendarDay.period = createCalendarDayDto.period;
    return this.calendarDayRepository.save(calendarDay);
  }
  findAll() {
    return this.calendarDayRepository.find({
      relations: ['calendar', 'subject', 'professor'],
    });
  }
  findOne(id: number) {
    return this.calendarDayRepository.findOne({
      where: { id },
      relations: ['calendar', 'calendarId.course', 'subject', 'professor'],
    });
  }
  async update(id: number, updateCalendarDayDto: UpdateCalendarDayDto) {
    const calendarFound = await this.calendarService.findOne(
      updateCalendarDayDto.calendarId,
    );
    if (!calendarFound) {
      throw new BadRequestException('Calendar not found');
    }
    const subjectFound = await this.subjectsService.findOne(
      updateCalendarDayDto.subject,
    );
    if (!subjectFound) {
      throw new BadRequestException('Subject not found');
    }
    const updatedCalendarDay = new CalendarDay();
    updatedCalendarDay.id = id;
    updatedCalendarDay.dayOfTheWeek = updateCalendarDayDto.dayOfTheWeek;
    updatedCalendarDay.calendar = calendarFound;
    updatedCalendarDay.subject = subjectFound;
    updatedCalendarDay.professor = updateCalendarDayDto.professor.map(
      (professor) => ({ id: professor } as Professor),
    );
    updatedCalendarDay.period = updateCalendarDayDto.period;
    await this.calendarDayRepository.save(updatedCalendarDay);
    return `CalendarDay updated to ${JSON.stringify(updatedCalendarDay)}`;
  }
  remove(id: number) {
    return this.calendarDayRepository.delete(id);
  }
}
