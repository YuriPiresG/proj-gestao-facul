import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Repository } from 'typeorm';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class CalendarService {
  constructor(
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
      relations: ['course'],
    });
  }

  update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return `This action updates a #${id} calendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendar`;
  }
}
