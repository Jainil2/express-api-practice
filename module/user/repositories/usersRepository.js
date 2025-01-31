import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { usersTable } from '../../../db/schema/users.js'
import {
    verifyEmail,
    verifyPassword,
    AuthenticatePassword,
    hashPassword,
    generateToken,
} from '../services/userService.js'
import {
    userExistsError,
    invalidEmailError,
    invalidPasswordError,
    userNotFoundError,
    unauthorizedActionError,
} from '../errors/userError.js'

dotenv.config()

const db = drizzle(process.env.DATABASE_URL || '')

export async function login(user) {
    const userExists = await db.select().from(usersTable).where(eq(usersTable.email, user.email))
    if (userExists.length === 0) {
        throw new userNotFoundError()
    }
    const match = await AuthenticatePassword(user.password, userExists[0].password)
    if (!match) {
        throw new unauthorizedActionError()
    }
    return generateToken({ id: userExists[0].id })
}

export async function createUser(user) {
    const userExists = await db.select().from(usersTable).where(eq(usersTable.email, user.email))
    if (userExists.length > 0) {
        throw new userExistsError()
    }
    if (!verifyEmail(user.email)) {
        throw new invalidEmailError()
    }
    if (!verifyPassword(user.password)) {
        throw new invalidPasswordError()
    }
    user.password = await hashPassword(user.password)
    await db.insert(usersTable).values(user)
}

export async function readUsers() {
    const users = await db.select().from(usersTable)
    if (users.length === 0) {
        throw new userNotFoundError()
    }
    return users
}

export async function updateUser(user) {
    const userExists = await db.select().from(usersTable).where(eq(usersTable.email, user.email))
    if (userExists.length === 0) {
        throw new userNotFoundError()
    }
    if (!verifyEmail(user.email)) {
        throw new invalidEmailError()
    }
    if (!verifyPassword(user.password)) {
        throw new invalidPasswordError()
    }
    // const match = await AuthenticatePassword(user.password, userExists[0].password)
    // if (!match) {
    //     throw new unauthorizedActionError()
    // }

    user.password = await hashPassword(user.password)
    await db.update(usersTable).set(user).where(eq(usersTable.email, user.email))
}

export async function deleteUser(user) {
    const userExists = await db.select().from(usersTable).where(eq(usersTable.email, user.email))
    if (userExists.length === 0) {
        throw new userNotFoundError()
    }
    // const match = await AuthenticatePassword(user.password, userExists[0].password)
    // if (!match) {
    //     throw new unauthorizedActionError()
    // }

    await db.delete(usersTable).where(eq(usersTable.email, user.email))
}
