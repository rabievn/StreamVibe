import {Router} from "express";
import {UserController} from "../controllers/user-controller.js";

const router = Router();

router.get('/signUp', UserController.signUp)
router.get('/signIn', UserController.signIn)
router.get('/me', UserController.getMe)
// router.get('/signOut')
// router.get('/activate/:link')
// router.get('/refresh')
// router.get('/users')

export default router