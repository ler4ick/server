import express from 'express';
import cors from'cors';
import jwt from './_helpers/jwt.js';
import errorHandler from './_helpers/error-handler.js';
import mysql from 'mysql2'

import usersController from './services/users/users.controller.js'

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', usersController);

// global error handler
app.use(errorHandler);


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "chat_db"
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:4200', // URL-адрес Angular-приложения
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Пример простого маршрута
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

// Маршрут для отправки сообщений
app.post('/api/messages', (req, res) => {
  console.log('Полученные данные:', req.body, req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    // Если нет файлов, то данные должны быть в req.body
    console.log('Данные в req.body:', req.body);
    // Здесь вы можете добавить логику сохранения сообщения в базе данных или другую обработку
    res.json({ status: 'success' });
  } else {
    // Если есть файлы, то данные будут в req.files
    console.log('Данные в req.files:', req.files);
    // Здесь вы можете добавить логику сохранения сообщения и файлов в базе данных или другую обработку
    res.json({ status: 'success' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});