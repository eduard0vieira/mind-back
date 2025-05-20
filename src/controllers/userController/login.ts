import { RequestHandler } from 'express';
import { loginUser } from '../../services/auth/login.service';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await loginUser({ email, password });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
