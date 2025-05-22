import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });

    if (!article) {
      res.status(404).json({ error: "Artigo não encontrado" });
      return;
    }

    res.json(article);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
};
