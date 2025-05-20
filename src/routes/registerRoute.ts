import { Router } from 'express';
import { register } from '../controllers/userController/register';

const router = Router();

router.post('/register', register);

export default router;
