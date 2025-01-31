import { readPosts, createPost, updatePost, deletePost, readPost } from '../services/postService.js'
import PostError from '../errors/postError.js'

function handleError(res, error, action) {
    console.error(`Error ${action}:`, error.stack)
    if (error instanceof PostError) {
        return res.status(error.statusCode).json({ error: error.message })
    } else {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function createPostController(req, res) {
    try {
        const post = req.body
        await createPost(post)
        res.status(201).send()
    } catch (error) {
        handleError(res, error, 'creating post')
    }
}

export async function readPostByIdController(req, res) {
    try {
        const postId = req.params.id
        const post = await readPost(postId)
        res.status(200).send(post)
    } catch (error) {
        handleError(res, error, 'creating post')
    }
}

export async function readPostsController(req, res) {
    try {
        const posts = await readPosts()
        res.status(200).send(posts)
    } catch (error) {
        handleError(res, error, 'creating post')
    }
}

export async function updatePostController(req, res) {
    try {
        const post = req.body
        await updatePost(post)
        res.status(204).send()
    } catch (error) {
        handleError(res, error, 'creating post')
    }
}

export async function deletePostController(req, res) {
    try {
        const postId = req.params.id
        await deletePost(postId)
        res.status(204).send()
    } catch (error) {
        handleError(res, error, 'creating post')
    }
}
