export type User = {
  id?: number;
  name: string;
};

export interface UserRepository {
  getAllUsers(): User[];
  getUserById(id: number): User;
}

export interface UserService {
  findAllUser(): User[];
}
