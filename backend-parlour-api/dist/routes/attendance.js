import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { getAttendanceLogs, getAttendanceState, punchAttendance } from '../controllers/attendanceController.js';
const router = Router();
router.get('/', authenticateJWT, getAttendanceLogs);
router.get('/state', authenticateJWT, getAttendanceState);
router.post('/punch', authenticateJWT, punchAttendance);
export default router;
//# sourceMappingURL=attendance.js.map