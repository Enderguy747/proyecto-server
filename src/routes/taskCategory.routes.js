import { Router } from 'express'
import {
  getTaskCategory,
  saveTaskCategory,
  deleteTaskCategory,
  updateTaskCategory,
  getOneTaskCategory
} from '../controllers/taskCategory.controller.js'

const taskCategoryRouter = Router()

/* Creating a route for each of the functions in the controller. */
taskCategoryRouter.get('/', getTaskCategory)
taskCategoryRouter.get('/:id', getOneTaskCategory)
taskCategoryRouter.post('/', saveTaskCategory)
taskCategoryRouter.delete('/:id', deleteTaskCategory)
taskCategoryRouter.put('/:id', updateTaskCategory)

export { taskCategoryRouter }
