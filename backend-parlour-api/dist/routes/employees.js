import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';
const router = Router();
router.get('/', authenticateJWT, getEmployees);
router.post('/', authenticateJWT, authorizeRoles('superadmin'), createEmployee);
router.put('/:id', authenticateJWT, authorizeRoles('superadmin'), updateEmployee);
router.delete('/:id', authenticateJWT, authorizeRoles('superadmin'), deleteEmployee);
export default router;
//# sourceMappingURL=employees.js.map