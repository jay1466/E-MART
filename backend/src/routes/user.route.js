import express from 'express'
import { getUser, login, register, updateProfile } from '../controller/user.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/uploadimage.js'

const userRoute = express.Router()

userRoute.post('/register',register)
userRoute.post('/login', login)
userRoute.get('/getUser', protectRoute, getUser)
userRoute.post('/updateProfile', protectRoute, upload.single('profilePhoto'), updateProfile)

export default userRoute