import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities/subscription.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CoursesService } from 'src/courses/courses.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Course } from 'src/courses/entities/course.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly coursesServices: CoursesService,
    private readonly usersServices: UsersService
    ) {}

  @Get()
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Subscription> {
    return await this.subscriptionsService.findById(id);
  }

  @Get('by-user/:userId')
  async findByUser(@Param('userId') userId: number): Promise<Subscription[]> {
    return await this.subscriptionsService.findByUser(userId);
  }

  @Get('by-user/:userId/by-course/:courseId')
  async findByUserAndCourse(@Param('userId') userId: number,@Param('courseId') courseId: number): Promise<Subscription> {
    return await this.subscriptionsService.findByUserAndCourse(courseId, userId);
  }

  @Get('by-course/:courseId')
  async findByCourse(@Param('courseId') courseId: number): Promise<Subscription[]> {
    return await this.subscriptionsService.findByCourse(courseId);
  }

  @UseGuards(AuthGuard)
  @Post('/toggle')
  async create(@Body()  sub: {courseId: number}, @Request() req) {
    const subscription = await this.subscriptionsService.findByUserAndCourse(sub.courseId, req.authData.user.id);
    if (subscription) {
      // remove current active course for the user
      const user = await this.usersServices.findOne(req.authData.user.id);
      if (user.currentCourseId == sub.courseId.toString()) {
        user.currentCourseId = null;
        await this.usersServices.update(user);
      }
      // check if this user is the admin of this course then update the course to has no admin
      const course = (await this.coursesServices.getCoursesByAdminId(req.authData.user.id)).find((course: Course) => course.id == sub.courseId);
      if (course) {
        course.courseAdmin = null;
        await this.coursesServices.updateCourse(course);
      }
      await this.subscriptionsService.delete(subscription.id);
      return null;
    } else {
      //console.log('subscription created');
      const newSubscription  = new Subscription();
      newSubscription.course = await this.coursesServices.findOne(sub.courseId);
      newSubscription.user   = { id: req.authData.user.id} as User;
      newSubscription.isDone = false;
      newSubscription.scores = 0;
      newSubscription.stage = newSubscription.course.stages[0];
      const user = await this.usersServices.findOne(req.authData.user.id);
      user.currentCourseId = (await this.coursesServices.findOne(sub.courseId)).id.toString();
      await this.usersServices.update(user);
      return await this.subscriptionsService.create(newSubscription);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() subscription: Subscription,
  ): Promise<Subscription> {
    return await this.subscriptionsService.update(id, subscription);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.subscriptionsService.delete(id);
  }
}