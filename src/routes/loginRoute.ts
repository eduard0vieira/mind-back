import { Router } from 'express';
import { login } from '../controllers/userController/login';

const router = Router();

router.post('/login', login)

export default router;
