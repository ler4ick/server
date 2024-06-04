import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

import jwt from "./_helpers/jwt.mjs";
import errorHandler from "./_helpers/error-handler.mjs";

import usersController from "./services/users/users.controller.mjs";
import roomsController from "./services/rooms/rooms.controller.mjs";
import config from "./config/config.json" assert { type: "json" };
import { connection } from "./utils/createConnection.mjs";

import db from "./models/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", usersController);
app.use("/rooms", roomsController);

// global error handler
app.use(errorHandler);

// Настройка CORS
// app.use(
//   cors()
// );

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
  },
  connectionStateRecovery: {},
});

console.log("==============================");
console.log("creating connection at app.mjs");
console.log(config.development);
console.log("==============================");

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Настройка CORS
app.use(
  cors({
    origin: "http://localhost:4200", // URL-адрес Angular-приложения
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.on("chat message", async (msg, clientOffset, callback) => {
    console.log("message: " + msg.content);

    let result;
    try {
      // store the message in the database

      result = await db.Message.create({
        id_sender: msg.id_creator,
        id_chat: msg.id_room,
        timestamp: msg.timestamp,
        content: msg.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (e) {
      if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
        // the message was already inserted, so we notify the client
        console.log(e.errno, e);
        callback();
      } else {
        // nothing to do, just let the client retry
        console.log(e);
      }
      return;
    }
    // include the offset with the message
    io.emit("chat message", msg);

    // acknowledge the event
    callback();
  });

  socket.on("get-room-messages", async (roomId, callback) => {
    // Получение сообщений из базы данных по roomId
    try {
      console.log("roomId: " + roomId);
      const [results] = await connection.query(
        `SELECT * FROM messages WHERE id_chat = ${roomId}`
      );
      // Отправка сообщений обратно клиенту
      console.log(results);
      socket.emit("room-messages", results);

      callback();
    } catch (e) {
      console.log(e);
    }
  });

  if (!socket.recovered) {
    // if the connection state recovery was not successful
    try {
      const [results] = await connection.query(
        `SELECT id, content FROM messages WHERE id > ${
          socket.handshake.auth.serverOffset || 0
        }`
      );

      results.forEach((row) => {
        socket.emit("chat message", row.content, row.id);
      });
    } catch (e) {
      // something went wrong
      console.log(e);
    }
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Пример простого маршрута
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

// Маршрут для отправки сообщений
// app.post("/api/messages", (req, res) => {
//   console.log("Полученные данные:", req.body, req.files);

//   if (!req.files || Object.keys(req.files).length === 0) {
//     // Если нет файлов, то данные должны быть в req.body
//     console.log("Данные в req.body:", req.body);
//     // Здесь вы можете добавить логику сохранения сообщения в базе данных или другую обработку
//     res.json({ status: "success" });
//   } else {
//     // Если есть файлы, то данные будут в req.files
//     console.log("Данные в req.files:", req.files);
//     // Здесь вы можете добавить логику сохранения сообщения и файлов в базе данных или другую обработку
//     res.json({ status: "success" });
//   }
// });

const PORT = process.env.PORT || 3000;

io.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.listen(3001, () => {
  console.log("started app on 3001");
});
