import { validateIfNotExists } from '../src/utils/validateIfNotExists.js'
import { Task } from '../src/models/Task.js'
import { TaskCategory } from '../src/models/TaskCategory.js'

describe('Testing the util "validateIfNotExists"', () => {
  test('Testing the util "validateIfNotExists" with a valid task id', async () => {
    const result = await validateIfNotExists(1, Task)
    expect(result).toBe(false)
  })
  test('Testing the util "validateIfNotExists" with an invalid task id', async () => {
    const result = await validateIfNotExists(0, Task)
    expect(result).toBe(true)
  })

  test('Testing the util "validateIfNotExists" with a valid task category id', async () => {
    const result = await validateIfNotExists(1, TaskCategory)
    expect(result).toBe(false)
  })

  test('Testing the util "validateIfNotExists" with an invalid task category id', async () => {
    const result = await validateIfNotExists(0, TaskCategory)
    expect(result).toBe(true)
  })
})
