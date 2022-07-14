import { DynamoDBUserRepository } from '@infrastructure/implementations/aws/dynamo-db/repositories/user'
import { UserCreatorUseCase } from '@application/usecases/user/creator'
import { UuidV4Generator } from '@infrastructure/uuiv4-generator'
import { HandlerError } from '../../utils/handler-error'

const userMutations = {
  createUser: async (_: any, args: any) => {
    const {
      user: {
        username,
        age,
        name
      }
    } = args

    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const uuidGenerator = new UuidV4Generator()
    const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidGenerator)

    try {
      return await userCreatorUseCase.run({
        name,
        username,
        age
      })

    } catch (error) {
      return HandlerError.run(error)
    }
  }
}

export default userMutations