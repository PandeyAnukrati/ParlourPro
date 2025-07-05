import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getEmployeeProfile } from '../controllers/employeeProfileController';
const router = Router();
router.get('/profile', authenticateJWT, getEmployeeProfile);
export default router;
//# sourceMappingURL=employeeProfile.js.map