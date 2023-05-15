import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MatrixModule } from 'src/matrix/matrix.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    UsersModule,
    forwardRef(() => MatrixModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
