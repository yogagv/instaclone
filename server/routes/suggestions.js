import express from 'express'
import { getAllSuggestions, registerSuggestion } from '../controller/suggestionSchema.js';

const router = express.Router();

router.post('/registerSuggestions', registerSuggestion);
router.get('/allSuggestions', getAllSuggestions);

export default router;