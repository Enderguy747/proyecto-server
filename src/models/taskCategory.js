
import { sequelize, DataTypes } from '../database/database.js'
import { Task } from './Task.js'

/* Creating a table in the database. */
const TaskCategory = sequelize.define('taskCategory', {
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
TaskCategory.hasMany(Task, {
  foreignKey: {
    name: 'taskCategoryId',
    allowNull: false
  },
  sourceKey: 'id',
  onDelete: 'no action',
  onUpdate: 'no action'
})
Task.belongsTo(TaskCategory, {
  foreignKey: {
    name: 'taskCategoryId',
    allowNull: false
  },
  targetKey: 'id'

})
export { TaskCategory }
