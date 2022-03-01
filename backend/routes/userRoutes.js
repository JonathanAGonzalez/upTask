import { Router } from 'express';
import {
  createUser,
  authUser,
  confirmUser,
} from '../controllers/userController.js';
const router = Router();

router.post('/create-user', createUser);
router.post('/login-user', authUser);
router.get('/confirm-user/:token', confirmUser);

export default router;
