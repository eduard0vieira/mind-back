import { Request, Response } from "express";
import { getAllArticlesService } from "../../services/articles/article.service";

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await getAllArticlesService();
    res.json(articles);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Erro ao buscar artigos" });
  }
};
