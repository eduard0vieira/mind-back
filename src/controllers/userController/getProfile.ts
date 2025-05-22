import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { getProfileService } from '../../services/auth/getProfile.service';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: 'Não autenticado.' });
      return;
    }
    
    const user = await getProfileService(req.userId);

    const protocol = req.protocol;      
    const host     = req.get('host');        
    const imageUrl = user.image
      ? `${protocol}://${host}${user.image}`
      : undefined;

    res.json({
      id:    user.id,
      name:  user.name,
      email: user.email,
      image: imageUrl,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
