import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getAttendanceLogs, getAttendanceState, punchAttendance } from '../controllers/attendanceController';
const router = Router();
router.get('/', authenticateJWT, getAttendanceLogs);
router.get('/state', authenticateJWT, getAttendanceState);
router.post('/punch', authenticateJWT, punchAttendance);
export default router;
