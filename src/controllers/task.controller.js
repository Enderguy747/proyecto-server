// eslint-disable-next-line no-unused-vars
import { task } from '../models/task.js'
// eslint-disable-next-line no-unused-vars
import { validateIfNotExists } from '../utils/validateIfNotExists.js'

async function saveTask (req, res) {
  res.send('saveTask')
}
async function getAllTasks (req, res) {
  res.send('get all Task')
}
async function getOneTask (req, res) {
  console.log('getAllTask')
}
async function updateTask (req, res) {
  console.log('getAllTask')
}
async function deleteTask (req, res) {
  console.log('getAllTask')
}

export {
  saveTask,
  getAllTasks,
  getOneTask,
  updateTask,
  deleteTask
}
