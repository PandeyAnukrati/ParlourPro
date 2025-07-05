import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = Router();

router.get('/', authenticateJWT, getTasks);
router.post('/', authenticateJWT, authorizeRoles('superadmin'), createTask);
router.put('/:id', authenticateJWT, authorizeRoles('superadmin'), updateTask);
router.delete('/:id', authenticateJWT, authorizeRoles('superadmin'), deleteTask as any);

export default router;
