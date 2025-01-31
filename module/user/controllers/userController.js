import { readUsers, updateUser, deleteUser, createUser, login } from '../repositories/usersRepository.js'
import UserError from '../errors/userError.js'

function handleError(res, error, action) {
    console.error(`Error ${action}:`, error.stack)
    if (error instanceof UserError) {
        return res.status(error.statusCode).json({ error: error.message })
    } else {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function handleCreateUser(req, res) {
    try {
        await createUser(req.body)
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        handleError(res, error, 'creating user')
    }
}

export async function handleReadUsers(req, res) {
    try {
        const users = await readUsers()
        res.status(200).json(users)
    } catch (error) {
        handleError(res, error, 'reading users')
    }
}

export async function handleUpdateUser(req, res) {
    try {
        await updateUser(req.body)
        res.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
        handleError(res, error, 'updating user')
    }
}

export async function handleDeleteUser(req, res) {
    try {
        await deleteUser(req.body)
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        handleError(res, error, 'deleting user')
    }
}

export async function handleLogin(req, res) {
    try {
        const token = await login(req.body)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
        })
        res.status(200).json({ message: 'Logged in successfully' })
    } catch (error) {
        handleError(res, error, 'logging in')
    }
}

export async function handleLogout(req, res) {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        handleError(res, error, 'logging out')
    }
}
