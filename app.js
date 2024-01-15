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

var clients = 0;

// Whenever someone connects, this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");
  clients++;

  // Send a message after a timeout of 4 seconds
  // setTimeout(function () {
  //   socket.send("Sent a message 4 seconds after connection!");
  //   socket.emit("testerEvent", {
  //     description: "A custom event named testerEvent!",
  //   });
  // }, 4000);

  // For broadcasting to all connected users..
  io.sockets.emit("broadcast", {
    description: clients + " clients connected!",
  });

  // Whenever someone disconnects, this piece of code executed
  socket.on("disconnect", function () {
    clients--;
    console.log("A user disconnected");

    // Broadcasting the updated client count after decrementing
    io.sockets.emit("broadcast", {
      description: clients + " clients connected!",
    });
  });
});

server.listen(3000, function () {
  console.log("listening on port *:3000");
});
