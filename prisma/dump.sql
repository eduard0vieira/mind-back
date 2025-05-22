-- Criar o banco de dados
DROP DATABASE IF EXISTS mind_db;
CREATE DATABASE mind_db;
USE mind_db;

-- Tabela de usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de artigos
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir um usuário de teste (senha apenas como texto para fins de exemplo)
INSERT INTO users (name, email, password)
VALUES ('Teste', 'teste@gmail.com', '123456');

-- Inserir um artigo ligado ao usuário de teste (ID 1)
INSERT INTO articles (title, content, image, author_id)
VALUES ('Primeiro Artigo', 'Conteúdo do artigo de teste...', NULL, 1);
