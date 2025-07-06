import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { getNotifications, markAllRead } from '../controllers/notificationController.js';
const router = Router();
router.get('/', authenticateJWT, getNotifications);
router.post('/mark-all-read', authenticateJWT, markAllRead);
export default router;
//# sourceMappingURL=notifications.js.map