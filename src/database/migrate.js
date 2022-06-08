import { sequelize } from './database.js'

const doMigrations = async () => {
  await sequelize.sync({ alter: false })
  console.log('Migrating...')
}
doMigrations()
