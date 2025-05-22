import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createArticle } from '../controllers/articleController/createArticle';
import { getAllArticles } from '../controllers/articleController/getAllArticles';
import { getArticleById } from '../controllers/articleController/getArticleById';
import { updateArticle } from '../controllers/articleController/updateArticle';
import { deleteArticle } from '../controllers/articleController/deleteArticle';

const router = Router();

router.post('/create', authenticate, createArticle);
router.get('/get', authenticate, getAllArticles);

router.get('/:id', authenticate, getArticleById);
router.put('/:id', authenticate, updateArticle);
router.delete('/:id', authenticate, deleteArticle);

export default router;
