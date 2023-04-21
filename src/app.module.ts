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
import { ClassesModule } from './classes/classes.module';
import { Class } from './classes/entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'gestao_facul',
      entities: [User, Course, Matrix, Class],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    MatrixModule,
    ClassesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
