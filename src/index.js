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
const V1Router = require("./v1/v1.router");
const app = express();
const port = process.env.NODE_PORT || 3030;
const { Server } = require("socket.io");
const cors = require("cors");
const server = require("http").createServer();

class ApplicationServer {
  server = server;
  socketIds = [];
  io = new Server(this.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  app = express();

  constructor() {
    this.start();
  }

  pushSocketId(id) {
    this.socketIds.push(id);
  }

  removeSocketId(id) {
    this.socketIds = this.socketIds.filter((item) => item !== id);
  }

  start() {
    this.server.listen(process.env.NODE_SOCKET_PORT || 3031, () => {
      console.info("Socket listen on port " + process.env.NODE_SOCKET_PORT);
    });
    this.io.on("connection", (socket) => {
      this.pushSocketId(socket.id);

      console.info(
        "Socket is connected on",
        [`${process.env.NODE_SOCKET_URL}`, process.env.NODE_SOCKET_PORT].join(
          ":"
        )
      );
    });
    this.io.on("disconnect", (socket) => {
      console.info(
        "Socket is disconnected on",
        [`${process.env.NODE_SOCKET_URL}`, process.env.NODE_SOCKET_PORT].join(
          ":"
        )
      );
      this.removeSocketId(socket.id);
    });

    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use((error, request, response, next) => {
      if (error) {
        response.status(404).send(error.message);
        response.end();
      } else {
        next();
      }
    });
    this.app.get("/", (request, res) => {
      res.status(200);
      res.send("Welcome to youtube share");
      res.end();
    });

    const v1Router = new V1Router(this.io, this.socketIds);

    this.app.use(`/api/v1`, v1Router.router);
    this.app.listen(port, () => {
      console.log(
        "Server listening on",
        [process.env.NODE_BASE_URL, process.env.NODE_PORT].join(":")
      );
    });
  }
}

// Application running on here
new ApplicationServer();
