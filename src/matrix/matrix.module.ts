import { Module } from '@nestjs/common';
import { MatrixService } from './matrix.service';
import { MatrixController } from './matrix.controller';
import { Matrix } from './entities/matrix.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Matrix]), UsersModule, CourseModule],
  controllers: [MatrixController],
  providers: [MatrixService],
  exports: [MatrixService],
})
export class MatrixModule {}
