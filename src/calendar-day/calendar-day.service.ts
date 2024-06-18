import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
  ConflictException,
} from '@nestjs/common';
import { CreateCalendarDayDto } from './dto/create-calendar-day.dto';
import { UpdateCalendarDayDto } from './dto/update-calendar-day.dto';
import { CalendarDay } from './entities/calendar-day.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorService } from '../professor/professor.service';
import { SubjectsService } from '../subject/subjects.service';
import { CalendarService } from '../calendar/calendar.service';
import { Calendar } from '../calendar/entities/calendar.entity';
import { Subject } from '../subject/entities/subject.entity';
import { Professor } from '../professor/entities/professor.entity';

@Injectable()
export class CalendarDayService {
  constructor(
    @Inject(forwardRef(() => CalendarService))
    private calendarService: CalendarService,
    @InjectRepository(CalendarDay)
    private calendarDayRepository: Repository<CalendarDay>,
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

    // Check for conflicting calendar days
    for (const professorId of createCalendarDayDto.professor) {
      const conflictingCalendarDays = await this.calendarDayRepository
        .createQueryBuilder('calendarDay')
        .innerJoin('calendarDay.professor', 'professor')
        .innerJoin('calendarDay.calendar', 'calendar')
        .where('professor.id = :professorId', { professorId })
        .andWhere('calendarDay.dayOfTheWeek = :dayOfTheWeek', {
          dayOfTheWeek: createCalendarDayDto.dayOfTheWeek,
        })
        .andWhere('calendar.isActive = true')
        .getMany();

      if (conflictingCalendarDays.length > 0) {
        throw new ConflictException(
          `Professor with ID ${professorId} is already registered on the same day of the week for another active calendar.`,
        );
      }
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
      relations: ['calendar', 'calendar.course', 'subject', 'professor'],
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

  async findByCalendarId(calendarId: number): Promise<CalendarDay[]> {
    return await this.calendarDayRepository.find({
      where: { calendar: { id: calendarId } },
    });
  }
}
