import { Router } from 'express';
import { employeeLogin } from '../controllers/employeeAuthController.js';

const router = Router();

router.post('/login', employeeLogin);

export default router;
