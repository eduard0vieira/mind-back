import prisma from '../../config/prisma';

interface ArticleInput {
  title: string;
  content: string;
  authorId: number;
  image?: string;
}

export const createArticleService = async (data: ArticleInput) => {
  const { title, content, image, authorId } = data;

  const authorIdNumber = Number(authorId);
  if (isNaN(authorIdNumber)) {
    throw new Error("authorId inválido");
  }

  const userExists = await prisma.user.findUnique({
    where: { id: authorIdNumber },
  });

  if (!userExists) {
    throw new Error("authorId inválido: usuário não encontrado");
  }

  return await prisma.article.create({
    data: {
      title,
      content,
      image,
      authorId: authorIdNumber,
    },
    include: {
      author: true,
    },
  });
};


export const getAllArticlesService = async () => {
  return await prisma.article.findMany({ include: { author: true } });
};

export const getArticleByIdService = async (id: number) => {
  return await prisma.article.findUnique({
    where: { id },
    include: { author: true },
  });
};

export const updateArticleService = async (
  id: number,
  data: Partial<ArticleInput>
) => {
  return await prisma.article.update({
    where: { id },
    data,
    include: { author: true },
  });
};

export const deleteArticleService = async (id: number) => {
  return await prisma.article.delete({
    where: { id },
  });
};
