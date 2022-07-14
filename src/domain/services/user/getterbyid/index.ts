import { User } from "@domain/entities/user"
import { UserNotFoundException } from "@domain/exceptions/user"
import { UserRepository } from "@domain/repositories/user"

export class UserGetterById {
  private readonly _userResposiory: UserRepository

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
  }

  async run (id: string): Promise<User> {
    const user = await this._userResposiory.getById(id)

    if (user === null) { throw new UserNotFoundException() }

    return user
  }
}