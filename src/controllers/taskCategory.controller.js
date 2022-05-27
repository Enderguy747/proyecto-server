import { TaskCategory } from '../models/TaskCategory.js'
// eslint-disable-next-line no-unused-vars
import { Task } from '../models/Task.js'
import { validateIfNotExists } from '../utils/validateIfNotExists.js'

/**
 * It gets all the task categories from the database and returns them in a JSON format.
 * @param req - The request object.
 * @param res - the response object
 */
async function getTaskCategory (req, res) {
  try {
    const { count, rows } = await TaskCategory.findAndCountAll({
      attributes: ['id', 'categoryName'],
      order: [['id', 'ASC']]
    })
    res.json({ data: rows, results_number: count })
  } catch (error) {
    res.status(500).json({ message: `Ha ocurrido un error ${error.message}` })
  }
}
/**
 * It creates a new task category in the database.
 * @param req - The request object.
 * @param res - the response object
 */

async function saveTaskCategory (req, res) {
  try {
    const { categoryName } = req.body
    const taskCategory = await TaskCategory.create({
      categoryName
    })
    res.status(201).json(taskCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
/**
 * It deletes a task category from the database.
 * @param req - The request object.
 * @param res - the response object
 * @returns a promise.
 */

async function deleteTaskCategory (req, res) {
  const { id } = req.params
  try {
    if (await validateIfNotExists(id, TaskCategory)) return res.status(404).json({ message: 'taskCategory not found' })

    await TaskCategory.destroy({
      where: {
        id
      }
    })
    return res.status(200).json({ message: 'category deleted' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/**
 * It's a function that takes in a request and a response, and it returns a task category with the id
 * that matches the id in the request params.
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 * @returns The task category with the id that was passed in the request.
 */
async function getOneTaskCategory (req, res) {
  const { id } = req.params
  try {
    if (await validateIfNotExists(id, TaskCategory)) return res.status(404).json({ message: 'taskCategory not found' })
    const taskCategory = await TaskCategory.findOne({
      where: {
        id
      }
    })

    res.json(taskCategory)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

/**
 * It updates the categoryName of a taskCategory with the given id.
 * @param req - request
 * @param res - the response object
 * @returns a promise.
 */
async function updateTaskCategory (req, res) {
  const { id } = req.params
  const { categoryName } = req.body
  try {
    if (await validateIfNotExists(id, TaskCategory)) return res.status(404).json({ message: 'taskCategory not found' })

    const taskCategory = await TaskCategory.update({ categoryName }, { where: { id } })

    res.status(200).json({ message: `taskCategory updated and ${taskCategory[0]} record(s) were modified` })
  } catch (error) {
    return res.status(500).json({ message: 'category not updated' })
  }
}

export {
  getTaskCategory,

  saveTaskCategory,

  deleteTaskCategory,

  updateTaskCategory,

  getOneTaskCategory

}
