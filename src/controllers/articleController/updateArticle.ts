import { Request, Response } from "express";
import { updateArticleService } from "../../services/articles/article.service";

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const article = await updateArticleService(Number(id), { title, content, image });
    res.json(article);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Erro ao atualizar artigo" });
  }
};
