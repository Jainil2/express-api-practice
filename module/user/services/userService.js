import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function verifyEmail(email) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email)
}

export function verifyPassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/
    return regex.test(password)
}

export async function AuthenticatePassword(password, hash) {
    return await bycrypt.compare(password, hash)
}

export function hashPassword(password) {
    return bycrypt.hash(password, 10)
}

export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' })
}
