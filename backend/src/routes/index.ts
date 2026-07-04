import { Router } from 'express'
import { UserController } from '../controllers/user-controller.js'
import { AuthController } from '../controllers/auth-controller.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth-middleware.js'
import { validateRequest } from '../middleware/validate-request.js'
import {
  resendActivationValidation,
  signInValidation,
  signUpValidation,
} from '../middleware/validation.js'

const router = Router()

router.post('/signUp', signUpValidation, validateRequest, AuthController.signUp)
router.post('/signIn', signInValidation, validateRequest, AuthController.signIn)
router.get('/activate/:link', AuthController.activate)
router.post(
  '/resend-activation',
  resendActivationValidation,
  validateRequest,
  AuthController.resendActivation,
)

router.post('/refresh', AuthController.refresh)
router.post('/signOut', AuthController.signOut)

router.get('/me', authMiddleware, UserController.getMe)
router.get('/users', authMiddleware, adminMiddleware, UserController.getUsers)

export default router
