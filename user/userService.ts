import { UserService, UserRepository, User } from "./user.ts";

@injectionTarget()
export class Service implements UserService {
  userRepository: UserRepository;

  // an instance of the UserRepository class, identified by key 'UserRepositroy' should be injected
  constructor(@inject("UserRepository") userRepository?: UserRepository) {
    // ensures userRepository exists and no checks for undefined are required throughout the class
    if (!userRepository) throw Error("No UserRepository provided or injected.")
    this.userRepository = userRepository;
  }

  findAllUser(): User[] {
    // access to an instance of UserRepository
    return this.userRepository.findAllUser()
  }
}