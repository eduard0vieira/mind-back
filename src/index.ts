import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import registerRoute from './routes/registerRoute';
import loginRoute from './routes/loginRoute';
import articlesRoutes from './routes/articlesRoutes';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando 🚀')
});

app.use(express.static(path.resolve("public")));
app.use('/api/auth', registerRoute);
app.use('/api/auth', loginRoute);
app.use('/articles', articlesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} ✅`);
})
