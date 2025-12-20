import {Router} from "express";
import {UserController} from "../controllers/user-controller.js";

const router = Router();

router.get('/signUp', UserController.signUp)
router.get('/signIn', UserController.signIn)
router.get('/me', UserController.getMe)
router.get('/signOut', UserController.signOut)
// router.get('/activate/:link')
router.get('/refresh', UserController.refresh)
// router.get('/users')

export default router