import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../../infrastructure/implementations/aws/dynamo-db/repositories/user'
import { UserCreatorUseCase } from '../../../../../application/usecases/user/creator'
import { UuidV4Generator } from '../../../../../infrastructure/uuiv4-generator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const uuidV4Generator = new UuidV4Generator()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidV4Generator)

  try {
    const userCreated = await userCreatorUseCase.run({
      name,
      username,
      age
    })

    res.json(userCreated)
    return
  } catch (e) {
    return next(e)
  }
}