
import { sequelize, DataTypes } from '../database/database.js'
import { task } from './task.js'

/* Creating a table in the database. */
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
taskCategory.hasMany(task, {
  foreignKey: 'taskCategoryId',
  sourceKey: 'id',
  onDelete: 'no action',
  onUpdate: 'no action'
})
task.belongsTo(taskCategory, {
  foreignKey: 'taskCategoryId',
  targetKey: 'id'
})
export { taskCategory }
