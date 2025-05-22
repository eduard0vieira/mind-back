import { Request, Response } from "express";
import { deleteArticleService } from "../../services/articles/article.service";

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteArticleService(Number(id));
    res.json({ message: "Artigo deletado com sucesso" });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Erro ao deletar artigo" });
  }
};
