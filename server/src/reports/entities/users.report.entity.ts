import { User } from "src/users/entities/user.entity";
import { BaseReport } from "./base.report.entity";

export class UsersReport extends BaseReport{
    users: User[] = new Array<User>();
}
