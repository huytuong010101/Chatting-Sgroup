#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js';
import d from 'debug';
const debug = d('chatting:server')
import http from 'http';
import dotenv from "dotenv"
import connectionEvent from "../socketio/connectionEvent.js"
import _io from "socket.io"
import { admin } from "../firebase/fbConfig.js";
import jwtDecode from 'jwt-decode';
dotenv.config()

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * CREATE SOCKET SERVER 
 */
const io = _io(server)
io.on('connection', (socket) => {
  console.log('new user with id:', socket.id);
  //receiver msg
  socket.on("clientSendNewMsg", (request) => {
    console.log(socket.userId, " sent to  ", request.receiver, ": ", request.msg, "-mode:", request.mode)
    io.sockets.in(request.receiver).emit("serverSendMsg", {
      sender: socket.userId,
      mode: request.mode,
      msg: request.msg,
    });
  })
  //validate connection
  socket.on("registerUser", async (msg) => {
    try {
      await admin.auth().verifyIdToken(msg.token);
      const user = jwtDecode(msg.token);
      socket.userId = user.user_id;
      socket.join(user.user_id);
    } catch (e) {
      console.log("Can't register user with socket because of wrong token")
    }
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.leave(socket.userId)
  });
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
