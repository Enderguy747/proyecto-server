import { app } from './app.js'
import { sequelize } from './database/database.js'

const PORT = process.env.PORT || 3000

async function main () {
  await sequelize.sync({ force: false })
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
  })
}

main()
