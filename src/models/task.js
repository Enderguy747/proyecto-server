import { sequelize, DataTypes } from '../../src/database/database.js'

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  taskTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskPriority: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taskCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false

  }

})

export { Task }
