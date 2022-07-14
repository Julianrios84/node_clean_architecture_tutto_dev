import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../../infrastructure/implementations/aws/dynamo-db/repositories/user'
import { UserUpdaterUseCase } from '../../../../../application/usecases/user/updater'
import { User } from '../../../../../domain/entities/user'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    username,
    age
  } = req.body

  const userId = req.params.userId

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  try {
    const userToUpdate: User = {
      age,
      id: userId,
      name,
      username
    }

    const user = await userUpdaterUseCase.run(userToUpdate)
    res.json(user)
    return
  } catch (e) {
    return next(e)
  }
}