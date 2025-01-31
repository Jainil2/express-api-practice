import dotenv from 'dotenv'
import drizzle from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { postTable } from '../../db/schema/posts.js'

dotenv.config()

const db = drizzle(process.env.DATABASE_URL || '')

export async function createPost(post) {
    await db.insert(postTable).values(post)
}

export async function readPosts() {
    const posts = await db.select().from(postTable)
    return posts
}

export async function updatePost(post) {
    const postExists = await db.select().from(postTable).where(eq(postTable.id, post.id))
    if (postExists.length === 0) {
        throw new Error('Post not found')
    }
    await db.update(postTable).set(post).where(eq(postTable.id, post.id))
}

export async function deletePost(postId) {
    await db.delete(postTable).where(eq(postTable.id, postId))
}
