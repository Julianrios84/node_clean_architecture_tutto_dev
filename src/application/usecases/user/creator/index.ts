
import { User } from "@domain/entities/user";
import { UserAlreadyExistsException } from "@domain/exceptions/user";
import { UserRepository } from "@domain/repositories/user";
import { ExistUserByUserName } from "@domain/services/user/existbyusername";
import { IUuidGenerator } from "@domain/utils/uuid-generator";


interface UserInput {
  name: string
  age: number
  username: string
}

export class UserCreatorUseCase {
  private readonly _userResposiory: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName
  private readonly _uuidGenerator: IUuidGenerator

  constructor (userRepository: UserRepository, uuidGenerator: IUuidGenerator) {
    this._userResposiory = userRepository
    this._uuidGenerator = uuidGenerator
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (params: UserInput): Promise<User> {
    const user: User = {
      id: this._uuidGenerator.generate(),
      age: params.age,
      name: params.name,
      username: params.username
    }

    const existUser: boolean = await this._existUserByUserName.run(user.username!)

    if (existUser) throw new UserAlreadyExistsException()

    const userCreated: User = await this._userResposiory.save(user)

    return userCreated
  }
}