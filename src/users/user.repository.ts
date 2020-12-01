import { EntityRepository, Repository } from "typeorm";
import { userData } from "./entity/usersdata.entity";

@EntityRepository(userData)
export class UserRepository extends Repository<userData> {}