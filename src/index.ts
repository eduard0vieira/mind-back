import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import registerRoute from './routes/registerRoute';
import loginRoute from './routes/loginRoute';
import articlesRoutes from './routes/articlesRoutes';
import profileRoute from './routes/profileRoute';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send('API rodando 🚀')
});

app.use(express.static(path.resolve("public")));
app.use('/api/auth', registerRoute);
app.use('/api/auth', loginRoute);
app.use('/articles', articlesRoutes);
app.use('/api/auth', profileRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} ✅`);
})
