import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DayOfTheWeek } from '../constants/dayOfTheWeek.constant';
import { Periods } from 'src/course/constants/period.constant';
import { Professor } from 'src/professor/entities/professor.entity';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Entity()
export class CalendarDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfTheWeek: DayOfTheWeek;

  @OneToOne(() => Calendar)
  @JoinColumn()
  calendarId: Calendar;

  @ManyToOne(() => Subject, (subject) => subject.calendarDays)
  @JoinColumn()
  subject: Subject;

  @Column('simple-array')
  period: Periods[];

  @OneToOne(() => Professor)
  @JoinColumn()
  professor: Professor;
}
