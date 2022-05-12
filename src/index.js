import { app } from './app.js'
import { sequelize } from './database/database.js'
import './models/task.js'
const PORT = process.env.PORT || 3000

async function main () {
  await sequelize.sync({ alter: false })
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
  })
}

main()
