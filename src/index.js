const bodyParser = require("body-parser");
const express = require("express");
const v1Router = require("./v1/v1.router");
const app = express();
const port = process.env.PORT || 3000;
const { Server } = require("socket.io");
const server = require("http").createServer();
server.listen(3001);

const cors = require("cors");

app.use(bodyParser.json());
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

app.use(`/v1`, v1Router);
app.listen(port, () => {
  console.log("listening on port", port);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("new video", () => {
    socket.emit("send video", "new video");
  });
});
