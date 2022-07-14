import { Exception } from "@domain/exceptions/exception"

export class UserNotFoundException extends Exception {
  constructor () {
    super('User not found')
    this.spanishMessage = 'Usuario no encontrado'
  }
}