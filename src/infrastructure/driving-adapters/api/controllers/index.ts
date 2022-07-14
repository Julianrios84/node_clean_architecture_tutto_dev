import { createUser } from './user/create.controller'
import { getAllUsers } from './user/getall.controller'
import { updateUser } from './user/update.controller'
import { deleteUser } from './user/delete.controller'

export {
  createUser as createUserController,
  getAllUsers as getAllUsersController,
  updateUser as updateUserController,
  deleteUser as deleteUserController
}