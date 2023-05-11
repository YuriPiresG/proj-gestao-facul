import { CalendarDay } from 'src/calendar-day/entities/calendar-day.entity';
import { Periods } from 'src/course/constants/period.constant';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('simple-array')
  periods: Periods[];
}
