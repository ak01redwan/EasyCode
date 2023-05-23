import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { StagesModule } from './stages/stages.module';
import { ProjectsModule } from './projects/projects.module';
import { LikesModule } from './likes/likes.module';
import { CoursesModule } from './courses/courses.module';

// entities
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Course } from './courses/entities/course.entity';
import { Stage } from './stages/entities/stage.entity';
import { Like } from './likes/entities/like.entity';
import { Project } from './projects/entities/project.entity';

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
      entities: [User, Category, Course, Stage, Like, Project],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    CoursesModule,
    StagesModule,
    LikesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
