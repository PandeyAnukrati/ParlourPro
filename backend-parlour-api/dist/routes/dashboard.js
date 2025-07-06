import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
const router = Router();
router.get('/stats', authenticateJWT, getDashboardStats);
export default router;
//# sourceMappingURL=dashboard.js.map