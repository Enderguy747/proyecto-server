import { Router } from 'express'
import {
  saveTask,
  getAllTasks,
  getOneTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js'

const taskRouter = Router()

taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', getOneTask)
taskRouter.post('/', saveTask)
taskRouter.put('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)

export { taskRouter }
