import { Router } from 'express'
import { UserController } from '../controllers/user-controller.js'
import { AuthController } from '../controllers/auth-controller.js'

const router = Router()

router.post('/signUp', AuthController.signUp)
router.post('/signIn', AuthController.signIn)
router.get('/me', UserController.getMe)
router.post('/signOut', AuthController.signOut)
router.post('/refresh', AuthController.refresh)
router.get('/users', UserController.getUsers)
router.get('/activate/:link', AuthController.activate)

export default router