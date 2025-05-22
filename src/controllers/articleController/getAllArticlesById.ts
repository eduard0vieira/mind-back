import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getAllArticlesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const articles = await prisma.article.findMany({
      where: { authorId: parseInt(id) },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!articles || articles.length === 0) {
      res.status(404).json({ error: "Nenhum artigo encontrado para este usuário." });
      return;
    }

    res.json(articles);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
};
