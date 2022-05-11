import { Sequelize, DataTypes } from 'sequelize'
import 'dotenv/config'

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
})

export { sequelize, DataTypes }
