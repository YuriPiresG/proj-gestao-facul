import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/course/course.module';
import { SubjectsModule } from 'src/subject/subjects.module';
import { Matrix } from './entities/matrix.entity';
import { MatrixController } from './matrix.controller';
import { MatrixService } from './matrix.service';

@Module({
  imports: [TypeOrmModule.forFeature([Matrix]), CourseModule, SubjectsModule],
  controllers: [MatrixController],
  providers: [MatrixService],
  exports: [MatrixService],
})
export class MatrixModule {}
