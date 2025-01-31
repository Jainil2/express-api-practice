import { Router } from 'express'
import {
    createPostController,
    readPostsController,
    updatePostController,
    deletePostController,
    readPostByIdController,
} from '../controllers/postController.js'
import verifyToken from '../../../middleware/userAuthrntication.js'

const postRouter = Router()

postRouter.post('/', verifyToken, createPostController)
postRouter.get('/', verifyToken, readPostsController)
postRouter.get('/:id', verifyToken, readPostByIdController)
postRouter.put('/', verifyToken, updatePostController)
postRouter.delete('/:id', verifyToken, deletePostController)

export default postRouter
