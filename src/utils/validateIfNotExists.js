import { taskCategory } from '../models/taskCategory.js'

/**
 * It returns true if the task category with the given id does not exist in the database, otherwise it
 * returns false.
 * @param taskCategoryId - The id of the task category that you want to check if it exists or not.
 * @returns A function that returns a promise.
 */
async function tskCtgyNotExists (taskCategoryId) {
  try {
    const { count } = await taskCategory.findAndCountAll({ where: { id: taskCategoryId } })
    return !(count > 0)
  } catch (error) {
    console.error(error.message)
  }
}

export {
  tskCtgyNotExists
}
