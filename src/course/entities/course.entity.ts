import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  coordinator: string;

  @Column()
  durationHours: number;

  @Column()
  quantityClass: number;

  @Column()
  quantitySemester: number;
}
