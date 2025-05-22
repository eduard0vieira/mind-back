import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { getProfile } from '../controllers/userController/getProfile';
import { upload, uploadAvatar } from '../controllers/userController/uploadAvatar';

const router = Router();

router.get('/me', authenticate, getProfile);
router.post('/avatar', authenticate, upload.single('avatar'), uploadAvatar);


export default router;
