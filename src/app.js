import express from 'express'
import logger from 'morgan'
import { taskCategoryRouter } from './routes/taskCategory.routes.js'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/taskCategory', taskCategoryRouter)

app.get('/', (req, res) => {
  res.send('Home API site')
})

export { app }
