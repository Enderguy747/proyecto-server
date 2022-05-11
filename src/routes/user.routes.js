import { Router } from 'express'
import { getUsers, saveUser } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/', saveUser)

export { userRouter }
