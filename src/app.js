import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { taskCategoryRouter } from './routes/taskCategory.routes.js'
import { taskRouter } from './routes/task.routes.js'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/taskCategory', taskCategoryRouter)
app.use('/api/task', taskRouter)

app.get('/', (req, res) => {
  res.status(200).send('Home api')
})

export { app }
