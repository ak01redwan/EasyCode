import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
// entities
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { StagesModule } from './stages/stages.module';
import { Stage } from './stages/entities/stage.entity';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'abdu123',
      database: 'easycode',
      options: {
        encrypt: false
      },
      entities: [User, Category, Course, Stage, Like],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    CoursesModule,
    StagesModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
