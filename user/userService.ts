import { inject, injectionTarget } from "../decorators/di.ts";
import { User, UserRepository, UserService } from "./user.ts";
import {Repository} from "../user/userRepository.ts";
import { Container } from "../container.ts";

@injectionTarget()
export class Service implements UserService {
  private userRepository: UserRepository;

  // an instance of the UserRepository class, identified by key 'UserRepositroy' should be injected
  constructor(@inject("UserRepository") userRepository?: UserRepository) {
   // constructor(@inject("UserRepository") userRepository?: Repository) {
    // ensures userRepository exists and no checks for undefined are required throughout the class
    if (!userRepository) throw Error("No UserRepository provided or injected.");
    this.userRepository = userRepository;
  }

  findAllUser(): User[] {
    // access to an instance of UserRepository
    return this.userRepository.getAllUsers();
  }
}

Container.register("UserRepository", new Repository())

const userService = new Service()
// userService has access to an instance of UserRepository without having it provided in the constructor
// -> it has been injected!
console.log(userService.findAllUser())