import express from 'express'
import { getAllUser, getSingleUser, profileDelete, profileUpdate } from '../controller/userController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.get('/allUsers' , getAllUser);
router.get('/singleUser/:id', getSingleUser);
router.put('/profileUpdate/:id', authenticate, profileUpdate)
router.delete('/profileDelete/:id', profileDelete)

export default router