
import request from 'supertest'
import { app } from '../src/app.js'
// import { Task } from '../src/models/Task.js'
const taskObj = {
  taskTitle: 'Test task',
  taskDescription: 'Test description',
  taskPriority: 1,
  taskCompleted: false,
  taskCategoryId: 1
}

const taskObjUpdate = {
  taskTitle: 'Test task updated',
  taskDescription: 'Test description updated',
  taskPriority: 2,
  taskCompleted: true,
  taskCategoryId: 2
}

let lastAddedIndex = 0

describe('GET Methods for task', () => {
  test('Get all tasks', async () => {
    const response = await request(app).get('/api/task')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })

  test('Get one task', async () => {
    const response = await request(app).get('/api/task/1')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })
})

describe('GET methods when the id did not match', () => {
  test('Get one task that did not exist', async () => {
    const response = await request(app).get('/api/task/0')
    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toEqual('Task not found')
  })
})

describe('POST methods for task', () => {
  test('Create a new task', async () => {
    const response = await request(app).post('/api/task').send(taskObj)
    lastAddedIndex = response.body.id
    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })
})
describe('PUT methods for task', () => {
  test('Update a task', async () => {
    const response = await request(app).put(`/api/task/${lastAddedIndex}`).send(taskObjUpdate)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toEqual('task updated and 1 record(s) were modified')
  })
})

describe('Delete methods for task', () => {
  test('Delete a task', async () => {
    const response = await request(app).delete(`/api/task/${lastAddedIndex}`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toBeDefined()
  })
})
