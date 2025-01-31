import bycrypt from 'bcryptjs'

export async function AuthenticatePassword(password, hash) {
    return await bycrypt.compare(password, hash)
}
