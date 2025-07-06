import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/register', register); // For initial setup, remove in production

export default router;
