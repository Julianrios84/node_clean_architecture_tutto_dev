import { User } from "@domain/entities/user"
import { UserRepository } from "@domain/repositories/user"

export class UserGetterUseCase {
  private readonly _userResposiory: UserRepository

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
  }

  async run (): Promise<User[]> {
    const users: User[] = await this._userResposiory.getAll()
    return users
  }
}