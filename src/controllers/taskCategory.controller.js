import { taskCategory } from '../models/taskCategory.js'
import { tskCtgyNotExists } from '../utils/validateIfNotExists.js'

/**
 * It gets all the task categories and the results number from the database and returns them to the user.
 * @param req - The request object.
 * @param res - the response object
 */
async function getTaskCategory (req, res) {
  try {
    const { count, rows } = await taskCategory.findAndCountAll()
    res.json({ data: rows, results_number: count })
  } catch (error) {
    res.status(500).json({ message: error.message })
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
    const tskCtgy = await taskCategory.create({
      categoryName
    })
    res.status(201).json(tskCtgy)
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
    if (await tskCtgyNotExists(id)) res.status(404).json({ message: 'taskCategory not found' })

    await taskCategory.destroy({
      where: {
        id
      }
    })
    return res.status(204).json({ message: 'category deleted' })
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
    if (await tskCtgyNotExists(id)) res.status(404).json({ message: 'taskCategory not found' })
    const tskCtgy = await taskCategory.findOne({
      where: {
        id
      }
    })

    res.json(tskCtgy)
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
    if (await tskCtgyNotExists(id)) res.status(404).json({ message: 'taskCategory not found' })

    await taskCategory.update({ categoryName }, {
      where: {
        id
      }
    }
    )
    return res.status(200).json({ message: 'category updated' })
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
