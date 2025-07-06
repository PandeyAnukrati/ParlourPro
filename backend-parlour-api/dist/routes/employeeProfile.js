import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { getEmployeeProfile } from '../controllers/employeeProfileController.js';
const router = Router();
router.get('/profile', authenticateJWT, getEmployeeProfile);
export default router;
//# sourceMappingURL=employeeProfile.js.map