import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getDashboardStats } from '../controllers/dashboardController';

const router = Router();

router.get('/stats', authenticateJWT, getDashboardStats);

export default router;
