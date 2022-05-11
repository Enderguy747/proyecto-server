
import { sequelize, DataTypes } from '../database/database.js'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
// configuration for timestamps starts here
{
  timestamps: true
}
)
export { User }
