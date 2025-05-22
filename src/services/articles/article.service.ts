import prisma from '../../config/prisma';

interface ArticleInput {
  title: string;
  content: string;
  authorId: number;
}

export const createArticleService = async (data: ArticleInput) => {
  const articleData = {
    ...data
  };

  return await prisma.article.create({ data: articleData });
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
  });
};

export const deleteArticleService = async (id: number) => {
  return await prisma.article.delete({
    where: { id },
  });
};
