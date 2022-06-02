import request from 'supertest'
import { app } from '../src/app'

let lastAddedIndex = 0

const taskCategoryObj = {
  categoryName: 'Test category'
}

const taskCategoryObjUpdate = {
  categoryName: 'Test category updated'
}

describe('POST methods for taskCategory', () => {
  test('Create a new taskCategory', async () => {
    const response = await request(app).post('/api/taskCategory').send(taskCategoryObj)
    lastAddedIndex = response.body.id
    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })
})

describe('GET Methods for task', () => {
  test('Get all taskCategory', async () => {
    const response = await request(app).get('/api/taskCategory')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })

  test('Get one taskCategory', async () => {
    const response = await request(app).get(`/api/taskCategory/${lastAddedIndex}`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })
})

describe('GET methods when the id did not match', () => {
  test('Get one taskCategory that did not exist', async () => {
    const response = await request(app).get('/api/taskCategory/0')
    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toEqual('taskCategory not found')
  })
})

describe('PUT methods for taskCategory', () => {
  test('Update a taskCategory', async () => {
    const response = await request(app).put(`/api/taskCategory/${lastAddedIndex}`).send(taskCategoryObjUpdate)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toEqual('taskCategory updated and 1 record(s) were modified')
  })
})

describe('Delete methods for taskCategory', () => {
  test('Delete a taskCategory', async () => {
    const response = await request(app).delete(`/api/taskCategory/${lastAddedIndex}`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.message).toBeDefined()
  })
})
