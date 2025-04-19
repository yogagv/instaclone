import express from 'express'
import { loginUser, registerUser } from '../controller/authController.js'

const router = express.Router();

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)

export default router