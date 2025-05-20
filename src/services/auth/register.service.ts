import bcrypt from 'bcrypt';
import prisma from '../../config/prisma';

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: RegisterDTO) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error('Email já cadastrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};