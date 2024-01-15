var express = require("express");
var http = require("http");
var path = require("path");
var socketIo = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = socketIo(server); // Attach Socket.IO to the HTTP server

app.get("/", function (req, res) {
  var indexPath = path.join(__dirname, "index.html");
  res.sendFile(indexPath);
});

// Whenever someone connects, this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");
  // Send a message after a timeout of 4seconds
  setTimeout(function () {
    socket.send("Sent a message 4seconds after connection!");
  }, 4000);
  // Whenever someone disconnects, this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

server.listen(3000, function () {
  console.log("listening on port *:3000");
});
