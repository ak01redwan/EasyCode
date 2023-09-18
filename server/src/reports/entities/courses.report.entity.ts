import { Course } from "src/courses/entities/course.entity";
import { BaseReport } from "./base.report.entity";

export class CoursesReport extends BaseReport {
    courses: Course[] = new Array<Course>();
}
