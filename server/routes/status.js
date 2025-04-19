import express from 'express'
import { getAllStatus, getSingleStatus, registerStatus } from '../controller/statusController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.post('/registerStatus', authenticate, restrict(['user']), registerStatus);
router.get('/allStatus', getAllStatus);
router.get('/singleStatus/:id', getSingleStatus)

export default router