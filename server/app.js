const app = require('express')();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);

socket.on('connection', sock => {
  console.log('Connection established');
})

module.exports = {
  app: app,
  server: http
}
