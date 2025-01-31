import express from 'express'
import user_router from './module/user/routes/userRoute.js'
const router = express.Router({ mergeParams: true })

router.use('/user', user_router)

export default router
