const path = require("path");

const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV !== "production" ? "./../.env" : "./../.env.production"
);

require("dotenv").config({
  path: envPath,
});

const bodyParser = require("body-parser");
const express = require("express");
const v1Router = require("./v1/v1.router");
const app = express();
const port = process.env.PORT || 3030;
const { Server } = require("socket.io");
const server = require("http").createServer();
server.listen(process.env.NODE_SOCKET_PORT || 3031);

const cors = require("cors");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use((error, request, response, next) => {
  if (error) {
    response.status(404).send(error.message);
    response.end();
  }

  next();
});
app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to youtube share");
  res.end();
});

app.use(`/api/v1`, v1Router);
app.listen(process.env.NODE_PORT || 3030, () => {
  console.log("Server listening on", [process.env.NODE_BASE_URL, process.env.NODE_PORT].join(':'));
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket listening on", [`${process.env.NODE_SOCKET_URL}`,process.env.NODE_SOCKET_PORT].join(':'))
  socket.on("new video", () => {
    socket.emit("send video", "new video");
  });
});
