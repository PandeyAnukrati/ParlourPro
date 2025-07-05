import { Router } from 'express';
import { employeeLogin } from '../controllers/employeeAuthController';
const router = Router();
router.post('/login', employeeLogin);
export default router;
//# sourceMappingURL=employeeAuth.js.map