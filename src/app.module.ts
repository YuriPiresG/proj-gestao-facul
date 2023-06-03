import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { CourseModule } from './course/course.module';
import { Course } from './course/entities/course.entity';
import { MatrixModule } from './matrix/matrix.module';
import { Matrix } from './matrix/entities/matrix.entity';
import { SubjectsModule } from './subject/subjects.module';
import { Subject } from './subject/entities/subject.entity';
import { ProfessorModule } from './professor/professor.module';
import { Professor } from './professor/entities/professor.entity';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarDayModule } from './calendar-day/calendar-day.module';
import { Calendar } from './calendar/entities/calendar.entity';
import { CalendarDay } from './calendar-day/entities/calendar-day.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>('DB_CONNECTION'));
        return {
          type: 'postgres',
          url: configService.get<string>('DB_CONNECTION'),
          entities: [
            User,
            Course,
            Matrix,
            Subject,
            Professor,
            Calendar,
            CalendarDay,
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    MatrixModule,
    SubjectsModule,
    ProfessorModule,
    CalendarModule,
    CalendarDayModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
