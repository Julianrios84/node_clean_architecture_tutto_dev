import { Exception } from "@domain/exceptions/exception"

export class UserAlreadyExistsException extends Exception {
  constructor () {
    super('User already exists')
    this.spanishMessage = 'El usuario ya existe'
  }
}