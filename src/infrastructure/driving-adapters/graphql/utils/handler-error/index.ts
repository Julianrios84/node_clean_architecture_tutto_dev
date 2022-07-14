import { Exception } from '@domain/exceptions/exception'

export class HandlerError {
  static run (error: any): Error {
    if (error instanceof Exception) {
      return new Error(error.spanishMessage)
    }

    return error
  }
}