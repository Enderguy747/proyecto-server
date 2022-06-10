import { Sequelize, DataTypes } from 'sequelize'
import 'dotenv/config'

/* Creating a new instance of Sequelize and passing in the database name, user, password, host, and
dialect. */
const sequelize = new Sequelize(process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD, {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres'
  })

export { sequelize, DataTypes }
