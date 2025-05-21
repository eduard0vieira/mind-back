import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import registerRoute from './routes/registerRoute';
import loginRoute from './routes/loginRoute';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando 🚀')
});

app.use('/api/auth', registerRoute);
app.use('/api/auth', loginRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} ✅`);
})
