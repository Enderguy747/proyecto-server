import express from 'express'
import logger from 'morgan'
import { userRouter } from './routes/user.routes.js'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Home API site')
})

export { app }
