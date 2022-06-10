import { app } from './app.js'
import { sequelize } from './database/database.js'

const PORT = process.env.PORT || 3000

/**
 * The main function is an async function that will await the sequelize.sync function, which will sync
 * the database with the models, and then it will listen on the port specified in the PORT variable
 */
async function main () {
  await sequelize.sync({ alter: false })
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
  })
}

main()
