import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getNotifications, markAllRead } from '../controllers/notificationController';
const router = Router();
router.get('/', authenticateJWT, getNotifications);
router.post('/mark-all-read', authenticateJWT, markAllRead);
export default router;
