import dotenv from 'dotenv'
import drizzle from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { postTable } from '../../db/schema/posts.js'
import {
    PostNotCreatedError,
    PostNotFoundError,
    PostNotUpdatedError,
    PostNotDeletedError,
} from '../errors/postError.js'

dotenv.config()

const db = drizzle(process.env.DATABASE_URL || '')

export async function createPost(post) {
    try {
        await db.insert(postTable).values(post)
    } catch {
        throw new PostNotCreatedError('Post not created')
    }
}

export async function readPosts() {
    const posts = await db.select().from(postTable)
    if (posts.length === 0) {
        throw new PostNotFoundError('Posts not found')
    }
    return posts
}

export async function updatePost(post) {
    const postExists = await db.select().from(postTable).where(eq(postTable.id, post.id))
    if (postExists.length === 0) {
        throw new PostNotFoundError('Post not found')
    }
    try {
        await db.update(postTable).set(post).where(eq(postTable.id, post.id))
    } catch {
        throw new PostNotUpdatedError('Post not updated')
    }
}

export async function deletePost(postId) {
    try {
        await db.delete(postTable).where(eq(postTable.id, postId))
    } catch {
        throw new PostNotDeletedError('Post not deleted')
    }
}

export async function readPost(postId) {
    const post = await db.select().from(postTable).where(eq(postTable.id, postId))
    if (post.length === 0) {
        throw new PostNotFoundError('Post not found')
    }
    return post[0]
}
