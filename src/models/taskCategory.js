
import { sequelize, DataTypes } from '../database/database.js'

const taskCategory = sequelize.define('taskCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }

},
// configuration for timestamps starts here
{
  timestamps: true
}
)
export { taskCategory }
