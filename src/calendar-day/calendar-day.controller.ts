import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CalendarDayService } from './calendar-day.service';
import { CreateCalendarDayDto } from './dto/create-calendar-day.dto';
import { UpdateCalendarDayDto } from './dto/update-calendar-day.dto';

@Controller('calendar-day')
export class CalendarDayController {
  constructor(private readonly calendarDayService: CalendarDayService) {}

  @Post()
  create(@Body() createCalendarDayDto: CreateCalendarDayDto) {
    return this.calendarDayService.create(createCalendarDayDto);
  }

  @Get()
  findAll() {
    return this.calendarDayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarDayService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarDayDto: UpdateCalendarDayDto,
  ) {
    return this.calendarDayService.update(+id, updateCalendarDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarDayService.remove(+id);
  }
}
