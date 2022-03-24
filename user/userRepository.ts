import { User, UserRepository } from "./user.ts";
import { randomString } from "../util.ts";
import { cache } from "../decorators/cache.ts";
import {injectable} from "../decorators/injectable.ts";

@injectable("UserRepository")
export class Repository implements UserRepository {
  getAllUsers(): User[] {
    return [{ name: "Jannik" }, { name: "Max" }];
  }

  @cache
  getUserById(id: number): User {
    return {
      id,
      name: randomString(4),
    };
  }
}

// const repository = new Repository();

// console.log(repository.getUserById(1));
// console.log(repository.getUserById(1));
// console.log(repository.getUserById(1));
// console.log(repository.getUserById(1));
