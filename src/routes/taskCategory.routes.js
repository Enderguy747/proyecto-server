import { Router } from 'express'
import {
  getTaskCategory,
  saveTaskCategory,
  deleteTaskCategory,
  updateTaskCategory,
  getOneTaskCategory
} from '../controllers/taskCategory.controller.js'

const taskCategoryRouter = Router()

taskCategoryRouter.get('/', getTaskCategory)
taskCategoryRouter.get('/:id', getOneTaskCategory)
taskCategoryRouter.post('/', saveTaskCategory)
taskCategoryRouter.delete('/:id', deleteTaskCategory)
taskCategoryRouter.put('/:id', updateTaskCategory)

export { taskCategoryRouter }
