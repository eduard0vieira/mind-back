import { Router } from 'express';
import { login } from '../controllers/userController/login';

const router = Router();

router.get('login', login)

export default router;
