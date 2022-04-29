const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const connectdB = require("./DataBaseConfig/DbConnection");
const mongoose = require("mongoose");
const express = require("express");
connectdB();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on("connection", (socket) => {
  socket.on("chat", (payload) => {
    io.emit("chat", payload);
  });
});
app.use(cors());

app.use(express.json());
app.use("/user", require("./routes/user.Routes"));

server.listen(4000, () => console.log("server is runnig..."));
