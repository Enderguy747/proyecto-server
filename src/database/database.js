import { Sequelize, DataTypes } from 'sequelize'
import 'dotenv/config'

/* Creating a new instance of Sequelize and passing in the database name, user, password, host, and
dialect. */
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
})

export { sequelize, DataTypes }
