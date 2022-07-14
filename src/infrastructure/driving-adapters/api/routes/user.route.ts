import { Request, Response, Router, NextFunction } from 'express'
import { Exception } from '../../../../domain/exceptions/exception'
import userRoutes from './user.route'

const route = Router()

route.use('/users', userRoutes)

route.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    res.status(400).json({
      message: err.spanishMessage
    })
  } else {
    next(err)
  }
})

route.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route