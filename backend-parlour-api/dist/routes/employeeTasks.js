import { Router } from 'express';
import { getTasksForEmployee } from '../controllers/employeeTaskController';
const router = Router();
router.get('/:employeeId', getTasksForEmployee);
export default router;
//# sourceMappingURL=employeeTasks.js.map