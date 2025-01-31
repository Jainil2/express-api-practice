import express from 'express'
import {
    handleCreateUser,
    handleDeleteUser,
    handleLogin,
    handleLogout,
    handleReadUsers,
    handleUpdateUser,
} from '../controllers/userController.js'
import verifyToken from '../../../middleware/userAuthrntication.js'

const user_router = express.Router()

user_router.get('/', handleReadUsers)
user_router.post('/', handleCreateUser)
user_router.delete('/', verifyToken, handleDeleteUser)
user_router.patch('/', verifyToken, handleUpdateUser)
user_router.post('/login', handleLogin)
user_router.post('/logout', verifyToken, handleLogout)

export default user_router
