import {Router} from "express";
import {UserController} from "../controllers/user-controller.js";

const router = Router();

router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)
router.get('/me', UserController.getMe)
router.post('/signOut', UserController.signOut)
// router.get('/activate/:link')
router.post('/refresh', UserController.refresh)
// router.get('/users')
router.get('/activate/:link', UserController.activate)


export default router