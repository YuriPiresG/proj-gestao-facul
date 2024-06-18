import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';
import { SubjectsModule } from '../subject/subjects.module';
import { Matrix } from './entities/matrix.entity';
import { MatrixController } from './matrix.controller';
import { MatrixService } from './matrix.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Matrix]),
    forwardRef(() => CourseModule),
    SubjectsModule,
  ],
  controllers: [MatrixController],
  providers: [MatrixService],
  exports: [MatrixService],
})
export class MatrixModule {}
