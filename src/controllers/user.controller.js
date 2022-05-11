import { User } from '../models/User.js'

async function getUsers (req, res) {
  try {
    const user = await User.findAll({
      attributes: ['id', ['name', 'Nombre']]
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function saveUser (req, res) {
  try {
    const { name } = req.body
    const user = await User.create({
      name
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getUsers, saveUser }
