import { Router } from 'express';
import { getTasksForEmployee } from '../controllers/employeeTaskController.js';

const router = Router();

router.get('/:employeeId', getTasksForEmployee);

export default router;
