import { Request, Response } from "express";
import { createArticleService } from "../../services/articles/article.service";

export const createArticle = async (req: Request, res: Response) => {
  const { title, content, image, authorId } = req.body;

  try {
    const article = await createArticleService({ title, content, image, authorId });
    res.status(201).json(article);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Erro ao criar artigo" });
  }
};
