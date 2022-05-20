// eslint-disable-next-line no-unused-vars
import { Task } from '../models/Task.js'
// eslint-disable-next-line no-unused-vars
import { validateIfNotExists } from '../utils/validateIfNotExists.js'

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
    return res.status(500).json({ message: error.message })
  }
}

async function getAllTasks (req, res) {
  try {
    const { row, count } = await Task.findAndCountAll({
      attributes: ['id', 'taskTitle', 'taskDescription', 'taskPriority', 'taskCompleted', 'taskCategoryId'],
      order: [['id', 'DESC']]
    })
    res.send({ data: row, results_number: count })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getOneTask (req, res) {
  const { id } = req.params
  try {
    if (await validateIfNotExists(id, Task)) return res.status(404).json({ message: 'task not found' })

    const task = await Task.findOne({
      where: {
        id
      },
      attributes: ['id', 'taskTitle', 'taskDescription', 'taskPriority', 'taskCompleted', 'taskCategoryId'],
      order: ['id', 'ASC']

    })
    res.status(200).json(task)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

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

    res.status(200).json(task)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
async function deleteTask (req, res) {
  const { id } = req.params
  try {
    if (await validateIfNotExists(id, Task)) return res.status(404).json({ message: 'task not found' })

    await Task.destroy({ where: { id } })
    res.status(204).json({ message: 'task deleted' })
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
