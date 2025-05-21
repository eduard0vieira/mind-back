import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';

dotenv.config();

interface LoginDTO {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginDTO) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, password: true },
  });

  if (!user) {
    throw new Error('Credenciais inválidas.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciais inválidas.');
  }

  const secret = process.env.JWT_SECRET || "fallback-secret-key";

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email }, secret,
    { expiresIn: "1d" },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token
  }
}




