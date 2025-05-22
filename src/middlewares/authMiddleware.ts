import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  userId?: number;
}

function isAuthPayload(payload: any): payload is { sub: number; email: string } {
  return (
    typeof payload === 'object' &&
    typeof payload.sub === 'number' &&
    typeof payload.email === 'string'
  );
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido.' });
    return;
  }

  const [, token] = authHeader.split(' ');
  if (!token) {
    res.status(401).json({ error: 'Token mal formatado.' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (isAuthPayload(payload)) {
      req.userId = payload.sub;
      next();
    } else {
      res.status(401).json({ error: 'Token inválido: estrutura incorreta.' });
    }
  } catch (err) {
    res.status(401).json({ error: 'Token inválido.' });
  }
}
