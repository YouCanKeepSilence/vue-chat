const app = require('express')();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);

socket.on('connection', sock => {
  console.log('Connection established');

  sock.on('message', data => {
    console.log('Message form client: ', data)
    setTimeout(() => {
      sock.emit('newMessage', 'Hello, client')
    }, 1000)
  })
})

module.exports = {
  app: app,
  server: http
}
