import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  coordinatorId: number;

  @Column()
  durationHours: number;

  @Column()
  quantityClass: number;

  @Column()
  quantitySemester: number;

  constructor(course?: Partial<Course>) {
    this.id = course?.id;
    this.name = course?.name;
    this.coordinatorId = course?.coordinatorId;
    this.durationHours = course?.durationHours;
    this.quantityClass = course?.quantityClass;
    this.quantitySemester = course?.quantitySemester;
  }
}
