import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createArticle } from '../controllers/articleController/createArticle';
import { getAllArticles } from '../controllers/articleController/getAllArticles';
import { getArticleById } from '../controllers/articleController/getArticleById';
import { updateArticle } from '../controllers/articleController/updateArticle';
import { deleteArticle } from '../controllers/articleController/deleteArticle';
import { getAllArticlesById } from '../controllers/articleController/getAllArticlesById';

const router = Router();

router.post('/create', authenticate, createArticle);
router.get('/get', getAllArticles);

router.get('/:id', authenticate, getArticleById);
router.get('/all/:id', authenticate, getAllArticlesById);
router.put('/:id', authenticate, updateArticle);
router.delete('/:id', authenticate, deleteArticle);

export default router;
