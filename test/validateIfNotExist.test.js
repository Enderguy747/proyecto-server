import { validateIfNotExists } from '../src/utils/validateIfNotExists.js'
import { Task } from '../src/models/Task.js'
import { TaskCategory } from '../src/models/TaskCategory.js'
import { app } from '../src/app.js'
import request from 'supertest'

/**
 * It takes an object and a path, and returns the id of the object that was created by sending a POST
 * request to the path.
 * @param object - the object you want to save
 * @param path - the path to the endpoint you want to test
 * @returns The id of the object that was created.
 */
const saveBeforeAll = async (object, path) => {
  const response = await request(app).post(`/api/${path}`).send(object)
  const { id } = response.body
  return id
}
let taskCategoryId = 0
let taskId = 0

const taskCategoryObj = {
  categoryName: 'Test category'
}

describe('Testing the util "validateIfNotExists"', () => {
  beforeAll(async () => {
    taskCategoryId = await saveBeforeAll(taskCategoryObj, 'taskCategory')
    taskId = await saveBeforeAll({
      taskTitle: 'Test task',
      taskDescription: 'Test description',
      taskPriority: 1,
      taskCompleted: false,
      taskCategoryId

    }, 'task')
  })

  afterAll(async () => {
    await request(app).delete(`/api/task/${taskId}`)
    await request(app).delete(`/api/taskCategory/${taskCategoryId}`)
  })

  test('Testing the util "validateIfNotExists" with a valid task id', async () => {
    const result = await validateIfNotExists(taskId, Task)
    expect(result).toBe(false)
  })

  test('Testing the util "validateIfNotExists" with a valid task category id', async () => {
    const result = await validateIfNotExists(taskCategoryId, TaskCategory)
    expect(result).toBe(false)
  })
})

describe('Testing the util "validateIfNotExists" with a invalid id', () => {
  test('Testing the util "validateIfNotExists" with an invalid task category id', async () => {
    const result = await validateIfNotExists(0, TaskCategory)
    expect(result).toBe(true)
  })

  test('Testing the util "validateIfNotExists" with an invalid task id', async () => {
    const result = await validateIfNotExists(0, Task)
    expect(result).toBe(true)
  })
})
