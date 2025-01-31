import express from 'express'
import { handleCreateUser, handleDeleteUser, handleReadUsers, handleUpdateUser } from '../controllers/userController.js'

const user_router = express.Router()

user_router.get('/', handleReadUsers)
user_router.post('/', handleCreateUser)
user_router.delete('/', handleDeleteUser)
user_router.patch('/', handleUpdateUser)

export default user_router
