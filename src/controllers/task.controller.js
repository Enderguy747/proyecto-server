import { Task } from '../../src/models/Task.js'
import { validateIfNotExists } from '../../src/utils/validateIfNotExists.js'

/**
 * It takes the data from the request body, creates a new task with that data, and returns the new task
 * as a JSON object.
 * @param req - The request object.
 * @param res - the response object
 * @returns The task object is being returned.
 */
async function saveTask (req, res) {
  const { taskTitle, taskDescription, taskPriority, taskCompleted, taskCategoryId } = req.body
  try {
    const task = await Task.create({
      taskTitle,
      taskDescription,
      taskPriority,
      taskCompleted,
      taskCategoryId
    })
    res.status(201).json(task)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

/**
 * It gets all the tasks from the database and sends them back to the client.
 * @param req - The request object.
 * @param res - the response object
 * @returns an object with two properties: data and results_number.
 */
async function getAllTasks (req, res) {
  try {
    const { count, rows } = await Task.findAndCountAll({
      attributes: ['id', 'taskTitle', 'taskDescription', 'taskPriority', 'taskCompleted', 'taskCategoryId'],
      order: [['id', 'DESC']]
    })
    res.send({ data: rows, results_number: count })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/**
 * It gets one task from the database and returns it to the user.
 * @param req - request
 * @param res - the response object
 * @returns The task object.
 */
async function getOneTask (req, res) {
  const { id } = req.params
  try {
    if (await validateIfNotExists(id, Task)) return res.status(404).json({ message: 'Task not found' })

    const task = await Task.findOne({
      where: {
        id
      },
      /* A way to select the columns you want to return from the database. */
      attributes: ['id', 'taskTitle', 'taskDescription', 'taskPriority', 'taskCompleted', 'taskCategoryId'],
      /* Sorting the results by the id column in ascending order. */
      order: [['id', 'ASC']]

    })
    res.status(200).json(task)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/**
 * It updates a task in the database.
 * @param req - the request object
 * @param res - the response object
 * @returns The number of records that were modified.
 */
async function updateTask (req, res) {
  const { id } = req.params
  const { taskTitle, taskDescription, taskPriority, taskCompleted, taskCategoryId } = req.body
  try {
    if (await validateIfNotExists(id, Task)) return res.status(404).json({ message: 'task not found' })

    const task = await Task.update(
      {
        taskTitle,
        taskDescription,
        taskPriority,
        taskCompleted,
        taskCategoryId
      }, { where: { id } }
    )

    res.status(200).json({ message: `task updated and ${task[0]} record(s) were modified` })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/**
 * It deletes a task from the database if it exists.
 * @param req - The request object.
 * @param res - The response object.
 * @returns a promise.
 */
async function deleteTask (req, res) {
  const { id } = req.params
  try {
    if (await validateIfNotExists(id, Task)) return res.status(404).json({ message: 'task not found' })

    await Task.destroy({ where: { id } })
    return res.status(200).json({ message: 'task deleted' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export {
  saveTask,
  getAllTasks,
  getOneTask,
  updateTask,
  deleteTask
}
