import prisma from '../../config/prisma';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  image?: string;
}

export const getProfileService = async (userId: number): Promise<UserProfile> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, image: true },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const profile: UserProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image ?? '/images/user.png',
  };

  return profile;
};
