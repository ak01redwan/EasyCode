import { Category } from "src/categories/entities/category.entity";
import { Course } from "src/courses/entities/course.entity";
import { Message } from "src/messages/entities/message.entity";
import { Project } from "src/projects/entities/project.entity";
import { Stage } from "src/stages/entities/stage.entity";
import { User } from "src/users/entities/user.entity";
import { BaseReport } from "./base.report.entity";

export class GeneralReport extends BaseReport {
    users:      User[]      = new Array<User>(); // supervisors && students
    categories: Category[]  = new Array<Category>(); // everything will be here courses,stages,extra ... tree
}
