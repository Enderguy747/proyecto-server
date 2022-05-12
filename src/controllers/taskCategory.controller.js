import { taskCategory } from '../models/taskCategory.js'

async function getTaskCategory (req, res) {
  try {
    const tskCtgy = await taskCategory.findAll({
      attributes: ['id', ['categoryName', 'Categoría']]
    })
    res.json(tskCtgy)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function saveTaskCategory (req, res) {
  try {
    const { categoryName } = req.body
    const tskCtgy = await taskCategory.create({
      categoryName
    })
    res.status(201).json(tskCtgy)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function deleteTaskCategory (req, res) {
  const { id } = req.params
  try {
    await taskCategory.destroy({
      where: {
        id
      }
    })
    res.status(204).json({ message: 'category deleted' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function getOneTaskCategory (req, res) {
  const { id } = req.params
  try {
    const tskCtgy = await taskCategory.findOne({
      where: {
        id
      }
    })

    tskCtgy ? res.json(tskCtgy) : res.status(404).json({ message: 'category not found' })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

async function updateTaskCategory (req, res) {
  const { id } = req.params
  res.json({ message: 'actualizar categoría', id })
}

export {
  getTaskCategory,

  saveTaskCategory,

  deleteTaskCategory,

  updateTaskCategory,

  getOneTaskCategory

}
