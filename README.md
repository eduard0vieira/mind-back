
# Backend - Blog System

## Descrição

Este é o backend do sistema de blog, responsável pela API que gerencia usuários, autenticação e CRUD dos artigos. Foi desenvolvido em **Node.js** com **Express**, usando **TypeScript** para garantir maior segurança de tipos e produtividade.

O banco de dados é **MySQL**, acessado via o ORM **Prisma** (opcional), e as senhas são protegidas com **bcrypt**. A autenticação é feita via **JWT**.

---

## Tecnologias e Dependências

- Node.js + Express
- TypeScript
- MySQL (via Prisma ORM)
- bcrypt (hash de senhas)
- jsonwebtoken (tokens JWT)
- multer (upload de arquivos)
- dotenv (variáveis de ambiente)
- cors (liberação de CORS)
- helmet (segurança HTTP headers)

---

## Como configurar e rodar o backend

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO_BACKEND>
cd backend
```

### 2. Instale as dependências

```bash
npm install express mysql2 bcrypt jsonwebtoken dotenv multer cors helmet
npm install -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/multer @types/cors @types/helmet
```

### 3. Configure o TypeScript

Caso não tenha, crie um arquivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com as variáveis necessárias:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="suaChaveSuperSecreta"
PORT=8000
```

### 5. Importe o dump do banco de dados

Importe o arquivo `dump.sql` no seu banco MySQL para criar as tabelas e dados iniciais:

```bash
mysql -u seu_usuario -p nome_do_banco < dump.sql
```

### 6. Gere o cliente Prisma (se estiver usando Prisma)

```bash
npx prisma generate
```

### 7. Rodar o servidor

Para rodar em modo de desenvolvimento com hot reload:

```bash
npx ts-node-dev src/index.ts
```

Ou adicione o script no `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev src/index.ts"
}
```

E execute:

```bash
npm run dev
```

---

## Endpoints da API

### Usuários e Autenticação

| Método | Rota                | Protegido | Descrição                          |
|--------|---------------------|-----------|-----------------------------------|
| POST   | `/api/auth/register` | Não       | Criar usuário                     |
| POST   | `/api/auth/login`    | Não       | Login                            |
| GET    | `/api/auth/me`       | Sim       | Retorna dados do perfil do usuário autenticado |
| POST   | `/api/auth/avatar`   | Sim       | Upload da foto/avatar (multipart/form-data) |

### Artigos

| Método | Rota                 | Protegido | Descrição                         |
|--------|----------------------|-----------|----------------------------------|
| POST   | `/articles/create`   | Sim       | Cria um artigo                   |
| GET    | `/articles/get`      | Não       | Lista todos artigos              |
| GET    | `/articles/:id`      | Não       | Busca artigo por ID              |
| GET    | `/articles/all/:id`  | Sim       | Busca todos artigos de um usuário pelo ID |
| PUT    | `/articles/:id`      | Sim       | Atualiza artigo por ID           |
| DELETE | `/articles/:id`      | Sim       | Deleta artigo por ID             |

---

## Estrutura do projeto

```
backend/
 ├─ prisma/
 ├─ src/
 │   ├─ config/
 │   ├─ controllers/
 │   ├─ middlewares/
 │   ├─ routes/
 │   ├─ services/
 │   ├─ uploads/
 │   └─ index.ts
 ├─ .env
 ├─ tsconfig.json
 └─ package.json
```

---

## Considerações finais

- Certifique-se de enviar o token JWT no header `Authorization` como `Bearer <token>` para rotas protegidas.
- Para uploads, utilize `multipart/form-data`.
- Senhas são sempre criptografadas com bcrypt antes de serem salvas no banco.
- Imagens são armazenadas localmente na pasta `/uploads` e servidas como arquivos estáticos.
