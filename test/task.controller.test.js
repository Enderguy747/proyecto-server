
import request from 'supertest'
import { app } from '../src/app.js'
// import { Task } from '../src/models/Task.js'
let lastAddedIndex = 0
let taskCategoryId = 0

const taskCategoryObj = {
  categoryName: 'Test category'
}
const taskObj = {
  taskTitle: 'Test task',
  taskDescription: 'Test description',
  taskPriority: 1,
  taskCompleted: false,
  taskCategoryId
}

const taskObjUpdate = {
  taskTitle: 'Test task updated',
  taskDescription: 'Test description updated',
  taskPriority: 2,
  taskCompleted: true,
  taskCategoryId
}

describe('task tests', () => {
  beforeEach(async () => {
    const response = await request(app).post('/api/taskCategory').send(taskCategoryObj)
    taskCategoryId = response.body.id
    return response
  })

  afterEach(async () => {
    return await request(app).delete(`/api/taskCategory/${lastAddedIndex}`)
  })

  test('Create a new task', async () => {
    const response = await request(app).post('/api/task').send(taskObj)
    lastAddedIndex = response.body.id
    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })

  test('Get all tasks', async () => {
    const response = await request(app).get('/api/task')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })

  test('Get one task', async () => {
    const response = await request(app).get(`/api/task/${lastAddedIndex}`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })

  test('Get one task that did not exist', async () => {
    const response = await request(app).get('/api/task/0')
    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toEqual('Task not found')
  })

  test('Update a task', async () => {
    const response = await request(app).put(`/api/task/${lastAddedIndex}`).send(taskObjUpdate)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toEqual('task updated and 1 record(s) were modified')
  })

  test('Delete a task', async () => {
    const response = await request(app).delete(`/api/task/${lastAddedIndex}`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toBeDefined()
  })
})
