import path from 'path';
import * as dotenv from 'dotenv';
import { User } from '../../../domain/entities/user';
import { UserCreatorUseCase } from '../../../application/usecases/user/creator';
import { UserGetterUseCase } from '../../../application/usecases/user/getter';
import { UserDeleterUseCase } from '../../../application/usecases/user/delete';
import { UserUpdaterUseCase } from '../../../application/usecases/user/updater';
import { InMemoryUserRepository } from '../../../infrastructure/implementations/memory';
import { DynamoDBUserRepository } from '../../../infrastructure/implementations/aws/dynamo-db/repositories/user';

// IIFE Function
(async () => {

  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  // const inMemoryUserRepo = new InMemoryUserRepository();
  const dynamoDBUserRepo = new DynamoDBUserRepository();

  // Create user
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo);
  const userToCreate: User = {
    name: "luciana",
    age: 18,
    username: "luciana18",
    id: "1",
  };
  await userCreatorUseCase.run(userToCreate);

  // Get all user
  const userGetterUserCase = new UserGetterUseCase(dynamoDBUserRepo);
  const usersReturned = await userGetterUserCase.run();
  console.log(usersReturned);

  // Update user
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo);
  await userUpdaterUseCase.run({
    id: "1",
    username: "luci",
  });

  const usersReturned2 = await userGetterUserCase.run();
  console.log(usersReturned2);

  // Delete users
  const userDeleteUserCase = new UserDeleterUseCase(dynamoDBUserRepo);
  await userDeleteUserCase.run("1");

  const usersReturned3 = await userGetterUserCase.run();
  console.log(usersReturned3);
})();
