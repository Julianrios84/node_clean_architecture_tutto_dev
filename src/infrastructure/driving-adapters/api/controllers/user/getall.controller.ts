import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../../infrastructure/implementations/aws/dynamo-db/repositories/user'
import { UserGetterUseCase } from '../../../../../application/usecases/user/getter'

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)

  try {
    const users = await userGetterUseCase.run()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}